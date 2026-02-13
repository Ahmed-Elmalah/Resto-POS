// We receive the categories list and the function to change the active tab as props
export default function CategoryTabs({
  categories = [],
  activeCategory,
  onSelectCategory,
}) {
  const tabs = [{ id: "all", name: "All" }, ...categories];

  return (
    <div className="mt-4 sticky flex justify-between items-end pt-2  z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm py-2 mx-0 px-0 md:pb-4 md:mx-0 md:px-0 md:static md:bg-transparent md:dark:bg-transparent">
      <div className="flex w-full gap-3 flex-wrap md:flex-nowrap justify-center md:justify-start items-center">
        {tabs.map((cat) => {
          const isSelected =
            activeCategory === (cat.name === "All" ? "All" : cat.name);

          return (
            <button
              data-aos="zoom-in"
              data-aos-duration="1100"
              key={cat.id || cat.name}
              // When clicked, we call the parent function with the category name
              onClick={() =>
                onSelectCategory(cat.name === "All" ? "All" : cat.name)
              }
              className={`
                flex h-9 shrink-0 items-center justify-center px-4 rounded-full transition-all duration-200 active:scale-95
                ${
                  isSelected
                    ? "bg-primary text-white shadow-sm" // Active Style
                    : "bg-white dark:bg-[#3a2520] text-[#181211] dark:text-[#e0dcdb] border border-[#e5e1e0] dark:border-[#523832] hover:bg-[#f4f1f0] dark:hover:bg-[#4a2e28]" // Inactive Style
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
  );
}
