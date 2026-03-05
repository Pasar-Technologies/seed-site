import React from "react";
import PropTypes from "prop-types";
import {
  colors,
  spacing,
  borderRadius,
  typography,
  transitions,
} from "./theme";

/**
 * TextInput Component
 * Reusable text input with label, error handling, and consistent styling
 */
const TextInput = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  type = "text",
  placeholder,
  error,
  required = false,
  disabled = false,
  autoComplete,
  pattern,
  maxLength,
  minLength,
  helpText,
  icon,
  variant = "default",
  size = "md",
  inputProps = {},
}) => {
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  const baseClasses = `
    w-full
    border
    rounded-xl
    font-family-base
    transition-all
    ${transitions.base}
    focus:outline-none
    focus:ring-2
    focus:ring-offset-0
    disabled:opacity-50
    disabled:cursor-not-allowed
  `;

  const borderColor = error
    ? `border-red-500 focus:ring-red-200 focus:border-red-500`
    : `border-slate-200 focus:ring-indigo-200 focus:border-indigo-400`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className={`
            block
            text-sm
            font-medium
            mb-2
            ${required ? "after:content-['*'] after:ml-1 after:text-red-500" : ""}
            text-slate-600
          `}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}

        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          pattern={pattern}
          minLength={minLength}
          maxLength={maxLength}
          className={`
            ${sizeClasses[size]}
            ${baseClasses}
            ${borderColor}
            ${icon ? "pl-10" : ""}
          `}
          {...inputProps}
        />
      </div>

      {error && (
        <p className="text-red-600 text-sm mt-1.5 font-medium">{error}</p>
      )}

      {helpText && !error && (
        <p className="text-slate-400 text-xs mt-1.5">{helpText}</p>
      )}
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  type: PropTypes.oneOf(["text", "number", "email", "password", "tel", "url"]),
  placeholder: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  autoComplete: PropTypes.string,
  pattern: PropTypes.string,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  helpText: PropTypes.string,
  icon: PropTypes.node,
  variant: PropTypes.oneOf(["default", "filled", "outlined"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  inputProps: PropTypes.object,
};

export default TextInput;
