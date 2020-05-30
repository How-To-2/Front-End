import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import axiosWithAuth from "../../utils/axiosWithAuth";
import { AppContext } from  '../../contexts/AppContext';
import styled from 'styled-components';

const WrapperForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CustomLabel = styled.label`
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;
const NewButton = styled.button`
  background-color: white;
  width: 100%;
  color: purple;
  padding: 10px;
  border-radius: 25px;
`;
const Title = styled.h1`
  font-size: 2rem;
`;
const errorHide =styled.p`
  visibility: hidden;
`


const Form = yup.object().shape({
  email: yup.string().email().required("Must Be Valid Email"),
  password: yup
    .string()
    .required("Please Enter Password")
    .min(6, "Password is Too Short - Must Be Longer Than 6 Characters.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  notRobot: yup.boolean().oneOf([true]),
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

  const appState = useContext(AppContext);
  const history = useHistory();

  const formSubmit = e => {
    e.preventDefault();
    const data = {
      Email: formState.email,
      Password: formState.password
    };
    axiosWithAuth()
      .post('auth/login', data)
      .then(res => {
        console.log(res);
        appState.logInUser(res.data.id, res.data.token);
        history.push('/');
      })
      .catch(err => {
          console.log(err)
      });
  };

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
      <Title>
        Login
      </Title>
      
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
          type="password"
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
          <p className="roboerror">{errorState.notRobot}</p>
        ) : null}
      </CustomLabel>
      <NewButton disabled={buttonDisabled}>Login</NewButton>
    </WrapperForm>
  );
};

export default LoginForm;
