import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterWrapper>
      {/* <p>© 2024 Financing Portal. All rights reserved.</p> */}
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  font-family: arial;
  color: black;
  text-align: center;
  padding: 10px 0;

`;

