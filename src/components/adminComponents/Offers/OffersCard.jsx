import { domain } from "../../../store";

export default function OffersCard({offer}) {
    const imageUrl = offer.image?.url 
    ? domain + offer.image.url 
    : "https://placehold.co/600x400?text=No+Image";
  return (
    <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-[#e5e7eb] dark:border-[#2a3b4c] overflow-hidden group hover:shadow-lg transition-all">
              <div className="relative h-48 w-full">
                <img src={imageUrl} alt={offer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md border ${offer.isAvailable ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/50 dark:text-green-300' : 'bg-gray-100 text-gray-600'}`}>
                    {offer.isAvailable ? "Active" : "Expired"}
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <h3 className="text-lg font-bold dark:text-white">{offer.name}</h3>
                <p className="text-sm text-[#617589] line-clamp-2">{offer.description}</p>
                <div className="flex justify-between items-center pt-3 border-t dark:border-gray-700">
                  <span className="text-xl font-black text-primary">{offer.price}</span>
                  <div className="text-right text-[11px] text-[#617589]">
                    <p>Expires</p>
                    <p className="font-bold dark:text-gray-300">{offer.expiryDate}</p>
                  </div>
                </div>
              </div>
            </div>
  )
}
