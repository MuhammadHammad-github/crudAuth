import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useEffect } from "react";
import { SnackbarProvider } from "notistack";
import Home from "./pages/Home";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("authToken");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);
  return (
    <SnackbarProvider>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Signup />} path="/signUp" />
      </Routes>
    </SnackbarProvider>
  );
}

export default App;
