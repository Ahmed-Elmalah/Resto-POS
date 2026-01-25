import React from 'react';
import StaffHeader from '../../components/adminComponents/staff/StaffHeader';
import RoleCards from '../../components/adminComponents/staff/RoleCards';
import StaffTableContainer from '../../components/adminComponents/staff/StaffTableContainer'
/**
 * Staff & Roles Management Page
 */
export default function StaffPage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background-light dark:bg-background-dark">
      <StaffHeader />
      
      <div className="px-4 md:px-10 space-y-8 pb-20"> {/* إضافة pb-20 عشان المحتوى ميتغطاش بالأزرار اللي تحت */}
        <section>
          <h3 className="text-[#111418] dark:text-white text-lg font-bold mb-4">Active Roles</h3>
          <RoleCards />
        </section>

        <StaffTableContainer />
      </div>
    </div>
  );
}