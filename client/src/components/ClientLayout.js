import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PaymentForm from "./PaymentForm"; // Import your PaymentForm component
import CloseAccount from "./CloseAccount"; // Import your CloseAccount component

const ClientLayout = () => {
  const { clientId } = useParams(); // Get clientId from the URL
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activity, setActivity] = useState([]); // State to store activity data
  const [showPaymentForm, setShowPaymentForm] = useState(false); // State to toggle the payment form
  const [showActivity, setShowActivity] = useState(false); // State to toggle account activity
  const [showCloseAccount, setShowCloseAccount] = useState(false); // State to toggle CloseAccount form

  // Fetch client data based on clientId
  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await fetch(`/getclient/${clientId}`);
        const data = await response.json();

        if (response.ok) {
          setClient(data);
          setError("");
        } else {
          setError("Client data not found.");
        }
      } catch (error) {
        setError("An error occurred while fetching the client data.");
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [clientId]);

  if (loading) {
    return <p>Loading client information...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Toggle the display of the payment form
  const handlePaymentClick = () => {
    setShowPaymentForm(true);
    setShowActivity(false);
    setShowCloseAccount(false);
  };

  // Fetch and show the account activity
  const handleAccountActivityClick = async () => {
    try {
      const response = await fetch(`/activity/${clientId}`);
      const data = await response.json();

      if (response.ok) {
        setActivity(data); // Set the entire activity array
        setShowActivity(true);
        setShowPaymentForm(false);
        setShowCloseAccount(false);
      } else {
        setError("No Activity Found!");
      }
    } catch (error) {
      setError("Error fetching account activity.");
    }
  };

  // Show the close account form
  const handleCloseAccountClick = () => {
    setShowCloseAccount(true);
    setShowActivity(false);
    setShowPaymentForm(false);
  };

  return (
    <Wrapper>
      <Title>Explore Account Options Below:</Title>
      <ButtonContainer>
        <StyledButton onClick={handlePaymentClick}>Make a payment</StyledButton>
        <StyledButton onClick={handleAccountActivityClick}>
          Payment History
        </StyledButton>
        <StyledButton onClick={handleCloseAccountClick}>
          Close Account
        </StyledButton>
      </ButtonContainer>

      <ClientInfo>
        <p>
          <strong>Client:</strong> {client.fname} {client.lname}
        </p>
      </ClientInfo>

      {/* Conditionally render the PaymentForm */}
      {showPaymentForm && (
        <PaymentFormContainer>
          <PaymentForm
            clientId={clientId}
            fname={client.fname}
            lname={client.lname}
            onClose={() => setShowPaymentForm(false)} // Close the payment form when finished
          />
        </PaymentFormContainer>
      )}

      {/* Conditionally render Account Activity */}
      {showActivity && activity.length > 0 ? (
        activity.map((item, index) => (
          <PaymentDetails key={index}>
            {/* Payment Date as the Title */}
            <PaymentDateTitle>
              {" "}
              Date:
              {item.date ? new Date(item.date).toLocaleDateString() : "N/A"}
            </PaymentDateTitle>
            <p>
              <strong>Payment Amount: </strong>${item.paymentAmount || "N/A"}
            </p>
            <p>
              <strong>Payment Method: </strong>
              {item.method || "N/A"}
            </p>
          </PaymentDetails>
        ))
      ) : showActivity && activity.length === 0 ? (
        <p>No payment activity available.</p>
      ) : null}

      {/* Conditionally render the CloseAccount form */}
      {showCloseAccount && (
        <CloseAccountContainer>
          <CloseAccount
            clientId={clientId}
            fname={client.fname}
            lname={client.lname}
            onClose={() => setShowCloseAccount(false)} // Close the close account form when done
          />
        </CloseAccountContainer>
      )}

      {/* Display error message if any */}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Wrapper>
  );
};

export default ClientLayout;

// Styled components (adjusting to handle the title for payment date)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  color: #333;
  font-family: Arial, sans-serif;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #4b0082;
  margin-bottom: 20px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  color: white;
  font-weight: bold;
  padding: 15px 25px;
  font-size: 1rem;
  background-color: purple;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #4b0082;
    transform: translateY(-2px);
  }
`;

const ClientInfo = styled.div`
  background-color: white;
  padding: 15px 20px;
  border-radius: 8px;
  border: 2px solid purple;
  width: 50%;
  margin: 20px 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-size: 1.1rem;
  text-align: center;
`;

const PaymentFormContainer = styled.div`
  margin-top: 20px;
  width: 60%;
  display: flex;
  justify-content: center;
`;

const CloseAccountContainer = styled.div`
  margin-top: 20px;
  width: 60%;
  display: flex;
  justify-content: center;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const PaymentDetails = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 50%;
  text-align: left;
  margin-top: 20px;

  p {
    font-size: 1rem;
    margin-bottom: 10px;
    color: #333;
  }

  p strong {
    color: #2c3e50;
  }
`;

const PaymentDateTitle = styled.h3`
  font-size: 1.25rem;
  color: #4b0082;
  margin-bottom: 10px;
`;
