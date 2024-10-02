import React, { useState } from "react"; 
import logo from "../pages/assets/logo-fin.png"; 
import styled from "styled-components"; 
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";

const Login = () => {
  // State variables to store the email, password, and any error messages
  const [email, setEmail] = useState(""); // email is initially an empty string
  const [password, setPassword] = useState(""); // password is initially an empty string
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate();

  // Function that handles form submission (when the user clicks "Login")
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from refreshing when the form is submitted

    try {
      // Send a request to  server (back end) to authenticate the user
      const response = await fetch("/login", {
        method: "POST", // Use POST method since we're sending data to the server
        headers: {
          "Content-Type": "application/json", // Tell the server that we are sending JSON data
        },
        // The body contains the email and password entered by the user
        body: JSON.stringify({
          email, // Email from the state (what the user typed)
          password, // Password from the state (what the user typed)
        }),
      });

      // Convert the response from the server to JSON format
      const data = await response.json();

      if (response.ok) {
        // If the response is "ok", meaning the user credentials were valid
        console.log("User logged in successfully!"); // Log a success message
        navigate("/home"); // Navigate to the "home" page after successful login
      } else {
        // If the response is not ok (e.g., invalid email or password), show an error message
        setErrorMessage(data.error || "Login failed"); // Display the error message
      }
    } catch (error) {
      // If there was an error connecting to the server or some other issue
      setErrorMessage("An error occurred. Please try again."); // Display a generic error message
      console.error("Error during login:", error); // Log the error for debugging
    }
  };

  // The component returns the JSX, which defines what the UI looks like
  return (
    <LoginContainer>
      <Logo src={logo} alt="FinPort Logo" />
      <Title>Login to your FinPort account</Title>
      {/* The form where the user enters their email and password */}
      <Form onSubmit={handleSubmit}>
        {/* Email input field */}
        <Input
          type="email" // Specifies that this input is for emails
          placeholder="Email" // Placeholder text inside the input field
          required // Makes the field required (user cannot submit without filling it)
          value={email} // Binds the input value to the state
          onChange={(e) => setEmail(e.target.value)} // Updates state when the user types
        />
        {/* Password input field */}
        <Input
          type="password" // Specifies that this input is for passwords (hides the input text)
          placeholder="Password" // Placeholder text inside the input field
          required // Makes the field required
          value={password} // Binds the input value to the state
          onChange={(e) => setPassword(e.target.value)} // Updates state when the user types
        />
        {/* Error message (if any) */}
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}{" "}
        {/* Submit button */}
        <SubmitButton type="submit">Login</SubmitButton>{" "}
        {/* Button to submit the form */}
      </Form>
      <AccountText>Dont have an account yet?</AccountText>
      <Link to="/register">
        <LoginButton>Sign Up</LoginButton>
      </Link>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; // Align items to the top of the page
  min-height: 100vh; // Set the minimum height to fill the whole screen
  padding-top: 50px; // Add space at the top
  background-color: #f4f4f9; // Light background color
  font-family: Arial, sans-serif; // Font for the text
`;

// Styles for the logo image
const Logo = styled.img`
  height: 90px; // Set the height of the logo
  margin-bottom: 20px; // Add space below the logo
`;

// Styles for the form title
const Title = styled.h2`
  font-size: 1.5rem; // Set the font size
  color: #2c3e50; // Set the text color
  margin-bottom: 20px; // Add space below the title
`;

// Styles for the form itself
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px; // Maximum width of the form
  background-color: white; // White background for the form
  padding: 40px; // Add padding inside the form
  border-radius: 10px; // Rounded corners
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); // Add a shadow effect
`;

// Styles for the input fields
const Input = styled.input`
  padding: 12px 15px; // Padding inside the input field
  margin-bottom: 15px; // Add space below each input
  border: 1px solid #ccc; // Light grey border
  border-radius: 5px; // Rounded corners for the input
  font-size: 1rem; // Font size for the text inside the input
  outline: none; // Removes the default outline on focus

  &:focus {
    border-color: purple; // Change the border color when focused
    box-shadow: 0 0 5px purple; // Add a purple glow around the input
  }
`;

// Styles for the submit button
const SubmitButton = styled.button`
  padding: 12px 15px; // Padding inside the button
  background-color: purple; // Purple background color
  color: white; // White text color
  font-size: 1rem; // Font size for the button text
  font-weight: bold; // Bold text
  border: none; // Remove the border
  border-radius: 5px; // Rounded corners for the button
  cursor: pointer; // Pointer cursor on hover
  transition: background-color 0.3s ease; // Smooth transition for hover effect

  &:hover {
    background-color: darkpurple; // Darker purple when hovered
  }
`;

// Styles for the error message
const ErrorText = styled.p`
  color: red; // Red text color for the error message
  font-size: 1.2rem; // Font size for the error message
  margin-bottom: 15px; // Add space below the error message
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