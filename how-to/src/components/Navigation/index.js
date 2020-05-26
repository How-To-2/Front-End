import React, { useState, useContext } from 'react';

import Block from './Block';
import Link from './Link';

const Navigation = ({children}) => {
    return (
        <Navigation.Block>
            {children}
        </Navigation.Block>
    );
};

export default Navigation;

Navigation.Block = Block;
Navigation.Link = Link;