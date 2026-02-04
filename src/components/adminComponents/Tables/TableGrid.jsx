import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // 1. Import SweetAlert2
import TableItem from './TableItem';

export default function TableGrid({ onSelect, selectedId, isEditMode }) {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentTableId, setCurrentTableId] = useState(null);
  const [formData, setFormData] = useState({ table_number: '', capacity: 4 });

  const API_URL = 'http://82.112.241.233:2010/api/tables';

  // 2. Setup SweetAlert2 Toast configuration
  const Toast = Swal.mixin({
    toast: true,
    position: 'top', 
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    
    background: document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff',
    color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#0f172a',
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });
  const fetchTables = async () => {
    try {
      const response = await axios.get(API_URL);
      setTables(response.data.data || []);
      setLoading(false);
    } catch (err) { console.error("Fetch Error:", err); }
  };

  useEffect(() => { fetchTables(); }, []);

  const openAddModal = () => {
    setIsUpdating(false);
    setFormData({ table_number: '', capacity: 4 });
    setShowModal(true);
  };

  const openEditModal = (table) => {
    const item = table.attributes || table;
    setIsUpdating(true);
    setCurrentTableId(table.documentId || table.id);
    setFormData({ table_number: item.table_number, capacity: item.capacity });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUpdating) {
        await axios.put(`${API_URL}/${currentTableId}`, {
          data: {
            table_number: parseInt(formData.table_number),
            capacity: parseInt(formData.capacity)
          }
        });
        Toast.fire({ icon: 'success', title: 'Table updated successfully' });
      } else {
        await axios.post(API_URL, {
          data: {
            table_number: parseInt(formData.table_number),
            capacity: parseInt(formData.capacity),
            table_status: "Available"
          }
        });
        Toast.fire({ icon: 'success', title: 'New table added successfully' });
      }
      setShowModal(false);
      fetchTables();
    } catch (err) {
      Toast.fire({ icon: 'error', title: 'Action failed' });
    }
  };

  const handleDelete = async (docId) => {
    // 3. Use SweetAlert2 for Delete Confirmation
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      background: '#1e293b', // Match your dark theme
      color: '#fff'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/${docId}`);
        setTables(prev => prev.filter(t => (t.documentId || t.id) !== docId));
        Toast.fire({ icon: 'success', title: 'Table has been deleted' });
      } catch (err) {
        Toast.fire({ icon: 'error', title: 'Delete failed' });
      }
    }
  };

  if (loading) return <div className="text-center p-10 text-slate-500 font-bold">Loading Floor...</div>;

  return (
    <div className="relative">
      <div className="flex justify-center gap-4 mb-12">
        <LegendItem color="bg-emerald-500" label="Available" />
        <LegendItem color="bg-rose-500" label="Busy" />
        <LegendItem color="bg-amber-500" label="Reserved" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 max-w-5xl mx-auto">
        {tables.map((table) => {
          const item = table.attributes || table;
          const docId = table.documentId || table.id;
          const statusMap = { "Busy": "occupied", "Reserved": "reserved", "Available": "free" };
          const statusKey = statusMap[item.table_status] || "free";

          return (
            <TableItem 
              key={table.id}
              id={`T-${item.table_number}`} 
              status={statusKey} 
              seats={item.capacity} 
              type={item.capacity >= 5 ? "square" : "circle"}
              showDelete={isEditMode}
              onDelete={() => handleDelete(docId)}
              onClick={() => isEditMode ? openEditModal(table) : onSelect(table)}
              isSelected={selectedId === table.id}
            />
          );
        })}

        {isEditMode && (
          <div 
            onClick={openAddModal} 
            className="aspect-square rounded-full border-2 border-dashed border-slate-600 flex flex-col items-center justify-center cursor-pointer hover:bg-primary/5 hover:border-primary transition-all opacity-60 group"
          >
            <span className="material-symbols-outlined text-4xl text-slate-500 group-hover:text-primary">add</span>
            <span className="text-[10px] font-bold text-slate-500 group-hover:text-primary uppercase tracking-tighter">New Table</span>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 w-full max-w-md shadow-2xl border dark:border-slate-800 animate-in fade-in zoom-in duration-200">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">
              {isUpdating ? `Edit Table T-${formData.table_number}` : 'Create New Table'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Table Number</label>
                <input 
                  type="number" required 
                  className="w-full bg-slate-100 dark:bg-slate-800 p-3 rounded-lg dark:text-white outline-none focus:ring-2 focus:ring-primary"
                  value={formData.table_number}
                  onChange={e => setFormData({...formData, table_number: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Capacity (Seats)</label>
                <input 
                  type="number" required 
                  className="w-full bg-slate-100 dark:bg-slate-800 p-3 rounded-lg dark:text-white outline-none focus:ring-2 focus:ring-primary"
                  value={formData.capacity}
                  onChange={e => setFormData({...formData, capacity: e.target.value})}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-blue-600 transition-colors">
                  {isUpdating ? 'Update Table' : 'Save Table'}
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