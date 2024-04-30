import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "./LandingPageComponents/navigation";
import { useStore } from "../store/store";

function Login({ setUserData }) {
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate(); // Hook for navigation
  const [state, dispatch] = useStore();

  const handleLogin = (event) => {
    event.preventDefault();
    let loginFormData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    let formErrors = validateFormData(loginFormData);

    const SERVER = import.meta.env.VITE_SERVER_BASE_URL;
  fetch(`http://localhost:3000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers you need
      },
      body: JSON.stringify(loginFormData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid credentials");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response from the server
        console.log(data);
        dispatch("CREATE", { userData: { ...data.loginData } });
        localStorage.setItem("userData", JSON.stringify(data.loginData));
        setUserData(data.loginData);
        navigate("/userDashboard");
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
        setErrMessage("Email or password is incorrect");
      });
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <Navigation />
      <div className="login-container" style={{ marginTop: "110px" }}>
        <h2>Login</h2>
        <div className="error-message">{errMessage}</div>
        <form onSubmit={(e) => handleLogin(e)}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
              navigate("/signup");
            }}
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

function validateFormData(formData) {
  const errors = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email.trim() || !emailRegex.test(formData.email.trim()))
    errors.push("Email address is invalid");
  if (!formData.password.trim()) errors.push("Password is required");
  return errors;
}

export default Login;
