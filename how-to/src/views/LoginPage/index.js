import React from "react";
import Header from '../../components/Header';
import LoginForm from "../../components/LoginForm";

const LoginPage = props => {

    return (
        <>
            <Header page="login" />
            <LoginForm />
        </>
    )

}

export default LoginPage; 