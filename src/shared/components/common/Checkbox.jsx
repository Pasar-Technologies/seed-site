import React from "react";
import PropTypes from "prop-types";
import { transitions } from "./theme";

/**
 * Checkbox Component
 * Reusable checkbox with label and error handling
 */
const Checkbox = ({
  id,
  name,
  label,
  checked,
  onChange,
  disabled = false,
  required = false,
  error,
  helpText,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className="flex items-start gap-3">
      <div className="flex items-center h-6">
        <input
          id={id || name}
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`
            ${sizeClasses[size]}
            accent-indigo-600
            border-slate-300
            rounded
            transition-all
            ${transitions.base}
            focus:ring-2
            focus:ring-indigo-300
            cursor-pointer
            disabled:opacity-50
            disabled:cursor-not-allowed
          `}
        />
      </div>

      <div className="flex-1 pt-1">
        {label && (
          <label
            htmlFor={id || name}
            className={`
              text-sm
              font-medium
              text-slate-600
              cursor-pointer
              ${disabled ? "opacity-50" : ""}
            `}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {error && (
          <p className="text-red-600 text-sm mt-1 font-medium">{error}</p>
        )}

        {helpText && !error && (
          <p className="text-gray-500 text-xs mt-1">{helpText}</p>
        )}
      </div>
    </div>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.string,
  helpText: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};

export default Checkbox;
