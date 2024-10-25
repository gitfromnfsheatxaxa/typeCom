import React from "react";
import { FaKeyboard, FaCrown, FaInfoCircle, FaCog, FaBell, FaUser } from "react-icons/fa"; // Import icons from react-icons
import styled, {createGlobalStyle} from "styled-components";

const Nav = ({ isFocusedMode }) => {
    return (
        <NavContainer style={{ visibility: isFocusedMode ? 'hidden' : 'visible' }}>
            <NavLeft>
                <Logo>webstertype</Logo>
                <StyledIcon as={FaKeyboard} />
                <StyledIcon as={FaCrown} />
                <StyledIcon as={FaInfoCircle} />
                <StyledIcon as={FaCog} />
            </NavLeft>
            <NavRight>
                <StyledIcon as={FaBell} />
                <StyledIcon as={FaUser} />
            </NavRight>
        </NavContainer>
    );
};

const NavContainer = styled.div`
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
`;

const NavLeft = styled.div`
    display: flex;
    align-items: center;
`;

const NavRight = styled.div`
    display: flex;
    align-items: center;
`;

const Logo = styled.span`
    color: ${({theme}) => theme.stats};
    font-size: 24px;
    font-weight: bold;
    margin-right: 15px;
`;

const StyledIcon = styled.div`
    color: ${({theme}) => theme.stats};
    font-size: 20px;
    margin-right: 15px;
    cursor: pointer;
    &:hover {
        border-color: ${({ theme }) => theme.text};
    }
`;

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.text};
  }
`;

export default Nav;
