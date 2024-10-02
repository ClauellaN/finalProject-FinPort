
import React, { useState } from "react";
import styled from "styled-components";

const Faq = () => {
  // States to track the visibility of each FAQ section
  const [openSection, setOpenSection] = useState(null);

  // Function to toggle the visibility of a section
  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index); // Toggle section visibility
  };

  return (
    <FaqWrapper>
      <FaqTitle>Frequently Asked Questions</FaqTitle>
      <FaqSubtitle>How to:</FaqSubtitle>
      <FaqList>
        <FaqButton onClick={() => toggleSection(1)}>
          Add a new client
        </FaqButton>
        {openSection === 1 && (
          <FaqDetails>
            <li>Navigate to the <strong>Manage Account</strong> tab.</li>
            <li>Select the option to <strong>add a new client</strong>.</li>
            <li>Fill in the required client details such as name, contact information, and relevant account data.</li>
            <li>Submit the form, and the new client will be added to the system.</li>
          </FaqDetails>
        )}

        <FaqButton onClick={() => toggleSection(2)}>
          Search for a client
        </FaqButton>
        {openSection === 2 && (
          <FaqDetails>
            <li>Use the <strong>search form</strong> located in the <strong>Manage Account</strong> tab.</li>
            <li>You can search by the client’s first and last name.</li>
            <li>Once found, you can view or manage their account by selecting them.</li>
          </FaqDetails>
        )}

        <FaqButton onClick={() => toggleSection(3)}>
          Access the manage-account options
        </FaqButton>
        {openSection === 3 && (
          <FaqDetails>
            <li>Once you’ve retrieved a client, the following options are available:</li>
            <li><strong>Make a Payment</strong>: Process a payment for the client using the payment form.</li>
            <li><strong>Payment History</strong>: View the client’s payment history.</li>
            <li><strong>Close Account</strong>: Initiate the process to close the client’s account.</li>
          </FaqDetails>
        )}

        <FaqButton onClick={() => toggleSection(4)}>
          Make a payment for a client
        </FaqButton>
        {openSection === 4 && (
          <FaqDetails>
            <li>After searching for and selecting a client, click on <strong>Make a Payment</strong>.</li>
            <li>Fill in the required payment details, such as the amount and payment method.</li>
            <li>Submit the payment form to complete the transaction.</li>
            <li>The remaining balance and a confirmation message will be displayed.</li>
          </FaqDetails>
        )}

        <FaqButton onClick={() => toggleSection(5)}>
          Check a client’s payment history
        </FaqButton>
        {openSection === 5 && (
          <FaqDetails>
            <li>From the <strong>Manage Account</strong> tab, select the <strong>Payment History</strong> option after retrieving the client.</li>
            <li>View all payments the client made including the amount, date, and payment method.</li>
            <li>If no payment data is available, a message will appear.</li>
          </FaqDetails>
        )}

        <FaqButton onClick={() => toggleSection(6)}>
          Close a client’s account
        </FaqButton>
        {openSection === 6 && (
          <FaqDetails>
            <li>After selecting a client, click on <strong>Close Account</strong> in the options.</li>
            <li>Confirm the closure by providing a reason and optional feedback in the form.</li>
            <li>Submit the form to finalize the account closure, and a confirmation message will appear.</li>
          </FaqDetails>
        )}
{/* 
        <FaqButton onClick={() => toggleSection(7)}>
          Navigate back to the account page after an action
        </FaqButton>
        {openSection === 7 && (
          <FaqDetails>
            <li>There is a <strong>Back</strong> button available in the payment, activity, and account closure forms.</li>
            <li>Clicking on this button will return you to the client’s account management screen, where you can perform additional actions.</li>
          </FaqDetails>
        )}

        <FaqButton onClick={() => toggleSection(8)}>
          Handle errors when managing a client’s account
        </FaqButton>
        {openSection === 8 && (
          <FaqDetails>
            <li>If an error occurs, a message will appear describing the issue.</li>
            <li>Common errors include inability to retrieve account activity or payment failures.</li>
            <li>The system will automatically return to the account page after a few seconds, allowing you to try again.</li>
          </FaqDetails> */}
        {/* )} */}
      </FaqList>
    </FaqWrapper>
  );
};

export default Faq;

// Styled components
const FaqWrapper = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  line-height: 1.6;
`;

const FaqTitle = styled.h1`
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const FaqSubtitle = styled.h3`
  font-size: 1.5rem;
  color: #555;
  margin-bottom: 15px;
`;

const FaqList = styled.div`
  margin-bottom: 30px;
`;

const FaqButton = styled.button`
  width: 100%;
  text-align: left;
  background-color: #f0f0f0;
  border: 1px solid purple;
  padding: 15px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
  border-radius: 5px;

  &:hover {
    background-color: #ddd;
  }
`;

const FaqDetails = styled.ul`
  padding-left: 20px;
  list-style-type: disc;
  margin-top: 10px;
  margin-bottom: 20px;

  li {
    margin-bottom: 5px;
    color: #666;
  }
`;
