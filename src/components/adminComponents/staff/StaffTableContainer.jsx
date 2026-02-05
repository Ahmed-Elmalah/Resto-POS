import { useState } from "react";
import {
  MdEdit,
  MdDelete,
  MdEmail,
  MdBadge,
  MdPhone,
  MdVisibility,
} from "react-icons/md";
import Swal from "sweetalert2";
import LoginRepo from "../../../customHook/LoginRepo";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CashierSalesModal from "./CashierSalesModal";
import StaffDetailsModal from "./StaffDetailsModal";

export default function StaffTableContainer({ users = [], refreshData }) {
  const navigate = useNavigate();
  // --- States ---
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  // --- Handlers ---

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  //  Delete Handler
  const handleDelete = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      background: document.documentElement.classList.contains("dark")
        ? "#1e293b"
        : "#ffffff",
      color: document.documentElement.classList.contains("dark")
        ? "#f8fafc"
        : "#0f172a",
    });

    if (result.isConfirmed) {
      const token =
        sessionStorage.getItem("jwt-token") ||
        localStorage.getItem("jwt-token");
      const loadingToast = toast.loading("Deleting user...");
      try {
        await LoginRepo.deleteUser(userId, token);
        toast.success("User deleted successfully", { id: loadingToast });
        refreshData(); // Refresh table
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete user", { id: loadingToast });
      }
    }
  };

  // Filter & Search Logic
  const filteredUsers = users.filter((user) => {
    if (!user) return false;
    const matchesSearch =
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole =
      roleFilter === "All" ||
      user.role?.name?.toLowerCase() === roleFilter.toLowerCase() ||
      (roleFilter === "User" && user.role?.name === "Authenticated");

    return matchesSearch && matchesRole;
  });

  return (
    <div className="bg-white dark:bg-[#1a2632] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col">
      {/* --- Tabs (Optional, can be used for status filter later) --- */}
      <div className="border-b border-gray-100 dark:border-gray-800 px-4 md:px-6 flex gap-4 md:gap-8 overflow-x-auto no-scrollbar">
        <button
          className={`pb-3 pt-4 border-b-2 font-bold text-sm whitespace-nowrap transition-colors ${roleFilter === "All" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"}`}
          onClick={() => setRoleFilter("All")}
        >
          All Staff
        </button>
        <button
          className={`pb-3 pt-4 border-b-2 font-bold text-sm whitespace-nowrap transition-colors ${roleFilter === "Admin" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"}`}
          onClick={() => setRoleFilter("Admin")}
        >
          Admins
        </button>
        <button
          className={`pb-3 pt-4 border-b-2 font-bold text-sm whitespace-nowrap transition-colors ${roleFilter === "Casher" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"}`}
          onClick={() => setRoleFilter("Casher")}
        >
          Cashiers
        </button>
      </div>

      {/* --- Toolbar (Search & Export) --- */}
      <div className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/50 dark:bg-gray-800/30">
        {/* Search Input */}
        <div className="relative w-full md:w-80 group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          />
        </div>
      </div>

      {/* --- Table Section --- */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse min-w-200">
          <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-xs uppercase font-bold tracking-wider">
            <tr>
              <th className="py-4 px-6">Employee</th>
              <th className="py-4 px-6">Contact Info</th>
              <th className="py-4 px-6">Role</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="group hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                >
                  {/* Employee Name & Avatar */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-linear-to-br from-primary to-orange-400 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <div className="truncate max-w-37.5">
                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                          {user.username}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          ID: #{user.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Contact Info (Email & Phone) */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
                        <MdEmail className="text-gray-400 text-xs" />
                        <span className="truncate max-w-45">{user.email}</span>
                      </div>
                      {user.phone_number && (
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs">
                          <MdPhone className="text-gray-400 text-xs" />
                          <span>{user.phone_number}</span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Role Badge */}
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                        user.role?.name === "Admin"
                          ? "bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-300"
                          : user.role?.name === "Cashier" ||
                              user.role?.name === "Casher"
                            ? "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300"
                            : "bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <MdBadge size={14} />
                      {user.role?.name || "User"}
                    </span>
                  </td>

                  {/* Status (Mocked for now) */}
                  <td className="py-4 px-6">
                    <div
                      className={`flex items-center gap-1.5 text-xs font-bold ${user.blocked ? "text-red-500" : "text-green-600"}`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${user.blocked ? "bg-red-500" : "bg-green-600"}`}
                      ></span>
                      <span>{user.blocked ? "Blocked" : "Active"}</span>
                    </div>
                  </td>

                  {/* Actions Buttons */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      {/* View Details */}
                      <button
                        onClick={() => handleViewDetails(user)}
                        className="p-2 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        title="View Details"
                      >
                        <MdVisibility size={18} />
                      </button>

                      {/* Edit */}
                      <button
                        className="p-2 rounded-lg text-gray-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
                        title="Edit User"
                        onClick={() => navigate(`/admin/staff/edit/${user.id}`)}
                      >
                        <MdEdit size={18} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        title="Delete User"
                      >
                        <MdDelete size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="py-10 text-center text-gray-500 dark:text-gray-400"
                >
                  No staff members found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <StaffDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={selectedUser}
        />
      </div>
    </div>
  );
}
