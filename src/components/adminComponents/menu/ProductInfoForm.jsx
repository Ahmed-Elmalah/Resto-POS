import { MdDelete, MdSave } from 'react-icons/md';

export default function ProductInfoForm({ 
  formData, 
  handleInputChange, 
  handleToggle, 
  categories, 
  loading, 
  fetchingCats,
  isEditMode, 
  onCancel ,
  onDelete
}) {
  return (
    <div className="bg-white dark:bg-[#1a2632] p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">General Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Product Name */}
        <div className="col-span-2">
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Product Name <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g. Double Cheese Burger"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-slate-900 dark:text-white transition-all font-medium"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Price ($) <span className="text-red-500">*</span></label>
          <input 
            type="number" 
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="0.00"
            min="0"
            step="0.01"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-slate-900 dark:text-white transition-all font-medium"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Category <span className="text-red-500">*</span></label>
          <div className="relative">
            <select 
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              disabled={fetchingCats}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-slate-900 dark:text-white transition-all font-medium appearance-none cursor-pointer"
            >
              <option value="" disabled>Select Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Description</label>
          <textarea 
            name="desc"
            value={formData.desc}
            onChange={handleInputChange}
            rows="4"
            placeholder="Enter product description..."
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-slate-900 dark:text-white transition-all font-medium resize-none"
          ></textarea>
        </div>

        {/* Availability Toggle */}
        <div className="col-span-2 flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800">
            <div className={`relative w-12 h-6 rounded-full transition-colors duration-300 cursor-pointer ${formData.isAvailable ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`} onClick={handleToggle}>
                <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 shadow-sm ${formData.isAvailable ? 'translate-x-6' : ''}`}></div>
            </div>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Available for Order?
            </span>
        </div>
      </div>

      {/* --- Action Buttons --- */}
      <div className={`flex items-center mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 ${isEditMode ? 'justify-between' : 'justify-end'}`}>
        
        {/* 🔥 Delete Button (Shows only in Edit Mode) */}
        {isEditMode && (
          <button 
            type="button"
            onClick={onDelete}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 border border-transparent hover:border-red-200 dark:hover:border-red-800 transition-all"
          >
            <MdDelete size={20} />
            <span className="hidden sm:inline">Delete Product</span>
          </button>
        )}

        <div className="flex gap-4">
            <button 
            type="button"
            onClick={onCancel}
            className="px-6 py-2 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
            Cancel
            </button>
            
            <button 
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-8 py-2 rounded-xl font-bold text-white bg-primary hover:bg-primary-hover shadow-lg shadow-primary/25 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
            {loading ? 'Saving...' : (
                <>
                <MdSave size={20} />
                {isEditMode ? 'Update' : 'Save'}
                </>
            )}
            </button>
        </div>
      </div>
    </div>
  );
}