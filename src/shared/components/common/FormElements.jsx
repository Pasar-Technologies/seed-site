import React from "react";
import PropTypes from "prop-types";

/**
 * Label Component
 * Reusable form label
 */
const Label = ({ htmlFor, children, required = false, className = "" }) => (
  <label
    htmlFor={htmlFor}
    className={`
      block
      text-sm
      font-medium
      text-gray-700
      mb-2
      ${required ? "after:content-['*'] after:ml-1 after:text-red-500" : ""}
      ${className}
    `}
  >
    {children}
  </label>
);

Label.propTypes = {
  htmlFor: PropTypes.string,
  children: PropTypes.node.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
};

/**
 * FormGroup Component
 * Groups form fields together with consistent spacing
 */
const FormGroup = ({ children, className = "" }) => (
  <div className={`space-y-4 ${className}`}>{children}</div>
);

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * FormRow Component
 * Creates a row of form fields
 */
const FormRow = ({ children, cols = 2, className = "" }) => (
  <div className={`grid grid-cols-1 gap-4 md:grid-cols-${cols} ${className}`}>
    {children}
  </div>
);

FormRow.propTypes = {
  children: PropTypes.node.isRequired,
  cols: PropTypes.number,
  className: PropTypes.string,
};

export { Label, FormGroup, FormRow };
