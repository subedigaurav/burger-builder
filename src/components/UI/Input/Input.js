import React from 'react';
import classes from './Input.module.css';

const input = ({
  label,
  elementtype,
  value,
  changed,
  valuetype,
  invalid,
  touched,
  shouldValidate,
  elementconfig,
}) => {
  let validationError = null;
  let inputElement = null;
  // for adding additional classes if the input is invalid
  const inputClasses = [classes.InputElement];

  if (invalid && shouldValidate && touched) {
    inputClasses.push(classes.Invalid);
    validationError = (
      <p className={classes.ValidationError}>
        <span role="img" aria-label="warning emoji">
          ❗
        </span>
        Please enter a valid
        {' '}
        {valuetype}
        .
      </p>
    );
  }

  switch (elementtype) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          value={value}
          {...elementconfig}
          onChange={changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          value={value}
          {...elementconfig}
          onChange={changed}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          value={value}
          className={inputClasses.join(' ')}
          onChange={changed}
        >
          {elementconfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          value={value}
          {...elementconfig}
          onChange={changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default input;
