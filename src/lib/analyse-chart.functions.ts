import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

const Input = z.object({
  imageDataUrl: z.string().startsWith("data:image/"),
  notes: z.string().max(500).optional(),
});

export const analyseChart = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => Input.parse(d))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");
    const gateway = createLovableAiGatewayProvider(key);

    const system = `You are ChainForge AI, an elite multi-timeframe market analyst. Analyse the uploaded trading chart screenshot and return a concise, structured breakdown with these sections, each prefixed by its emoji header on its own line:

📊 Instrument & Timeframe
🧭 Market Structure
🎯 Key Levels (support / resistance / liquidity)
📈 Bias (bullish / bearish / neutral + confidence 0-100)
🎬 Trade Plan (entry, stop loss, take profit 1, take profit 2)
⚠️ Invalidation
💡 Notes

Be specific with price levels if visible. Keep total under 250 words. No disclaimers.`;

    const { text } = await generateText({
      model: gateway.chatModel("google/gemini-3-flash-preview"),
      messages: [
        { role: "system", content: system },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: data.notes
                ? `Analyse this chart. Trader notes: ${data.notes}`
                : "Analyse this chart.",
            },
            { type: "image", image: data.imageDataUrl },
          ],
        },
      ],
    });

    return { analysis: text };
  });
