import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../pages/assets/logo-fin.png";
import bgImage from "../pages/assets/BG.JPG";

const LandingPage = () => {
  return (
    <HomeContainer>
      <Logo src={logo} alt="FinPort Logo" />
      <ContentWrapper>
        <Title>Welcome to FinPort!</Title>
        <Description>
          Your go-to financing portal, designed to effortlessly manage clients
          who choose to finance their purchases in your store. Simplify the way
          you handle financing and keep your business running smoothly with
          FinPort.
        </Description>
        <StyledLink to="/register">
          <Button>Click here to start</Button>
        </StyledLink>
      </ContentWrapper>
    </HomeContainer>
  );
};
export default LandingPage;

// Styled components
const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  font-family: "Arial", sans-serif;
  position: relative;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  padding: 20px;
  background-color: lightwhite;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 15px;
    max-width: 90%;
  }
`;

const Logo = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
  height: 90px;

  @media (max-width: 480px) {
    height: 70px;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const Description = styled.p`
  font-size: 1.3rem;
  color: #34495e;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Button = styled.button`
  font-family: "Arial", sans-serif;
  background-color: rgba(255, 255, 255, 0.1);
  font-weight: bold;
  font-size: 1.5rem;
  color: black;
  padding: 12px 24px;
  border: 2px solid purple;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    background-color: purple;
    color: white;
    cursor: pointer;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 10px 16px;
  }
`;
