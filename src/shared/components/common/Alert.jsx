import React from "react";
import PropTypes from "prop-types";
import { transitions } from "./theme";

/**
 * Alert Component
 * Displays success, error, warning, or info messages with optional dismissal
 */
const Alert = ({
  type = "info",
  message,
  title,
  onClose,
  dismissible = true,
  className = "",
}) => {
  const typeStyles = {
    success: {
      bg: "bg-green-50",
      border: "border-green-200",
      title: "text-green-900",
      text: "text-green-800",
      icon: "✓",
      iconBg: "bg-green-100 text-green-600",
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      title: "text-red-900",
      text: "text-red-800",
      icon: "✕",
      iconBg: "bg-red-100 text-red-600",
    },
    warning: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      title: "text-amber-900",
      text: "text-amber-800",
      icon: "⚠",
      iconBg: "bg-amber-100 text-amber-600",
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      title: "text-blue-900",
      text: "text-blue-800",
      icon: "ℹ",
      iconBg: "bg-blue-100 text-blue-600",
    },
  };

  const style = typeStyles[type];

  return (
    <div
      className={`
        ${style.bg}
        ${style.border}
        border
        rounded-lg
        p-4
        flex
        gap-3
        items-start
        animate-in
        fade-in
        slide-in-from-top-2
        ${transitions.fast}
        ${className}
      `}
      role="alert"
    >
      {/* Icon */}
      <div
        className={`${style.iconBg} w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-sm font-bold`}
      >
        {style.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <h3 className={`${style.title} font-semibold text-sm mb-1`}>
            {title}
          </h3>
        )}
        <p className={`${style.text} text-sm`}>{message}</p>
      </div>

      {/* Close Button */}
      {dismissible && onClose && (
        <button
          onClick={onClose}
          className={`${style.text} hover:opacity-75 shrink-0 text-lg leading-none font-bold`}
          aria-label="Close alert"
        >
          ×
        </button>
      )}
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(["success", "error", "warning", "info"]),
  message: PropTypes.string.isRequired,
  title: PropTypes.string,
  onClose: PropTypes.func,
  dismissible: PropTypes.bool,
  className: PropTypes.string,
};

export default Alert;
