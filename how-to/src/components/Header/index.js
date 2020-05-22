import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import Block from './Block';

const NewButton = styled.button`
background-color: white;
width: 100%;
color: purple;
padding: 10px;
border-radius: 25px;
`
const NewNav = styled.nav`
display: flex;
`

const NewDiv = styled.div`
font-size: 2rem;
color: white;
`

const Header = props => {

    return (
        <Header.Block>
            <NewDiv>HOW TO...</NewDiv>
            <NewNav>
            <Link to="/">
                    <NewButton type="button" className="btn">Home</NewButton>
                </Link>
                <Link to="/signup">
                    <NewButton type="button" className="btn">Sign Up</NewButton>
                </Link>
                <Link to="/login">
                    <NewButton type="button" className="btn">Login</NewButton>
                </Link>
            </NewNav>
        </Header.Block>
    );

};

export default Header;

Header.Block = Block;