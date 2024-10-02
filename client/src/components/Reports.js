import React, { useState, useEffect } from "react";
import styled from "styled-components";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Report = () => {
  const [clients, setClients] = useState([]);
  const [payments, setPayments] = useState([]);
  const [accountClosures, setAccountClosures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showClients, setShowClients] = useState(false);
  const [showPayments, setShowPayments] = useState(false);
  const [showClosures, setShowClosures] = useState(false);
  const [showDownloadButton, setShowDownloadButton] = useState(false); // New state for download button

  // Fetch clients
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("/allclients");
        if (!response.ok) {
          throw new Error("Failed to fetch clients.");
        }
        const data = await response.json();
        setClients(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  // Fetch payments
  const fetchPayments = async () => {
    setLoading(true);
    try {
      const response = await fetch("/allpayments");
      if (!response.ok) {
        throw new Error("Failed to fetch payments.");
      }
      const data = await response.json();
      setPayments(data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Fetch account closures
  const fetchClosures = async () => {
    setLoading(true);
    try {
      const response = await fetch("/allclosures");
      if (!response.ok) {
        throw new Error("Failed to fetch account closures.");
      }
      const data = await response.json();
      setAccountClosures(data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // PDF download function
  const downloadPDF = () => {
    const input = document.getElementById("report-content");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10);
      pdf.save("report.pdf");
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Header>Reporting</Header>

      {/* Flex container for the buttons */}
      <ButtonContainer>
        <AllClientsButton
          onClick={() => {
            setShowClients(true);
            setShowPayments(false);
            setShowClosures(false);
            setShowDownloadButton(true); // Show download button
          }}
        >
          All Clients
        </AllClientsButton>

        <AllClientsButton
          onClick={() => {
            setShowPayments(true);
            setShowClients(false);
            setShowClosures(false);
            setShowDownloadButton(true); // Show download button
            if (!payments.length) {
              fetchPayments();
            }
          }}
        >
          All Payments
        </AllClientsButton>

        <AllClientsButton
          onClick={() => {
            setShowClosures(true);
            setShowClients(false);
            setShowPayments(false);
            setShowDownloadButton(true); // Show download button
            if (!accountClosures.length) {
              fetchClosures();
            }
          }}
        >
          All Accounts Closed
        </AllClientsButton>
      </ButtonContainer>

      <ReportContainer id="report-content">
        {/* Clients */}
        {showClients && (
          <div>
            {clients.map((client, index) => (
              <ClientListItem key={index}>
                <ClientName>Name: {client.fullName}</ClientName>
                <ClientDeets>
                  Balance Left: ${Number(client.balance).toFixed(2)}
                </ClientDeets>
              </ClientListItem>
            ))}
          </div>
        )}

        {/* Payments */}
        {showPayments && (
          <div>
            {payments.map((payment, index) => (
              <ClientListItem key={index}>
                <ClientName>
                  {payment.details?.cardDetails?.cardName || "Unknown Client"}
                </ClientName>
                <ClientDeets>
                  Payment Amount: $
                  {Number(payment.details?.paymentAmount).toFixed(2)}
                </ClientDeets>
                <ClientDeets>
                  Method: {payment.details?.method || "N/A"}
                </ClientDeets>
                <ClientDeets>
                  Date:{" "}
                  {payment.timestamp
                    ? new Date(payment.timestamp).toLocaleString()
                    : "N/A"}
                </ClientDeets>
              </ClientListItem>
            ))}
          </div>
        )}

        {/* Account Closures */}
        {showClosures && (
          <div>
            {accountClosures.map((closure, index) => (
              <ClientListItem key={index}>
                <ClientName>
                  {closure.details.fname} {closure.details.lname}
                </ClientName>
                <ClientDeets>
                  Item Purchased: {closure.details.item}
                </ClientDeets>
                <ClientDeets>
                  Balance at Closure: $
                  {Number(closure.details.balanceAtClosure).toFixed(2)}
                </ClientDeets>
                <ClientDeets>
                  Closure Date: {new Date(closure.timestamp).toLocaleString()}
                </ClientDeets>
              </ClientListItem>
            ))}
          </div>
        )}
      </ReportContainer>
            {/* Conditionally render the Download button */}
            {showDownloadButton && (
        <DownloadButton onClick={downloadPDF}>
          Download Report as PDF
        </DownloadButton>
      )}
    </div>
  );
};

export default Report;

// Styled-components for list items
const ClientListItem = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  font-family: Arial, sans-serif;
`;

const ClientName = styled.div`
  font-weight: bold;
  font-family: Arial, sans-serif;
  font-size: 1.2rem;
`;

const ClientDeets = styled.div`
  margin-top: 5px;
  font-size: 1rem;
  color: #333;
`;

const Header = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  font-family: Arial, sans-serif;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const AllClientsButton = styled.button`
  padding: 15px;
  background-color: purple;
  color: white;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  flex: 1;

  &:hover {
    background-color: #444;
  }
`;

const DownloadButton = styled.button`
  padding: 10px 20px;
  background-color: lightgrey;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  margin: 10px auto;
  display: block;

  &:hover {
    background-color: darkgrey;
  }
`;

const ReportContainer = styled.div`
  padding: 20px;
`;
