import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';

import HomePage from './views/HomePage';
import LoginPage from './views/LoginPage';
import SignupPage from './views/SignupPage';

function App() {
    return (
        <Router>
            <div className="App">
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route exact path="/login">
                    <LoginPage />
                </Route>
                <Route exact path="/signup">
                    <SignupPage />
                </Route>
            </div>
        </Router>
    );
};

export default App;
