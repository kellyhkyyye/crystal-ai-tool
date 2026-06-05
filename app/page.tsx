"use client";
import { crystalInventory } from "../lib/crystalInventory";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleRecommend() {
    setLoading(true);
    setResult("");

    const res = await fetch("/api/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#F8F1E9] flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-lg p-6 max-w-2xl w-full">
      <div className="flex justify-center mb-4">
        <img
          src="/logo.png"
          alt="Glint & Moon"
          className="w-[450px] object-contain"
        />
      </div>

        <p className="text-center text-gray-600 mb-4">
          Personalized crystal guidance for clarity, balance, and growth.
        </p>



        <p className="text-center text-gray-600 mb-6">
          Describe your feelings, goals, or the energy you wish to invite into your life...
        </p>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us your needs..."
          className="w-full border rounded-xl p-4 mb-4 h-32"
        />

        <button
          onClick={handleRecommend}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-xl mb-6"
        >
          {loading ? "Generating..." : "Enter AI Custom"}
        </button>

        <div className="text-sm text-gray-500 bg-[#FDF6EE] p-4 rounded-xl mb-6">
          Share your current feelings, challenges, or intentions.
          <br /><br />
          Examples:
          <br />
          • I want more confidence and motivation.
          <br />
          • I've been feeling anxious and overwhelmed lately.
          <br />
          • I'm starting a new chapter in my life and want positive energy.
          <br />
          • I want to attract love, abundance, and inner peace.
        </div>
  
{result && (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">
      AI Recommendation
    </h2>

    {result.crystals?.map((crystal: any, index: number) => {
      const inventoryCrystal = crystalInventory.find(
        (item) =>
          item.name.toLowerCase() === crystal.name?.toLowerCase() ||
          item.chineseName === crystal.chineseName
      );

      return (
        <div
          key={index}
          className="bg-[#FDF6EE] p-4 rounded-2xl shadow"
        >


          <h3 className="text-xl font-bold mb-2">
            ✨ {crystal.name} ({crystal.chineseName})
          </h3>

          <p>
            <span className="font-semibold">Meaning:</span>{" "}
            {crystal.meaning}
          </p>

          <p>
            <span className="font-semibold">Color:</span>{" "}
            {crystal.color}
          </p>

          <p>
            <span className="font-semibold">Why recommended:</span>{" "}
            {crystal.whyRecommended}
          </p>

          <p>
            <span className="font-semibold">Energy:</span>{" "}
            {crystal.energyKeywords?.join(", ")}
          </p>

          <p>
            <span className="font-semibold">How to use:</span>{" "}
            {crystal.howToUse}
          </p>

          <p>
            <span className="font-semibold">How to use:</span>{" "}
            {crystal.howToUse}
          </p>

          {inventoryCrystal?.image && (
            <img
              src={inventoryCrystal.image}
              alt={crystal.name}
              className="w-full object-contain rounded-xl mt-4"
            />
          )}
        </div>
      );
    })}

    <div className="bg-white p-4 rounded-2xl border">
      <p className="mb-2">
        <span className="font-semibold">Bracelet Style:</span>{" "}
        {result.braceletStyle}
      </p>

      <p className="italic">
        "{result.affirmation}"
      </p>
    </div>
    </div>
  )}

    </div>
  </main>
);
}