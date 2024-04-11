import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "./LandingPageComponents/navigation";
import { useStore } from "../store/store";

function Login({ setUserData }) {
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useStore()[1];

  const handleLogin = (event) => {
    event.preventDefault();
    let loginFormData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    let formErrors = validateFormData(loginFormData);
    let userData = getUserData(loginFormData, dispatch);

    const boilerplateUserData = {
      id: 1,
      username: "example_user",
      email: "example@example.com",
      fullName: "John Doe",
      age: 30,
      phone: 5146010320,
      address: "232 jjjd street",
    };

    // Store user data in localStorage
    localStorage.setItem("userData", JSON.stringify(boilerplateUserData));

    // Set the boilerplate user data using setUserData
    setUserData(boilerplateUserData);

    if (!userData) formErrors.push("Email or password is incorrect");

    if (formErrors.length > 0) {
      let tempError = "Please fix the following to continue:\n";
      formErrors.forEach((err, index) => {
        tempError += `  ${index + 1}. ${err}\n`;
      });
      setErrMessage(tempError);
    } else {
      navigate("/userDashboard");
    }
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <Navigation />
      <div className="login-container" style={{ marginTop: "110px" }}>
        <h2>Login</h2>

        <div className="error-message">{errMessage ? errMessage : ""}</div>

        <form onSubmit={(e) => handleLogin(e)}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />

          <button type="submit">Login</button>
        </form>
        <div>
        <GoogleAuth/>
        </div>
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

  // Check if email is not empty and has a valid email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email.trim() || !emailRegex.test(formData.email.trim()))
    errors.push("Email address is invalid");

  // Check if password is not empty
  if (!formData.password.trim()) errors.push("Password is required");

  // Add additional validation rules as needed

  return errors;
}

function getUserData(formData, dispatch) {
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
      // Add user data to App-wide state
      dispatch("CREATE", { userData: { ...data.loginData } });
      if (data.response === "Email or password is incorrect")
        throw new Error(data.response);
    })
    .catch((error) => {
      // Handle error
      console.error("Error:", error);
    });
  return userData;
}

export default Login;

const GoogleAuth = () => {
  return (
    <div className="google-button btn">
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <span className="svgIcon t-popup-svg">
          <svg className="svgIcon-use" style={{float: 'left'}} width="30" height="40" viewBox="0 0 25 25">
            <g fill="none" fill-rule="evenodd">
              <path
                d="M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z"
                fill="#4285F4"
              />
              <path
                d="M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z"
                fill="#34A853"
              />
              <path
                d="M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z"
                fill="#FBBC05"
              />
              <path
                d="M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z"
                fill="#EA4335"
              />
            </g>
          </svg>
        </span>
        <span className="button-label">Sign in with Google</span>
      </div>
    </div>
  );
};
