import React from 'react';
import RegisterCom from "../../common/RegisterCom.jsx";
import LogInCom from "../../common/LogInCom.jsx";
import LogOutCom from "../../common/LogOutCom.jsx";
import { FaUser,FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import styled from "styled-components";

const Register = () => {
    return (
        <div className="register">
            <div className="form-flex">
                <div className="label-flex">
                    <StyledIcon as={PersonAddIcon} />
                    <p>Register</p>
                </div>

                <RegisterCom/>
            </div>
            <div className="form-flex">
                <div className="label-flex">
                    <StyledIcon as={FaSignInAlt}/>
                    <p>Login</p>
                </div>

                <LogInCom/>
            </div>
            {/*<LogOutCom/>*/}
        </div>
    );
};
const StyledIcon = styled.div`
    color: ${({theme}) => theme.stats};
    font-size: 20px;
    margin-right: 5px;
    cursor: pointer;
    &:hover {
        border-color: ${({ theme }) => theme.text};
    }
`;
export default Register;