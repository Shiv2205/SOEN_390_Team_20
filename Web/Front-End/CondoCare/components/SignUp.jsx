import { useState } from "react";
import UploadWidget from "./UploadWidget";

function SignUp({ views, setView }) {
  const [errMessage, setErrMessage] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const handleSignUp = (event) => {
    /* `event.preventDefault();` is used to prevent the default form submission.*/
    event.preventDefault();

    /* Extracting form data from the event.target and adding the `profilePicture` property to the formData object. */
    let data = new FormData(event.target);
    let formData = Object.fromEntries(data.entries());
    formData.profilePicture = profilePic;

    /* This part of the code in the `handleSignUp` function is performing form validation. */
    let formErrors = validateFormData(formData);
    if (formErrors.length > 0) {
      let tempError = "The fix the following to continue: {\n}";
      formErrors.map((err, index) => {
        tempError += `&#9; ${index + 1}. ${err}<br/>`;
      });
      setErrMessage(tempError);
    }
  };

  return (
    <div className="signup-container">
      <h2>Create an Account</h2>

      <div className="error-message">{errMessage ? errMessage : ""}</div>

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

        <label htmlFor="phoneNumber">Phone Number:</label>
        <input type="tel" id="phoneNumber" name="phoneNumber" />

        <div className="profile-picture-wrapper">
          <label htmlFor="profilePicture">Profile Picture:</label>
          {!thumbnail ? (
            <UploadWidget
              setProfilePic={setProfilePic}
              setThumbnail={setThumbnail}
            />
          ) : (
            <img src={thumbnail} />
          )}
        </div>

        <br />
        <br />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{" "}
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
            setView(views.LOGIN);
          }}
        >
          Log in
        </a>
      </p>
    </div>
  );
}

function validateFormData(formData) {
  const errors = [];

  // Check if fullname is not empty
  if (!formData["fullname"].trim()) {
    errors.push("Full name is required");
  }

  // Check if email is not empty and has a valid email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData["email"].trim() || !emailRegex.test(formData["email"].trim())) {
    errors.push("Email address is invalid");
  }

  // Check if password is not empty and has a minimum length
  if (!formData["password"].trim() || formData["password"].trim().length < 8) {
    errors.push("Password must be at least 8 characters");
  }

  // Check if confirmPassword matches the password
  if (formData["password"].trim() !== formData["confirmPassword"].trim()) {
    errors.push("Passwords do not match");
  }

  if (errors.length === 0) sendFormData(formData);

  // Return an object containing errors (if any)
  return errors;
}

function sendFormData(formData) {
  console.log(formData);
  fetch("http://localhost:3000/signup", {
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
      console.log(data);
    })
    .catch((error) => {
      // Handle errors
      console.error("Error:", error);
    });
}

export default SignUp;

// formData.append("fullname", event.target.fullname.value);
// formData.append("email", event.target.email.value);
// formData.append("password", event.target.password.value);
// formData.append("confirmPassword", event.target.confirmPassword.value);
// formData.append("phoneNumber", event.target.phone.value || "");
// formData.append("profilePicture", profilePic || null);

/**
 *   validatePassword(password) {
    // Example validation rules - Adjust as needed
    const minLength = 8;
    const requiresUppercase = true;
    const requiresLowercase = true;
    const requiresNumber = true;
    const requiresSymbol = true;

    return (
      password.length >= minLength &&
      requiresUppercase &&
      /[A-Z]/.test(password) &&
      requiresLowercase &&
      /[a-z]/.test(password) &&
      requiresNumber &&
      /\d/.test(password) &&
      requiresSymbol &&
      /[^A-Za-z0-9]/.test(password)
    );
  }

        // Password validation logic
      if (!this.validatePassword(userData.password)) {
        throw new Error("Password does not meet security requirements.");
      }
 */