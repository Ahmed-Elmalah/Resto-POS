import { MdAdd } from "react-icons/md";

export default function ProductCard({ item }) {
  const domain = "";
  const isAvailable = item.isAvailable !== false;

  return (
    <div className="group flex flex-col bg-white dark:bg-background-dark rounded-xl transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 border border-transparent dark:border-[#3a2520]">
      {/* image */}
      <div className="relative w-full h-48 overflow-hidden bg-gray-100">
        <img
          src={
            item.image?.url
              ? `${domain}${item.image.url}`
              : "https://placehold.co/400x300?text=No+Image"
          }
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/400x300?text=Error";
          }}
        />

        {!isAvailable && (
            <div className="absolute inset-0 cursor-not-allowed bg-black/50 flex items-center justify-center z-10">
                <span className="bg-red-600 text-white font-bold px-3 py-1 rounded-lg shadow-lg border border-white/20 transform -rotate-6">
                    Sold Out
                </span>
            </div>
        )}
      </div>

      {/* باقي المحتوى */}
      <div className="flex flex-col flex-1 p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-bold text-[#181211] dark:text-white line-clamp-1">
            {item.name}
          </h3>
        </div>

        <p className="text-sm text-[#896861] dark:text-[#a08078] line-clamp-2 mb-4">
          {item.desc || "No description available"}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            ${Number(item.price).toFixed(2)}
          </span>

        </div>
      </div>
    </div>
  );
}