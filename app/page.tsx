"use client";

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
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center mb-4">
          AI CUSTOM RECOMMEND
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Tell us your needs, and AI will recommend the perfect crystals for you
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

  



{result && (
  <div className="space-y-4">

    <h2 className="text-2xl font-bold">
      AI Recommendation
    </h2>

    {result.crystals?.map((crystal: any, index: number) => (
      <div
        key={index}
        className="bg-[#FDF6EE] p-4 rounded-2xl shadow"
      >
  {crystal.image && (
    <img
      src={crystal.image}
      alt={crystal.name}
      className="w-full h-56 object-cover rounded-xl mb-4"
    />
  )}
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


      </div>
    ))}

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