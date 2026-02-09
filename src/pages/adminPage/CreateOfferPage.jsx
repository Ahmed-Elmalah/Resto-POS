import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAdminStore from "../../store/useAdminStore";
import { toast } from "react-hot-toast";
import OfferItemSelector from "../../components/adminComponents/Offers/OfferItemSelector";
import { HiOutlineArrowLeft } from "react-icons/hi";

export default function CreateOfferPage() {
  const navigate = useNavigate();

  // Get functions from store
  const { uploadFile, createOffer } = useAdminStore();

  const [isLoading, setIsLoading] = useState(false);

  // State for image file and preview
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // State for form fields (Using 'name' as you requested)
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    expiryDate: "",
    isAvailable: true,
  });

  // --- Store Selected Items (Array of objects: {id, name, qty}) ---
  const [offerItems, setOfferItems] = useState([]);

  // Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create a fake URL to show preview
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle Submit (The Main Logic)
  const handleSubmit = async (e) => {
    e.preventDefault();

// Validations
    if (!imageFile) return toast.error("Please select an image");
    if (!form.name || !form.price) return toast.error("Name and Price are required");
    if (offerItems.length === 0) return toast.error("Please select at least one product");

    setIsLoading(true);

    try {
      // Step 1: Upload the image to Strapi
      const uploadedImg = await uploadFile(imageFile);
      const imageId = uploadedImg.id; // We only need the ID

      // 2. Extract just IDs for Strapi Relation
      const productIds = offerItems.map(item => item.id);

      // Step 2: Prepare data object
      const offerData = {
        name: form.name, 
        description: form.description,
        price: Number(form.price), 
        expiryDate: form.expiryDate,
        isAvailable: form.isAvailable,
        image: imageId, 
        products: productIds,
      };

      // Step 3: Send data to Strapi
      const result = await createOffer(offerData);

      if (result.success) {
        toast.success("Offer Created Successfully!");
        navigate("/admin/promotions"); 
      } else {
        toast.error("Failed to create offer");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

    return (
    <div className="p-6 max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-300">
      <div className="w-full flex justify-between items-center p-3">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-slate-400 hover:text-primary transition-all font-black text-xs uppercase italic tracking-tighter"
        >
          <div className="size-10 text-[16px] rounded-full border border-slate-200 dark:border-[#283039] flex items-center justify-center group-hover:border-primary transition-colors">
            <HiOutlineArrowLeft />
          </div>
          <h2 className="text-[13px]">Back to Offers</h2>
        </button>
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold dark:text-white">Create New Offer</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1a2632] p-8 rounded-xl border border-gray-200 dark:border-gray-700 space-y-6 shadow-sm">
        
        {/* --- 1. Image Upload --- */}
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
          {preview ? (
            <div className="relative w-full h-64">
              <img src={preview} alt="Preview" className="w-full h-full object-contain rounded-md" />
              <button 
                type="button" 
                onClick={() => { setPreview(null); setImageFile(null); }}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          ) : (
            <label className="cursor-pointer flex flex-col items-center w-full h-full">
              <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">cloud_upload</span>
              <span className="text-sm text-gray-500">Click to upload offer image</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          )}
        </div>

        {/* --- 2. Basic Info Fields --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Offer Name</label>
            <input 
              type="text" 
              className="w-full p-3 rounded-lg border dark:bg-[#101922] dark:border-gray-700 outline-none focus:border-primary dark:text-white"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Price ($)</label>
            <input 
              type="number" 
              className="w-full p-3 rounded-lg border dark:bg-[#101922] dark:border-gray-700 outline-none focus:border-primary dark:text-white"
              value={form.price}
              onChange={(e) => setForm({...form, price: e.target.value})}
            />
          </div>
        </div>

        {/* --- 3. Product Selection Component (HERE IS THE NEW PART) --- */}
        <div>
          <OfferItemSelector 
             selectedItems={offerItems} 
             onUpdateItems={setOfferItems} 
          />
        </div>

        {/* --- 4. Dates & Desc --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Expiry Date</label>
            <input 
              type="date" 
              className="w-full p-3 rounded-lg border dark:bg-[#101922] dark:border-gray-700 outline-none focus:border-primary dark:text-white"
              value={form.expiryDate}
              onChange={(e) => setForm({...form, expiryDate: e.target.value})}
            />
          </div>
           <div className="flex items-center pt-8">
            <label className="flex items-center cursor-pointer gap-3">
              <input 
                type="checkbox" 
                checked={form.isAvailable}
                onChange={(e) => setForm({...form, isAvailable: e.target.checked})}
                className="w-5 h-5 accent-primary"
              />
              <span className="dark:text-white font-medium">Is Available?</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 dark:text-gray-300">Description</label>
          <textarea 
            rows="3" 
            className="resize-none w-full p-3 rounded-lg border dark:bg-[#101922] dark:border-gray-700 outline-none focus:border-primary dark:text-white"
            value={form.description}
            onChange={(e) => setForm({...form, description: e.target.value})}
          ></textarea>
        </div>

        {/* --- 5. Action Buttons --- */}
        <div className="flex justify-end gap-4 pt-4 border-t dark:border-gray-700">
          <button 
            type="button" 
            onClick={() => navigate('/admin/promotions')}
            className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition dark:text-white"
          >
            Cancel
          </button>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="px-6 py-2 rounded-lg bg-primary text-white font-bold hover:bg-blue-600 transition disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading && <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>}
            {isLoading ? "Saving..." : "Create Offer"}
          </button>
        </div>
      </form>
    </div>
  );
}