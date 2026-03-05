// pages/UsersPage.jsx
import { useEffect, useState } from "react";
import useUserStore from "./useUserStore";
import { MdDelete, MdLocationOn } from "react-icons/md";
import UserProfileOverlay from "./UserProfileOverlay";
import DeleteUserModal from "./DeleteUserModal";
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
    if (users.length === 0) fetchAllUsers();
  }, []);

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500">Loading users...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Users</h1>
            <p className="text-sm text-slate-400 mt-0.5">
              {filteredUsers.length} {filteredUsers.length === 1 ? "user" : "users"}
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search name, email or phone..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="py-3 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Name</th>
                <th className="py-3 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Email</th>
                <th className="py-3 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Phone</th>
                <th className="py-3 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wide text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-5">
                      <button
                        onClick={() => handleUserClick(user)}
                        className="font-medium text-indigo-600 hover:text-indigo-800 text-sm text-left"
                      >
                        {user.fullName}
                      </button>
                    </td>
                    <td className="py-3.5 px-5 text-sm text-slate-500">{user.email || "—"}</td>
                    <td className="py-3.5 px-5 text-sm text-slate-500">{user.phone || "—"}</td>
                    <td className="py-3.5 px-5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => navigate(`/seed-site/user/addresses/${user._id}`)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 transition-colors"
                          title="View Addresses"
                        >
                          <MdLocationOn className="text-lg" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteClick(user, e)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                          title="Delete User"
                        >
                          <MdDelete className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-16 text-center text-slate-400 text-sm">
                    {searchQuery ? <>No users match <span className="font-semibold text-slate-600">"{searchQuery}"</span></> : "No users found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <UserProfileOverlay
        user={selectedUser}
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
        onDelete={deleteUser}
      />
      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        user={userToDelete}
        loading={deleteLoading}
      />
    </div>
  );
}

export default UsersPage;
