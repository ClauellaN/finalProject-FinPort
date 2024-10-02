
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PaymentForm from "../components/PaymentForm";
import ClientLayout from "../components/ClientLayout"; // Import your layout component

const PaymentPage = () => {
  const { clientId } = useParams(); // Get client ID from URL params
  const navigate = useNavigate();
  
  const [client, setClient] = useState(null);

  // Fetch the client data by ID
  const fetchClientById = async (clientId) => {
    try {
      const response = await fetch(`/getclient/${clientId}`);
      const data = await response.json();
      if (response.ok) {
        setClient(data);
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error fetching client:", error);
    }
  };

  useEffect(() => {
    fetchClientById(clientId); // Fetch the client data when the page loads
  }, [clientId]);

  if (!client) {
    return <p>Loading client data...</p>; // Handle loading state
  }

  // Handlers for account actions
  const handlePayment = () => {
    if (client && client._id) {
      navigate(`/payment/${client._id}`); // Navigate to payment
    }
  };

  const handleAccountActivity = () => {
    navigate(`/activity/${clientId}`); // Navigate to activity page
  };

  const handleCloseAccount = () => {
    navigate(`/closeaccount/${clientId}`); // Navigate to close account page
  };

  return (
    <ClientLayout
      client={client}
      handlePayment={handlePayment}
      handleAccountActivity={handleAccountActivity}
      handleCloseAccount={handleCloseAccount}
    >
      <ClientFormContainer>
        {/* Pass clientId and other client details to PaymentForm */}
        <PaymentForm
          clientId={clientId}
          fname={client.fname}
          lname={client.lname}
          onClose={() => navigate(`/manage`)} // Optional close handler
        />
      </ClientFormContainer>
    </ClientLayout>
  );
};

export default PaymentPage;

const ClientFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  border: 2px solid #ddd;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
`;
