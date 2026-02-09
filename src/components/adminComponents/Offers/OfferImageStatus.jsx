import React from "react";
import { domain } from "../../../store";

// This component handles the Image Display/Upload and Availability Toggle
export default function OfferImageStatus({
  isEditing,
  preview,
  offerImage, // URL string
  offerName,
  handleImageChange,
  formData,
  setFormData,
  statusBadge, // { text, color }
  isExpired
}) {
  return (
    <div className="lg:col-span-1 space-y-6">
      {/* --- Image Section --- */}
      <div className="bg-white dark:bg-[#1a2632] rounded-2xl p-2 border dark:border-gray-700 shadow-sm relative overflow-hidden group">
        <img
          src={
            isEditing && preview
              ? preview
              : offerImage
              ? domain + offerImage
              : "https://placehold.co/600x400"
          }
          alt={offerName}
          className="w-full h-64 object-cover rounded-xl"
        />

        {/* Upload Overlay (Visible only in Edit Mode) */}
        {isEditing && (
          <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition duration-300">
            <span className="material-symbols-outlined text-white text-4xl">
              cloud_upload
            </span>
            <span className="text-white font-bold mt-2">Change Image</span>
            <input
              type="file"
              className="hidden"
              onChange={handleImageChange}
              accept="image/*"
            />
          </label>
        )}
      </div>

      {/* --- Status & Availability Section --- */}
      <div className="bg-white dark:bg-[#1a2632] p-6 rounded-2xl border dark:border-gray-700 shadow-sm">
        <h3 className="text-gray-500 text-sm font-bold uppercase mb-4">
          Availability
        </h3>

        {isEditing ? (
          // Edit Mode: Toggle Switch
          <div className="flex items-center justify-between">
            <span className="dark:text-white font-medium">Is Available?</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={formData.isAvailable}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isAvailable: e.target.checked,
                  })
                }
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>
        ) : (
          // View Mode: Status Badge
          <div className="flex items-center justify-between">
            <span className="dark:text-white font-bold">Current Status</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border ${statusBadge.color}`}
            >
              {statusBadge.text}
            </span>
          </div>
        )}

        {!isEditing && (
          <p className="text-xs text-gray-400 mt-3">
            {isExpired
              ? "This offer has expired automatically."
              : "Offer is controlled by availability toggle and expiry date."}
          </p>
        )}
      </div>
    </div>
  );
}