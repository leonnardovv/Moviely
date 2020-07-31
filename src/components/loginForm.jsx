import React, { createRef, useState } from "react";
import Joi from "joi-browser";
import Input from "./common/input";

const LoginForm = () => {
  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  const username = createRef();

  const [data, setAccount] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    //validate the entire form
    //for username and password validation
    // const errs = {};
    // if (data.username.trim() === "") errs.username = "Username is required.";
    // if (data.password.trim() === "") errs.password = "Password is required.";

    // return Object.keys(errs).length === 0 ? null : errs;

    const options = { abortEarly: false }; //The abortEarly option stops validation on the first error, otherwise returns all the errors found. It defaults to true. The convert option attempts to cast values to the required types. It also defaults to true.

    const { error } = Joi.validate(data, schema, options);
    if (!error) return null;

    const errs = {};
    //mapping the array into an object with the help of console.log(result) in browser console
    for (let item of error.details) errs[item.path[0]] = item.message;
    return errs;
  };

  const validateProperty = ({ name, value }) => {
    //validate a single input
    // if (input.name === "username") {
    //   if (input.value.trim() === "") return "Username is required";
    //   // ...
    // }
    // if (input.name === "password") {
    //   if (input.value.trim() === "") return "Password is required";
    //   // ...
    // }
    //using [name] which is computed property because we don't know the exact name of the object attribute
    const obj = { [name]: value }; //the object that has a single property-> name set dinamically on the value of input.name
    const newSchema = { [name]: schema[name] };
    const { err } = Joi.validate(obj, newSchema);

    return err ? err.details[0].message : null;
  };

  const handleSubmit = (event) => {
    event.preventDefault(); //always cause we don't want to post the form to the server

    //call the server
    console.log("Submitted");

    const errs = validate();
    setErrors(errs || {}); //if there are errors, set to errs, if not set to empty array because this should never be null
    if (errs) return;
  };

  //   const handleChange = (event) => {
  //     const acc = { ...data };
  //     acc[event.currentTarget.name] = event.currentTarget.value; // to handle multipe inputs
  //     setAccount(acc);
  //   };
  //or
  const handleChange = ({ currentTarget: input }) => {
    const errs = { ...errors };
    const errorMessage = validateProperty(input); //error message only for that specific input
    if (errorMessage) errs[input.name] = errorMessage;
    // we show the error for that input
    else delete errs[input.name];

    const acc = { ...data };
    acc[input.name] = input.value; // to handle multipe inputs
    setAccount(acc);
    setErrors(errs);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="username"
          value={data.username}
          label="Username"
          onChange={handleChange}
          type="text"
          error={errors.username}
        />
        <Input
          name="password"
          value={data.password}
          label="Password"
          onChange={handleChange}
          type="password"
          error={errors.password}
        />
        {/* if validate() returns an object, this is similar with true and if it returns nothing, is similar with false */}
        <button disabled={validate()} className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
