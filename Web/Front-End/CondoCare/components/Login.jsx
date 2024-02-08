import React, { useState } from "react";

function Login({ views, setView, setUserData }) {
  const [errMessage, setErrMessage] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    let loginFormData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    let formErrors = validateFormData(loginFormData);
    let userData = getUserData(loginFormData, setUserData);

    if (!userData)formErrors.push("Email or password is incorrect");

    if (formErrors.length > 0) {
      let tempError = "Please fix the following to continue:\n";
      formErrors.forEach((err, index) => {
        tempError += `  ${index + 1}. ${err}\n`;
      });
      setErrMessage(tempError);
    } 
    else {
      setView(views.PROFILE);
    }
  };

  return (
    <div className="login-container">
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
        <a href="" onClick={(e) => {e. preventDefault(); setView(views.SIGNUP)}}>
          Sign up
        </a>
      </p>
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
