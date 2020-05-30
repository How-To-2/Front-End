import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import axiosWithAuth from './utils/axiosWithAuth';

import PrivateRoute from './components/PrivateRoute';

import { AppContext } from './contexts/AppContext';

import HomePage from './views/HomePage';
import LoginPage from './views/LoginPage';
import LogoutPage from './views/LogoutPage';
import SignupPage from './views/SignupPage';
import SignupSuccessPage from "./views/SignupSuccessPage";
import UserPage from './views/UserPage';
import CreatePage from './views/CreatePage';
import MinePage from './views/MinePage';

import './App.css';

function App() {

    const [articles, setArticles] = useState([]);

    const logInUser = (userid, token) => {
        //setUserData(userData);
        localStorage.setItem('userid', userid);
        localStorage.setItem('token', token);
    };

    const logOutUser = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        //setUserData(null);
    };

    useEffect(() => {
        axiosWithAuth().get('api/entries')
            .then(response => {
                console.log(response);
                setArticles(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    const addArticle = article => {
        setArticles([...articles, article]);
        console.log(articles);
    };

    const deleteArticle = id => {
        setArticles(articles.filter(a => a.id !== id));
        console.log(articles);
    }

    const editArticle = edit => {
        const editedArticle = articles.filter(a => a.id === edit.id);
        editedArticle.Title = edit.Title;
        editedArticle.Content = edit.Content;
        console.log('editedArticle ->', editedArticle);
        const newArticles = articles.filter(a => a.id !== edit.id);
        console.log(newArticles);
        setArticles([...newArticles, editedArticle]);
        console.log(articles);
    }

    return (
        <AppContext.Provider value={{
            articles: articles,
            logInUser: logInUser,
            logOutUser: logOutUser,
            addArticle: addArticle,
            deleteArticle: deleteArticle,
            editArticle: editArticle,
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
                    <PrivateRoute exact path="/logout">
                        <LogoutPage />
                    </PrivateRoute>
                    <Route exact path="/signup">
                        <SignupPage />
                    </Route>
                    <Route exact path="/signup/success">
                        <SignupSuccessPage />
                    </Route>
                    <Route exact path="/users">
                        <UserPage />
                    </Route>
                    <Route path="/article/:id">

                    </Route>
                    <PrivateRoute path="/create" component={CreatePage} />
                    <PrivateRoute path="/mine" component={MinePage} />
                </div>
            </Router>
        </AppContext.Provider>
    );
};


export default App;
