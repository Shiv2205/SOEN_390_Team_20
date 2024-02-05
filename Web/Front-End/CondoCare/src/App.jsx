import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

//#################################### For testing Need to remove ##################################################
const log = console.log;

function App() {
  const states = {
    ERROR: -1,
    UNVERIFIED: 0,
    SUCCESS: 1
  }
  const [errMessage, setErrMessage] = useState("");
  const [signUpState, setSignUpState] = useState(states.UNVERIFIED)

  const handleSignUp = (event) => {
    event.preventDefault();
    let formData = {
      fullname: event.target.fullname.value,
      email: event.target.email.value,
      password: event.target.password.value,
      confirmPassword: event.target.confirmPassword.value
    }
    let formErrors = validateFormData(formData);
    if(formErrors.length > 0){
      let tempError = "The fix the following to continue: {\n}";
      formErrors.map((err, index) => {
        tempError += `&#9; ${index+1}. ${err}<br/>`;
      });
      setErrMessage(tempError);
    }
  }

  return (
    <>
      <div className="signup-container">
        <h2>Create an Account</h2>

        <div className="error-message">
          {errMessage ? errMessage : ""}
        </div> 

        <form onSubmit={(e) => handleSignUp(e)}>
          <label htmlFor="fullname">Full Name:</label>
          <input type="text" id="fullname" name="fullname" required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />

          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
          />

          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <a href="#">Log in</a>
        </p>
      </div>
    </>
  );
}

function validateFormData(formData) {
  const errors = [];

  // Check if fullname is not empty
  if (!formData.fullname.trim()) {
    errors.push('Full name is required');
  }

  // Check if email is not empty and has a valid email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
    errors.push('Email address is invalid');
  }

  // Check if password is not empty and has a minimum length
  if (!formData.password.trim() || formData.password.trim().length < 8) {
    errors.push('Password must be at least 6 characters');
  }

  // Check if confirmPassword matches the password
  if (formData.password.trim() !== formData.confirmPassword.trim()) {
    errors.push('Passwords do not match');
  }

  if(errors.length === 0)
    sendFormData(formData);

  // Return an object containing errors (if any)
  return errors;
}

function sendFormData(formData){
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers you need
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the server
        console.log(data);
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
      });
}

export default App;
