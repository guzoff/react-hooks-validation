import React from 'react';
import './style.css';

export function FormField({ errors = [], inputRef = React.createRef(), label, ...props }) {
  return (
    <>
      <label className="label">
        <span>{label}</span>
        <input ref={inputRef} className="input" {...props} />
      </label>
      {errors.map(errorMessage => (
        <p className="error-message" key={errorMessage}>{errorMessage}</p>
      ))}
    </>
  );
}
