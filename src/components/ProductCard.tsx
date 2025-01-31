import Image from "next/image";
import Link from "next/link";

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
  description,
}: ProductCardProps) {
  const quantity = 1;

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
    <div className="relative max-w-xs bg-white rounded-lg shadow-lg overflow-hidden mx-auto select-none pt-4">
      <Image
        src={imgSrc}
        alt={name}
        quality={90}
        width={100}
        height={75}
        className="w-36 h-36 mx-auto object-cover rounded-lg"
      />
      <div className="p-3 text-center">
        <h3 className="text-md font-semibold text-gray-800 line-clamp-1">
          {name}
        </h3>
        <p className="line-clamp-3 min-h-24 dark:text-slate-900">
          {description}
        </p>
        <p className="text-2xl font-bold text-orange-400 my-2 font-mono ">
          PKR {quantity > 0 ? price * quantity : price}
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/product/${id}`}
            className="px-3 select-none py-1.5 rounded-md btn btn-outline"
          >
            Details
          </Link>
          <button
            onClick={handleCartUpdate}
            disabled={quantity < 1 && !isInCart(cart)}
            className={`px-3 select-none py-1.5 text-white rounded-md transition-colors ${
              isInCart(cart)
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-400"
            } disabled:bg-blue-300`}
          >
            {isInCart(cart) ? "Remove" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
