import React from "react";
import {FaKeyboard, FaCrown, FaInfoCircle, FaCog, FaBell, FaUser} from "react-icons/fa"; // Import icons from react-icons
import styled from "styled-components";
const Nav = ({isFocusedMode}) => {
    return (
        <Div className="nav-container" style={{visibility: isFocusedMode ? 'hidden' : 'visible'}}>
            <div className="nav-left">
        <Span  className="logo" style={{color: "#2979ff", fontSize: "24px", fontWeight: "bold"}}>
          webstertype
        </Span>
                <FaKeyboard style={{marginRight: "10px", color: "#f5b400", fontSize: "20px"}}/>
                <FaCrown style={{marginRight: "15px", color: "#f5b400", fontSize: "20px"}}/>
                <FaInfoCircle style={{marginRight: "15px", color: "#f5b400", fontSize: "20px"}}/>
                <FaCog style={{marginRight: "15px", color: "#f5b400", fontSize: "20px"}}/>
            </div>
            <DivSign className="nav-right" style={{display: "flex", alignItems: "center"}}>

                <FaBell style={{marginRight: "15px", color: "#f5b400", fontSize: "20px"}}/>
                <FaUser style={{color: "#f5b400", fontSize: "20px"}}/>
            </DivSign>
        </Div>
    );
};
const Div = styled.div`
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;


`
const DivSign = styled.div`
    display: flex;
    align-items: center;
    //gap: 20px;
`
const Span = styled.span`
margin-right: 15px;
`
export default Nav;
