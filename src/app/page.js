import SearchAndFilter from "@/components/SearchAndFilter";
import VegetableCard from "@/components/VegetableCard";

const vegetables = [
  { name: "Arvi", imgSrc: "/vegetables/arvi_152x.jpg", price: 100 },
  {
    name: "Baby Onion",
    imgSrc:
      "/vegetables/babyonion_65589368-08b7-4400-a41a-3c05b3b07dfd_152x.jpg",
    price: 120,
  },
  {
    name: "Baby Potato",
    imgSrc:
      "/vegetables/babypotato_3c6bb078-16a4-469f-8838-ac57f0fcdb40e_152x.jpg",
    price: 80,
  },
  {
    name: "Baby Spinach",
    imgSrc: "/vegetables/babyspinach_152x.jpg",
    price: 150,
  },
  {
    name: "Beetroot",
    imgSrc:
      "/vegetables/beetroot_cbae1879-92d4-44ae-87db-8396ffddbac7_152x.jpg",
    price: 90,
  },
  {
    name: "Brinjal Long",
    imgSrc: "/vegetables/brinjalong_152x.jpg",
    price: 70,
  },
  {
    name: "Brinjal Round",
    imgSrc: "/vegetables/brinjalround_152x.jpg",
    price: 75,
  },
  { name: "Broccoli", imgSrc: "/vegetables/broccoli_152x.jpg", price: 130 },
  { name: "Cabbage", imgSrc: "/vegetables/cabbage_152x.jpg", price: 60 },
  { name: "Capsicum", imgSrc: "/vegetables/capsicum_152x.jpg", price: 110 },
  {
    name: "Cauliflower",
    imgSrc: "/vegetables/cauliflower_152x.jpg",
    price: 120,
  },
  { name: "Celery", imgSrc: "/vegetables/celerylocal_152x.jpg", price: 140 },
  { name: "Chili Green", imgSrc: "/vegetables/chilimeri_152x.jpg", price: 90 },
  { name: "Chili Mirch", imgSrc: "/vegetables/chilimiro_152x.jpg", price: 85 },
  {
    name: "Clean Green Kale",
    imgSrc: "/vegetables/cleangreenkale_152x.jpg",
    price: 150,
  },
  {
    name: "Coriander",
    imgSrc:
      "/vegetables/coriander-dhania_4cfbcdda-cd7c-490d-9257-f7091d5db557_152x.jpg",
    price: 60,
  },
  { name: "Cucumber", imgSrc: "/vegetables/cucumber_152x.jpg", price: 55 },
  {
    name: "Curry Leaves",
    imgSrc: "/vegetables/curryleaves_152x.jpg",
    price: 50,
  },
  {
    name: "French Beans",
    imgSrc: "/vegetables/frenchbeans_152x.jpg",
    price: 110,
  },
  {
    name: "Garlic China",
    imgSrc:
      "/vegetables/garlicchina_97569710-74be-4557-a164-f31eaa391346_152x.jpg",
    price: 180,
  },
  {
    name: "Garlic Desi",
    imgSrc:
      "/vegetables/garlicdesi_bbae4406-33e9-4af1-bbd17-732cca017df2_152x.jpg",
    price: 160,
  },
  { name: "Ginger", imgSrc: "/vegetables/gingerdesi_152x.jpg", price: 90 },
  {
    name: "Iceberg Lettuce",
    imgSrc: "/vegetables/iceberglettuce_152x.jpg",
    price: 200,
  },
  {
    name: "Karela",
    imgSrc: "/vegetables/karela_78a0d5dc-0f2a-4aa1-822a-c99dfac3a796_152x.jpg",
    price: 120,
  },
  { name: "Lemon", imgSrc: "/vegetables/lemon_152x.jpg", price: 60 },
  {
    name: "Loki",
    imgSrc: "/vegetables/loki_1cb7c723-3eaa-4af1-bb6c-06e90e7d47f_152x.jpg",
    price: 80,
  },
  { name: "New Potato", imgSrc: "/vegetables/newpotato_152x.jpg", price: 70 },
  {
    name: "Onion",
    imgSrc: "/vegetables/onion_48884385-c254-4758-9610-cc5f864b8bc8_152x.jpg",
    price: 65,
  },
  {
    name: "Parsley",
    imgSrc: "/vegetables/parsley_ebdc8c59-6689-4057-b8a4-b8a4c57965b3_152x.jpg",
    price: 100,
  },
  { name: "Peas", imgSrc: "/vegetables/peas_152x.jpg", price: 130 },
  {
    name: "Pudina",
    imgSrc: "/vegetables/pudina_23b59f87-81f9-403a-8429-9d5910141fe2_152x.jpg",
    price: 50,
  },
  {
    name: "Purple Cabbage",
    imgSrc:
      "/vegetables/purplecabbage_fbb719ef-f8b8-4da3-9235-e303de13b37a_152x.jpg",
    price: 140,
  },
];

export default function Home() {
  return (
    <>
      <SearchAndFilter vegetables={vegetables} />
      {/* <div className="grid grid-cols-4 gap-2">
        {vegetables.map((vegetable, index) => (
          <VegetableCard
            name={vegetable.name}
            imgSrc={vegetable.imgSrc}
            price={vegetable.price}
          />
        ))}
      </div> */}
    </>
  );
}
