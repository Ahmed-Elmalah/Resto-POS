import React from "react";
import OfferItemSelector from "./OfferItemSelector";

// This component handles the Inputs, Description, and Product Selection
export default function OfferForm({
  isEditing,
  handleSave,
  formData,
  setFormData,
  isLoading,
  setIsEditing,
  offer, // Original data for View Mode
  selectedProducts,
  setSelectedProducts
}) {
  return (
    <div className="lg:col-span-2 space-y-6">
      <form
        onSubmit={handleSave}
        className="bg-white dark:bg-[#1a2632] p-8 rounded-2xl border dark:border-gray-700 shadow-sm space-y-6"
      >
        {/* --- Top Inputs (Name, Price, Date) --- */}
        <div className="flex justify-between items-start">
          <div className="w-full">
            {isEditing ? (
              // Edit Mode: Inputs
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500 font-bold">
                    Offer Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full mt-1 p-2 rounded-lg border dark:bg-[#101922] dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500 font-bold">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="w-full mt-1 p-2 rounded-lg border dark:bg-[#101922] dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 font-bold">
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      value={formData.expiryDate}
                      onChange={(e) =>
                        setFormData({ ...formData, expiryDate: e.target.value })
                      }
                      className="w-full mt-1 p-2 rounded-lg border dark:bg-[#101922] dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            ) : (
              // View Mode: Text Display
              <>
                <h1 className="text-3xl font-black dark:text-white mb-2">
                  {offer.name}
                </h1>
                <div className="flex items-center gap-4 text-gray-500 text-sm">
                  <span className="font-bold text-primary text-xl">
                    ${offer.price}
                  </span>
                  <span>•</span>
                  <span>Expires: {offer.expiryDate}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* --- Description --- */}
        <div className="border-t dark:border-gray-700 pt-6">
          <h3 className="font-bold dark:text-white mb-3">Description</h3>
          {isEditing ? (
            <textarea
              rows="4"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-3 rounded-lg border dark:bg-[#101922] dark:border-gray-600 dark:text-white"
            ></textarea>
          ) : (
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {offer.description}
            </p>
          )}
        </div>

        {/* --- Products Section --- */}
        <div className="border-t dark:border-gray-700 pt-6">
          <h3 className="font-bold dark:text-white mb-3">Included Products</h3>

          {isEditing ? (
            // Edit Mode: Selector Component
            <OfferItemSelector
              selectedItems={selectedProducts}
              onUpdateItems={setSelectedProducts}
            />
          ) : (
            // View Mode: Static List
            <div className="space-y-2">
              {offer.products?.length > 0 ? (
                offer.products.map((prod) => (
                  <div
                    key={prod.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#101922] rounded-lg"
                  >
                    <span className="dark:text-white font-medium">
                      {prod.name}
                    </span>
                    <span className="text-primary font-bold">
                      ${prod.price}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 italic">
                  No specific products linked.
                </p>
              )}
            </div>
          )}
        </div>

        {/* --- Actions (Save / Cancel) --- */}
        {isEditing && (
          <div className="flex justify-end gap-3 pt-4 border-t dark:border-gray-700">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition dark:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 rounded-lg bg-primary text-white font-bold hover:bg-blue-600 transition disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading && (
                <span className="material-symbols-outlined animate-spin text-sm">
                  progress_activity
                </span>
              )}
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
}