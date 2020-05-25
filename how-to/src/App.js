import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';

import { AppContext } from './contexts/AppContext';

import HomePage from './views/HomePage';
import LoginPage from './views/LoginPage';
import SignupPage from './views/SignupPage';
import SignupSuccessPage from "./views/SignupSuccessPage";
import UserPage from './views/UserPage';

function App() {

    const [appState, setAppState] = useState();

    const logInUser = userData => {
        setAppState({
            ...appState,
            loggedInUser: userData
        });
    };

    const logOutUser = userDate => {
        setAppState({
            ...appState,
            loggedInUser: null
        });
    };
    
    return (
        <AppContext.Provider value={{
            appState: appState,
            logInUser: logInUser,
            logOutUser: logOutUser
        }}>
            <Router>
                <div className="App">
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route exact path="/home">
                        <HomePage />
                    </Route>
                    <Route exact path="/login">
                        <LoginPage />
                    </Route>
                    <Route exact path="/signup">
                        <SignupPage />
                    </Route>
                    <Route exact path="/signup/success">
                        <SignupSuccessPage />
                    </Route>
                    <Route exact path="/users">
                        <UserPage />
                    </Route>
                </div>
            </Router>
        </AppContext.Provider>
    );
};


export default App;
