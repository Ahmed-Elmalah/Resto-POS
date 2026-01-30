import React from 'react';
import { MdAddCircle, MdCampaign, MdTableBar } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function QuickActions() {
  const navigate = useNavigate();
  const actions = [
    { 
        title: "Add New Product", 
        subtitle: "Update menu items", 
        icon: <MdAddCircle size={24} />, 
        color: "text-primary bg-primary/10 group-hover:bg-primary group-hover:text-white" ,
        to : "/admin/menu/add"
    },
    { 
        title: "Create Promotion", 
        subtitle: "Launch a special offer", 
        icon: <MdCampaign size={24} />, 
        color: "text-purple-600 bg-purple-50 group-hover:bg-purple-600 group-hover:text-white" ,
        to : '/admin/promotions'
    },
    { 
        title: "Add New Table", 
        subtitle: "Manual booking", 
        icon: <MdTableBar size={24} />, 
        color: "text-orange-600 bg-orange-50 group-hover:bg-orange-600 group-hover:text-white" ,
        to : '/admin/tables'
    },
  ];

  return (
    <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Quick Actions</h3>
      <div className="flex flex-col gap-4 flex-1">
        {actions.map((action, index) => (
          <button onClick={()=> navigate(action.to)} key={index} className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group text-left">
            <div className={`size-10 rounded-lg flex items-center justify-center transition-colors ${action.color}`}>
              {action.icon}
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white">{action.title}</p>
              <p className="text-xs text-slate-500">{action.subtitle}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}