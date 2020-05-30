import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import axiosWithAuth from '../../utils/axiosWithAuth';

const CreateHowTo = props => {

    const context = useContext(AppContext);
    const history = useHistory();
    const [newHowTo, setNewHowTo] = useState({
        Users_id: localStorage.getItem('userid'),
        Title: '',
        Category: 'DIY',
        Content: ''
    });

    const create = event => {
        event.preventDefault();
        axiosWithAuth().post('api/entries', newHowTo)
            .then(response => {
                console.log('response ->', response);
                context.addArticle(response.data);
                history.push('/');
            })
            .catch(error => console.log('error ->', error));
    };

    const update = event => {
        setNewHowTo({
            ...newHowTo,
            [event.target.name]:event.target.value
        });
        console.log(newHowTo);
    };

    return (
        <form onSubmit={create}>
            <input
                name="Title"
                type="text"
                value={newHowTo.Title}
                onChange={update}
            /><br />
            <textarea
                name="Content"
                onChange={update}
            >{newHowTo.Content}</textarea><br />
            <button>Submit</button>
        </form>
    )

}

export default CreateHowTo;