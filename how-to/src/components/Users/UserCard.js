import React from "react";
import UserList from "./index";
import styled from "styled-components";

const Names = styled.h3 `
  color: #333388;
  font-size: 2rem;
`;

const Details = styled.p `
  color: black;
  font-size: 1.7rem;
`;
const List = styled.li`
    align-items:center;
`;
const WrapperDiv = styled.div`
font-size: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const UserCard = props => {
  return (
      <WrapperDiv>
    <li className="user-card" key={props.id}>
        <Names>Name: {props.data.Username}</Names>
        <Details>Account: {props.data.Account}</Details>
        <Details>Email: {props.data.Email}</Details>
        <Details>Joined: {props.data.Joined}</Details>      
    </li>
    </WrapperDiv>
  );
};

export default UserCard;