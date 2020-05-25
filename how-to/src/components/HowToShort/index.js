import React, { useContext } from "react";
import { AppContext } from '../../contexts/AppContext';

const HowToShort = ({id}) => {

    const appState = useContext(AppContext);
    const article = appState.articles.filter(a => a.id === id);

    console.log(appState, article);

    return (
        <div></div>
    )

}

export default HowToShort;