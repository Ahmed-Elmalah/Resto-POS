import  { useEffect, useState } from "react";
import { useMenuStore } from "../../../store/index"; // Import Store
import { domain } from "../../../store/index"; // To show images

export default function ProductPickerModal({ onClose, onSelectProduct }) {
  // 1. Get Data from Store
  const { products, fetchMenuData, isLoading } = useMenuStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMenuData(); // Fetch products when modal opens
  }, []);

  // 2. Filter products based on search
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-[#1a2632] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95">
        
        {/* Header */}
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-[#101922]">
          <h3 className="font-bold text-lg dark:text-white">Select Product</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full p-3 rounded-xl border dark:bg-[#101922] dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Products Grid */}
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {isLoading ? (
            <p className="col-span-3 text-center text-gray-500">Loading Menu...</p>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
               // Handle Image URL safely
               const imgUrl = product.image?.url 
                ? domain + product.image.url 
                : "https://placehold.co/400?text=No+Image";

               return (
                <div 
                  key={product.id} 
                  onClick={() => onSelectProduct(product)}
                  className="cursor-pointer border dark:border-gray-700 rounded-xl overflow-hidden hover:border-primary hover:shadow-md transition group bg-white dark:bg-[#101922]"
                >
                  <div className="h-24 w-full bg-gray-100 overflow-hidden">
                    <img src={imgUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition" />
                  </div>
                  <div className="p-3">
                    <h4 className="font-bold text-sm dark:text-gray-200 truncate">{product.name}</h4>
                    <p className="text-primary font-bold text-xs mt-1">${product.price}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="col-span-3 text-center text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}