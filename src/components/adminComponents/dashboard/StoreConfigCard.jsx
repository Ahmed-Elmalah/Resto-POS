import { useEffect, useState } from "react";
import axios from "axios";
import { domain } from "../../../store";
import Swal from "sweetalert2";
import { MdAccessTime, MdAttachMoney } from "react-icons/md";
import toast from "react-hot-toast";

export default function StoreConfigCard() {
  const [storeConfig, setStoreConfig] = useState({
    opening_time: "09:00",
    closing_time: "22:00",
    serviceFee: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await axios.get(
          `${domain}/api/restaurant-setting?populate=*`,
        );
        const data = res.data.data?.attributes || res.data.data;

        if (data) {
          setStoreConfig({
            opening_time: data.opening_time?.slice(0, 5) || "09:00",
            closing_time: data.closing_time?.slice(0, 5) || "22:00",
            serviceFee: data.serviceFee || 0,
          });
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      }
    };
    fetchConfig();
  }, []);

  const handleSaveConfig = async () => {
    setLoading(true);
    try {
      await axios.put(`${domain}/api/restaurant-setting`, {
        data: {
          opening_time: `${storeConfig.opening_time}:00.000`,
          closing_time: `${storeConfig.closing_time}:00.000`,
          serviceFee: Number(storeConfig.serviceFee),
        },
      });
      toast.success("Settings saved!");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm animate-in fade-in zoom-in-95">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Store Config
        </h3>
        <button
          onClick={handleSaveConfig}
          disabled={loading}
          className="text-xs font-bold bg-primary/10 text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-all disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {/* Opening Time */}
        <div className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-[#151a21] hover:border-primary/30 transition-colors">
          <div className="size-10 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
            <MdAccessTime size={22} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Opening Time
            </p>
            <input
              type="time"
              value={storeConfig.opening_time}
              onChange={(e) =>
                setStoreConfig({ ...storeConfig, opening_time: e.target.value })
              }
              className="w-full bg-transparent font-bold text-slate-900 dark:text-white outline-none text-sm p-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Closing Time */}
        <div className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-[#151a21] hover:border-primary/30 transition-colors">
          <div className="size-10 bg-orange-100 dark:bg-orange-900/20 text-orange-600 rounded-lg flex items-center justify-center shrink-0">
            <MdAccessTime size={22} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Closing Time
            </p>
            <input
              type="time"
              value={storeConfig.closing_time}
              onChange={(e) =>
                setStoreConfig({ ...storeConfig, closing_time: e.target.value })
              }
              className="w-full bg-transparent font-bold text-slate-900 dark:text-white outline-none text-sm p-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Service Fee */}
        <div className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-[#151a21] hover:border-primary/30 transition-colors">
          <div className="size-10 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-lg flex items-center justify-center shrink-0">
            <MdAttachMoney size={22} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Service Fee
            </p>
            <div className="flex items-center">
              <input
                type="number"
                min="0"
                max="100"
                value={storeConfig.serviceFee}
                onChange={(e) =>
                  setStoreConfig({
                    ...storeConfig,
                    serviceFee: e.target.value,
                  })
                }
                className="w-full bg-transparent font-bold text-slate-900 dark:text-white outline-none text-sm p-0"
              />
              <span className="text-xs font-bold text-slate-500">%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
