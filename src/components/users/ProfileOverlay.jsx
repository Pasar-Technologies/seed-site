import React from "react";

const ProfileOverlay = ({ user, isOpen, onClose }) => {
  if (!isOpen || !user) return null;

  // Formatter for dates
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
      <div className="relative w-full max-w-2xl p-6 mx-4 bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
        >
          &times;
        </button>

        {/* Header Section */}
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={user.profilePic}
            alt={user.fullName}
            className="w-20 h-20 rounded-full border-4 border-blue-100 object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {user.fullName}
            </h2>
            <p className="text-sm text-gray-500 capitalize">
              {user.accountType} Account
            </p>
            {user.isVerified ? (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Verified
              </span>
            ) : (
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                Pending Verification
              </span>
            )}
          </div>
        </div>

        <hr className="mb-6" />

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <section>
            <h3 className="font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Contact Info
            </h3>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Gender:</strong> {user.gender}
            </p>
            <p>
              <strong>DOB:</strong> {formatDate(user.dob)}
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Expertise
            </h3>
            <p>
              <strong>Languages:</strong> {user.languages?.join(", ")}
            </p>
            <div className="mt-2">
              <strong>Preferences:</strong>
              <div className="flex flex-wrap gap-1 mt-1">
                {user.preferences?.map((pref, i) => (
                  <span
                    key={i}
                    className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs"
                  >
                    {pref}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* ID Proofs Section */}
        <div className="mt-8">
          <h3 className="font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Documents
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <a
              href={user.userIdProof?.adhar}
              target="_blank"
              rel="noreferrer"
              className="block p-2 border rounded hover:bg-gray-50"
            >
              <p className="text-xs text-center font-medium">Aadhaar Card</p>
            </a>
            <a
              href={user.userIdProof?.pan}
              target="_blank"
              rel="noreferrer"
              className="block p-2 border rounded hover:bg-gray-50"
            >
              <p className="text-xs text-center font-medium">PAN Card</p>
            </a>
          </div>
        </div>

        <div className="mt-6 text-[10px] text-gray-400 text-right">
          Last updated: {formatDate(user.updatedAt)}
        </div>
      </div>
    </div>
  );
};

export default ProfileOverlay;
