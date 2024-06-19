import styled from "styled-components";
import React, { ReactNode } from "react";
import Image from "next/image"; // Import the Image component from Next.js
import { FaSignInAlt, FaHome, FaCheck, FaLock } from "react-icons/fa";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Sidebar = styled.div`
  width: 260px; // Increase the width for a more spacious design
  height: 92vh;
  background-color: #1c3b72; // Use a different color for a fresh look
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px 20px; // Increase the padding for a more spacious design
  position: relative;
  box-shadow: 3px 0 15px rgba(0, 0, 0, 0.2); // Use a darker box-shadow for more depth
`;

const LogoContainer = styled.div`
  width: 190px; /* Reduced size for better proportion */
  height: 190px;
  margin-bottom: 40px; /* Slightly reduced margin */
  margin-top: -20px;
  position: relative;
  margin-left: 20px;
`;

const IconWrapper = styled.span`
  margin-right: 15px; /* Adjust icon margin */
  display: flex;
  align-items: center; /* Center icons vertically */
`;

const NavLink = styled.a`
  color: rgba(234, 247, 255, 0.85); // Use a lighter color for better contrast
  margin: 20px 0; // Increase the margin for a more spacious design
  cursor: pointer;
  text-decoration: none;
  font-size: 20px; // Increase the font size for better readability
  font-family: "Prata", serif; // Apply Prata font
  transition: all 0.3s ease;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  display: flex; // Use flex to align items horizontally
  align-items: center; // Center items vertically

  &:hover {
    color: #ffffff;
    text-decoration: underline;
  }
`;

const LoginIcon = styled.div`
  position: absolute;
  bottom: 30px;
  right: 20%;
  transform: translateX(-50%);
  color: #d2e8fb; /* Adjusted icon color */
  font-size: 24px; // Increase icon size for better visibility
  cursor: pointer;
  transition: all 0.3s ease; /* Smooth transition on hover */

  &:hover {
    transform: scale(1.2); /* Scale up on hover */
  }
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

        <NavLink>
          <IconWrapper>
            <HomeOutlinedIcon sx={{ fontSize: 30 }} />
          </IconWrapper>
          Home
        </NavLink>
        <NavLink>
          <IconWrapper>
            <CheckOutlinedIcon sx={{ fontSize: 30 }} />
          </IconWrapper>
          Verify Proof
        </NavLink>
        <NavLink>
          <IconWrapper>
            <LockOutlinedIcon sx={{ fontSize: 30 }} />
          </IconWrapper>
          Stored Proof
        </NavLink>

        <LoginIcon>
          <FaSignInAlt />
        </LoginIcon>
      </Sidebar>
      <Main>{children}</Main>
    </Container>
  );
};

export default Layout;
