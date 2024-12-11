"use client";
import React, { useState } from "react";

const ShoppingCart = ({ items, setItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log("items", items);

  //   const [items, setItems] = useState([
  //     { name: "Apple iPhone 15, 256GB, Gold", price: 1797, quantity: 2 },
  //     { name: "Xbox Series X, 1TB, Limited", price: 599, quantity: 1 },
  //     { name: "Sony PlayStation 5, 2 controllers", price: 799, quantity: 1 },
  //     { name: "Apple Watch SE, 38 mm", price: 299, quantity: 1 },
  //     { name: "Apple iMac, 5k, 256GB, Blue", price: 1799, quantity: 1 },
  //   ]);

  const handleQuantityChange = (index, change) => {
    const newItems = [...items];
    newItems[index].quantity = Math.max(1, newItems[index].quantity + change);
    setItems(newItems);
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + 100;
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        onClick={toggleDrawer}
        className="fixed bottom-10 right-10 bg-blue-600 text-white p-4 rounded-2xl shadow-lg hover:bg-blue-700 hover:scale-105 transform transition-all flex items-center space-x-2"
      >
        <span>Cart 🛒</span>
        <span className="bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md hover:shadow-lg transition-all">
          {items.reduce((total, item) => total + item.quantity, 0)}
        </span>
      </button>

      <div
        className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg transform transition-transform z-20 ${
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
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 border-[1px] border-gray-200 rounded-lg mx-1"
              >
                <div>
                  <h3 className="font-semibold text-base">{item.name}</h3>
                  <p className="text-gray-500">Rs.{item.price}</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="relative flex items-center max-w-[8rem]">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(index, -1)}
                      className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
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
                    <span className="bg-gray-50 border-x-0 px-2 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(index, 1)}
                      className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
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
                  <button className="text-red-500">Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between text-lg font-semibold">
            <p>Subtotal</p>
            <p>Rs.{calculateSubtotal()}</p>
          </div>

          <div className="flex justify-between  font-semibold">
            <p>Delivery</p>
            <p>Rs.100</p>
          </div>

          <div className="flex justify-between text-lg font-bold">
            <p>Total</p>
            <p>Rs.{calculateTotal().toFixed(2)}</p>
          </div>

          <div className="mt-6 flex gap-4">
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
