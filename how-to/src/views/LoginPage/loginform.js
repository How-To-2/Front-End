import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

const loginForm = yup.object().shape({
    username: yup.string().required("Please Enter Username"),
    password: yup.string().required("Please Enter Password").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Must Contain 8 Characters, One Number and one special case Character"),
    notRobot: yup.boolean().oneOf([true]),

});

const LogForm = props => {
    const [formState, setFormState] = useState({
        name: "",
        password: "",
        notRobot: ""
    });
    console.log(formState);

    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        formInfo.isValid(formState).then(valid => {
          setButtonDisabled(!valid);
        });
      }, [formState]);

    const [ errorState, setErrorState ] = useState({
        name: "",
        password: "",
        notRobot: ""
    });

    const validateChange = (e) => {
        yup.reach(loginForm, e.target.name).validate(e.target.value).then((valid) => {
            setErrorState({
                ...errorState,
                [e.target.name]: "",
            });
        }).catch((err) => {
            setErrorState({
                ...errorState,
                [e.target.name]: err.errors[0],
            });
        });
    };

    const inputChange = e => {
        e.persist();
        validateChange(e);
        let value =
          e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormState({ ...formState, [e.target.name]: value });
      };

  

    return (
        <form onSubmit={formSubmit}>
            <label htmlFor="name">
                Username
                <input
                type="text"
                name="name"
                value={formState.name}
                onChange={inputChange}
            />
            {errorState.name.length > 0 ? (
          <p className="error">{errorState.name}</p>
        ) : null}
        </label>

        <label htmlFor="password">
            Password
            <input
            type="text"
            name="password"
            value={formState.password}
            onChange={inputChange}
            />
            {errorState.password.length > 0 ? (
          <p className="error">{errorState.password}</p>
        ) : null}
        </label>
        <label htmlFor="notRobot">
            I Am Not A Robot
            <input
            type="checkbox"
            name="notRobot"
            checked={formState.notRobot}
            onChange={inputChange}
            />
            {errorState.notRobot.length > 0 ? (
          <p className="error">{errorState.notRobot}</p>
        ) : null}
        </label>
        <button disabled={buttonDisabled}>Login</button>
        </form>
    );
};

export default loginForm;