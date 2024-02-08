import React, { useState } from "react";

function Login({ views, setView, setEmail }) {
  const [errMessage, setErrMessage] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    let formData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    let formErrors = validateFormData(formData);
    if (formErrors.length > 0) {
      let tempError = "Please fix the following to continue:\n";
      formErrors.forEach((err, index) => {
        tempError += `  ${index + 1}. ${err}\n`;
      });
      setErrMessage(tempError);
    } else {
      setEmail(formData.email)
      setView(views.PROFILE)
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
  if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
    errors.push("Email address is invalid");
  }

  // Check if password is not empty
  if (!formData.password.trim()) {
    errors.push("Password is required");
  }

  // Add additional validation rules as needed

  return errors;
}

export default Login;
