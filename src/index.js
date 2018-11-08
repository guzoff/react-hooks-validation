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

function App() {
  const [usernameValue, setUsernameValue] = useState('');
  const [usernameErrors, setUsernameErrors] = useState([]);

  const [passwordValue, setPasswordValue] = useState('');
  const [passwordErrors, setPasswordErrors] = useState([]);

  const onUsernameInput = ({ target }) => {
    setUsernameValue(target.value);
    setUsernameErrors(validate(target.value, [requiredInput]));
  };

  const onPasswordInput = ({target}) => {
    setPasswordValue(target.value);
    setPasswordErrors(validate(target.value, [inputPattern]));
  }

  return (
    <Form>
      <FormField
        label="Username"
        name="username"
        type="text"
        value={usernameValue}
        onInput={onUsernameInput}
        errors={usernameErrors}
      />
      <FormField
        label="Password"
        name="password"
        type="password"
        value={passwordValue}
        onInput={onPasswordInput}
        errors={passwordErrors}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
