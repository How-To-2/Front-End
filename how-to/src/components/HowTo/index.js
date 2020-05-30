import React, { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

const HowTo = ({id}) => {
    console.log(id);
    const context = useContext(AppContext);
    const article = context.articles.filter(a => a.id === parseInt(id, 10))[0];
    console.log(article);
    return (
        <div>
            <h2>{article.Title ? article.Title : ''}</h2>
            <h3>by: {article.Author ? article.Author : ''}</h3>
            <p>{article.Content ? article.Content : ''}</p>
        </div>
    )
}

export default HowTo;