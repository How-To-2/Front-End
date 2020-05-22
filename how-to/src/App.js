import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';

import { ArticleContext } from './contexts/ArticleContext';
import { UserContext } from './contexts/UserContext';

import HomePage from './views/HomePage';
import LoginPage from './views/LoginPage';
<<<<<<< HEAD
import SignupPage from './views/SignupPage';
=======

import './App.css';
>>>>>>> c2740826efe2ab4a2276593ea1d70660750e3683

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
<<<<<<< HEAD
                <Route exact path="/login">
                    <LoginPage />
                </Route>
                <Route exact path="/signup">
                    <SignupPage />
                </Route>
=======
                <Route path="/login">
                    <LoginPage />
                </Route>
>>>>>>> c2740826efe2ab4a2276593ea1d70660750e3683
            </div>
        </Router>
        </UserContext.Provider>
        </ArticleContext.Provider>
    );
};

export default App;
