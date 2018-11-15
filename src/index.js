import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from './Button';
import { Form } from './Form';
import { FormField } from './FormField';
import { useFormValidation, useInputValidation } from './hooks/useValidation.js';
import './style.css';
import { containsNumber, doesNotContain, requiredInput, requiredLength } from './utils/validators.js';

function App() {

  /*
  Validation requirements:
    Username:
    - required

    Password:
    - 8 or more characters
    - must not contain username
    - must contain at least 1 number

  Summary:
    Validation pattern composed of three parts:
    - validation functions: functions that takes a value and return an error message on failure
    - useInputValidationHook: A React hook that takes any number of validation functions and returns
      an inputValidation object with a validate method, a stateful array of error messages, event
      handlers for onBlur and onChange, a value ref that is automatically updated in onChange, and an
      inputRef to optionally pass to the <input> element.
    - useFormValidation: A React hook that takes any number of inputValidation objects and returns
      a formValidation object with a validate method and an onSubmit handler. The optional
      inputValidation.inputRef is needed to focus on the input when validation fails on submit.
  */
  const usernameValidation = useInputValidation(requiredInput);
  const passwordValidation = useInputValidation(
    containsNumber,
    doesNotContain(usernameValidation.valueRef.current),
    requiredLength(8)
  );
  const formValidation = useFormValidation(usernameValidation, passwordValidation);

  // custom <Form> and <Button> components only used for style
  return (
    <Form onSubmit={formValidation.onSubmit}>
      <FormField
        errors={usernameValidation.errors}
        inputRef={usernameValidation.inputRef}
        label="Username"
        name="username"
        onChange={usernameValidation.onChange}
        onBlur={usernameValidation.onBlur}
      />
      <FormField
        errors={passwordValidation.errors}
        inputRef={passwordValidation.inputRef}
        label="Password"
        name="password"
        onChange={passwordValidation.onChange}
        onBlur={passwordValidation.onBlur}
        type="password"
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
