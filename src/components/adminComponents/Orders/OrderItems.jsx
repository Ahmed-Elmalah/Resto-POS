
export default function OrderItems({ order }) {
  return (
    <div className="bg-white dark:bg-[#1c2127]/60 border border-slate-200 dark:border-[#283039] rounded-[32px] overflow-hidden shadow-sm backdrop-blur-md">
      <div className="p-6 border-b border-slate-100 dark:border-[#283039] flex justify-between items-center">
        <h3 className="text-xl font-black italic uppercase tracking-tight text-slate-900 dark:text-white">
          Receipt <span className="text-primary">Summary</span>
        </h3>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-2xl bg-slate-100 dark:bg-[#283039] flex items-center justify-center font-black text-primary border border-slate-200 dark:border-white/5">
                  {item.quantity || item.qty}x
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white group-hover:text-primary transition-colors">
                    {item.product_name || item.name}
                  </h4>
                  <p className="text-xs text-slate-400 font-medium italic">
                    ${(item.unit_price || item.price).toFixed(2)} per unit
                  </p>
                </div>
              </div>
              <span className="font-black text-slate-900 dark:text-white tracking-tighter">
                $
                {(
                  (item.unit_price || item.price) * (item.quantity || item.qty)
                ).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-dashed border-slate-200 dark:border-[#283039] space-y-4">
          <div className="flex justify-between items-center pt-2">
            <span className="text-lg font-black uppercase tracking-tighter text-primary">
              Total Amount
            </span>
            <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
              ${order.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
