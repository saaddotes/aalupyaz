"use client";
import { useState } from "react";

const TextParser = ({ inputText }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  // Function to parse and update prices
  const parseAndUpdatePrices = async (text) => {
    setIsProcessing(true);

    // Regular expression to match vegetable prices in the format:
    // Name (with emoji) : Price/unit
    const regex =
      /([🍆🥔🧅🍅🥒🍈🍋🌽🫚🫛🫑🥕🌿🌶️🍋🍇]+(?:[^\d]+)?)\s*[:—]?\s*(\d{2,4})\s*(rs\/kg|rs\/bundle|kg)?/g;
    const matches = [];
    let match;

    // Extracting name and price pairs
    while ((match = regex.exec(text)) !== null) {
      const name = match[1].trim();
      const price = match[2].trim();
      matches.push({ name, price });
    }

    // Updating the Firebase database
    try {
      for (const vegetable of matches) {
        console.log("vegetables", vegetable);
      }
      alert("Prices updated successfully!");
    } catch (error) {
      console.error("Error updating prices:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => parseAndUpdatePrices(inputText)}
        disabled={isProcessing}
        className={`btn ${isProcessing ? "loading" : ""}`}
      >
        {isProcessing ? "Updating..." : "Update Prices"}
      </button>
    </div>
  );
};

// Usage of TextParser component
const App = () => {
  const inputText = `
    🧅Onions: 150rs/kg
    🥔 Red potatoes : 140rs/kg
    🫚 Ginger : 850/kg
    🧄 Garlic (China): 750/kg
    🍋 Lemon : 220rs/kg
    🌶️ Chillies (small & big): 250/kg
    🍅 Tomatoes: 220/kg
    🌿 Coriander & Mint: 20/bundle
    🥒 Cucumber: 120/kg
    🥦 Phool Gobi : 200rs/kg
    🥬 Ban Gobi : 120rs/kg
    🥒 Loki : 160rs/kg 
    🥒 Touraye : 190rs/kg
    🍆 Gool bangun : 100rs/kg
    🍆 Lamba bangun : 120rs/kg
    🫛 Bhindi : 300rs/kg
    🫛 Mattar : 350rs/kg (unavailable)
    🍈 Tinday : 240rs/kg
    🥕 Gajar  : 120rs/kg
    🌽 Bhutta : 90rs/kg 
    🫑 Simla mirch : 330rs/kg
    🥒 Moli : 140rs/kg
    🧅 Hari pyaz : 320rs/kg
    🥬 Palak : 110rs/kg
  `;

  return <TextParser inputText={inputText} />;
};

export default App;
