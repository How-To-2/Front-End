import React from 'react';

import Block from './Block';
import Title from './Title';

import Navigation from '../Navigation';


const Header = ({page}) => {

    return (
        <Header.Block>
            <Header.Title>HOW TO...</Header.Title>
            <Navigation>
                <Navigation.Link to="/" active={page === 'home' ? true : false}>HOME</Navigation.Link>
                <Navigation.Link to="/mine" active={page === 'mine' ? true : false}>MINE</Navigation.Link>
                <Navigation.Link to="/create" active={page === 'create' ? true : false}>CREATE</Navigation.Link>
                <Navigation.Link to="/users" active={page === 'users' ? true : false}>USERS</Navigation.Link>
                {
                    localStorage.getItem('token')
                        ? <Navigation.Link to="/logout">LOGOUT</Navigation.Link> 
                        : <Navigation.Link to="/login" active={page === 'login' ? true : false}>LOGIN</Navigation.Link>
                }
            </Navigation>
        </Header.Block>
    );

};

export default Header;

Header.Block = Block;
Header.Title = Title;