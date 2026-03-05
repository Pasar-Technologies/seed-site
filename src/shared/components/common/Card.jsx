import React from "react";
import PropTypes from "prop-types";

/**
 * Card Component
 * Reusable card container with consistent styling
 */
const Card = ({
  children,
  className = "",
  variant = "default",
  interactive = false,
  onClick,
  ...props
}) => {
  const variants = {
    default: "bg-white border border-gray-200",
    elevated: "bg-white shadow-md",
    outlined: "bg-white border-2 border-gray-300",
  };

  return (
    <div
      className={`
        ${variants[variant]}
        rounded-lg
        p-6
        transition-all
        ${interactive ? "cursor-pointer hover:shadow-lg" : ""}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(["default", "elevated", "outlined"]),
  interactive: PropTypes.bool,
  onClick: PropTypes.func,
};

/**
 * CardHeader Component
 */
const CardHeader = ({ title, subtitle, className = "" }) => (
  <div className={`mb-4 pb-4 border-b border-gray-200 ${className}`}>
    {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
    {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
  </div>
);

CardHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  className: PropTypes.string,
};

/**
 * CardFooter Component
 */
const CardFooter = ({ children, className = "" }) => (
  <div
    className={`mt-6 pt-4 border-t border-gray-200 flex gap-3 justify-between ${className}`}
  >
    {children}
  </div>
);

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export { CardHeader, CardFooter };
export default Card;
