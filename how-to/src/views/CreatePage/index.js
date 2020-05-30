import React from "react";

import Header from '../../components/Header';
import CreateHowTo from '../../components/CreateHowTo';

const HomePage = props => {

    return (
        <>
            <Header page='create' />
            <CreateHowTo />
        </>
    )

}

export default HomePage; 