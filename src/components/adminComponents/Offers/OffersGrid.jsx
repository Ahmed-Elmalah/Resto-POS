import { useEffect } from "react";
import useAdminStore from "../../../store/useAdminStore";
import { useNavigate } from "react-router-dom";
import OffersCard from "./OffersCard";

export default function OffersGrid() {
  const { offers, fetchOffers, isLoadingOffers } = useAdminStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOffers();
  }, []);

  if (isLoadingOffers) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {offers.map((offer) => (
        <OffersCard offer={offer} key={offer.id} />
      ))}

      {/* Placeholder for adding new offer */}
      <button
        onClick={() => navigate("/admin/promotions/new")}
        className="border-2 border-dashed border-[#e5e7eb] dark:border-[#2a3b4c] rounded-xl flex flex-col items-center justify-center p-8 gap-4 hover:border-primary hover:bg-primary/5 transition-all group min-h-87.5"
      >
        <div className="size-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:rotate-90 transition-transform">
          <span className="material-symbols-outlined text-primary text-3xl">
            add
          </span>
        </div>
        <div className="text-center">
          <h3 className="font-bold dark:text-white">Create New Offer</h3>
          <p className="text-sm text-[#617589]">Add a new promotion</p>
        </div>
      </button>
    </div>
  );
}
