import { useOrder } from "../../store/OrderContext";
import CartItem from "../../components/casherComponents/CartItem";

export default function OrderSidebar() {
  const { cart = [], total = 0 } = useOrder() || {};

  return (
    <aside className="flex flex-col h-full bg-white dark:bg-card-dark transition-colors">
      {/* عنوان الطلب */}
      <div className="p-4 border-b border-gray-200 dark:border-border-dark">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Order Details</h2>
      </div>

      {/* قائمة المنتجات في السلة */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 no-scrollbar">
        {cart.length > 0 ? (
          cart.map((item) => <CartItem key={item.id} item={item} />)
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-text-muted">
             <span className="material-symbols-outlined text-5xl mb-2">shopping_basket</span>
             <p className="text-sm">Your cart is empty</p>
          </div>
        )}
      </div>

      {/* قسم الدفع */}
      <div className="p-5 border-t border-gray-200 dark:border-border-dark bg-gray-50/50 dark:bg-background-dark/30">
        <div className="flex justify-between items-end mb-6">
          <span className="text-gray-500 dark:text-text-muted font-bold">Total Amount</span>
          <span className="text-3xl font-black text-primary">${total.toFixed(2)}</span>
        </div>
        
        <button className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">payments</span>
          Place Order
        </button>
      </div>
    </aside>
  );
}