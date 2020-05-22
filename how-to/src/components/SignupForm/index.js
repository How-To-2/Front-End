import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import styled from 'styled-components';

const Form = yup.object().shape({
  name: yup
    .string()
    .required()
    .min(5, "Username is Too Short - Must Be Longer Than 5 Characters."),
  firstName: yup.string().required().min(2, "First Name Is Too Short"),
  lastName: yup.string().required().min(2, "Last Name Is Too Short"),
  email: yup.string().email().required("Must Be Valid Email"),
  emailConfirmation: yup
    .string()
    .oneOf([yup.ref("email"), null], "Emails must match"),
  password: yup
    .string()
    .required("Please Make A Password.")
    .min(6, "Password is Too Short - Must Be Longer Than 8 Characters.")
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  accountType: yup.string(),
  notRobot: yup.boolean().oneOf([true]),
});

const SignupForm = () => {

    const [formState, setFormState] = useState({
        name: "",
        firstName: "",
        lastName: "",
        email: "",
        emailConfirmation: "",
        password: "",
        passwordConfirmation: "",
        accountType: "",
        notRobot: false,
    });
    console.log(formState);

    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        Form.isValid(formState).then((valid) => {
        setButtonDisabled(!valid);
        });
    }, [formState]);

    const [errors, setErrors] = useState({
        name: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        accountType: "",
        notRobot: "",
    });

    const validateChange = (e) => {
        yup
        .reach(Form, e.target.name)
        .validate(e.target.value)
        .then((valid) => {
            setErrors({
            ...errors,
            [e.target.name]: "",
            });
        })
        .catch((err) => {
            setErrors({
            ...errors,
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

    const [post, setPost] = useState([]);
    

    const formSubmit = (e) => {
        e.preventDefault();
        axios
        .post("https://reqres.in/api/users", formState)
        .then((res) => {
            setPost((prevState) => [...prevState, res.data]);
            setFormState({
                name: "",
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                accountType: "",
                notRobot: ""
            });
        })
        .catch((err) => console.log(err.response));
    };
    console.log(post);

    const WrapperDiv = styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        `
    const LabelInput = styled.div`
        padding: 1rem;
        display:flex;
        flex-direction:column;
    `
    return (
        <form onSubmit={formSubmit}>
            <WrapperDiv>
                
        <label htmlFor="name">
        <LabelInput>
            Username
            <input
            type="text"
            name="name"
            value={formState.name}
            onChange={inputChange}
            placeholder="Enter Username."
            />
            {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
            </LabelInput>
        </label>
        
        
        <label htmlFor="firstName">
        <LabelInput>
            First Name
            <input
            type="text"
            name="firstName"
            value={formState.firstName}
            onChange={inputChange}
            placeholder="Enter First Name."
            />
            {errors.firstName.length > 0 ? (
            <p className="error">{errors.firstName}</p>
            ) : null}
            </LabelInput>
        </label>
        
        
        <label htmlFor="lastName">
        <LabelInput>
            Last Name
            <input
            type="text"
            name="lastName"
            value={formState.lastName}
            onChange={inputChange}
            placeholder="Enter Last Name."
            />
            {errors.lastName.length > 0 ? (
            <p className="error">{errors.lastName}</p>
            ) : null}
            </LabelInput>
        </label>
        
        
        <label htmlFor="email">
        <LabelInput>
            Email
            <input
            type="text"
            name="email"
            value={formState.email}
            onChange={inputChange}
            placeholder="Enter Email."
            />
            {errors.lastName.length > 0 ? (
            <p className="error">{errors.lastName}</p>
            ) : null}
            </LabelInput>
        </label>
        
        
        <label htmlFor="emailConfirmation">
        <LabelInput>
            Confirm Email
            <input
            type="text"
            name="emailConfirmation"
            value={formState.emailConfirmation}
            onChange={inputChange}
            placeholder="Confirm Email."
            />
            </LabelInput>
        </label>
        
        
        <label htmlFor="password">
        <LabelInput>
            Password
            <input
            type="text"
            name="password"
            value={formState.password}
            onChange={inputChange}
            placeholder="Enter Password."
            />
            {errors.password.length > 0 ? (
            <p className="error">{errors.password}</p>
            ) : null}
            </LabelInput>
        </label>
        
        
        <label htmlFor="passwordConfirmation">
        <LabelInput>
            Confirm Password
            <input
            type="text"
            name="passwordConfirmation"
            value={formState.passwordConfirmation}
            onChange={inputChange}
            placeholder="Confirm Password."
            />
            </LabelInput>
        </label>
        
        
        <label htmlFor="accountType">
            <LabelInput>
            Reader or Contributor
            <select
            name= "accountType"
            id= "accountType"
            value={formState.accountType}
            onChange={inputChange}
            >
            <option value="select-account">Please Select an Account</option>
            <option value="reader">Reader</option>
            <option value="contributor">Contributor</option>
            </select>
            {errors.accountType.length > 0 ? (
            <p className="error">{errors.accountType}</p>
            ) : null}
            </LabelInput>
        </label>
        
        
        <label htmlFor="notRobot">
        <LabelInput>
            I Am Not A Robot
            <input
            type="checkbox"
            id="notRobot"
            name="notRobot"
            checked={formState.notRobot}
            onChange={inputChange}
            />
            {errors.notRobot.length > 0 ? (
            <p className="error">{errors.notRobot}</p>
            ) : null}
            </LabelInput>
        </label>
        
        <button disabled={buttonDisabled}>Login</button>
        </WrapperDiv>
        </form>
    );
    };

export default SignupForm;