import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

const Form = yup.object().shape({
  name: yup.string().required("Please Enter Username").min(5, "Name Is Too Short."),
  password: yup
    .string()
    .required("Please Enter Password").min(6, "Password is Too Short - Must Be Longer Than 8 Characters.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Number and one special case Character"
    ),
  notRobot: yup.boolean().oneOf([true])
});

const LoginForm = () => {
  const [formState, setFormState] = useState({
    name: "",
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

  const [errorState, setErrorState] = useState({
    name: "",
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

  const [post, setPost] = useState([]);

  const formSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then((res) => {
        setPost((prevState) => [...prevState, res.data]);
        setFormState({
          name: "",
          password: "",
          notRobot: "",
        });
      })
      .catch((err) => console.log(err.response));
  };
  console.log(post);

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

export default LoginForm;
