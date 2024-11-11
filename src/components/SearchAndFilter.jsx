"use client";
import { useState } from "react";
import VegetableCard from "./VegetableCard";
import { useData } from "@/context/dataContext";
import NotAvailable from "./NotAvailable";
import Loading from "./Loading";
import Image from "next/image";
import Fuse from "fuse.js";

const SearchAndFilter = () => {
  const { vegetables, loading, error } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  // const [buyModel, setBuyModel] = useState(false);
  // const [selectedVegetable, setSelectedVegetable] = useState(null);

  const [cart, setCart] = useState([]);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  if (!vegetables || vegetables.length === 0) return <NotAvailable />;

  const fuse = new Fuse(vegetables, {
    keys: ["name", "price"],
    threshold: 0.3,
  });

  const filteredVegetables = (
    searchQuery
      ? fuse.search(searchQuery).map((result) => result.item)
      : vegetables
  ).filter(
    (vegetable) => vegetable.price >= minPrice && vegetable.price <= maxPrice
  );

  return (
    <div className="relative space-y-6 ">
      <div className="navbar bg-base-100 shadow-md py-2 sticky top-0 z-10">
        <div className="flex-1">
          <img src="/aalupyaz.png" alt="logo" width={"60px"} />
          <span className="text-lg md:text-3xl font-bold text-pink-600">
            AaluPyaz
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

      {cart && cart.length > 0 && (
        <div
          className="fixed right-10 top-16 z-30"
          onClick={() => setIsCartOpen(true)}
        >
          {!isCartOpen ? (
            <h1 className="bg-amber-500 text-white rounded-lg px-10 py-3">
              <span className="font-semibold badge bg-amber-300 rounded-full p-2 me-2">
                {cart.length}
              </span>
              Cart
            </h1>
          ) : (
            <div className="h-[60vh] w-[20vw] bg-amber-500 flex flex-col px-3 rounded-lg">
              <h1 className="bg-amber-500 text-white rounded-lg px-10 py-3">
                <span className="font-semibold badge bg-amber-300 rounded-full p-2 me-2">
                  {cart.length}
                </span>
                Cart
              </h1>
              {cart.map(({ name, imgSrc, quantity, price }, index) => (
                <div
                  key={name}
                  className="flex items-center justify-between bg-amber-200 rounded-lg p-1"
                >
                  <div className="flex flex-col ">
                    <Image
                      src={imgSrc}
                      alt={name}
                      quality={90}
                      width={50}
                      height={37.5}
                      className="w-18 h-18 mx-auto object-cover"
                    />
                    <h3 className="text-md font-semibold text-gray-800">
                      {name}
                    </h3>
                  </div>
                  <div className="p-3 text-center">
                    <p className="font-bold text-green-600 my-2">
                      Rs. {quantity > 0 ? price * quantity : price}
                    </p>
                    <div className="bg-slate-100 inline-block p-1 rounded-lg my-4">
                      <button
                        // disabled={isInCart(cart)}
                        className="btn btn-outline bg-slate-300 btn-sm"
                        // onClick={() =>
                        //   setQuantity(quantity > 0 ? quantity - 1 : 0)
                        // }
                      >
                        -
                      </button>
                      <span className="mx-2 select-none">{quantity}</span>
                      <button
                        // disabled={isInCart(cart)}
                        className="btn btn-outline bg-slate-300 btn-sm"
                        // onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {/* <div className="mx-auto  px-2">
        <Image
          src={"/banner.png"}
          unoptimized
          width={1500}
          height={500}
          alt="banner"
          className="mx-auto object-contain"
          quality={100}
        />
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5 ">
        {filteredVegetables.length > 0 ? (
          filteredVegetables.map((vegetable, index) => (
            <div key={`${vegetable.name}-${vegetable.price}-${index}`}>
              <VegetableCard
                name={vegetable.name}
                price={vegetable.price}
                imgSrc={vegetable.imgSrc}
                id={vegetable.id}
                // setBuyModel={setBuyModel}
                // setSelectedVegetable={setSelectedVegetable}
                cart={cart}
                setCart={setCart}
              />
            </div>
          ))
        ) : (
          <div>No vegetables match the filter criteria.</div>
        )}
      </div>

      {/* {buyModel && selectedVegetable && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2>
              {selectedVegetable.id === "new"
                ? "Add Vegetable"
                : "Edit Vegetable"}
            </h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                value={selectedVegetable.name}
                onChange={(e) =>
                  setSelectedVegetable((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image URL</span>
              </label>
              <input
                type="text"
                value={selectedVegetable.imgSrc}
                onChange={(e) =>
                  setSelectedVegetable((prev) => ({
                    ...prev,
                    imgSrc: e.target.value,
                  }))
                }
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                value={selectedVegetable.price}
                onChange={(e) =>
                  setSelectedVegetable((prev) => ({
                    ...prev,
                    price: e.target.value,
                  }))
                }
                className="input input-bordered"
              />
            </div>
            <div className="modal-action flex justify-between md:px-2">
              {selectedVegetable.id !== "new" && (
                <button
                  className={`btn btn-error text-slate-200 text-xs md:text-base p-1 md:p-3 ${
                    isDeleting ? "loading" : ""
                  }`}
                  onClick={handleDelete}
                  disabled={isSaving || isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete Vegetable"}
                </button>
              )}
              <div className="space-x-2">
                <button
                  className={`btn btn-primary text-xs md:text-base p-1 md:p-3 ${
                    isSaving ? "loading" : ""
                  }`}
                  onClick={handleSaveChanges}
                  disabled={isSaving || isDeleting}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  className="btn text-xs md:text-base p-1 md:p-3"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default SearchAndFilter;
