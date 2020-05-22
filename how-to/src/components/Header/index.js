import React from 'react';

import Block from './Block';

const Header = props => {
    
    return (
        <Header.Block>
            <div>HOW TO...</div>
            <nav>nav</nav>
        </Header.Block>
    );

};

export default Header;

Header.Block = Block;