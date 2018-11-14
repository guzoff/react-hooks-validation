import React from "react";
import "./style.css";

export function FormField({ label, errors, ...props }) {
  return (
    <>
      <label className="label">
        <span>{label}</span>
        <input className="input" {...props} />
        
      </label>
      {errors.map(errorMessage => (
        <p className="error-message" key={errorMessage}>{errorMessage}</p>
      ))}
    </>
  );
}
