import { useState, useEffect, useMemo, useRef } from "react";
import { useMenuStore } from "../store";

export default function useMenuFilter(enablePolling = false) {
  const {
    products,
    categories,
    fetchMenuData,
    silentRefresh,
    isLoading,
    error,
    offers,
  } = useMenuStore();

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  const searchInputRef = useRef(null);

  useEffect(() => {
    fetchMenuData();
  }, []);

  useEffect(() => {
    if (!enablePolling) return;

    const interval = setInterval(() => {
      silentRefresh();
    }, 10000);

    return () => clearInterval(interval);
  }, [enablePolling, silentRefresh]);

  const filteredProducts = useMemo(() => {
    // category filter
    const safeProducts = Array.isArray(products) ? products : [];
    const safeOffers = Array.isArray(offers)
      ? offers.map((o) => ({ ...o, isOffer: true }))
      : [];

    let result = [];

    if (activeCategory === "All") {
      result = [...safeOffers, ...safeProducts];
    } else if (activeCategory === "Offers") {
      result = [...safeOffers];
    } else {
      result = [...safeProducts];
    }

    if (activeCategory !== "All" && activeCategory !== "Offers") {
      result = result.filter((item) => {
        const data = item?.attributes || item;
        const catName =
          data?.category?.name || data?.category?.data?.attributes?.name;
        return catName === activeCategory;
      });
    }

    // search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter((item) => {
        const data = item?.attributes || item;
        const name = data?.name || "";
        return name.toLowerCase().includes(query);
      });
    }

    // sorting
    if (sortOrder === "low-high") {
      result.sort((a, b) => {
        const priceA = a?.attributes?.price || a?.price || 0;
        const priceB = b?.attributes?.price || b?.price || 0;
        return priceA - priceB;
      });
    } else if (sortOrder === "high-low") {
      result.sort((a, b) => {
        const priceA = a?.attributes?.price || a?.price || 0;
        const priceB = b?.attributes?.price || b?.price || 0;
        return priceB - priceA;
      });
    }

    return result;
  }, [products, activeCategory, searchQuery, sortOrder]);

  const clearSearch = () => {
    setSearchQuery("");
    if (searchInputRef.current) {
      searchInputRef.current.focus(); // نرجع التركيز للإنبوت
    }
  };

  return {
    // Data
    categories,
    products: filteredProducts,
    totalCount: filteredProducts.length,
    isLoading,
    error,

    //logic
    activeCategory,
    setActiveCategory,

    searchQuery,
    setSearchQuery,
    searchInputRef,
    clearSearch,

    sortOrder,
    setSortOrder,
  };
}
