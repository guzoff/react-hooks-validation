import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Form } from "./Form";
import { FormField } from "./FormField";
import { Button } from "./Button";
import "./style.css";

/*
 Validation rules

 Username:
 - required

 Password:
 - 8 or more characters
 - not same as username
 - must contain at least 1 number
 */

function validate(value, validators) {
  return validators.map(validator => validator(value))
    .filter(result => result && typeof result === 'string');
}

function requiredInput(value) {
  return value.trim() !== '' ? true : 'This needs a value!';
}

function inputPattern(value) {
  return value.match(/.{8,}/) ? true : 'This needs to be at least 8 chars long!';
}


Object.entries({ key1: 1, key2: 2 }) // [["key1", 1], ["key2", 2]]

function useValidation(validations) {
  const inputValidators = Object.entries(validations).reduce((acc, [key, validators]) => {
    const [value, setValue] = useState('');
    const [errors, setErrors] = useState([]);

    const onInput = ({ target }) => {
      setValue(target.value);
      setErrors(validate(target.value, validators));
    };

    acc[key] = {
      value,
      errors,
      setErrors,
      onInput
    };

    return acc;
  }, {});

  const formOnSubmit = (event) => {
    const totalNumberOfErrors = Object.entries(inputValidators).reduce((numOfErrors, [key, inputValidator]) => {
      const errors = validate(inputValidator.value, validations[key]);
      inputValidator.setErrors(errors);
      numOfErrors += errors.length;
      return numOfErrors;
    }, 0);
    if (totalNumberOfErrors > 0) {
      event.preventDefault();
    } else {
      alert('ALERT!');
    }
  };

  return [inputValidators, formOnSubmit];
}

function App() {
  const [{ username, password }, formOnSubmit] = useValidation({
    username: [requiredInput],
    password: [inputPattern]
  });

  return (
    <Form onSubmit={formOnSubmit}>
      <FormField
        label="Username"
        name="username"
        type="text"
        value={username.value}
        onInput={username.onInput}
        errors={username.errors}
      />
      <FormField
        label="Password"
        name="password"
        type="password"
        value={password.value}
        onInput={password.onInput}
        errors={password.errors}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
