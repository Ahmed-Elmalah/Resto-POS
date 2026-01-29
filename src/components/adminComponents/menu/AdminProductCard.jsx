import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import MenuRepo from '../../../customHook/MenuRepo'; 
import { useNavigate } from 'react-router-dom';

export default function AdminProductCard({ product }) {
  const navigate = useNavigate();

  const token = localStorage.getItem('jwt-token') || sessionStorage.getItem('jwt-token'); 

  const domain = '';

  const { 
    id, 
    documentId,
    name, 
    desc, 
    price, 
    category,
    image,
    isAvailable 
  } = product;

  const [inStock, setInStock] = useState(isAvailable);
  const [isUpdating, setIsUpdating] = useState(false); // عشان نمنع التكرار (Debounce)

  const toggleStock = async () => {
    if (!token) {
      alert("You are not authorized! Please login again.");
      return;
    }

    if (isUpdating) return; 
    setIsUpdating(true);
    
    const newStatus = !inStock;
    
    setInStock(newStatus);

    try {
      const targetId = documentId || id;
      
      await MenuRepo.updateProduct(targetId, { isAvailable: newStatus }, token);
      console.log(`✅ Product ${name} updated successfully`);

    } catch (error) {
      console.error("❌ Failed to update stock:", error);
      setInStock(!newStatus);
      alert("Failed to update status. Check console for details.");
    } finally {
      setIsUpdating(false);
    }
  };

  const imageUrl = image?.url 
    ? `${domain}${image.url}` 
    : "https://placehold.co/400x300?text=No+Image";

  return (
    <div className={`group bg-white dark:bg-[#1a2632] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:border-primary/50 transition-all duration-300 flex flex-col ${!inStock ? 'opacity-90' : ''}`}>
      
      {/* Image Section */}
      <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
        <img 
            src={imageUrl} 
            alt={name}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${!inStock ? 'grayscale' : ''}`}
            referrerPolicy="no-referrer"
            onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "https://placehold.co/400x300?text=Error";
            }}
        />
        
        {/* Out of Stock Overlay */}
        {!inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-[1px]">
                <span className="bg-red-500 text-white px-3 py-1 rounded-lg font-bold text-sm shadow-lg border border-white/20 transform rotate-[-5deg]">
                    Out of Stock
                </span>
            </div>
        )}

        {/* Edit Button */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <button onClick={()=> navigate(`/admin/menu/edit/${documentId || id}`)} className="bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-2 rounded-lg transition-colors">
            <MdEdit size={18} />
          </button>
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent">
          <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-sm">
            {category?.name || "General"}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="text-slate-900 dark:text-white font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1">
            {name}
          </h3>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-4">
          {desc || "No description"}
        </p>

        {/* Footer (Price & Toggle) */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
          <span className="text-slate-900 dark:text-white font-bold text-lg">${Number(price).toFixed(2)}</span>
          
          <div className="flex items-center gap-3">
            <span className={`text-xs font-medium ${inStock ? 'text-green-600' : 'text-red-500'}`}>
                {inStock ? 'In Stock' : 'Out Stock'}
            </span>
            
            {/* toggle btn*/}
            <button 
                onClick={toggleStock}
                disabled={isUpdating}
                className={`w-10 h-6 rounded-full relative transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary 
                  ${inStock ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'} 
                  ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
            >
                <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 shadow-sm ${inStock ? 'translate-x-4' : ''}`}></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}