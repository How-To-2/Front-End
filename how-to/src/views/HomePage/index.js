import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

import { AppContext } from '../../contexts/AppContext';

const HomePage = props => {

    const context = useContext(AppContext);

    return (
        <>
            <Header page='home' />
            <div>
                {context.articles.map(a => <div><Link to={`/article/${a.id}`}>{a.Title}</Link></div>)}
            </div>
        </>
    )

}

export default HomePage; 