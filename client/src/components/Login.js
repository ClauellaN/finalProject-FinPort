import React, { useState } from "react";
import logo from "../pages/assets/logo-fin.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  // State variables to store the email, password, and any error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  // Function that handles form submission (when the user clicks "Login")
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when form is submitted

    try {
      // Send a request to server (back end) to authenticate the user
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User logged in successfully!");
        navigate("/home"); // Navigate to the "home" page after successful login
      } else {
        setErrorMessage(data.error || "Login failed");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      console.error("Error during login:", error);
    } finally {
      setLoading(false); // Stop loading after the process finishes
    }
  };

  // The component returns the JSX, which defines what the UI looks like
  return (
    <LoginContainer>
      <Logo src={logo} alt="FinPort Logo" />
      <Title>Login to your FinPort account</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Error message (if any) */}
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

        {/* Conditionally render "Logging in..." or "Login" based on loading state */}
        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </SubmitButton>
      </Form>
      <AccountText>Don't have an account yet?</AccountText>
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
  margin-bottom: 20px;
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

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 1.2rem;
  margin-bottom: 15px;
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
