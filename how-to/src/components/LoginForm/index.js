import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import styled from 'styled-components';

const WrapperForm = styled.form`
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        `
    const CustomLabel = styled.label`
        padding: 1rem;
        display:flex;
        flex-direction:column;
    `
    const NewButton = styled.button`
        background-color: white;
        width: 100%;
        color: purple;
        padding: 10px;
        border-radius: 25px;
`

const Form = yup.object().shape({
  email: yup.string().email().required("Must Be Valid Email"),
  password: yup
    .string()
    .required("Please Enter Password").min(6, "Password is Too Short - Must Be Longer Than 8 Characters.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  notRobot: yup.boolean().oneOf([true])
});

const LoginForm = () => {

  const [formState, setFormState] = useState({
    email: "",
    password: "",
    notRobot: false,
  });
  console.log(formState);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    Form.isValid(formState).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  const [post, setPost] = useState([]);

  useEffect(() => {
    axios
        .post('https://how-to-api-2.herokuapp.com/auth/login', formState)
        .then(res => {
            setPost(res.data)
            console.log(res)
    })
    .catch(err => {
        console.log(err.response)
    });
}, [formState]);

  const formSubmit = e => {
    e.preventDefault();
    console.log('Info Sent');
  };

  console.log(post);

  const [errorState, setErrorState] = useState({
    email: "",
    password: "",
    notRobot: false,
  });

  const validateChange = (e) => {
    yup
      .reach(Form, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrorState({
          ...errorState,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrorState({
          ...errorState,
          [e.target.name]: err.errors[0],
        });
      });
  };

  const inputChange = (e) => {
    e.persist();
    validateChange(e);
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormState({ ...formState, [e.target.name]: value });
  };

  return (

    
    <WrapperForm onSubmit={formSubmit}>
      <CustomLabel htmlFor="email">
        Email
        <input
          type="text"
          name="email"
          value={formState.email}
          onChange={inputChange}
        />
        {errorState.email.length > 0 ? (
          <p className="error">{errorState.email}</p>
        ) : null}
      </CustomLabel>

      <CustomLabel htmlFor="password">
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
      </CustomLabel>
      <CustomLabel htmlFor="notRobot">
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
      </CustomLabel>
      <NewButton disabled={buttonDisabled}>Login</NewButton>
    </WrapperForm>
  );
};

export default LoginForm;
