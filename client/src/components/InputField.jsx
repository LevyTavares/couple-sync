// client/src/components/InputField.jsx
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./InputField.scss";

function InputField({
  id,
  label,
  type = "text",
  value,
  onChange,
  disabled,
  required,
  placeholder,
  icon,
  autoComplete,
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const actualType = isPassword ? (show ? "text" : "password") : type;

  return (
    <div className="field">
      {label && (
        <label className="field-label" htmlFor={id}>
          {label}
        </label>
      )}
      <div
        className={`field-input-wrap ${icon ? "has-left" : ""} ${
          isPassword ? "has-right" : ""
        }`}
      >
        {icon && (
          <span className="field-icon left" aria-hidden>
            {icon}
          </span>
        )}
        <input
          id={id}
          className="field-input"
          type={actualType}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        {isPassword && (
          <button
            type="button"
            className="field-icon-btn right"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Esconder senha" : "Mostrar senha"}
          >
            {show ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>
    </div>
  );
}

export default InputField;
