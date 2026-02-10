// components/users/DeleteUserModal.jsx
import React, { useState, useEffect } from "react";
import { MdWarning } from "react-icons/md";
import { BiLoaderAlt } from "react-icons/bi"; // or use any spinner icon

const DeleteUserModal = ({
  isOpen,
  onClose,
  onConfirm,
  user,
  loading = false,
}) => {
  const [inputValue, setInputValue] = useState("");

  // Reset input when modal closes or user changes
  useEffect(() => {
    if (!isOpen) setInputValue("");
  }, [isOpen]);

  if (!isOpen || !user) return null;

  const isMatch = inputValue.trim() === user.fullName;

  const handleConfirm = () => {
    if (isMatch && !loading) {
      onConfirm(user._id);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && isMatch && !loading) {
      handleConfirm();
    }
    if (e.key === "Escape" && !loading) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={!loading ? onClose : undefined}
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 text-red-600 mb-4">
            <MdWarning className="text-3xl" />
            <h3 className="text-xl font-bold">Delete User?</h3>
          </div>

          <div className="mb-4 space-y-2">
            <p className="text-gray-600">
              This action is{" "}
              <span className="font-bold text-red-600">
                permanent and irreversible
              </span>
              .
            </p>
            <p className="text-gray-600">
              To confirm, please type{" "}
              <span className="font-bold text-gray-800">{user.fullName}</span>{" "}
              below.
            </p>
          </div>

          {/* User Info */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Email:</span> {user.email || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Phone:</span> {user.phone || "N/A"}
            </p>
          </div>

          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Type user's full name"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            autoFocus
          />

          {inputValue && !isMatch && (
            <p className="mt-2 text-sm text-red-600">
              Name doesn't match. Please type exactly:{" "}
              <strong>{user.fullName}</strong>
            </p>
          )}
        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!isMatch || loading}
            className={`px-6 py-2 rounded-lg font-bold text-white transition-all flex items-center gap-2 min-w-[150px] justify-center ${
              isMatch && !loading
                ? "bg-red-600 hover:bg-red-700 shadow-md"
                : "bg-red-300 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Deleting...</span>
              </>
            ) : (
              "Confirm Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
