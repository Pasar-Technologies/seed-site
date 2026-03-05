import React from "react";
import PropTypes from "prop-types";
import { colors, spacing, borderRadius, transitions } from "./theme";

/**
 * Button Component
 * Reusable button with multiple variants, sizes, and states
 */
const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  className = "",
  icon,
  iconPosition = "left",
  ...props
}) => {
  const variants = {
    primary: `
      bg-indigo-600
      text-white
      hover:bg-indigo-700
      active:bg-indigo-800
      disabled:bg-slate-400
      focus:ring-indigo-200
    `,
    secondary: `
      bg-slate-100
      text-slate-800
      hover:bg-slate-200
      active:bg-slate-300
      disabled:bg-slate-200
      border border-slate-300
      focus:ring-slate-200
    `,
    danger: `
      bg-red-600
      text-white
      hover:bg-red-700
      active:bg-red-800
      disabled:bg-red-300
      focus:ring-red-200
    `,
    success: `
      bg-emerald-600
      text-white
      hover:bg-emerald-700
      active:bg-emerald-800
      disabled:bg-emerald-300
      focus:ring-emerald-200
    `,
    outline: `
      bg-white
      text-indigo-600
      border-2 border-indigo-600
      hover:bg-indigo-50
      active:bg-indigo-100
      disabled:border-slate-400 disabled:text-slate-400
      focus:ring-indigo-200
    `,
    ghost: `
      bg-transparent
      text-indigo-600
      hover:bg-indigo-50
      active:bg-indigo-100
      disabled:text-slate-400
      focus:ring-indigo-200
    `,
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-lg",
  };

  const baseClasses = `
    inline-flex
    items-center
    justify-center
    gap-2
    font-medium
    border-0
    rounded-xl
    transition-all
    ${transitions.base}
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
    disabled:opacity-60
    disabled:cursor-not-allowed
    whitespace-nowrap
  `;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${sizes[size]}
        ${variants[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>{children}</span>
        </>
      ) : (
        <>
          {icon && iconPosition === "left" && icon}
          <span>{children}</span>
          {icon && iconPosition === "right" && icon}
        </>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "danger",
    "success",
    "outline",
    "ghost",
  ]),
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(["left", "right"]),
};

export default Button;
