import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';

import HomePage from './views/HomePage';

function App() {
    return (
        <Router>
            <div className="App">
                <Route exact path="/">
                    <HomePage />
                </Route>
            </div>
        </Router>
    );
};

export default App;
