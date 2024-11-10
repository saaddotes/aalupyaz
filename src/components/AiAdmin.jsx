"use client";
import { useState } from "react";
import Tesseract from "tesseract.js";
import { db } from "@/firebase/config"; // Your firebase config
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

const AiAdmin = () => {
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setLoading(true);
      // Start OCR processing
      const result = await Tesseract.recognize(
        file,
        "eng", // Language (you can use others like 'spa' for Spanish)
        { logger: (m) => console.log(m) }
      );
      setExtractedText(result.data.text);
      setLoading(false);
      console.log(result.data.text); // Output the extracted text for debugging
    }
  };

  const updatePrices = async () => {
    // Assuming extracted text has vegetable names and prices
    // Example: "Tomato: Rs 50", "Potato: Rs 40"
    const regex = /(\w+):\s*Rs\s*(\d+)/g;
    const matches = [...extractedText.matchAll(regex)];

    for (let match of matches) {
      const vegetableName = match[1];
      const price = Number(match[2]);

      // Update price in Firebase
      const vegetableRef = query(
        collection(db, "vegetables"),
        where("name", "==", vegetableName)
      );

      const querySnapshot = await getDocs(vegetableRef);

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (docSnap) => {
          const docRef = doc(db, "vegetables", docSnap.id);
          await updateDoc(docRef, { price });
        });
      }
    }
  };

  return (
    <div>
      <h2>Admin Portal</h2>
      <input type="file" onChange={handleImageUpload} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Extracted Text:</p>
          <pre>{extractedText}</pre>
        </div>
      )}
      <button onClick={updatePrices} disabled={loading}>
        Update Prices
      </button>
    </div>
  );
};

export default AiAdmin;
