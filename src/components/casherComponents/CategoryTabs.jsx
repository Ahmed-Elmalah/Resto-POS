export default function CategoryTabs({
  categories = [],
  activeCategory,
  onSelectCategory,
  onToggleView,
  viewMode,
}) {
  const tabs = [{ id: "all", name: "All" }, ...categories];

  return (
    <div className="mt-4 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm py-3 px-4 md:static md:bg-transparent md:px-0">

      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <div
          className="w-full md:w-auto overflow-x-auto flex justify-center md:justify-start no-scrollbar"
        >
          <div className="flex gap-3 flex-wrap items-center justify-center">
            {tabs.map((cat) => {
              const isSelected =
                activeCategory === (cat.name === "All" ? "All" : cat.name);

              return (
                <button
                  key={cat.id || cat.name}
                  onClick={() =>
                    onSelectCategory(cat.name === "All" ? "All" : cat.name)
                  }
                  className={`
                    flex h-9 shrink-0 items-center justify-center px-4 rounded-full transition-all duration-200 active:scale-95
                    ${
                      isSelected
                        ? "bg-primary text-white shadow-sm"
                        : "bg-white dark:bg-[#3a2520] text-[#181211] dark:text-[#e0dcdb] border border-[#e5e1e0] dark:border-[#523832] hover:bg-[#f4f1f0] dark:hover:bg-[#4a2e28]"
                    }
                  `}
                >
                  <span
                    className={`text-sm ${isSelected ? "font-semibold" : "font-medium"}`}
                  >
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={onToggleView}
          className={`
            order-first md:order-last  md:w-auto px-5 h-9 shrink-0 flex items-center justify-center rounded-full transition-all duration-200 active:scale-95 cursor-pointer font-bold text-sm
            ${
              viewMode === "tables"
                ? "bg-white text-primary border-2 border-primary"
                : "bg-primary text-white"
            } shadow-sm
          `}
        >
          {viewMode === "tables" ? "Back to Menu" : "Busy Tables"}
        </button>
      </div>
    </div>
  );
}
