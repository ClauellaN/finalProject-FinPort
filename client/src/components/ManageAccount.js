import React, { useState } from "react";
import styled from "styled-components";
import AddClient from "./AddClient";
import { useNavigate } from "react-router-dom";
import heroImage from "../pages/assets/hero.JPG";
import { Loading } from "./LoadingSpiner";

const Manage = () => {
  const [activeTab, setActiveTab] = useState("search"); // State to control active tab
  const [fullName, setFullName] = useState(""); // Input for searching client
  const [error, setError] = useState(""); // State for storing error messages
  const [loading, setLoading] = useState(false); // Loading state for the spinner
  const navigate = useNavigate();

  // Function to handle the account search by first and last name
  const handleSearch = async () => {
    const [fname, lname] = fullName.split(" ");

    // Validate that both first and last names are provided
    if (!fname || !lname || !isNaN(fname) || !isNaN(lname)) {
      setError("Please enter a valid first and last name.");
      return;
    }
    // removing error messages and loading state to true before making the request
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`/getclient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fname, lname }),
      });

      const data = await response.json();

      // If the response is successful, navigate to the client's account details page
      if (response.ok) {
        setError("");
        // Navigate with client ID in the URL
        navigate(`/account-details/${data._id}`);
      } else {
        setError("Client not found. Please try again.");
      }
    } catch (error) {
      console.log("Something went wrong, please try again later.");
      setError("An error occurred. Please try again later.");
    } finally {
      // Stop the loading spinner after the request is done
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <HeroSection>
        <HeroText>Manage Your Clients Efficiently with FinPort</HeroText>
      </HeroSection>
      <Wrapper>
        {/* Tab navigation */}
        <TabContainer>
          <TabButton
            isActive={activeTab === "search"}
            onClick={() => setActiveTab("search")}
          >
            Search Existing Client
          </TabButton>
          <TabButton
            isActive={activeTab === "add"}
            onClick={() => setActiveTab("add")}
          >
            Add a new client
          </TabButton>
        </TabContainer>

        {/* Render the appropriate component based on the active tab */}
        <ContentContainer>
          {activeTab === "search" ? (
            <>
              <StyledInput
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
              />
              {/* Show loading spinner or retrieve button based on the loading state */}
              {loading ? (
                <Loading /> // Show loading spinner while fetching
              ) : (
                <StyledButton onClick={handleSearch}>Retrieve</StyledButton>
              )}
              {/* Render error message if there's an error */}
              {error && <ErrorMessage>{error}</ErrorMessage>}
            </>
          ) : (
            <AddClient />
          )}
        </ContentContainer>
      </Wrapper>
    </FormContainer>
  );
};

export default Manage;

// Styled components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  color: #333;
  font-family: Arial, sans-serif;
  font-size: 1.2rem;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const TabButton = styled.button`
  color: ${({ isActive }) => (isActive ? "white" : "black")};
  background-color: ${({ isActive }) => (isActive ? "purple" : "white")};
  border: 2px solid purple;
  border-radius: 5px;
  padding: 12px 24px;
  font-size: 1rem;
  cursor: pointer;
  margin: 0 10px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ isActive }) => (isActive ? "#4b0082" : "#f0f0f0")};
  }

  &:focus {
    outline: none;
  }
`;
const ContentContainer = styled.div`
  width: 100%;
  max-width: 800px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-family: Arial, sans-serif;
  margin-top: 50px;
`;

// Hero Section with background image
const HeroSection = styled.div`
  width: 90%;
  height: 200px;
  background-image: url(${heroImage});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeroText = styled.h1`
  color: purple;
  font-size: 2.5rem;
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
  margin-left: 10px; /* Space between input and button */
  margin-top: 20px;

  &:hover {
    background-color: #4b0082;
  }

  &:focus {
    outline: none;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
  font-size: 1.2rem;
`;
