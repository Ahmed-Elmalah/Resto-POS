import React from 'react';

const roles = [
  { title: "Administrator", desc: "Full access to all settings.", icon: "shield_person", color: "purple", count: 2 },
  { title: "Manager", desc: "Manages staff and menu.", icon: "manage_accounts", color: "blue", count: 2 },
  { title: "Head Chef", desc: "Access to kitchen systems.", icon: "restaurant", color: "orange", count: 1 },
  { title: "Wait Staff", desc: "Orders and payments.", icon: "restaurant_menu", color: "green", count: 9 },
];

export default function RoleCards() {
  return (
    // grid-cols-1 للموبايل | sm:grid-cols-2 للتابلت | xl:grid-cols-4 للشاشات الكبيرة
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {roles.map((role, idx) => (
        <div key={idx} className="flex flex-col p-5 bg-white dark:bg-[#1a2632] rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-3">
            <div className={`p-2 bg-${role.color}-50 dark:bg-${role.color}-900/20 rounded-lg text-${role.color}-600 dark:text-${role.color}-400`}>
              <span className="material-symbols-outlined">{role.icon}</span>
            </div>
            <button className="text-[#617589] hover:text-primary transition-colors">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
          <h4 className="text-[#111418] dark:text-white font-bold mb-1">{role.title}</h4>
          <p className="text-[#617589] text-xs mb-4 line-clamp-2">{role.desc}</p>
          <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-50 dark:border-gray-800">
             <span className="text-xs font-bold text-slate-400">{role.count} Members</span>
             <button className="text-primary text-xs font-bold hover:underline">Edit Permissions</button>
          </div>
        </div>
      ))}
    </div>
  );
}