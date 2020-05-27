import React, { useState, useEffect } from "react";
import axios from "axios";


const UserList = props => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios.get('https://how-to-api-2.herokuapp.com/api/auth/users')
    .then(function (response) {
      console.log(response);
    });
  }
  

  return (
    <div className="user-list">
      {users.map(user => (
        <UserDetails key={user.id} user={user} />
      ))}
    </div>
  );
}

function UserDetails({ user }) {
  const { Author, Email, Account } = user;
  return (
    <div className="user-card">
        <h2>{Author}</h2>
      <div className="Email">
        Email: <em>{Email}</em>
      </div>
      <div className="account">
        Account Type: <strong>{Account}</strong>
      </div>
    </div>
  );
}
  
  export default UserList;