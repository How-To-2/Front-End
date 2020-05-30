import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";


const UserList = props => {

	const [Users, setUsers] = useState([]);

	useEffect(() => {
		axios.get('https://how-to-api-2.herokuapp.com/api/users')
		.then(function (response) {
      setUsers(response.data);
      console.log(response);
    })
		.catch(err => console.log('Get request failed', err))
    }, [])
    useEffect(() => {
        console.log(Users);
      }, [Users]);

	return (
		<ol>
			{Users.map((data, i) => (
	            <UserCard data={data} key={i}/>
	        ))}
	    </ol>
        
    )


}

export default UserList;
