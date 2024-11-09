"use client";
import { useState } from "react";
import VegetableCard from "./VegetableCard";

const SearchAndFilter = ({ vegetables }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);

  // Filter vegetables based on search query and price range
  const filteredVegetables = vegetables.filter((vegetable) => {
    const matchesSearch = vegetable.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const withinPriceRange =
      vegetable.price >= minPrice && vegetable.price <= maxPrice;
    return matchesSearch && withinPriceRange;
  });

  return (
    <div className="space-y-6">
      <div className="bg-[#bbea70cc] py-5 sticky top-0 z-10">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 px-2 items-center justify-center">
          <div className=" w-full md:w-1/3">
            <input
              type="text"
              id="search"
              placeholder="Search vegetables..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ease-in-out"
            />
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-1/2">
            <div className="flex items-center">
              <span className="ms-5 text-sm text-slate-50">Min Price</span>
              <input
                type="number"
                id="minPrice"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center">
              <span className="ms-5 text-sm text-slate-50">Max Price</span>
              <input
                type="number"
                id="maxPrice"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filtered Vegetable Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-5">
        {filteredVegetables.map((vegetable, index) => (
          <div key={`${vegetable.name}-${vegetable.price}-${index}`}>
            <VegetableCard
              name={vegetable.name}
              price={vegetable.price}
              imgSrc={vegetable.imgSrc}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchAndFilter;
