import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md';

export default function AdminProductCard({ product }) {
  // داتا افتراضية
  const { 
    name = "Spicy Beef Ramen", 
    description = "Slow-cooked beef broth...", 
    price = 18.00, 
    category = "Main Course",
    image = "https://images.unsplash.com/photo-1569718212165-3a8278d5f624",
    inStock: initialStock = true, // الاسم هنا عشان نفرق بين البروب والستيت
    categoryColor = "bg-primary"
  } = product || {};

  // 1. حالة الستوك (State)
  const [inStock, setInStock] = useState(initialStock);

  // دالة تغيير الحالة
  const toggleStock = () => {
    setInStock(!inStock);
    // هنا المفروض نبعت للباك اند مستقبلاً
    console.log(`Product ${name} stock changed to: ${!inStock}`);
  };

  return (
    <div className={`group bg-white dark:bg-[#1a2632] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:border-primary/50 transition-all duration-300 flex flex-col ${!inStock ? 'opacity-90' : ''}`}>
      
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* الصورة بتتحول لرمادي لو out of stock */}
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 ${!inStock ? 'grayscale' : ''}`}
          style={{ backgroundImage: `url('${image}')` }}
        ></div>
        
        {/* Out of Stock Overlay - بيظهر بس لما الحالة تكون false */}
        {!inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-[1px]">
                <span className="bg-red-500 text-white px-3 py-1 rounded-lg font-bold text-sm shadow-lg border border-white/20 transform rotate-[-5deg]">
                    Out of Stock
                </span>
            </div>
        )}

        {/* Edit Button */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <button className="bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-2 rounded-lg transition-colors">
            <MdEdit size={18} />
          </button>
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <span className={`${categoryColor} text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-sm`}>
            {category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="text-slate-900 dark:text-white font-bold text-lg leading-tight group-hover:text-primary transition-colors">
            {name}
          </h3>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-4">
          {description}
        </p>

        {/* Footer (Price & Toggle) */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
          <span className="text-slate-900 dark:text-white font-bold text-lg">${price.toFixed(2)}</span>
          
          <div className="flex items-center gap-3">
            <span className={`text-xs font-medium ${inStock ? 'text-green-600' : 'text-red-500'}`}>
                {inStock ? 'In Stock' : 'Out Stock'}
            </span>
            
            {/* 2. زرار التوغل الشغال */}
            <button 
                onClick={toggleStock}
                className={`w-10 h-6 rounded-full relative transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${inStock ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'}`}
            >
                <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 shadow-sm ${inStock ? 'translate-x-4' : ''}`}></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}