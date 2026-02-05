import { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';
import { tableRepo } from './tableRepo';

export const useTables = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentTableId, setCurrentTableId] = useState(null);
  const [formData, setFormData] = useState({ table_number: '', capacity: 4 });

  // Toast Configuration
  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff',
    color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#0f172a',
  });

  const fetchTables = useCallback(async () => {
    try {
      const response = await tableRepo.getAll();
      setTables(response.data.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Fetch Error:", err);
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTables(); }, [fetchTables]);

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        table_number: parseInt(formData.table_number),
        capacity: parseInt(formData.capacity),
        table_status: isUpdating ? undefined : "Available"
      };

      if (isUpdating) {
        await tableRepo.update(currentTableId, data);
        Toast.fire({ icon: 'success', title: 'Table updated' });
      } else {
        await tableRepo.create(data);
        Toast.fire({ icon: 'success', title: 'Table added' });
      }
      setShowModal(false);
      fetchTables();
    } catch (err) {
      Toast.fire({ icon: 'error', title: 'Action failed' });
    }
  };

  const handleDelete = async (docId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      background: document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff',
      color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000',
    });

    if (result.isConfirmed) {
      try {
        await tableRepo.delete(docId);
        setTables(prev => prev.filter(t => (t.documentId || t.id) !== docId));
        Toast.fire({ icon: 'success', title: 'Deleted successfully' });
      } catch (err) {
        Toast.fire({ icon: 'error', title: 'Delete failed' });
      }
    }
  };

  return {
    tables, loading, showModal, setShowModal, isUpdating, formData, setFormData,
    openAddModal, openEditModal, handleFormSubmit, handleDelete
  };
};