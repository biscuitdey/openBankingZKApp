import styled from "styled-components";
import React, { ReactNode } from "react";
import Image from "next/image"; // Import the Image component from Next.js
import { FaSignInAlt } from "react-icons/fa";

const Sidebar = styled.div`
  width: 200px;
  height: 96vh;
  background-color: #2c69c0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  position: relative; /* Ensure the Sidebar is relative to position the login icon */
`;

const LoginIcon = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  color: #d2e8fb;
  font-size: 24px;
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e6f0ff;
`;

const Container = styled.div`
  display: flex;
`;

const NavLink = styled.a`
  color: #d2e8fb;
  margin: 20px 0; // Increase margin to move text downwards by 2 points
  cursor: pointer;
  text-decoration: none;
  font-size: 20px; // Increase font size by 2 points
  font-family: "Prata", serif; // Apply Prata font

  &:hover {
    text-decoration: underline;
  }
`;

const LogoContainer = styled.div`
  width: 150px;
  height: 150px;
  margin-bottom: 30px;
  position: relative;
`;

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <Sidebar>
        <LogoContainer>
          <Image
            src="/logo.png"
            alt="Defii Logo"
            layout="fill"
            objectFit="contain"
          />
        </LogoContainer>

        <NavLink>Home</NavLink>
        <NavLink>Verify Proof</NavLink>
        <NavLink>Stored Proof</NavLink>
        <LoginIcon>
          <FaSignInAlt />
        </LoginIcon>
      </Sidebar>
      <Main>{children}</Main>
    </Container>
  );
};

export default Layout;
