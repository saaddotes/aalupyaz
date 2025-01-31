"use client";
import { onSnapshot, collection } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/firebase/config"; // import your Firebase config
import { FirestoreError } from "firebase/firestore";

type DataContextType = {
  products: any[];
  loading: boolean;
  error: any;
  cart: any[];
  setCart: any;
  checkoutModal: any;
  setCheckoutModal: any;
};

const DataContext = createContext<DataContextType | null>(null);

export default function DataContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  type Product = {
    id: string;
    [key: string]: any;
    description: "string";
    imgSrc: "string";
    name: "string";
    price: number;
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<any[]>([]);
  const [checkoutModal, setCheckoutModal] = useState(false);

  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "vegetables"),
      (snapshot) => {
        setProducts(
          snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              description: data.description,
              imgSrc: data.imgSrc,
              name: data.name,
              price: data.price,
            };
          })
        );
        snapshot.docs.map((doc) =>
          console.log({
            id: doc.id,
            ...doc.data(),
          })
        );
        // console.log("Data fetched successfully");
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const value = {
    products,
    loading,
    error,
    cart,
    setCart,
    checkoutModal,
    setCheckoutModal,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useContext must be used within an ContextProductProvider");
  }
  return context;
}
