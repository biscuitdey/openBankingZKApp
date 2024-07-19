import styled from "styled-components";
import React, { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

const Sidebar = styled.div`
  width: 260px;
  height: 91vh;
  background-color: #1c3b72;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px 20px;
  position: relative;
  box-shadow: 3px 0 15px rgba(0, 0, 0, 0.2);
`;

const LogoContainer = styled.div`
  width: 190px;
  height: 190px;
  margin-bottom: 40px;
  margin-top: -20px;
  position: relative;
  margin-left: 20px;
`;

const IconWrapper = styled.span`
  margin-right: 15px;
  display: flex;
  align-items: center;
`;

const NavLink = styled.a`
  color: rgba(234, 247, 255, 0.85);
  margin: 20px 0;
  cursor: pointer;
  text-decoration: none;
  font-size: 20px;
  font-family: "Prata", serif;
  transition: all 0.3s ease;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;

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
  color: #d2e8fb;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.2);
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
        <Link href="/" passHref>
          <NavLink>
            <IconWrapper>
              <HomeOutlinedIcon sx={{ fontSize: 30 }} />
            </IconWrapper>
            Home
          </NavLink>
        </Link>
        <Link href="/verify-certificate" passHref>
          <NavLink>
            <IconWrapper>
              <CheckOutlinedIcon sx={{ fontSize: 30 }} />
            </IconWrapper>
            Verify Certificate
          </NavLink>
        </Link>
        <Link href="/stored-certificate" passHref>
          <NavLink>
            <IconWrapper>
              <LockOutlinedIcon sx={{ fontSize: 30 }} />
            </IconWrapper>
            Stored Certificate
          </NavLink>
        </Link>
        <LoginIcon>
          <LoginOutlinedIcon />
        </LoginIcon>
      </Sidebar>
      <Main>{children}</Main>
    </Container>
  );
};

export default Layout;
