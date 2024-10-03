// export default PaymentForm;
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

const PaymentForm = ({ clientId, fname, lname, onClose }) => {
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardName, setCardName] = useState(`${fname} ${lname}`);
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [balance, setBalance] = useState(null);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle payment form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setLoading(true); // Start the loading spinner when the form is submitted
  
    const paymentData = {
      paymentAmount: Number(paymentAmount),
      method: paymentMethod,
      cardDetails: {
        cardName,
        cardNumber,
        expDate,
        cvv,
      },
      clientId, // Use the clientId prop directly
    };
  
    try {
      // First, make the payment
      const response = await fetch("/make-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });
  
      if (response.ok) {
        setConfirmationMessage("Payment Received!");
  
        // Now, fetch the remaining balance
        const balanceResponse = await fetch(`/balance/${clientId}`, {
          method: "GET",
        });
        const balanceData = await balanceResponse.json();
  
        if (balanceResponse.ok) {
          setBalance(balanceData.balance);
        } else {
          setConfirmationMessage(
            balanceData.message || "Unable to fetch balance"
          );
        }
        // Set paymentComplete to true to hide the form and show the confirmation message
        setPaymentComplete(true);
      } else {
        const errorData = await response.json();
        setConfirmationMessage(`Failed to apply payment: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error applying payment:", error);
      setConfirmationMessage("An error occurred, please try again.");
    } finally {
      setLoading(false); // Stop the loading spinner after the request is done
    }
  };
  

  // Function to handle "Back" navigation to the clients account details route
  const handleBack = () => {
    navigate(`/account-details/${clientId}`);
  };

  return (
    <Wrapper>
      <PaymentFormContainer>
        {!paymentComplete ? (
          <PaymentFormStyled onSubmit={handleSubmit}>
            <Label>Payment Amount:</Label>
            <StyledInput
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />

            <Label>Method of Payment:</Label>
            <StyledSelect
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="credit-card">Credit Card</option>
              <option value="visa">Visa</option>
              <option value="cash">Cash</option>
            </StyledSelect>

            {paymentMethod !== "cash" && (
              <>
                <Label>Card Name:</Label>
                <StyledInput
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="Name on card"
                  required
                />

                <Label>Card Number:</Label>
                <StyledInput
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="Card number"
                  required
                />

                <Label>Expiration Date:</Label>
                <StyledInput
                  type="text"
                  value={expDate}
                  onChange={(e) => setExpDate(e.target.value)}
                  placeholder="MM/YY"
                  required
                />

                <Label>CVV:</Label>
                <StyledInput
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="CVV"
                  required
                />
              </>
            )}

            <ButtonContainer>
              {/* Disable the submit button and show loading spinner while loading */}
              <StyledButton type="submit" disabled={loading}>
                {loading ? "Processing..." : "Submit Payment"}
              </StyledButton>
              <StyledButton type="button" onClick={onClose} disabled={loading}>
                Cancel
              </StyledButton>
            </ButtonContainer>
          </PaymentFormStyled>
        ) : (
          // else display the payment received confirmation message as well as the remaining balancde
          <ConfirmationContainer>
            {confirmationMessage && (
              <>
                <ConfirmationMessage>{confirmationMessage}</ConfirmationMessage>
                {balance !== null && (
                  <BalanceInfo>
                    <p>
                      <strong>Remaining Balance:</strong> ${balance}
                    </p>
                  </BalanceInfo>
                )}
                <StyledButton type="button" onClick={handleBack}>
                  Close
                </StyledButton>
              </>
            )}
          </ConfirmationContainer>
        )}
      </PaymentFormContainer>
    </Wrapper>
  );
};

export default PaymentForm;

// Styled components for PaymentForm
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.05);
  font-family: Arial, sans-serif;
`;

const PaymentFormContainer = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
`;

const PaymentFormStyled = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-top: 10px;
  font-size: 1rem;
`;

const StyledInput = styled.input`
  padding: 10px;
  width: 100%;
  border: 2px solid purple;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 15px;

  &:focus {
    outline: none;
    border-color: purple;
  }
`;

const StyledSelect = styled.select`
  padding: 10px;
  width: 100%;
  border: 2px solid purple;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 15px;

  &:focus {
    outline: none;
    border-color: purple;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  color: white;
  font-weight: bold;
  padding: 12px 24px;
  font-size: 1rem;
  background-color: purple;
  border: 2px solid purple;
  border-radius: 5px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #4b0082;
  }

  &:focus {
    outline: none;
  }
`;

const ConfirmationContainer = styled.div`
  text-align: center;
`;

const ConfirmationMessage = styled.p`
  margin-top: 20px;
  padding: 10px;
  background-color: lightgreen;
  border-radius: 5px;
  color: green;
  font-weight: bold;
`;

const BalanceInfo = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 10px;
  background-color: lightgrey;
  border-radius: 5px;
  text-align: center;
  color: purple;
  font-weight: bold;
`;
