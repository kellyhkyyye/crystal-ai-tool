import OpenAI from "openai";
import { crystalInventory } from "../../../lib/crystalInventory";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
	const body = await req.json();
	const userInput = body.message;

	const inventoryText = crystalInventory	
  	     .map((crystal) => {
	 return `${crystal.name} (${crystal.chineseName}) - Color: ${crystal.color}; Energy: ${crystal.energy.join(", ")}`;
 	 })
  	 .join("\n");

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are a crystal recommendation assistant for a DIY crystal workshop.

Available inventory:
${inventoryText}

Important output rule:
For every recommended crystal, you MUST show the name in this exact format:
English Name (中文名)

Example:
Rose Quartz (粉水晶)

Return the response ONLY in valid JSON format.

Example format:
{
  "crystals": [
{
  "name": "Rose Quartz",
  "chineseName": "粉水晶",
  "meaning": "Self-love and emotional healing",
  "whyRecommended": "This crystal matches your intention because it supports softness, emotional openness, and gentle confidence.",
  "energyKeywords": ["self-love", "softness", "emotional healing"],
  "color": "Soft Pink",
  "howToUse": "Use it as the main stone or place it near the center of the bracelet."
}
  ],
  "braceletStyle": "Soft feminine pink and clear tones",
  "affirmation": "I am worthy of love and peace."
}

Keep it elegant, warm, spiritual.
`,
        },
        {
          role: "user",
          content: userInput,
        },
      ],
    });

      const aiResponse = completion.choices[0].message.content || "{}";

      return Response.json(JSON.parse(aiResponse));

  } catch (error) {
    console.log(error);

    return Response.json({
      error: "Something went wrong",
    });
  }
}