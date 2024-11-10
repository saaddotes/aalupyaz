"use client";
import { useState } from "react";
import VegetableCard from "./VegetableCard";
import { useData } from "@/context/dataContext";
import NotAvailable from "./NotAvailable";
import Loading from "./Loading";

const SearchAndFilter = () => {
  const { vegetables, loading, error } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);

  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  // Handle case when data is loading or there's an error
  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  if (!vegetables || vegetables.length === 0) return <NotAvailable />;

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
    <div className="space-y-6 ">
      <div className="navbar bg-base-100 shadow-md py-3 sticky top-0 z-10">
        <div className="flex-1">
          <span className="text-lg md:text-3xl font-extrabold text-green-800">
            DailySabzi
          </span>
        </div>

        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search vegetables..."
              className="input input-bordered w-36 md:w-[30vw] text-sm md:text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="dropdown dropdown-end">
            <button className="btn btn-outline text-xs md:text-base">
              Price Filter
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content bg-base-100 shadow-md rounded-box w-52 p-4"
            >
              <li>
                <div className="flex flex-col space-y-2">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-sm">Min Price</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Min"
                      className="input input-bordered w-full"
                      value={minPrice || ""}
                      onChange={(e) =>
                        setMinPrice(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-sm">Max Price</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Max"
                      className="input input-bordered w-full"
                      value={maxPrice || ""}
                      onChange={(e) =>
                        setMaxPrice(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                    />
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 p-3 rounded-lg shadow-md">
              <span className="font-semibold">Rate as Today:</span>
              <span className="font-semibold">{formattedDate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
        {filteredVegetables.length > 0 ? (
          filteredVegetables.map((vegetable, index) => (
            <div key={`${vegetable.name}-${vegetable.price}-${index}`}>
              <VegetableCard
                name={vegetable.name}
                price={vegetable.price}
                imgSrc={vegetable.imgSrc}
              />
            </div>
          ))
        ) : (
          <div>No vegetables match the filter criteria.</div>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;
