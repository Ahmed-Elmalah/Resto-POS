export default function RoleCards({ adminCount = 0, cashierCount = 0 }) {

  const roles = [
    { 
        title: "Administrator", 
        desc: "Full access to settings & management.", 
        icon: "shield_person", 
        colorTheme: "purple",
        count: adminCount 
    },
    { 
        title: "Cashier", 
        desc: "Orders, payments & tables management.", 
        icon: "point_of_sale", 
        colorTheme: "blue", 
        count: cashierCount 
    },
    { 
        title: "Head Chef", 
        desc: "Kitchen display system access.", 
        icon: "restaurant", 
        colorTheme: "orange", 
        count: 0 
    },
  ];

  const getStyles = (theme) => {
      switch (theme) {
          case 'purple': return { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400' };
          case 'blue': return { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400' };
          case 'orange': return { bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-600 dark:text-orange-400' };
          case 'green': return { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-400' };
          default: return { bg: 'bg-gray-50', text: 'text-gray-600' };
      }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {roles.map((role, idx) => {
        const styles = getStyles(role.colorTheme);

        return (
            <div key={idx} className="flex flex-col p-5 bg-white dark:bg-[#1a2632] rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all group cursor-pointer">
            <div className="flex justify-between items-start mb-3">
                <div className={`p-2 rounded-lg ${styles.bg} ${styles.text}`}>
                    <span className="material-symbols-outlined">{role.icon}</span>
                </div>
                <button className="text-[#617589] hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                    <span className="material-symbols-outlined">more_vert</span>
                </button>
            </div>
            
            <h4 className="text-[#111418] dark:text-white font-bold mb-1">{role.title}</h4>
            <p className="text-[#617589] text-xs mb-4 line-clamp-2">{role.desc}</p>
            
            <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-50 dark:border-gray-800">
                <span className="text-xs font-bold text-primary">
                    {role.count} Members
                </span>
                

            </div>
            </div>
        );
      })}
    </div>
  );
}