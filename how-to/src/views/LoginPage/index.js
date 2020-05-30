import React from "react";
import Header from '../../components/Header';
import LoginForm from "../../components/LoginForm";
import SignupForm from "../../components/SignupForm";
import styled from 'styled-components';

const SideBySide = styled.div`
    width: 75%;
    padding: 10%;
    display:flex;
    align-items: center;
`;

const LoginPage = props => {

    return (
        <>
            <Header />
            <SideBySide>
                <LoginForm />
                <SignupForm />
            </SideBySide>
        </>
    )

}

export default LoginPage; 