import React from 'react';
import useOrderStore from "../../store/useOrderStore";

export default function OrderSidebar() {
  const { cart, updateQuantity, removeFromCart } = useOrderStore();
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-card-dark transition-colors">
      <div className="p-4 border-b border-gray-100 dark:border-border-dark font-bold text-gray-900 dark:text-white">Order Details</div>
      
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 no-scrollbar">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-gray-50 dark:bg-background-dark p-3 rounded-xl border border-gray-100 dark:border-border-dark">
               <div className="flex-1">
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-1">{item.name}</h4>
                  <p className="text-primary font-black text-xs">${item.price}</p>
               </div>
               <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.id, -1)} className="size-7 flex items-center justify-center bg-gray-200 dark:bg-card-dark rounded-lg text-gray-600 dark:text-white">-</button>
                  <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="size-7 flex items-center justify-center bg-primary text-white rounded-lg">+</button>
               </div>
            </div>
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-50">
             <span className="material-symbols-outlined text-6xl mb-2">shopping_basket</span>
             <p className="text-sm">Your cart is empty</p>
          </div>
        )}
      </div>

      <div className="p-5 border-t border-gray-100 dark:border-border-dark bg-gray-50/50 dark:bg-background-dark/30">
        <div className="flex justify-between items-end mb-6">
          <span className="text-gray-500 dark:text-text-muted font-bold text-sm">Total Amount</span>
          <span className="text-3xl font-black text-primary">${total.toFixed(2)}</span>
        </div>
        <button className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">payments</span>
          Place Order
        </button>
      </div>
    </div>
  );
}