import useOrderStore from "../../store/useOrderStore";

export default function ProductCard({ product }) {
  const addToCart = useOrderStore((state) => state.addToCart);

  return (
    <button 
      onClick={() => addToCart(product)} 
      className="group flex flex-col bg-white dark:bg-card-dark rounded-2xl overflow-hidden border border-gray-100 dark:border-border-dark hover:border-primary transition-all active:scale-95 text-left"
    >
       <div className="aspect-[4/3] w-full bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} />
      
      <div className="p-4 flex flex-col gap-2">
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight line-clamp-1">
            {product.name}
          </h3>
          <p className="text-gray-500 dark:text-text-muted text-xs mt-1 line-clamp-2">
            {product.desc}
          </p>
        </div>
        <span className="font-black text-primary text-xl">${product.price.toFixed(2)}</span>
      </div>
    </button>
  );
}