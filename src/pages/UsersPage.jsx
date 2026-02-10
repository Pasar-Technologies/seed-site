// pages/UsersPage.jsx
import { useEffect, useState } from "react";
import useUserStore from "../store/useUserStore";
import { MdDelete, MdLocationOn } from "react-icons/md";
import UserProfileOverlay from "../components/users/UserProfileOverlay";
import DeleteUserModal from "../components/users/DeleteUserModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";

function UsersPage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("userId") ?? "",
  );

  const { users, fetchAllUsers, deleteUser, loading, deleteLoading } =
    useUserStore();

  // State for profile overlay
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  // State for delete modal
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  // Open profile overlay
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsOverlayOpen(true);
  };

  // Open delete confirmation modal
  const handleDeleteClick = (user, e) => {
    e.stopPropagation();
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  // Confirm delete
  const handleConfirmDelete = async (userId) => {
    const result = await deleteUser(userId);

    if (result.success) {
      toast.success(`User "${userToDelete.fullName}" deleted successfully`, {
        duration: 4000,
        icon: "🗑️",
      });
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    } else {
      toast.error(result.error || "Failed to delete user", {
        duration: 5000,
      });
    }
  };

  // Close delete modal
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const filteredUsers =
    users?.filter((user) => {
      const searchStr = searchQuery.toLowerCase();
      return (
        user._id?.toLowerCase().includes(searchStr) ||
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
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Registered Users</h2>
          <p className="text-sm text-gray-500">
            Managing {filteredUsers.length}{" "}
            {filteredUsers.length === 1 ? "user" : "users"}
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

      {/* Table */}
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
                    onClick={() => handleUserClick(user)}
                  >
                    {user.fullName}
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    {user.email || "N/A"}
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    {user.phone || "N/A"}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() =>
                          navigate(`/seed-site/user/addresses/${user._id}`)
                        }
                        className="text-xl text-gray-400 hover:text-blue-500 transition-colors p-1 rounded hover:bg-blue-50"
                        title="View Addresses"
                      >
                        <MdLocationOn />
                      </button>
                      <button
                        onClick={(e) => handleDeleteClick(user, e)}
                        className="text-xl text-gray-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-50"
                        title="Delete User"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-10 text-center text-gray-400">
                  {searchQuery ? (
                    <>
                      No users match your search{" "}
                      <span className="font-semibold">"{searchQuery}"</span>
                    </>
                  ) : (
                    "No users found"
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Profile Overlay */}
      <UserProfileOverlay
        user={selectedUser}
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
      />

      {/* Delete Confirmation Modal */}
      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        user={userToDelete}
        loading={deleteLoading} // ✅ Pass loading state
      />
    </div>
  );
}

export default UsersPage;
