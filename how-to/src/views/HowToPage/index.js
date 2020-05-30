import React from "react";
import Header from '../../components/Header';
import HowTo from '../../components/HowTo';

const HomePage = props => {

    return (
        <>
            <Header />
            <HowTo id={props.match.params.id} />
        </>
    )

}

export default HomePage; 