import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import StaffHeader from '../../components/adminComponents/staff/StaffHeader';
import RoleCards from '../../components/adminComponents/staff/RoleCards';
import StaffTableContainer from '../../components/adminComponents/staff/StaffTableContainer';
import LoginRepo from '../../customHook/LoginRepo';
import { useAuthuser } from '../../store';
import toast from 'react-hot-toast';

export default function StaffPage() {
  const navigate = useNavigate();
  const { user } = useAuthuser();
  const token = user?.jwt || sessionStorage.getItem('jwt-token') || localStorage.getItem('jwt-token');
  
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);

  const adminCount = users.filter(u => u.role?.name?.toLowerCase().includes('admin')).length;
  const cashierCount = users.filter(u => {
      const r = u.role?.name?.toLowerCase() || "";
      return r.includes('casher') || r.includes('cashier');
  }).length;

 const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await LoginRepo.getAllUsers(token);
      const allUsers = Array.isArray(res.data) ? res.data : [];

      const staffOnly = allUsers.filter(user => {
         const roleName = user.role?.name?.toLowerCase() || "";
         return roleName.includes('admin') || roleName.includes('casher') || roleName.includes('cashier');
      });

      setUsers(staffOnly);

    } catch (error) {
      console.error(error);
      toast.error("Failed to load staff members");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="h-full w-full overflow-y-auto bg-background-light dark:bg-background-dark">
      <StaffHeader />
      
      <div className="px-4 md:px-10 space-y-8 pb-20">
        
        {/* Header Actions */}
        <div className="flex justify-between items-center">
            <h3 className="text-[#111418] dark:text-white text-lg font-bold">Active Roles</h3>
        </div>

        <section>
          <RoleCards adminCount={adminCount} cashierCount={cashierCount} />
        </section>

        {loading ? (
            <div className="text-center py-10 text-gray-500">Loading Staff...</div>
        ) : (
            <StaffTableContainer 
                users={users}    
                refreshData={fetchUsers} 
            />
        )}
      </div>
    </div>
  );
}