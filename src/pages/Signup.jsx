import { enqueueSnackbar } from "notistack";
import React from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    if (data.password !== data.confirmPassword) {
      enqueueSnackbar({ message: "Passwords Does'nt Match", variant: "error" });
      return;
    }
    const response = await fetch("https://crudauthbackend.glitch.me/", {
      method: "POST",
      body: JSON.stringify({ email: data.email, password: data.password }),
      headers: {
        "content-type": "application/json",
      },
    });
    const json = await response.json();
    enqueueSnackbar({
      message: json.message,
      variant: response.ok ? "success" : "error",
    });
    if (response.ok) navigate("/login");
  };
  return (
    <div className="my-20 respPx20">
      <div className="900px:w-[50%] 750px:w-[60%] 650px:w-[70%] 550px:w-[80%] 450px:w-[90%] w-full border border-borderColor p-10 450px:px-10 px-5 mx-auto">
        <h1 className="font-[400] text-center text-5xl">Sign Up </h1>
        <p className="text-lg text-center my-5">
          Already have an account?{" "}
          <a
            href="#"
            onClick={() => navigate("/login")}
            className="text-sunsetOrange"
          >
            Login now
          </a>
        </p>
        <form onSubmit={handleSubmit} className="mt-20">
          <div className="flex flex-col gap-3">
            <label htmlFor="email">Enter Email Address</label>
            <input
              type="text"
              id="email"
              className="py-3 px-3 outline-none border border-borderColor focus:border-sunsetOrange transitional"
              placeholder="Enter Email Address"
              required
              name="email"
            />
          </div>

          <div className="flex my-7 flex-col gap-3">
            <div className="flex justify-between">
              <label htmlFor="password">Enter Password</label>
            </div>
            <input
              type="password"
              id="password"
              className="py-3 px-3 outline-none border border-borderColor focus:border-sunsetOrange transitional"
              placeholder="Enter Password"
              required
              name="password"
            />
          </div>
          <div className="flex my-7 flex-col gap-3">
            <div className="flex justify-between">
              <label htmlFor="confPass">Confirm Password</label>
            </div>
            <input
              type="password"
              id="confPass"
              className="py-3 px-3 outline-none border border-borderColor focus:border-sunsetOrange transitional"
              placeholder="Confirm Password"
              required
              name="confirmPassword"
            />
          </div>
          <button className="btn btn1">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
