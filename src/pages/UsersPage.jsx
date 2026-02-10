import { useEffect, useState } from "react";
import useUserStore from "../store/useUserStore";
import { MdDelete, MdLocationOn } from "react-icons/md";
import ProfileOverlay from "../components/users/ProfileOverlay";
import { useNavigate } from "react-router-dom";

function UsersPage() {
  const navigate = useNavigate();
  const { users, fetchAllUsers, loading } = useUserStore();
  const [searchQuery, setSearchQuery] = useState("");

  // State for the overlay
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  // Logic to open overlay with specific user data
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsOverlayOpen(true);
  };

  const filteredUsers =
    users?.filter((user) => {
      const searchStr = searchQuery.toLowerCase();
      return (
        user.fullName?.toLowerCase().includes(searchStr) ||
        user.email?.toLowerCase().includes(searchStr) ||
        user.phone?.includes(searchStr)
      );
    }) || [];

  if (loading)
    return (
      <div className="p-10 text-center font-medium text-blue-600">
        Loading database...
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
      {/* ... Header and Search Input stay the same ... */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Registered Users</h2>
          <p className="text-sm text-gray-500">
            Managing {filteredUsers.length} filtered results
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search name, email, or phone..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-100">
              <th className="py-3 px-4 text-sm font-bold text-gray-600 uppercase">
                Name
              </th>
              <th className="py-3 px-4 text-sm font-bold text-gray-600 uppercase">
                Email
              </th>
              <th className="py-3 px-4 text-sm font-bold text-gray-600 uppercase">
                Phone
              </th>
              <th className="py-3 px-4 text-sm font-bold text-gray-600 uppercase text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-50 hover:bg-blue-50/50 transition-colors"
                >
                  <td
                    className="py-4 px-4 font-medium text-blue-600 cursor-pointer hover:underline"
                    onClick={() => handleUserClick(user)} // Trigger overlay on name click
                  >
                    {user.fullName}
                  </td>
                  <td className="py-4 px-4 text-gray-600">{user.email}</td>
                  <td className="py-4 px-4 text-gray-600">
                    {user.phone || "N/A"}
                  </td>
                  <td className="py-4 px-4 text-center space-x-2">
                    <button
                      onClick={() =>
                        navigate(`/seed-site/user/addresses/${user._id}`)
                      }
                      className="text-xl text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      <MdLocationOn />
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/seed-site/user/addresses/${user._id}`)
                      }
                      className="text-xl text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-10 text-center text-gray-400">
                  No users match your search "{searchQuery}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* REUSABLE OVERLAY COMPONENT */}
      <ProfileOverlay
        user={selectedUser}
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
      />
    </div>
  );
}

export default UsersPage;
