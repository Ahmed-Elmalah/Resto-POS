import { MdArrowRightAlt } from "react-icons/md";
import { domain } from "../../store";
import { useNavigate } from "react-router-dom";

export default function MenuCard({ offer }) {
  const imgurl = offer.image?.url
    ? domain + offer.image.url
    : "https://placehold.co/600x400";

  const navigate = useNavigate();
  return (
    <div
      data-aos="zoom-in-down"
      data-aos-duration="1100"
      onClick={() => navigate("/menu")}
      className="group bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/10"
    >
      <div className="aspect-4/3 w-full overflow-hidden relative">
        <img
          alt={offer.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          src={imgurl}
        />
        <div className="absolute top-4 right-4 z-20 bg-surface-light bg-white dark:bg-background-dark px-3 py-1 rounded-full text-sm font-bold text-text-main dark:text-white shadow-md">
          ${offer.price}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-text-main dark:text-white group-hover:text-primary transition-colors mb-2">
          {offer.name}
        </h3>
        <p className="text-text-muted dark:text-gray-400 text-sm leading-relaxed mb-4">
          {offer.description}
        </p>
        <button className="text-primary font-bold text-sm flex items-center gap-1 group/btn">
          See full menu
          <MdArrowRightAlt
            className="transition-transform group-hover/btn:translate-x-1"
            size={20}
          />
        </button>
      </div>
    </div>
  );
}
