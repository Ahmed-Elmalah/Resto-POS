import React from 'react';
import { MdCloudUpload, MdDelete } from 'react-icons/md';

export default function ImageUploader({ imagePreview, onImageChange, onRemove }) {
  return (
    <div className="bg-white dark:bg-[#1a2632] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">Product Image</h3>
      
      <div className={`relative w-full aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-colors
        ${imagePreview 
          ? 'border-primary bg-slate-50 dark:bg-slate-900' 
          : 'border-slate-300 dark:border-slate-700 hover:border-primary hover:bg-slate-50 dark:hover:bg-slate-800/50'
        }
      `}>
        
        {imagePreview ? (
          <>
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
            <button 
              type="button"
              onClick={onRemove}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-transform hover:scale-105"
            >
              <MdDelete size={20} />
            </button>
          </>
        ) : (
          <>
            <MdCloudUpload size={48} className="text-slate-400 mb-2" />
            <p className="text-sm text-slate-500 font-medium">Click to upload image</p>
            <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
          </>
        )}
        
        <input 
          type="file" 
          accept="image/*"
          onChange={onImageChange}
          className={`absolute inset-0 w-full h-full opacity-0 ${imagePreview ? 'hidden' : 'cursor-pointer'}`}
        />
      </div>
    </div>
  );
}