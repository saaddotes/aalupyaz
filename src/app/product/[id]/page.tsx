"use client";
import { useState, useEffect } from "react";
import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useData } from "@/context/dataContext";
import Loading from "@/components/Loading";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const { cart, setCart, setCheckoutModal } = useData();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const docRef = doc(db, "vegetables", id as string);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProduct({ id: docSnap.id, ...docSnap.data() });
          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <Loading />;
  }

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-0 py-10 md:p-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-screen gap-16 mx-auto max-md:px-2 ">
        <div className=" flex justify-center items-center">
          <img
            src={product.imgSrc}
            alt={product.name}
            width={500}
            height={500}
            className="object-cover rounded-lg"
          />
        </div>
        <div className="w-full lg:pr-8 pr-0 xl:justify-start justify-center flex items-center max-lg:pb-10 xl:my-2 lg:my-5 my-0">
          <div className="data w-full max-w-xl">
            <p className="text-lg font-medium leading-8 text-indigo-600 mb-4"></p>
            <h2 className="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">
              {product.name}
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center mb-6">
              <h6 className="font-manrope font-semibold text-2xl leading-9 text-orange-400 pr-5 border-gray-200 mr-5">
                PKR {product.price}
              </h6>
            </div>
            <p className="text-gray-500 text-base font-normal mb-5">
              {product.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-8">
              <div className="flex sm:items-center sm:justify-center w-full">
                <button
                  onClick={() =>
                    setQuantity(quantity > 1 ? quantity - 1 : quantity)
                  }
                  className="group py-4 px-6 border border-gray-400 rounded-l-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300"
                >
                  <svg
                    className="stroke-gray-900 group-hover:stroke-black"
                    width={22}
                    height={22}
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.5 11H5.5"
                      stroke=""
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M16.5 11H5.5"
                      stroke=""
                      strokeOpacity="0.2"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M16.5 11H5.5"
                      stroke=""
                      strokeOpacity="0.2"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <span className="font-semibold text-gray-900 cursor-pointer text-lg py-[13px] px-6 w-full sm:max-w-[118px] outline-0 border-y border-gray-400 bg-transparent placeholder:text-gray-900 text-center hover:bg-gray-50">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(quantity < 10 ? quantity + 1 : quantity)
                  }
                  className="group py-4 px-6 border border-gray-400 rounded-r-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300"
                >
                  <svg
                    className="stroke-gray-900 group-hover:stroke-black"
                    width={22}
                    height={22}
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 5.5V16.5M16.5 11H5.5"
                      stroke="#9CA3AF"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M11 5.5V16.5M16.5 11H5.5"
                      stroke="black"
                      strokeOpacity="0.2"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M11 5.5V16.5M16.5 11H5.5"
                      stroke="black"
                      strokeOpacity="0.2"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
              <button
                onClick={() => {
                  // product && setCart([...cart, product])
                  if (product) {
                    setCart([{ ...product, quantity }, ...cart]);
                  }
                }}
                className="group py-4 px-5 rounded-full bg-indigo-50 text-indigo-600 font-semibold text-lg w-full flex items-center justify-center gap-2 transition-all duration-500 hover:bg-indigo-100"
              >
                <svg
                  className="stroke-indigo-600 "
                  width={22}
                  height={22}
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.7394 17.875C10.7394 18.6344 10.1062 19.25 9.32511 19.25C8.54402 19.25 7.91083 18.6344 7.91083 17.875M16.3965 17.875C16.3965 18.6344 15.7633 19.25 14.9823 19.25C14.2012 19.25 13.568 18.6344 13.568 17.875M4.1394 5.5L5.46568 12.5908C5.73339 14.0221 5.86724 14.7377 6.37649 15.1605C6.88573 15.5833 7.61377 15.5833 9.06984 15.5833H15.2379C16.6941 15.5833 17.4222 15.5833 17.9314 15.1605C18.4407 14.7376 18.5745 14.0219 18.8421 12.5906L19.3564 9.84059C19.7324 7.82973 19.9203 6.8243 19.3705 6.16215C18.8207 5.5 17.7979 5.5 15.7522 5.5H4.1394ZM4.1394 5.5L3.66797 2.75"
                    stroke=""
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
                Add to cart
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setCart([{ ...product, quantity }, ...[]]);
                  setCheckoutModal(true);
                }}
                className="text-center w-full px-5 py-4 rounded-[100px] bg-indigo-600 flex items-center justify-center font-semibold text-lg text-white shadow-sm transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
