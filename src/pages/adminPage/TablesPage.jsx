import React from 'react';
import TableSidebar from '../../components/adminComponents/Tables/TableSidebar';
import TableGrid from '../../components/adminComponents/Tables/TableGrid';
import TableHeader from '../../components/adminComponents/Tables/TableHeader';
/**
 * Main Tables Management Page
 * Layout: Header + (Main Canvas + Right Sidebar)
 */
export default function TablesPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Context Header: Filters & Title */}
      <TableHeader />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Main Floor Plan Grid */}
        <main className="flex-1 overflow-auto bg-grid-pattern relative p-8 no-scrollbar">
          <TableGrid />
        </main>

        {/* Right Sidebar: Table Details */}
        <TableSidebar />
      </div>
    </div>
  );
}