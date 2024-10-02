
import styled from "styled-components";
import { Link } from "react-router-dom";

// Import your images here
import CreateAccountImage from "../pages/assets/create.JPG"; 
import ApplyPaymentImage from "../pages/assets/apply-payment.JPG"; 
import CheckAccountImage from "../pages/assets/activity.JPG"; 
import CloseAccountImage from "../pages/assets/close.JPG"; 
import RetrieveImage from "../pages/assets/report.JPG"; 

const HomePage = () => {
  const handleRetrieveAccount = () => {
    console.log("Retrieve account clicked");
  };

  return (
    <Container>
      <Title>FinPort allows you to:</Title>
      <ActionList>
        <ActionItem>
          <ActionTitle>Create a new account</ActionTitle>
          <ActionImage src={CreateAccountImage} alt="Create a new account" />
        </ActionItem>
        <ActionItem>
          <ActionTitle>Apply Payments</ActionTitle>
          <ActionImage src={ApplyPaymentImage} alt="Apply a payment" />
        </ActionItem>
        <ActionItem>
          <ActionTitle>Check account balance</ActionTitle>
          <ActionImage src={CheckAccountImage} alt="Check balance" />
        </ActionItem>
        <ActionItem>
          <ActionTitle>Retrieve Reports</ActionTitle>
          <ActionImage src={RetrieveImage} alt="Retrieve Report" />
        </ActionItem>
        <ActionItem>
          <ActionTitle>Close an Account</ActionTitle>
          <ActionImage src={CloseAccountImage} alt="Close account" />
        </ActionItem>
      </ActionList>
      <ButtonContainer>
        <Link to="/manage">
          <RetrieveButton onClick={handleRetrieveAccount}>
            Click here to start
          </RetrieveButton>
        </Link>
      </ButtonContainer>
    </Container>
  );
};

export default HomePage;

// Styled components with animations
const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  color: purple;
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 65px;
  // text-shadow: 2px 2px 4px rgb(110,51,147);
`;

const ActionList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px 0;
`;

const ActionItem = styled.div`
  background-color: #f4f4f9;
  border-radius: 10%;
  padding: 20px;
  text-align: center;
  flex: 1;
  max-width: 250px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ActionTitle = styled.h3`
  margin: 0;
  color: #2c3e50;
  font-size: 1.2rem;
`;

const ActionImage = styled.img`
  margin-top: 15px;
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const RetrieveButton = styled.button`
  padding: 15px 30px;
  font-size: 1.2rem;
  color: white;
  margin-top: 40px;
  background-color: purple;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #4b0082;
    transform: scale(1.1);
  }
`;