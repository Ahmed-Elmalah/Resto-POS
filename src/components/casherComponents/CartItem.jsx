export default function CartItem({ item }) {
  if (!item) return null; // حماية ضد الـ undefined

  return (
    <div className="flex gap-3 p-3 rounded-lg bg-background-dark border border-border-dark group hover:border-primary/30">
      <div className="size-16 rounded-md bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${item.image})` }} />
      <div className="flex flex-col flex-1 justify-between">
        <div className="flex justify-between items-start">
          <span className="font-bold text-white text-sm line-clamp-1">{item.name}</span>
          <button className="text-text-muted hover:text-red-500 transition-colors">
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-2">
            <button className="size-6 rounded-full bg-border-dark flex items-center justify-center text-white text-xs">-</button>
            <span className="text-sm font-bold text-white w-4 text-center">{item.quantity || 1}</span>
            <button className="size-6 rounded-full bg-border-dark flex items-center justify-center text-white text-xs">+</button>
          </div>
          <span className="font-bold text-white text-sm">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}