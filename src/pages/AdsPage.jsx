// pages/AdsPage.jsx
import React, { useEffect, useState } from "react";
import { MdPerson, MdRefresh, MdSearch, MdFilterList } from "react-icons/md";
import { HiLocationMarker, HiTag, HiClock } from "react-icons/hi";
import { BiLoaderAlt } from "react-icons/bi";
import useUserStore from "../store/useUserStore";
import useAdStore from "../store/useAdStore"; // adjust to your actual ad store
import UserProfileOverlay from "../components/users/UserProfileOverlay";
export default function AdsPage() {
  const { users, fetchAllUsers, findUserById, deleteUser, deleteLoading } =
    useUserStore();
  const { ads, fetchAllAds, loading: adsLoading } = useAdStore();

  const [selectedUser, setSelectedUser] = useState(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAllAds();
    fetchAllUsers();
  }, []);

  // Attach user object to each ad
  const allAdsArray = Object.values(ads).flat(); // Combines all type arrays into one

  const adsWithUsers = allAdsArray.map((ad) => ({
    ...ad,
    user: findUserById(ad.userId),
  }));

  // Filter by search
  const filtered = adsWithUsers.filter((ad) => {
    const q = search.toLowerCase();
    return (
      !q ||
      ad.title?.toLowerCase().includes(q) ||
      ad.category?.toLowerCase().includes(q) ||
      ad.user?.fullName?.toLowerCase().includes(q)
    );
  });

  const handleUserClick = (user) => {
    if (!user) return;
    setSelectedUser(user);
    setOverlayOpen(true);
  };

  const handleDeleteUser = async (userId) => {
    const result = await deleteUser(userId);
    if (result.success) {
      setOverlayOpen(false);
      setSelectedUser(null);
    }
  };

  const formatBudget = (ad) => {
    if (ad.adType === "stockad") return `MRP ₹${ad.mrp ?? "—"}`;
    if (ad.budget?.min || ad.budget?.max)
      return `₹${ad.budget.min ?? "—"} – ₹${ad.budget.max ?? "—"}`;
    return null;
  };

  const adTypeBadge = (ad) => {
    if (ad.adType === "stockad")
      return (
        <span className="text-xs bg-orange-100 text-orange-600 font-semibold px-2 py-0.5 rounded-full">
          Stock
        </span>
      );
    if (ad.product === "service")
      return (
        <span className="text-xs bg-blue-100 text-blue-600 font-semibold px-2 py-0.5 rounded-full">
          Service
        </span>
      );
    return (
      <span className="text-xs bg-green-100 text-green-600 font-semibold px-2 py-0.5 rounded-full">
        Goods
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5 mb-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Ads</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {filtered.length} ad{filtered.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search ads or users..."
                className="pl-9 pr-4 py-2 text-sm bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-indigo-300 w-56 transition"
              />
            </div>

            {/* Refresh */}
            <button
              onClick={() => {
                fetchAllAds();
                fetchAllUsers();
              }}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition"
              title="Refresh"
            >
              <MdRefresh className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Loading */}
      {adsLoading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400">
          <BiLoaderAlt className="animate-spin text-4xl text-indigo-400" />
          <p className="text-sm">Loading ads...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-2 text-gray-400">
          <span className="text-5xl">📭</span>
          <p className="text-base font-medium">No ads found</p>
          {search && <p className="text-sm">Try a different search term</p>}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((ad) => (
            <AdCard
              key={ad._id}
              ad={ad}
              adTypeBadge={adTypeBadge}
              formatBudget={formatBudget}
              onUserClick={handleUserClick}
            />
          ))}
        </div>
      )}

      {/* User Profile Overlay */}
      <UserProfileOverlay
        user={selectedUser}
        isOpen={overlayOpen}
        onClose={() => {
          setOverlayOpen(false);
          setSelectedUser(null);
        }}
        onDelete={handleDeleteUser}
        deleteLoading={deleteLoading}
      />
    </div>
  );
}

// ─── Ad Card ────────────────────────────────────────────────────────────────
function AdCard({ ad, adTypeBadge, formatBudget, onUserClick }) {
  const user = ad.user;
  const budget = formatBudget(ad);

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
      {/* Ad Image / Placeholder */}
      <div className="relative h-36 bg-gradient-to-br from-indigo-50 to-purple-50 overflow-hidden">
        {ad.media?.images?.[0] ? (
          <img
            src={ad.media.images[0]}
            alt={ad.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl opacity-30">
            {ad.adType === "stockad"
              ? "📦"
              : ad.product === "service"
                ? "🛠️"
                : "🛒"}
          </div>
        )}

        {/* Ad type badge */}
        <div className="absolute top-2 left-2">{adTypeBadge(ad)}</div>

        {/* Budget */}
        {budget && (
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm">
            {budget}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4">
        {/* Category */}
        {ad.category && (
          <div className="flex items-center gap-1 text-xs text-indigo-400 font-medium mb-1 capitalize">
            <HiTag className="text-sm" />
            {ad.category}
          </div>
        )}

        {/* Title */}
        <h3 className="text-sm font-bold text-gray-800 leading-snug line-clamp-2 mb-2">
          {ad.title || "Untitled Ad"}
        </h3>

        {/* Description */}
        {ad.description && (
          <p className="text-xs text-gray-400 line-clamp-2 mb-3">
            {ad.description}
          </p>
        )}

        {/* Divider */}
        <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
          {/* User pill — click to open overlay */}
          <button
            onClick={() => onUserClick(user)}
            disabled={!user}
            title={user ? `View ${user.fullName}'s profile` : "User not found"}
            className={`flex items-center gap-2 rounded-full px-2 py-1 transition-all text-left max-w-[70%] ${
              user
                ? "hover:bg-indigo-50 cursor-pointer"
                : "opacity-40 cursor-not-allowed"
            }`}
          >
            {/* Avatar */}
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
              {user?.profilePic ? (
                <img
                  src={user.profilePic}
                  alt={user.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white text-xs font-bold">
                  {user ? getInitials(user.fullName) : "?"}
                </span>
              )}
            </div>
            <span className="text-xs font-semibold text-gray-700 truncate">
              {user?.fullName ?? "Unknown User"}
            </span>
          </button>

          {/* Ad ID */}
          <span className="text-xs text-gray-300 font-mono shrink-0">
            #{ad._id?.slice(-5)}
          </span>
        </div>
      </div>
    </div>
  );
}
