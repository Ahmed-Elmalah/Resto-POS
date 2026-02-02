import { domain } from "../../store";
import useOrderStore from "../../store/useOrderStore";

export default function ProductCard({ product }) {
  const { addToCart } = useOrderStore();

  // --- إصلاح اللوجيك هنا ---
  const data = product?.attributes || product || {};
  const name = data.name || "Unknown Item";
  const price = data.price || 0;
  const desc = data.desc || "No description available";

  // تعريف isAvailable عشان ميديناش Error
  const isAvailable = data.isAvailable !== false;

  const imageUrl = data.image?.data?.attributes?.url
    ? `${domain}${data.image.data.attributes.url}`
    : data.image?.url
      ? `${domain}${data.image.url}`
      : "/placeholder.png";
  // -----------------------

  return (
    <button
      onClick={() =>
        isAvailable && addToCart({ id: product.id, name, price: Number(price) })
      }
      disabled={!isAvailable}
      className={`group flex flex-col bg-white dark:bg-card-dark rounded-2xl overflow-hidden border border-gray-100 dark:border-border-dark transition-all text-left shadow-sm h-full
        ${
          !isAvailable
            ? "grayscale opacity-60 brightness-90 cursor-not-allowed"
            : "hover:border-primary active:scale-95 cursor-pointer hover:shadow-md"
        }
      `}
    >
      <div
        style={{
          width: "100%",
          height: "160px",
          backgroundColor: "#f3f4f6",
          position: "relative",
        }}
      >
        <img
          src={imageUrl}
          alt={name} // تم التصليح لاستخدام المتغير name
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/400x300?text=Error";
          }}
        />
      </div>

      <div className="p-4 flex flex-col gap-2 w-full flex-1">
        <div>
          <h3
            className={`font-bold text-lg leading-tight line-clamp-1 ${isAvailable ? "text-gray-900 dark:text-white" : "text-gray-500"}`}
          >
            {name} {/* تم التصليح */}
          </h3>
          <p className="text-gray-500 dark:text-text-muted text-xs mt-1 line-clamp-2">
            {desc} {/* تم التصليح */}
          </p>
        </div>
        <span
          className={`font-black text-xl mt-auto ${isAvailable ? "text-primary" : "text-gray-400"}`}
        >
          {Number(price).toFixed(2)} EGP {/* تم التصليح وإضافة العملة */}
        </span>
      </div>
    </button>
  );
}
