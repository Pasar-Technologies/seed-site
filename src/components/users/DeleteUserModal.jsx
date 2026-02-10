import React, { useState, useEffect } from "react";
import { MdWarning } from "react-icons/md";

const DeleteUserModal = ({ isOpen, onClose, onConfirm, user }) => {
  const [inputValue, setInputValue] = useState("");

  // Reset input when modal closes or user changes
  useEffect(() => {
    if (!isOpen) setInputValue("");
  }, [isOpen]);

  if (!isOpen || !user) return null;

  const isMatch = inputValue.trim() === user.fullName;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-3 text-red-600 mb-4">
            <MdWarning className="text-3xl" />
            <h3 className="text-xl font-bold">Delete User?</h3>
          </div>

          <p className="text-gray-600 mb-4">
            This action is permanent. To confirm, please type
            <span className="font-bold text-gray-800"> {user.fullName} </span>
            below.
          </p>

          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-all"
            placeholder="Type user's full name"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(user._id)}
            disabled={!isMatch}
            className={`px-6 py-2 rounded-lg font-bold text-white transition-all ${
              isMatch
                ? "bg-red-600 hover:bg-red-700 shadow-md"
                : "bg-red-300 cursor-not-allowed"
            }`}
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
