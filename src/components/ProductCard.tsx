import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProductCardProps {
  name: string;
  price: number;
  imgSrc: string;
  id: string;
  cart: any[];
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
  data: any;
  description: string;
}

export default function ProductCard({
  name,
  price,
  imgSrc,
  id,
  cart,
  setCart,
  data,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(0);

  function isInCart(cart: any) {
    return cart.some(
      (cartItem: any) =>
        cartItem.name === name &&
        cartItem.price === price &&
        cartItem.imgSrc === imgSrc
    );
  }

  function handleCartUpdate() {
    console.log("cart", cart);
    if (isInCart(cart)) {
      const updatedCart = cart.filter(
        (cartItem) =>
          cartItem.name !== name ||
          cartItem.price !== price ||
          cartItem.imgSrc !== imgSrc
      );
      setCart(updatedCart);
    } else {
      if (quantity > 0) {
        const updatedCart = [...cart, { ...data, quantity }];
        setCart(updatedCart);
      }
    }
  }

  return (
    <div className="relative max-w-xs bg-white rounded-lg shadow-lg overflow-hidden mx-auto select-none">
      <Image
        src={imgSrc}
        alt={name}
        quality={90}
        width={100}
        height={75}
        className="w-36 h-36 mx-auto object-cover"
      />
      <div className="p-3 text-center">
        <h3 className="text-md font-semibold text-gray-800">{name}</h3>
        <p className="text-2xl font-bold text-green-600 my-2">
          Rs. {quantity > 0 ? price * quantity : price}
        </p>
        <div className="bg-slate-100 inline-block p-1 rounded-lg my-4">
          <button
            disabled={isInCart(cart)}
            className="btn btn-outline bg-slate-300"
            onClick={() => setQuantity(quantity > 0 ? quantity - 1 : 0)}
          >
            -
          </button>
          <span className="mx-2 select-none">{quantity}</span>
          <button
            disabled={isInCart(cart)}
            className="btn btn-outline bg-slate-300"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/products/${id}`}
            className={`px-3 select-none py-1.5 text-white rounded-md w-full transition-colors bg-slate-500 hover:bg-slate-600`}
          >
            View More
          </Link>
          <button
            onClick={handleCartUpdate}
            disabled={quantity < 1 && !isInCart(cart)}
            className={`px-3 select-none py-1.5 text-white rounded-md w-full transition-colors ${
              isInCart(cart)
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            } disabled:bg-blue-300`}
          >
            {isInCart(cart) ? "Remove from Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
      {quantity > 0 && (
        <span className="badge badge-neutral absolute top-2 right-2">
          {quantity}
        </span>
      )}
    </div>
  );
}
