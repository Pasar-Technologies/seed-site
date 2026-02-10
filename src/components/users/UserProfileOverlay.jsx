// components/users/UserProfileOverlay.jsx
import React, { useState, useEffect } from "react";
import {
  MdWarning,
  MdClose,
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdCalendarToday,
  MdPerson,
} from "react-icons/md";
import { BiLoaderAlt } from "react-icons/bi";
import { HiTrash } from "react-icons/hi";

const DeleteConfirmModal = ({ user, loading, onConfirm, onCancel }) => {
  const [inputValue, setInputValue] = useState("");
  const isMatch = inputValue.trim() === user?.fullName;

  useEffect(() => {
    setInputValue("");
  }, [user]);

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-2xl">
      <div className="bg-white w-[90%] max-w-sm rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-5">
          <div className="flex items-center gap-2 text-red-600 mb-3">
            <MdWarning className="text-2xl" />
            <h3 className="text-lg font-bold">Delete User?</h3>
          </div>

          <p className="text-sm text-gray-500 mb-1">
            This is{" "}
            <span className="font-semibold text-red-500">
              permanent and irreversible
            </span>
            .
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Type{" "}
            <span className="font-bold text-gray-800">{user?.fullName}</span> to
            confirm.
          </p>

          <input
            autoFocus
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && isMatch && !loading) onConfirm(user._id);
              if (e.key === "Escape") onCancel();
            }}
            disabled={loading}
            placeholder="Type full name here"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none disabled:bg-gray-100"
          />
          {inputValue && !isMatch && (
            <p className="mt-1 text-xs text-red-500">
              Name doesn't match exactly.
            </p>
          )}
        </div>

        <div className="bg-gray-50 px-5 py-3 flex gap-2 justify-end">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(user._id)}
            disabled={!isMatch || loading}
            className={`px-5 py-2 text-sm rounded-lg font-semibold text-white flex items-center gap-2 transition-all ${
              isMatch && !loading
                ? "bg-red-600 hover:bg-red-700"
                : "bg-red-300 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <>
                <BiLoaderAlt className="animate-spin" />
                Deleting...
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

const InfoRow = ({ icon: Icon, label, value }) => {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-gray-100 last:border-0">
      <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="text-indigo-500 text-base" />
      </div>
      <div>
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
          {label}
        </p>
        <p className="text-sm text-gray-800 font-medium mt-0.5">{value}</p>
      </div>
    </div>
  );
};

const UserProfileOverlay = ({
  user,
  isOpen,
  onClose,
  onDelete,
  deleteLoading = false,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (!isOpen) setShowDeleteConfirm(false);
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && !deleteLoading) {
        if (showDeleteConfirm) setShowDeleteConfirm(false);
        else onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [showDeleteConfirm, deleteLoading, onClose]);

  if (!isOpen || !user) return null;

  const handleDeleteConfirm = async (userId) => {
    await onDelete(userId);
    onClose();
  };

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const formatDate = (dob) => {
    if (!dob) return null;
    return new Date(dob).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getGenderIcon = (gender) => {
    if (gender === "male") return "♂";
    if (gender === "female") return "♀";
    return "⚧";
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={() => !deleteLoading && !showDeleteConfirm && onClose()}
    >
      <div
        className="relative bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden"
        style={{ maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Delete Confirm Sub-modal */}
        {showDeleteConfirm && (
          <DeleteConfirmModal
            user={user}
            loading={deleteLoading}
            onConfirm={handleDeleteConfirm}
            onCancel={() => setShowDeleteConfirm(false)}
          />
        )}

        {/* Header Banner */}
        <div className="relative h-24 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400">
          {/* Decorative circles */}
          <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white/10" />
          <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-white/10" />

          {/* Close Button */}
          <button
            onClick={onClose}
            disabled={deleteLoading}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition disabled:opacity-50"
          >
            <MdClose className="text-lg" />
          </button>

          {/* Account Type Badge */}
          <span className="absolute top-3 left-3 text-xs font-semibold bg-white/20 text-white px-2 py-0.5 rounded-full capitalize">
            {user.accountType || "individual"}
          </span>
        </div>

        {/* Avatar — overlaps banner */}
        <div className="relative flex justify-center">
          <div className="absolute -top-10 w-20 h-20 rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
            {user.profilePic ? (
              <img
                src={user.profilePic}
                alt={user.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white text-2xl font-bold">
                {getInitials(user.fullName)}
              </span>
            )}
          </div>
        </div>

        {/* Scrollable Body */}
        <div
          className="overflow-y-auto"
          style={{ maxHeight: "calc(90vh - 96px)" }}
        >
          {/* Name & meta */}
          <div className="pt-12 px-5 pb-3 text-center border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">{user.fullName}</h2>
            <div className="flex items-center justify-center gap-2 mt-1">
              {user.gender && (
                <span className="text-xs text-gray-400 capitalize">
                  {getGenderIcon(user.gender)} {user.gender}
                </span>
              )}
              {user.dob && (
                <>
                  <span className="text-gray-300">·</span>
                  <span className="text-xs text-gray-400">
                    Born {formatDate(user.dob)}
                  </span>
                </>
              )}
            </div>
            {user.languages?.length > 0 && (
              <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                {user.languages.map((lang) => (
                  <span
                    key={lang}
                    className="text-xs bg-indigo-50 text-indigo-600 font-medium px-2.5 py-0.5 rounded-full"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="px-5 py-3 border-b border-gray-100">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-2">
              Contact
            </p>
            <InfoRow icon={MdPhone} label="Phone" value={user.phone} />
            <InfoRow icon={MdEmail} label="Email" value={user.email} />
          </div>

          {/* Address */}
          {user.addresses?.length > 0 && (
            <div className="px-5 py-3 border-b border-gray-100">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-2">
                Address
              </p>
              {user.addresses.slice(0, 1).map((addr, i) => (
                <div key={i} className="flex items-start gap-3 py-1">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                    <MdLocationOn className="text-indigo-500 text-base" />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {[
                      addr.houseOrFlat,
                      addr.street,
                      addr.area,
                      addr.city,
                      addr.state,
                      addr.pincode,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Stats row */}
          <div className="px-5 py-3 grid grid-cols-2 gap-3 border-b border-gray-100">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-indigo-600">
                {user.totalAds ?? 0}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">Total Ads</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-green-600">
                {user.activeAds ?? 0}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">Active Ads</p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-5 py-4 flex gap-2">
            <button
              onClick={onClose}
              disabled={deleteLoading}
              className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition disabled:opacity-50"
            >
              Close
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              disabled={deleteLoading}
              className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <HiTrash className="text-base" />
              Delete User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileOverlay;
