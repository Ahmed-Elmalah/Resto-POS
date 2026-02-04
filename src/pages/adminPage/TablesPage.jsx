import React, { useState } from 'react';
import TableSidebar from '../../components/adminComponents/Tables/TableSidebar';
import TableGrid from '../../components/adminComponents/Tables/TableGrid';
import TableHeader from '../../components/adminComponents/Tables/TableHeader';

export default function TablesPage() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); // Global edit state

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      <TableHeader 
        isEditMode={isEditMode} 
        onToggleEdit={() => setIsEditMode(!isEditMode)} 
      />

      <div className="flex flex-1 overflow-hidden relative">
        <main className="flex-1 overflow-auto bg-grid-pattern p-8 no-scrollbar">
          <TableGrid 
            onSelect={(table) => setSelectedTable(table)} 
            selectedId={selectedTable?.id}
            isEditMode={isEditMode}
          />
        </main>
        <TableSidebar activeTable={selectedTable} />
      </div>
    </div>
  );
}