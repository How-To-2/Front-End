import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';

import { ArticleContext } from './contexts/ArticleContext';
import { UserContext } from './contexts/UserContext';

import HomePage from './views/HomePage';
import LoginPage from './views/LoginPage';
import SignupPage from './views/SignupPage';

function App() {

    const [articles, setArticles] = useState([]);
    const [user, setUser] = useState(null);
    
    return (
        <ArticleContext.Provider value={articles}>
        <UserContext.Provider value={user}>
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
        </UserContext.Provider>
        </ArticleContext.Provider>
    );
};


export default App;
