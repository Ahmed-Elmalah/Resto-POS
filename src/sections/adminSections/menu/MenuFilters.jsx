import { MdSearch, MdSort, MdAdd } from 'react-icons/md';

export default function MenuFilters({ activeTab, setActiveTab, searchQuery, setSearchQuery, sortBy, setSortBy }) {
  const categories = [
    { name: 'All Items', icon: 'star' },
    { name: 'Burgers', icon: 'lunch_dining' },
    { name: 'Pizza', icon: 'local_pizza' },
    { name: 'Sides', icon: 'tapas' },
    { name: 'Drinks', icon: 'local_bar' },
    { name: 'Desserts', icon: 'icecream' }
  ];

  return (
    <div className="flex flex-col gap-4 p-4 w-full">
      
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:flex sm:flex-nowrap xl:flex-wrap gap-2 md:gap-2 xl:gap-3 w-full">
        {categories.map((cat) => (
          <button 
            key={cat.name} 
            onClick={() => setActiveTab(cat.name)}
            className={`
              flex items-center justify-center transition-all border rounded-xl font-bold whitespace-nowrap
              px-3 py-2.5           
              md:px-3 md:py-2 md:text-xs md:gap-1.5             
              xl:px-5 xl:py-2.5 xl:text-sm xl:gap-2
              sm:flex-1 xl:flex-none
              ${activeTab === cat.name
              ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
              : 'bg-white dark:bg-card-dark border-slate-200 dark:border-border-dark text-slate-500 dark:text-text-muted hover:border-primary/50'
              }
            `}
          >
            <span className="material-symbols-outlined text-[18px] md:text-[18px] xl:text-[20px]">{cat.icon}</span>
            <span className="truncate">{cat.name}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-3 justify-between items-stretch lg:items-center w-full">
        <div className="relative w-full lg:w-96 group">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
            <MdSearch size={22} />
          </span>
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-noneXH text-slate-900 dark:text-white transition-all text-sm"
            placeholder="Search menu..." 
            type="text"
          />
        </div>

        <div className="flex gap-2 w-full lg:w-auto">
            <div className="relative flex-1 lg:flex-none">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500">
                    <MdSort size={20} />
                </div>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full lg:w-48 pl-10 pr-4 py-2.5 appearance-none rounded-xl bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm outline-none focus:border-primary"
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low</option>
                  <option value="price-high">Price: High</option>
                </select>
            </div>
            
            <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2.5 rounded-xl font-bold shadow-lg shadow-primary/20 transition-transform active:scale-95 whitespace-nowrap text-sm shrink-0">
                <MdAdd size={20} />
                <span className="hidden sm:inline">Add Item</span>
                <span className="sm:hidden">Add</span>
            </button>
        </div>
      </div>
    </div>
  );
}