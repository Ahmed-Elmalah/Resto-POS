import { domain } from "../../store";
import useOrderStore from "../../store/useOrderStore";

export default function ProductCard({ product }) {
  const { addToCart } = useOrderStore();

  const itemData = product?.attributes || product || {};

  const name = itemData.name;
  const price = itemData.price;
  const image = itemData.image;
  const category = itemData.category;

  const imageUrl = image?.data?.attributes?.url
    ? `${domain}${image.data.attributes.url}`
    : image?.url
      ? `${domain}${image.url}`
      : "/placeholder.png";

  return (
    <div
      onClick={() => addToCart({ id: product.id, name, price: Number(price) })}
      className="bg-[#121212] rounded-[2.2rem] p-3 border border-white/5 hover:border-[#ff4500]/40 transition-all duration-500 group relative flex flex-col h-full"
    >
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
      </div>
    </div>
  );
}
