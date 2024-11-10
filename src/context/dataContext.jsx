"use client";
import { onSnapshot, collection } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/firebase/config"; // import your Firebase config

const DataContext = createContext();

export default function DataContextProvider({ children }) {
  const [vegetables, setVegetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "vegetables"), // Reference to your Firestore collection
      (snapshot) => {
        setVegetables(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
        setLoading(false); // Data fetched successfully
      },
      (err) => {
        setError(err);
        setLoading(false); // Error occurred while fetching
      }
    );

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  const value = { vegetables, loading, error };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useData = () => useContext(DataContext);
