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
    let result = Array.isArray(products) ? [...products] : [];

    // category filter
    if (activeCategory !== "All") {
      result = result.filter((item) => {
        const catName = item.category?.name;
        return catName === activeCategory;
      });
    }

    // search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) => item.name && item.name.toLowerCase().includes(query),
      );
    }

    // sorting
    if (sortOrder === "low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-low") {
      result.sort((a, b) => b.price - a.price);
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
