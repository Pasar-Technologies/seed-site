import React from "react";
import PropTypes from "prop-types";
import { transitions } from "./theme";

/**
 * Select Component
 * Reusable select/dropdown with label, error handling, and consistent styling
 */
const Select = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  options = [],
  placeholder = "Select an option",
  error,
  required = false,
  disabled = false,
  helpText,
  size = "md",
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
    appearance-none
    background-image
    bg-no-repeat
    bg-right
    pr-10
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
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          className={`
            ${sizeClasses[size]}
            ${baseClasses}
            ${borderColor}
          `}
          style={{
            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
            backgroundSize: "1.5em 1.5em",
            backgroundPosition: "right 0.5rem center",
          }}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value || opt} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>
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

Select.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      }),
    ]),
  ),
  placeholder: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  helpText: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};

export default Select;
