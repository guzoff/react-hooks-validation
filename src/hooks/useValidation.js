import { useRef, useState } from 'react';
import { getValidationErrors } from '../utils/validators.js';

export function useInputValidation(...validators) {
  const inputRef = useRef();
  const valueRef = useRef('');
  const touchedRef = useRef(false);
  const [errors, setErrors] = useState([]);

  const validate = () => {
    const newErrors = getValidationErrors(valueRef.current, validators);
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const onBlur = () => {
    if (!touchedRef.current) {
      validate();
    }
    touchedRef.current = true;
  };

  const onChange = ({ target }) => {
    valueRef.current = target.value;
    if (touchedRef.current) {
      validate();
    }
  };

  return {
    inputRef,
    valueRef,
    errors,
    validate,
    onBlur,
    onChange
  };
}

export function useFormValidation(...inputValidations) {

  // inputValidations - Array of validation objects returned from useInputValidation
  const validate = () => inputValidations.every(({ inputRef, validate }) => {
    const isValid = validate();

    // inputRef is optional but needed if you want to focus on input when validation fails
    if (!isValid && inputRef.current) {
      inputRef.current.focus();
    }
    return isValid;
  });

  const onSubmit = (event) => {
    if (!validate()) {
      event.preventDefault();
    }
  };

  return { validate, onSubmit };
}
