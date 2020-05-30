import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import axiosWithAuth from '../../utils/axiosWithAuth';
import { AppContext } from '../../contexts/AppContext';

const MinePage = props => {

    const context = useContext(AppContext);
    const articles = context.articles.filter(a => a.Author_id === parseInt(localStorage.getItem('userid'), 10));
    const [editing, setEditing] = useState(false);
    const [editHowTo, setEditHowTo] = useState({
        Title: '',
        Content: '',
        id: '',
    });

    const deleteArticle = id => {
        axiosWithAuth().delete(`api/entries/${id}`)
            .then(response => {
                console.log(response);
                context.deleteArticle(id);
            })
            .catch(error => console.log(error));
    };

    const editArticle = event => {
        event.preventDefault();
        axiosWithAuth().put(`api/entries/${editHowTo.id}`, {
            Title: editHowTo.Title,
            Content: editHowTo.Content,
        })
            .then(response => {
                console.log(response);
                context.editArticle(editHowTo);
                setEditing(false);
            })
            .catch(error => console.log(error));
    };

    const update = event => {
        setEditHowTo({
            ...editHowTo,
            [event.target.name]:event.target.value
        });
        console.log(editHowTo);
    };    

    return (
        <>
            <Header page='mine' />
            <div>
                {articles.map(a => (
                    <div>
                        <Link to={`/article/${a.id}`}>{a.Title}</Link> - <Link onClick={e => {
                            e.stopPropagation();
                            setEditHowTo({
                                Title: a.Title,
                                Category: a.Category,
                                Content: a.Content,
                                Author_id: a.Author_id,
                                id: a.id,
                            });
                            setEditing(true);
                        }}>edit</Link> <Link onClick={e => {
                            e.stopPropagation();
                            deleteArticle(a.id)
                        }}>delete</Link>
                    </div>
                ))}
            </div>
            {editing ? (
                <div>
                    <hr/>
                    <form onSubmit={editArticle}>
                        <input
                            name="Title"
                            type="text"
                            value={editHowTo.Title}
                            onChange={update}
                        /><br />
                        <textarea
                            name="Content"
                            onChange={update}
                            value={editHowTo.Content}
                        /><br />
                        <button>Confirm</button>
                        <button onClick={e => {
                            e.preventDefault();
                            setEditing(false);
                        }}>Cancel</button>
                    </form>
                </div>
            ) : (<div></div>)}
        </>
    )

}

export default MinePage; 