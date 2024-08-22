import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState();
  const [toggled, setToggled] = useState();
  const navigate = useNavigate();
  const getUserData = async (authToken) => {
    try {
      const response = await fetch(
        "https://crudauthbackend.glitch.me/api/auth/user",
        {
          headers: {
            "content-type": "application/json",
            authToken: authToken,
          },
        }
      );
      const json = await response.json();
      if (!response.ok) {
        enqueueSnackbar({ message: json.message, variant: "error" });
        return;
      }
      setUser(json.user);
    } catch (error) {
      console.log(error.message);
      console.error(error);
    }
  };
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) getUserData(authToken);
  }, []);
  const toggle = () => setToggled((prev) => !prev);
  const updatePassword = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = {};
      formData.forEach((value, key) => {
        console.log(key);
        data[key] = value;
      });
      const response = await fetch(
        "https://crudauthbackend.glitch.me/api/auth/updatePassword",
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            password: data.currentPassword,
            email: user.email,
          }),
        }
      );
      const json = await response.json();
      enqueueSnackbar({
        message: json.message,
        variant: response.ok ? "success" : "error",
      });
      if (response.ok) {
        setToggled(false);
        e.target.reset();
      }
    } catch (error) {
      console.log(error.message);
      console.error(error);
    }
  };
  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  const deleteAccount = async () => {
    const response = await fetch(
      "https://crudauthbackend.glitch.me/api/auth/deleteUser",
      {
        headers: {
          "content-type": "application/json",
          id: user._id,
        },
      }
    );
    const json = await response.json();
    enqueueSnackbar({
      message: json.message,
      variant: response.ok ? "success" : "error",
    });
    if (response.ok) navigate("/login");
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-slate-800   flex flex-col items-center gap-5 text-white shadow p-10 rounded">
        <div className="border rounded-full overflow-hidden">
          <img src="/avatar2.png" className="max-w-full object-contain h-56" />
        </div>
        <h1 className="text-4xl font-bold">My Profile</h1>
        <div className="flex items-center justify-between w-full">
          <span className="font-semibold">Email:</span>
          <span className="font-semibold">{user?.email}</span>
        </div>
        <button
          onClick={toggle}
          className={`${
            toggled && "hidden"
          } btn  bg-white text-black font-medium transitional hover:bg-transparent hover:text-white border border-white    `}
        >
          Change Password
        </button>
        <form
          onSubmit={updatePassword}
          className={`${!toggled && "hidden"} flex flex-col w-full gap-4`}
        >
          <input
            type="password"
            id="password"
            className="py-3 text-black px-3 outline-none border border-borderColor focus:border-sunsetOrange transitional rounded"
            placeholder="Enter Current Password"
            required
            name="currentPassword"
          />
          <input
            type="password"
            id="updatedPassword"
            className="py-3 px-3 text-black outline-none border border-borderColor focus:border-sunsetOrange transitional rounded"
            placeholder="Enter New Password"
            required
            name="updatedPassword"
          />
          <button className="btn btn  bg-white text-black font-medium transitional hover:bg-transparent hover:text-white border border-white">
            Update Password
          </button>
        </form>
        <button
          onClick={toggle}
          className={`${
            !toggled && "hidden"
          } btn btn  bg-white text-black font-medium transitional hover:bg-transparent hover:text-white border border-white`}
        >
          Cancel
        </button>{" "}
        <button
          onClick={deleteAccount}
          className={`${
            toggled && "hidden"
          } btn  bg-white text-black font-medium transitional hover:bg-transparent hover:text-white border border-white`}
        >
          Delete Account
        </button>
        <button
          onClick={logout}
          className={`${
            toggled && "hidden"
          } btn  bg-white text-black font-medium transitional hover:bg-transparent hover:text-white border border-white`}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
