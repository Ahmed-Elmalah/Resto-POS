import React from 'react';
import TableItem from './TableItem';

export default function TableGrid() {
  return (
    <div className="relative">
      {/* Legend Indicators */}
      <div className="flex justify-center gap-4 mb-12">
        <LegendItem color="bg-emerald-500" label="Free" />
        <LegendItem color="bg-rose-500" label="Occupied" />
        <LegendItem color="bg-amber-500" label="Reserved" />
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 max-w-5xl mx-auto">
        <TableItem id="T-1" status="occupied" seats="4" type="circle" />
        <TableItem id="T-2" status="free" seats="4" type="circle" />
        <TableItem id="T-3" status="reserved" time="7:00 PM" type="square" />
        <TableItem id="T-4" status="cleaning" type="circle" />
      </div>
    </div>
  );
}

const LegendItem = ({ color, label }) => (
  <div className="flex items-center gap-2 bg-white/90 dark:bg-slate-800 px-3 py-1 rounded-full border dark:border-slate-700 shadow-sm">
    <span className={`size-2.5 rounded-full ${color}`}></span>
    <span className="text-xs font-medium dark:text-slate-300">{label}</span>
  </div>
);