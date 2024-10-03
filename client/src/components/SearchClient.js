import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import HeroImage from "../pages/assets/details.JPG";
import { Loading } from "./LoadingSpiner";

// Functioon to search a client and when a client is found, it displays the the clients details.
const SearchClient = () => {
  const { clientId } = useParams(); // Getting the clientId from the URL
  const [client, setClient] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch client data when the component mounts using the clientId from the URL
  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await fetch(`/getclient/${clientId}`);
        const data = await response.json();

        if (response.ok) {
          setClient(data);
          setError(""); // Clear any previous errors
        } else {
          setError("Client data not found."); // Handle client not found case
        }
      } catch (error) {
        setError("An error occurred while fetching the client data.");
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchClientData();
  }, [clientId]); // Run effect whenever clientId changes

  // Function to navigate to the manage-account page / ClientLayout Page
  const handleManageAccount = () => {
    // If it is the client and the correct clientId, we're navigating to a different route
    if (client && client._id) {
      navigate(`/manage-account/${client._id}`);
    }
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <FormContainer>
      {error && <ErrorText>{error}</ErrorText>}{" "}
      {/* Show error if client not found */}
      {client && (
        <>
          {/* Hero image as background */}
          <HeroContainer>
            <Hero src={HeroImage} alt="Account Details" />
            {/* <Title>Account Details</Title> */}
          </HeroContainer>

          <ClientInfo>
            <p>
              <strong>Client Name:</strong> {client.fname} {client.lname}
            </p>
            <p>
              <strong>Phone:</strong> {client.phone}
            </p>
            <p>
              <strong>Address:</strong> {client.address}
            </p>
            <p>
              <strong>Balance:</strong> ${Number(client.balance).toFixed(2)}
            </p>
            <p>
              <strong>Item Purchased:</strong> {client.item}
            </p>
          </ClientInfo>

          {/* Button to manage account, leading to ClientLayout */}
          <ButtonContainer>
            <StyledButton onClick={handleManageAccount}>
              Click to Manage Account
            </StyledButton>
          </ButtonContainer>
        </>
      )}
    </FormContainer>
  );
};

export default SearchClient;

// Styled components for the SearchClient form
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-family: Arial, sans-serif;
  position: relative;
`;

const HeroContainer = styled.div`
  position: relative;
  width: 90%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Hero = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const Title = styled.h1`
  position: absolute;
  color: white;
  font-size: 2.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  z-index: 1;
`;

const ClientInfo = styled.div`
  text-align: center;
  margin-top: 20px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid purple;
  width: 60%;
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
  margin-top: 20px;

  &:hover {
    background-color: #4b0082;
  }

  &:focus {
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const ErrorText = styled.p`
  color: red;
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
`;
