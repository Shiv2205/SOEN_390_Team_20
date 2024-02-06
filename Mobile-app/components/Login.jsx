import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const Login = ({ views, setView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');

  const handleLogin = () => {
    let formData = { email, password };
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

    // Check if email is not empty and has a valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.push('Email address is invalid');
    }

    // Check if password is not empty
    if (!formData.password.trim()) {
      errors.push('Password is required');
    }

    // Add additional validation rules as needed

    return errors;
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.heading}>Login</Text>

      <View style={styles.errorMessageContainer}>
        <Text style={styles.errorMessage}>{errMessage}</Text>
      </View>

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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.text}>
        Don't have an account?{' '}
        <Text style={styles.link} onPress={() => setView(views.SIGNUP)}>
          Sign up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    width: '80%',
    height: '50%',
    backgroundColor: '#fff',
    padding: 20,
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
    width: '100%',
    padding: 10,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#4caf50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginBottom: 45,
    marginTop: 15
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

export default Login;
