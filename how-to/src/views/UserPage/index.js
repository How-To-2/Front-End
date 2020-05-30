import React from "react";
import axios from "axios";
import Header from '../../components/Header';
import UserList from '../../components/Users';
import styled from "styled-components";

const Userh1 = styled.h1 `
  color: #333388;
  font-size: 5rem;
  text-align: center;

`;

const UserPage = props => {

    return (
        <>
        <Header />
        <Userh1>Users</Userh1>
        <p>
        <UserList />
        </p>
        </>
    )

}

export default UserPage; 