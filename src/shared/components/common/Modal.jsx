import React from "react";
import PropTypes from "prop-types";

/**
 * Modal Component
 * Reusable modal dialog with header, body, and footer
 */
const Modal = ({
  isOpen,
  title,
  children,
  onClose,
  size = "md",
  showCloseButton = true,
  className = "",
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className={`
            bg-white rounded-lg shadow-xl
            max-h-[90vh] overflow-y-auto
            ${sizeClasses[size]}
            w-full
            ${className}
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            {showCloseButton && (
              <button
                onClick={onClose}
                className={`
                  text-gray-400 hover:text-gray-600 text-2xl leading-none
                  transition-colors font-bold
                `}
                aria-label="Close modal"
              >
                ×
              </button>
            )}
          </div>

          {/* Body */}
          <div className="p-6">{children}</div>
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl", "2xl"]),
  showCloseButton: PropTypes.bool,
  className: PropTypes.string,
};

export default Modal;
