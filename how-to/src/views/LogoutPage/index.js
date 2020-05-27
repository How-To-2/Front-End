import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from '../../contexts/AppContext';

const LogoutPage = () => {

    const appState = useContext(AppContext);
    const history = useHistory();

    useEffect(() => {
        appState.logOutUser();
        history.push('/');
    })

    return (
        <div>Logging Out...</div>
    )

}

export default LogoutPage; 