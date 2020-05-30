import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';

const HowToShort = ({id}) => {

    const context = useContext(AppContext);
    const article = context.articles.filter(a => a.id === id);
    console.log(context, article);

    return (
        <div>
            <Link to={`/article/${article.id}`}>{article.Title}</Link>
        </div>
    )

}

export default HowToShort;