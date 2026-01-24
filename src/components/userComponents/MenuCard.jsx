import React from "react";
import { MdArrowRightAlt } from "react-icons/md";

export default function MenuCard({ title, desc, price, img }) {
  return (
    <div className="group bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/10">
      <div className="aspect-[4/3] w-full overflow-hidden relative">
        <img
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          src={img}
        />
        <div className="absolute top-4 right-4 z-20 bg-surface-light bg-white dark:bg-background-dark px-3 py-1 rounded-full text-sm font-bold text-text-main dark:text-white shadow-md">
          ${price}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-text-main dark:text-white group-hover:text-primary transition-colors mb-2">
          {title}
        </h3>
        <p className="text-text-muted dark:text-gray-400 text-sm leading-relaxed mb-4">
          {desc}
        </p>
        <button className="text-primary font-bold text-sm flex items-center gap-1 group/btn">
          Order Now
          <MdArrowRightAlt
            className="transition-transform group-hover/btn:translate-x-1"
            size={20}
          />
        </button>
      </div>
    </div>
  );
}
