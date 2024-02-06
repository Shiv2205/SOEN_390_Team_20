import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const SignUp = ({ views, setView }) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');

  const handleSignUp = () => {
    let formData = { fullname, email, password, confirmPassword };
    let formErrors = validateFormData(formData);
    if (formErrors.length > 0) {
      let tempError = 'Please fix the following to continue:\n';
      formErrors.forEach((err, index) => {
        tempError += `  ${index + 1}. ${err}\n`;
      });
      setErrMessage(tempError);
    }
  };

  const validateFormData = (formData) => {
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
      errors.push('Password must be at least 8 characters');
    }

    // Check if confirmPassword matches the password
    if (formData.password.trim() !== formData.confirmPassword.trim()) {
      errors.push('Passwords do not match');
    }

    if(errors.length === 0)
        sendFormData(formData);

    return errors;
  };

  return (
    <View style={styles.signupContainer}>
      <Text style={styles.heading}>Create an Account</Text>

      <View style={styles.errorMessageContainer}>
        <Text style={styles.errorMessage}>{errMessage}</Text>
      </View>

      <TextInput
        style={styles.input}
        onChangeText={(text) => setFullname(text)}
        value={fullname}
        placeholder="Full Name"
        autoCapitalize="words"
      />

      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder="Password"
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        placeholder="Confirm Password"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.text}>
        Already have an account?{' '}
        <Text style={styles.link} onPress={() => setView(views.LOGIN)}>
          Log in
        </Text>
      </Text>
    </View>
  );
};

function sendFormData(formData) {
    fetch("http://10.0.0.39:3000/signup", {
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

const styles = StyleSheet.create({
  signupContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  errorMessageContainer: {
    marginBottom: 10,
  },
  errorMessage: {
    color: '#ff0000',
    fontSize: 14,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#4caf50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    color: '#555',
  },
  link: {
    color: '#4caf50',
    textDecorationLine: 'underline',
  },
});

export default SignUp;
