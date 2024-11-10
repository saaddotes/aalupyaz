import Image from "next/image";

const VegetableCard = ({ name, price, imgSrc }) => {
  return (
    <div className="max-w-xs bg-white rounded-lg shadow-lg overflow-hidden  ">
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
        <p className="text-2xl font-bold text-green-600 my-2">Rs. {price}</p>
        <button className="px-3 py-1.5 bg-blue-500 text-white rounded-md w-full hover:bg-blue-400 transition-colors">
          View More
        </button>
      </div>
    </div>
  );
};

export default VegetableCard;
