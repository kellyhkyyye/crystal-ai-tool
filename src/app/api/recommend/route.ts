import OpenAI from "openai";
import { crystalInventory } from "../../../../lib/crystalInventory";

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

Output:
1. Recommended crystals
2. Meaning of each crystal
3. Bracelet style
4. One affirmation

Keep it elegant, warm, spiritual.
`,
        },
        {
          role: "user",
          content: userInput,
        },
      ],
    });

    return Response.json({
      result: completion.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);

    return Response.json({
      error: "Something went wrong",
    });
  }
}