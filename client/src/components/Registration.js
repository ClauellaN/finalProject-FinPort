
import React, { useState } from "react";
import logo from "../pages/assets/logo-fin.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook to programmatically navigate to different routes

  // Initialize formData state to hold form input values
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // States for handling errors and success messages
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form input changes to update formData state
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Password validation function
  const validatePassword = (password, confirmPassword) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return null;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Validate password
    const passwordError = validatePassword(formData.password, formData.confirmPassword);
    if (passwordError) {
      setError(passwordError);
      return; // Exit the function if password validation fails
    }

    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Sending the form data to the backend
      });

      if (!response.ok) {
        console.log("Error during registration");
        setError("Registration failed. Please try again.");
        return;
      }

      const data = await response.json();
      console.log("Registration successful:", data);

      // Show success message and hide form
      setSuccessMessage("Registration successful! Redirecting to login...");
      setError(""); // Clear any errors

      // After displaying the message, navigate to the login page after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000); // 2-second delay
    } catch (error) {
      console.error("An error occurred during registration:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <RegistrationContainer>
      <Logo src={logo} alt="FinPort Logo" />
      <Title>Create your FinPort account!</Title>

      {/* Display success message if registration is successful */}
      {successMessage ? (
        <SuccessMessage>{successMessage}</SuccessMessage>
      ) : (
        <>
          {/* Show form if no success message */}
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="fname"
              placeholder="First Name"
              value={formData.fname}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="lname"
              placeholder="Last Name"
              value={formData.lname}
              onChange={handleChange}
              required
            />
            <Input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {/* Display error message if any */}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <SubmitButton type="submit">Register</SubmitButton>
          </Form>

          {/* Link to login for users who already have an account */}
          <AccountText>Already have an account?</AccountText>
          <Link to="/login">
            <LoginButton>Login</LoginButton>
          </Link>
        </>
      )}
    </RegistrationContainer>
  );
};

export default Registration;

// Styled components
const RegistrationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding-top: 50px;
  background-color: #f4f4f9;
  font-family: Arial, sans-serif;
`;

const Logo = styled.img`
  height: 90px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 30px;
  margin-top: 1px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 12px 15px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: purple;
    box-shadow: 0 0 5px purple;
  }
`;

const SubmitButton = styled.button`
  padding: 12px 15px;
  background-color: purple;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darkpurple;
  }
`;

const AccountText = styled.h4`
  margin-top: 20px;
  color: #2c3e50;
`;

const LoginButton = styled.button`
  padding: 12px 15px;
  background-color: #f4f4f9;
  color: purple;
  font-size: 1rem;
  font-weight: bold;
  border: 2px solid purple;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: purple;
    color: white;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 15px;
  font-weight: bold;
`;

const SuccessMessage = styled.p`
  color: green;
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
`;
