import styled from "styled-components";
import logo from "./assets/logo-fin.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavBarComponent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login"); // Redirect to login page
  };

  return (
    <Navbar>
      <Logo src={logo} alt="FinPort Logo" />
      <NavItem end to="/home">
        HOME
      </NavItem>
      <NavItem end to="/manage">
        MANAGE ACCOUNT
      </NavItem>
      <NavItem end to="/reports">
        REPORTS
      </NavItem>
      <NavItem end to="/faq">
        FAQ
      </NavItem>
      <LogoutButton onClick={handleLogout}>LOG OUT</LogoutButton>
    </Navbar>
  );
};

export default NavBarComponent;

// Container for the entire nav bar
const Navbar = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  background-size: cover;
  background-position: center;
  font-family: arial;
`;
const Logo = styled.img`
  height: 90px;
  margin-right: auto;
`;
// Individual nav items styled as boxes
const NavItem = styled(NavLink)`
  color: black;
  font-weight: bold;
  margin: 0 15px;
  text-decoration: none;
  padding: 10px 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 2px solid purple;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    background-color: purple;
    color: white;
    cursor: pointer;
  }
  @media (max-width: 480px) {
    font-size: 14px;
    padding: 8px 12px;
  }
`;
const LogoutButton = styled.button`
  color: black;
  font-weight: bold;
  margin: 0 15px;
   font-family: arial;
  text-decoration: none;
  padding: 10px 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 2px solid purple;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    background-color: purple;
    color: white;
    cursor: pointer;
  }
  @media (max-width: 480px) {
    font-size: 14px;
    padding: 8px 12px;
  }
`;
