import React from "react";
import { HiOutlineArrowLeft, HiPencil, HiTrash } from "react-icons/hi";

// This component handles the top navigation bar and action buttons
export default function OfferDetailsHeader({ 
  navigate, 
  isEditing, 
  setIsEditing, 
  handleDelete 
}) {
  return (
    <div className="flex justify-between items-center mb-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-primary transition"
      >
        <HiOutlineArrowLeft className="text-xl" />
        <span className="font-bold">Back</span>
      </button>

      {/* Action Buttons (Edit / Delete) - Only show when NOT editing */}
      <div className="flex gap-3">
        {!isEditing && (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition font-bold"
            >
              <HiPencil /> Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-bold"
            >
              <HiTrash /> Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}