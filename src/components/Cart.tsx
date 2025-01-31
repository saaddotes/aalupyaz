"use client";
import { useData } from "@/context/dataContext";
import axios from "axios";
import React, { useState } from "react";

export default function ShoppingCart() {
  const { cart: items, setCart, checkoutModal, setCheckoutModal } = useData();
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  function handleQuantityChange(index: number, change: number) {
    const newItems = [...items];
    newItems[index].quantity = Math.max(1, newItems[index].quantity + change);
    setCart(newItems);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const orderDetails = {
        name,
        email,
        phone,
        location,
        items,
        subtotal: calculateSubtotal(),
        delivery: 100,
        total: calculateTotal(),
      };

      const response = await axios.post("/api/sendmail", orderDetails);

      if (response.status === 200) {
        alert("Order placed successfully : " + response.data.message);
        setCart([]);
        setCheckoutModal(false);
      } else {
        console.error("Failed to place order:", response.data.message);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setLoading(false);
    }
  }

  function removeItem(item: any) {
    const newItems = items.filter((i: number) => i !== item);
    setCart(newItems);
  }

  function calculateSubtotal() {
    // console.log(items);
    // return 200;
    return items.reduce(
      (total: number, item: any) => total + item.price * item.quantity,
      0
    );
  }

  function calculateTotal() {
    return calculateSubtotal() + 100;
  }

  function toggleDrawer() {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      {items.length > 0 && (
        <>
          <button
            onClick={toggleDrawer}
            className="fixed bottom-10 right-10 bg-blue-600 text-white p-4 rounded-2xl shadow-lg hover:bg-blue-700 hover:scale-105 transform transition-all flex items-center space-x-2"
          >
            <span>Cart 🛒</span>
            <span className="bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md hover:shadow-lg transition-all">
              {items.reduce(
                (total: number, item: any) => total + item.quantity,
                0
              )}
            </span>
          </button>

          <div
            className={`fixed top-0 right-0 w-80 h-full bg-white  shadow-lg transform transition-transform z-20 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="p-6 flex flex-col h-full">
              <button
                onClick={toggleDrawer}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-6">Your Cart</h2>

              <div
                className="space-y-2 overflow-y-scroll flex-1"
                style={{ scrollbarWidth: "thin" }}
              >
                {items.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 gap-2 border-[1px] border-gray-200 rounded-lg mx-1"
                  >
                    <div>
                      <h3 className="font-semibold text-base line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-gray-500">{item.price} PKR</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="relative flex items-center max-w-[8rem]">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(index, -1)}
                          className="bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100  focus:ring-2 focus:outline-none"
                        >
                          <svg
                            className="w-3 h-3 text-gray-900 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <span className="bg-gray-50 border-x-0 px-2 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 ">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(index, 1)}
                          className="bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                        >
                          <svg
                            className="w-3 h-3 text-gray-900 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-between text-lg font-semibold">
                <p>Subtotal</p>
                <p>{calculateSubtotal()} PKR</p>
              </div>

              <div className="flex justify-between  font-semibold">
                <p>Delivery</p>
                <p>{"100 PKR (expected) "}</p>
              </div>

              <div className="flex justify-between text-lg font-bold">
                <p>Total</p>
                <p>{calculateTotal().toFixed(2)} PKR</p>
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => setCheckoutModal(true)}
                  className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {checkoutModal && (
        <div className="fixed z-[100] inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white  p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-6">Checkout</h2>
            <form onSubmit={onSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="name"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="email@example.com"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  placeholder="030000000000"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  placeholder="karachi, Pakistan"
                  className="input input-bordered"
                />
              </div>
              <div className="py-2 flex justify-between text-lg font-semibold">
                <button
                  onClick={() => {
                    setCheckoutModal(false);
                    setIsOpen(false);
                  }}
                  type="button"
                  className=" btn rounded-lg "
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={` btn btn-primary text-white rounded-lg ${
                    loading ? "btn-disabled" : ""
                  } `}
                >
                  {loading && <span className="loading loading-spinner"></span>}
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
