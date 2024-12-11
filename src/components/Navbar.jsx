"use client";
import { useState } from "react";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for the mobile menu

  return (
    <nav className="bg-transparent text-gray-800 p-4 shadow-xl rounded-lg transform transition-all">
      <div className="container mx-auto flex items-center gap-2 justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">AaluPyaz</div>

        {/* Hamburger Icon for Mobile */}

        {/* Navigation Links (Desktop) */}
        <div className="hidden lg:flex space-x-6">
          <button className="px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-200 hover:shadow-xl transform transition-all duration-200">
            Home
          </button>
          <button className="px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-200 hover:shadow-xl transform transition-all duration-200">
            Contact
          </button>
        </div>

        {/* Right Section (Search Bar and Price Filter) */}
        <div className="flex items-center space-x-4 w-full lg:w-auto">
          {/* Search Bar */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-md w-full max-w-xs bg-white text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:shadow-xl transition-all"
            placeholder="Search..."
          />

          {/* Price Filter */}
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="hidden md:block px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:shadow-xl transition-all"
          >
            <option value="">Filter by Price</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-800"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white text-gray-800 mt-4 shadow-2xl rounded-lg transform hover:scale-105 transition-all">
          <div className="flex flex-col items-center pb-5">
            <button className="px-6 py-3 w-full text-lg font-medium text-center hover:bg-gray-200 hover:shadow-xl transform transition-all duration-200">
              Home
            </button>
            <button className="px-6 py-3 w-full text-lg font-medium text-center hover:bg-gray-200 hover:shadow-xl transform transition-all duration-200">
              Contact
            </button>

            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="px-4 py-2 rounded-md w-full max-w-xs bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:shadow-xl transition-all"
            >
              <option value="">Filter by Price</option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </select>
          </div>
        </div>
      )}
    </nav>
  );
}
