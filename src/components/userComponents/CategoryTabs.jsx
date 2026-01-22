export default function CategoryTabs() {
  const categories = [
    { name: 'All Items', icon: 'star' },
    { name: 'Burgers', icon: 'lunch_dining' },
    { name: 'Pizza', icon: 'local_pizza' },
    { name: 'Sides', icon: 'tapas' },
    { name: 'Drinks', icon: 'local_bar' },
    { name: 'Desserts', icon: 'icecream' }
  ];

  return (
    <div className="flex gap-2 md:gap-3 overflow-x-auto no-scrollbar pb-2">
      {categories.map((cat, i) => (
        <button 
          key={cat.name} 
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap border shrink-0 ${
            i === 0 
            ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
            : 'bg-white dark:bg-card-dark border-gray-200 dark:border-border-dark text-gray-500 dark:text-text-muted hover:border-primary/50'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">{cat.icon}</span>
          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  );
}