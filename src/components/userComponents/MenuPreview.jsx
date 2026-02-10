import { useNavigate } from "react-router-dom";
import MenuCard from "./MenuCard";
import { useMenuStore } from "../../store";
import { useEffect } from "react";
import { domain } from "../../store";
export default function MenuPreview() {
  const navigate = useNavigate();
  const { offers, fetchMenuData, isLoading } = useMenuStore();

  useEffect(() => {
    fetchMenuData();
  }, []);

  const activeOffers = offers.filter((offer) => {
    const isAvailable = offer.isAvailable;
    const isNotExpired = new Date(offer.expiryDate) >= new Date().setHours(0, 0, 0, 0);    
    return isAvailable && isNotExpired;
  });

  const displayedOffers = activeOffers.slice(0, 3);


  if (isLoading) {
    return (
      <section className="py-12 text-center" id="Offers">
        <p>Loading offers...</p>
      </section>
    );
  }

  if (displayedOffers.length === 0) return null;

  return (
    <section className="py-12 px-4 max-w-7xl dark:bg-background-dark mx-auto w-full mb-12" id="Offers">
      <div className="text-center mb-12">
        <span className="text-primary font-bold text-sm uppercase tracking-widest mb-2 block">
          Special Deals
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-text-main dark:text-white">
          Todays Best Offers
        </h2>
        <p className="mt-4 text-text-muted dark:text-gray-400 max-w-2xl mx-auto text-sm">
          Hand-picked by our master chefs, these dishes represent the pinnacle
          of our culinary journey.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {displayedOffers.map((offer, index) => (
          <MenuCard key={index} offer = {offer} />
        ))}
      </div>
      <div className="flex justify-center">
        <button onClick={()=> navigate("/menu")} className="h-12 px-8 rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold transition-all">
          View Full Digital Menu
        </button>
      </div>
    </section>
  );
}
