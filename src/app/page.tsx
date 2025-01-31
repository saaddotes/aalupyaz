"use client";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useData } from "@/context/dataContext";
import Fuse from "fuse.js";
import Loading from "@/components/Loading";

export default function Home() {
  const { products, loading, cart, setCart } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState<string | number>(0);
  const [maxPrice, setMaxPrice] = useState<string | number>(100000);

  // if (loading) return <h1>Loading</h1>;
  // if (error) return <div>Error: {error.message}</div>;

  const fuse = new Fuse(products, {
    keys: ["name", "price"],
    threshold: 0.3,
  });

  const searchResults = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : products;

  const filteredproducts = searchResults.filter(
    (product) =>
      product.price >= Number(minPrice) &&
      (Number(maxPrice) > 0 ? product.price <= Number(maxPrice) : true)
  );

  return (
    <div className="relative space-y-6 ">
      <div className="navbar bg-base-100 shadow-md py-2 sticky top-0 z-10 px-10">
        <div className="flex-1 flex gap-3 items-center">
          <img src="/logo.png" alt="logo" width={"30px"} />
          <span className="text-lg md:text-3xl font-bold text-pink-600 font-mono">
            VEG Store
          </span>
        </div>

        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search products..."
              className="input input-bordered w-36 md:w-[30vw] text-sm md:text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="dropdown dropdown-end hidden md:block">
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
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-5 ">
        {loading ? (
          <Loading />
        ) : filteredproducts.length > 0 ? (
          filteredproducts.map((product, index) => (
            <div key={`${product.name}-${product.price}-${index}`}>
              <ProductCard
                name={product.name}
                price={product.price}
                imgSrc={product.imgSrc}
                id={product.id}
                description={product.description}
                data={product}
                cart={cart}
                setCart={setCart}
              />
            </div>
          ))
        ) : (
          <div>No products match the filter criteria.</div>
        )}
      </div>
    </div>
  );
}
