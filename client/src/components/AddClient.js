import React, { useState } from "react";
import styled from "styled-components";

const AddClient = () => {
  const [newClientInfo, setNewClientInfo] = useState({
    fname: "",
    lname: "",
    phone: "",
    address: "",
    balance: "",
    item: "",
  });
  const [confirmationMessage, setConfirmationMessage] = useState(""); // Message for feedback
  const [error, setError] = useState(""); // For error handling

  // Handle input changes for adding a new client
  const handleNewClientInputChange = (e) => {
    const { name, value } = e.target;
    setNewClientInfo({ ...newClientInfo, [name]: value });
  };

  // Function to log new client by making a POST request
  const logNewClient = async (e) => {
    e.preventDefault();
    setError("");
    setConfirmationMessage("");

    try {
      const response = await fetch("/addClient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClientInfo),
      });

      const data = await response.json();

      if (response.ok) {
        setConfirmationMessage("Client created successfully!");
        setNewClientInfo({
          fname: "",
          lname: "",
          phone: "",
          address: "",
          balance: "",
          item: "",
        });
      } else {
        setError(data.message || "Failed to create client.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <FormContainer onSubmit={logNewClient}>
      <h2>Add a New Client</h2>

      <Label>First Name:</Label>
      <StyledInput
        type="text"
        name="fname"
        value={newClientInfo.fname}
        onChange={handleNewClientInputChange}
        required
      />

      <Label>Last Name:</Label>
      <StyledInput
        type="text"
        name="lname"
        value={newClientInfo.lname}
        onChange={handleNewClientInputChange}
        required
      />

      <Label>Phone:</Label>
      <StyledInput
        type="text"
        name="phone"
        value={newClientInfo.phone}
        onChange={handleNewClientInputChange}
        required
      />

      <Label>Address:</Label>
      <StyledInput
        type="text"
        name="address"
        value={newClientInfo.address}
        onChange={handleNewClientInputChange}
        required
      />

      <Label>Balance:</Label>
      <StyledInput
        type="number"
        name="balance"
        value={newClientInfo.balance}
        onChange={handleNewClientInputChange}
        required
      />

      <Label>Item:</Label>
      <StyledInput
        type="text"
        name="item"
        value={newClientInfo.item}
        onChange={handleNewClientInputChange}
        required
      />

      <StyledButton type="submit">Add Client</StyledButton>

      {/* Display confirmation message or error for adding client */}
      {confirmationMessage && (
        <ConfirmationText>{confirmationMessage}</ConfirmationText>
      )}
      {error && <ErrorText>{error}</ErrorText>}
    </FormContainer>
  );
};

export default AddClient;

// Styled components for the AddClient form
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-family: Arial, sans-serif;
`;

const Label = styled.label`
  font-size: 18px;
  color: black;
  margin-top: 10px;
`;

const StyledInput = styled.input`
  padding: 10px;
  width: 350px;
  border: 2px solid purple;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 15px;

  &:focus {
    outline: none;
    border-color: purple;
  }
`;

const StyledButton = styled.button`
  color: white;
  font-weight: bold;
  padding: 12px 24px;
  font-size: 1rem;
  background-color: purple;
  border: 2px solid purple;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;

  &:hover {
    background-color: #4b0082;
  }

  &:focus {
    outline: none;
  }
`;

const ConfirmationText = styled.p`
  color: green;
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
`;

const ErrorText = styled.p`
  color: red;
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
`;
