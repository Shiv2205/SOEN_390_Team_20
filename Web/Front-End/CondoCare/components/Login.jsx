import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "./LandingPageComponents/navigation";

function Login({setUserData }) {
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = (event) => {
    event.preventDefault();
    let loginFormData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    let formErrors = validateFormData(loginFormData);
    let userData = getUserData(loginFormData, setUserData);

    console.log(userData);

    const boilerplateUserData = {
      id: 1,
      username: "example_user",
      email: "example@example.com",
      fullName: "John Doe",
      age: 30,
      phone: 5146010320,
      address: "232 jjjd street"
    };
    
    // Store user data in localStorage
    localStorage.setItem("userData", JSON.stringify(boilerplateUserData));
    
    // Set the boilerplate user data using setUserData
    setUserData(boilerplateUserData);

    if (!userData)formErrors.push("Email or password is incorrect");

    if (formErrors.length > 0) {
      let tempError = "Please fix the following to continue:\n";
      formErrors.forEach((err, index) => {
        tempError += `  ${index + 1}. ${err}\n`;
      });
      setErrMessage(tempError);
    } 
    else {
      navigate("/userDashboard");
    }
  };

  return (

    <div style={{ overflow: 'hidden' }}>
      <Navigation />
      <div className="login-container" style={{ marginTop: '110px'}}>
        <h2>Login</h2>

        <div className="error-message">{errMessage ? errMessage : ""}</div>

        <form onSubmit={(e) => handleLogin(e)}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />

          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <a href="" onClick={(e) => {e. preventDefault(); navigate("/signup")}}>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

function validateFormData(formData) {
  const errors = [];

  // Check if email is not empty and has a valid email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email.trim() || !emailRegex.test(formData.email.trim()))
    errors.push("Email address is invalid");

  // Check if password is not empty
  if (!formData.password.trim()) errors.push("Password is required");

  // Add additional validation rules as needed

  return errors;
}

function getUserData(formData, setUserData) {
  let userData = {};
  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add any other headers you need
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the server
      setUserData(data.loginData); 
      if (data.response === "Email or password is incorrect") throw new Error(data.response);
    })
    .catch((error) => {
      // Handle error
      console.error("Error:", error);
    });
    return userData;
}

export default Login;
