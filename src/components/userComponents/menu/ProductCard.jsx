import React from "react";
import useOrderStore from "../../../store/useOrderStore";
import { domain } from "../../../store";


export default function ProductCard({ product }) {
  const { addToCart } = useOrderStore();
  const { name, price, image, category } = product.attributes;
  const imageUrl = image?.data?.attributes?.url
    ? `${domain}${image.data.attributes.url}`
    : "/placeholder.png";

  return (
    <div className="bg-[#121212] rounded-[2.2rem] p-3 border border-white/5 hover:border-[#ff4500]/40 transition-all duration-500 group relative flex flex-col h-full">
      <div className="relative h-48 w-full rounded-[1.8rem] overflow-hidden mb-4 shadow-2xl bg-black">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
          <span className="text-[#ff4500] font-black text-xs">
            {price} <small className="text-[8px]">EGP</small>
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col px-2">
        <span className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em] mb-1">
          {category?.data?.attributes?.name || "Menu Item"}
        </span>
        <h3 className="text-gray-100 font-bold text-base mb-4 leading-tight group-hover:text-white transition-colors capitalize line-clamp-2">
          {name}
        </h3>
        <button
          onClick={() =>
            addToCart({ id: product.id, name, price: Number(price) })
          }
          className="w-full py-4 bg-[#1a1a1a] group-hover:bg-[#ff4500] text-white rounded-[1.2rem] font-black text-[10px] uppercase tracking-widest transition-all duration-300 active:scale-95 mt-auto flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">add_circle</span>
          Add Item
        </button>
      </div>
    </div>
  );
}
