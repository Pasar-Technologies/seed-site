import React from "react";
import PropTypes from "prop-types";
import Alert from "./Alert";

/**
 * Form Component
 * Reusable form wrapper with title, description, error handling, and submit handling
 */
const Form = ({
  onSubmit,
  children,
  title,
  description,
  error,
  onErrorDismiss,
  submitText = "Submit",
  cancelText,
  onCancel,
  loading = false,
  className = "",
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div
      className={`w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg ${className}`}
    >
      {/* Header */}
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
          )}
          {description && <p className="text-gray-600">{description}</p>}
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="mb-6">
          <Alert
            type="error"
            message={error}
            onClose={onErrorDismiss}
            dismissible={!!onErrorDismiss}
          />
        </div>
      )}

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {children}

        {/* Form Actions */}
        <div className="flex gap-3 pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading}
            className={`
              px-6 py-2 bg-blue-600 text-white rounded-lg font-medium
              hover:bg-blue-700 active:bg-blue-800
              disabled:bg-gray-400 disabled:cursor-not-allowed
              transition-all flex items-center gap-2
            `}
          >
            {loading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{submitText}</span>
              </>
            ) : (
              submitText
            )}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className={`
                px-6 py-2 bg-gray-100 text-gray-900 rounded-lg font-medium
                hover:bg-gray-200 active:bg-gray-300
                disabled:opacity-50 disabled:cursor-not-allowed
                border border-gray-300
                transition-all
              `}
            >
              {cancelText || "Cancel"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  error: PropTypes.string,
  onErrorDismiss: PropTypes.func,
  submitText: PropTypes.string,
  cancelText: PropTypes.string,
  onCancel: PropTypes.func,
  loading: PropTypes.bool,
  className: PropTypes.string,
};

export default Form;
