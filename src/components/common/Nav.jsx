import React from "react";
import { FaKeyboard, FaCrown, FaInfoCircle, FaCog, FaUser,FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import styled, {createGlobalStyle} from "styled-components";
import { Link } from "react-router-dom";
const Nav = ({ isFocusedMode }) => {
    return (
        <NavContainer style={{ visibility: isFocusedMode ? 'hidden' : 'visible' }}>
            <NavLeft>
                <Link className="Link" to="/">
                    <Logo>webstertype</Logo>
                </Link>
                <Link className="Link" to="/leaderboard">
                    <StyledIcon as={FaCrown} />
                </Link>
            </NavLeft>
            <NavRight>
                <Link to="/profile">
                    <StyledIcon as={FaUser} />
                </Link>
                <Link to="/login">
                    <StyledIcon as={FaSignInAlt} />
                </Link>


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
    
    .Link{
        text-decoration: none;
        display: flex;
        align-items: center;
    }
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
    text-decoration: none;
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
