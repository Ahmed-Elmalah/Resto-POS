import React, { useState } from 'react';
import toast from 'react-hot-toast';
import TableItem from './TableItem';
import { useTables } from '../../../customHook/useTables'; 

export default function TableGrid({ onSelect, selectedId, isEditMode }) {
  
  const {
    tables,
    loading,
    showModal,
    setShowModal,
    isUpdating,
    formData,
    setFormData,
    openAddModal,
    openEditModal,
    handleFormSubmit,
    handleDelete
  } = useTables();

  // State to handle local submission loading
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate and submit form
  const onFormSubmit = async (e) => {
    e.preventDefault();
    
    // Check if table number already exists (excluding the current table being edited)
    const isDuplicate = tables.some(table => {
      const item = table.attributes || table;
      // If updating, don't check against itself
      if (isUpdating && table.id === formData.id) return false;
      return String(item.table_number) === String(formData.table_number);
    });

    if (isDuplicate) {
      return toast.error(`Table number ${formData.table_number} already exists!`, {
        style: { borderRadius: '10px', background: '#333', color: '#fff' }
      });
    }

    try {
      setIsSubmitting(true);
      await handleFormSubmit(e);
      // Toast success is usually handled inside handleFormSubmit hook, 
      // but we ensure loading state is cleared
    } catch (err) {
      toast.error("Failed to save table");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-slate-500">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
        <p className="font-bold">Loading Floor Plan...</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* 1. Status Legend */}
      <div className="flex justify-center gap-4 mb-12">
        <LegendItem color="bg-emerald-500" label="Available" />
        <LegendItem color="bg-rose-500" label="Busy" />
        <LegendItem color="bg-amber-500" label="Reserved" />
      </div>

      {/* 2. Tables Grid - Responsive columns to prevent stretching */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-8 max-w-5xl mx-auto">
        {tables.map((table) => {
          const item = table.attributes || table;
          const statusMap = { "Busy": "occupied", "Reserved": "reserved", "Available": "free" };
          
          return (
            <TableItem 
              key={table.id}
              id={`T-${item.table_number}`} 
              status={statusMap[item.table_status] || "free"} 
              seats={item.capacity} 
              type={item.capacity >= 5 ? "square" : "circle"}
              showDelete={isEditMode}
              onDelete={() => handleDelete(table.documentId || table.id)}
              onClick={() => isEditMode ? openEditModal(table) : onSelect(table)}
              isSelected={selectedId === table.id}
            />
          );
        })}

        {/* Add Table Placeholder (Edit Mode Only) */}
        {isEditMode && (
          <div 
            onClick={openAddModal} 
            className="aspect-square rounded-full border-2 border-dashed border-slate-400 dark:border-slate-600 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all opacity-60 group"
          >
            <span className="material-symbols-outlined text-4xl text-slate-500 group-hover:text-primary">add</span>
            <span className="text-[10px] font-bold text-slate-500 group-hover:text-primary uppercase tracking-tighter">New Table</span>
          </div>
        )}
      </div>

      {/* 3. Table Management Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 w-full max-w-md shadow-2xl border dark:border-slate-800 animate-in fade-in zoom-in duration-200">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">
              {isUpdating ? `Edit Table T-${formData.table_number}` : 'Create New Table'}
            </h2>
            
            <form onSubmit={onFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Table Number</label>
                <input 
                  type="number" required 
                  disabled={isSubmitting}
                  className="w-full bg-slate-100 dark:bg-slate-800 p-3 rounded-lg dark:text-white outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                  value={formData.table_number}
                  onChange={e => setFormData({...formData, table_number: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Capacity (Seats)</label>
                <input 
                  type="number" required 
                  disabled={isSubmitting}
                  className="w-full bg-slate-100 dark:bg-slate-800 p-3 rounded-lg dark:text-white outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                  value={formData.capacity}
                  onChange={e => setFormData({...formData, capacity: e.target.value})}
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  disabled={isSubmitting}
                  onClick={() => setShowModal(false)} 
                  className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2 disabled:bg-slate-600"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    isUpdating ? 'Update Table' : 'Save Table'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const LegendItem = ({ color, label }) => (
  <div className="flex items-center gap-2 px-3 py-1 rounded-full border dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
    <span className={`size-2.5 rounded-full ${color}`}></span>
    <span className="text-xs font-medium dark:text-slate-300">{label}</span>
  </div>
);