import React, { useState } from "react";
import { toast } from "react-hot-toast";
import ProductPickerModal from "./ProductPickerModal"; // Import the modal we just created

export default function OfferItemSelector({ selectedItems, onUpdateItems }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Function called when user clicks a product in the modal
  const handleSelectProduct = (product) => {
    // Check if already exists
    const exists = selectedItems.find((item) => item.id === product.id);
    
    if (exists) {
      toast.error("Product already added! Adjust quantity below.");
    } else {
      // Add new item with initial qty = 1
      const newItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        qty: 1,
        // You can save image url too if you want to show it in the table
      };
      onUpdateItems([...selectedItems, newItem]);
      toast.success("Added!");
    }
    // Don't close modal automatically if you want to select multiple, 
    // OR setIsModalOpen(false) if you want to close after one selection.
    setIsModalOpen(false); 
  };

  // 2. Increase/Decrease Quantity
  const updateQuantity = (id, change) => {
    const updatedList = selectedItems.map((item) => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + change); // Prevent going below 1
        return { ...item, qty: newQty };
      }
      return item;
    });
    onUpdateItems(updatedList);
  };

  // 3. Remove Item
  const handleRemove = (id) => {
    onUpdateItems(selectedItems.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4">
      
      {/* --- Top Bar: Label & Add Button --- */}
      <div className="flex justify-between items-end">
        <label className="block text-sm font-medium dark:text-gray-300">
          Included Products
        </label>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 text-sm bg-primary/10 text-primary px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition font-bold"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Add Product
        </button>
      </div>

      {/* --- The "Mini Cart" List --- */}
      <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-xl min-h-30 bg-gray-50 dark:bg-[#101922] p-4 flex flex-col justify-center">
        
        {selectedItems.length === 0 ? (
          // Empty State
          <div className="text-center text-gray-400 flex flex-col items-center gap-2">
            <span className="material-symbols-outlined text-3xl">fastfood</span>
            <p className="text-sm">No products added yet. Click "Add Product".</p>
          </div>
        ) : (
          // Items List
          <div className="space-y-3 w-full">
            {selectedItems.map((item, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between bg-white dark:bg-[#1a2632] p-3 rounded-lg shadow-sm border dark:border-gray-700 animate-in fade-in slide-in-from-bottom-2"
              >
                {/* Name & Price */}
                <div>
                  <h4 className="font-bold text-sm dark:text-gray-200">{item.name}</h4>
                  <p className="text-xs text-gray-500">${item.price} / unit</p>
                </div>

                {/* Actions: Qty & Delete */}
                <div className="flex items-center gap-4">
                  {/* Quantity Control */}
                  <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                    <button 
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-6 h-6 flex items-center justify-center hover:bg-white dark:hover:bg-gray-600 rounded-md transition"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold text-sm dark:text-white">{item.qty}</span>
                    <button 
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-6 h-6 flex items-center justify-center hover:bg-white dark:hover:bg-gray-600 rounded-md transition"
                    >
                      +
                    </button>
                  </div>

                  {/* Delete Button */}
                  <button 
                    type="button"
                    onClick={() => handleRemove(item.id)}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- Modal Injection --- */}
      {isModalOpen && (
        <ProductPickerModal 
          onClose={() => setIsModalOpen(false)}
          onSelectProduct={handleSelectProduct}
        />
      )}
    </div>
  );
}