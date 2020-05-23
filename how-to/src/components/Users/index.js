import React, { useState, useEffect } from "react";
import axios from "axios";


const UserList = props => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const getUsers = () => {
      axios.get('http://dummy.restapiexample.com/api/v1/employees', {
        params: {
          ID: 1
        }
      })
      .then(function (response) {
        console.log(response);
      });
    }
    
    getUsers();
  }, []);

  return (
    <div className="user-list">
      {users.map(user => (
        <UserDetails key={user.id} user={user} />
      ))}
    </div>
  );
}

function UserDetails({ user }) {
  const { employee_name, employee_salary, employee_age } = user;
  return (
    <div className="user-card">
        <h2>{employee_name}</h2>
      <div className="salary">
        Salary: <em>{employee_salary}</em>
      </div>
      <div className="age">
        Age: <strong>{employee_age}</strong>
      </div>
    </div>
  );
}
  
  export default UserList;