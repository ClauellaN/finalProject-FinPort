import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const CloseAccount = ({ clientId, fname, lname, onClose }) => {
  const [reason, setReason] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleAccountClosure = async (e) => {
    e.preventDefault();

    if (!confirmation) {
      setError("Please confirm that you want to close your account.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/account/${clientId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reason, feedback }),
      });

      if (response.ok) {
        setSuccessMessage("Your account has been successfully closed.");
        setTimeout(() => {
          navigate("/manage");
        }, 3000);
      } else {
        const errorData = await response.json();
        setError(
          errorData.message || "There was an issue closing your account."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setError("There was an issue closing your account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      {/* <h2>Close Account</h2> */}
      <p>
      We're sorry to see you go! Please let us know why you're closing your
        account.
      </p>

      <form onSubmit={handleAccountClosure}>
        {/* Select reason for closing */}
        <label htmlFor="reason">Reason for closing:</label>
        <select
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        >
          <option value="">--Select a reason--</option>
          <option value="No longer need the service">
            No longer need the service
          </option>
          <option value="Found a better alternative">
            Found a better alternative
          </option>
          <option value="Issues with the platform">
            Issues with the platform
          </option>
          <option value="Other">Other</option>
        </select>

        {/* Optional feedback field */}
        <label htmlFor="feedback">Additional feedback (optional):</label>
        <textarea
          id="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Tell us more about your experience..."
        />

        {/* Confirmation checkbox */}
        <div>
          <input
            type="checkbox"
            id="confirmation"
            checked={confirmation}
            onChange={(e) => setConfirmation(e.target.checked)}
          />
          <label htmlFor="confirmation">
            I confirm that I want to close my account.
          </label>
        </div>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Closing Account..." : "Close Account"}
        </SubmitButton>
      </form>
    </Container>
  );
};

export default CloseAccount;

// Styled components
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #f1ebf1;
  border-radius: 15px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); /* Subtle shadow */

  h2 {
    text-align: center;
    color: #4b0082; /* Darker purple title */
  }

  label {
    display: block;
    margin-top: 15px;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
  }

  select,
  textarea {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    margin-bottom: 15px;
    font-size: 1rem;
    background-color: #fff;
  }

  input[type="checkbox"] {
    margin-right: 10px;
  }
`;

const SubmitButton = styled.button`
  display: block;
  width: 100%;
  padding: 15px;
  background-color: #d04ed6; /* Soft purple for button */
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #c53dc3;
    transform: translateY(-2px); /* Subtle lift on hover */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); /* Shadow effect */
  }

  &:disabled {
    background-color: #ccc;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
  margin-top: 10px;
`;

const SuccessMessage = styled.p`
  color: green;
  font-weight: bold;
  margin-top: 10px;
`;
