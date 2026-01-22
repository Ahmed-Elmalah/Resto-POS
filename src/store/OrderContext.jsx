import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // سلة فارغة كقيمة ابتدائية

  // القيم اللي هتروح للـ Sidebar
  const value = {
    cart,
    subtotal: 0,
    tax: 0,
    total: 0
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  // تأمين: لو استخدمنا الهوك بره الـ Provider يرجع أوبجيكت فاضي بدل ما يضرب Error
  if (!context) return { cart: [], subtotal: 0, tax: 0, total: 0 };
  return context;
};