import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

async function urlToBase64(url: string): Promise<{ data: string; mimeType: string }> {
  if (url.startsWith("data:")) {
    const [meta, data] = url.split(",");
    const mimeType = meta.split(":")[1].split(";")[0];
    return { data, mimeType };
  }
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  return { data: Buffer.from(buffer).toString("base64"), mimeType: res.headers.get("content-type") ?? "image/jpeg" };
}

async function checkAndDeductCredits(userId: string): Promise<{ ok: boolean; reason?: string }> {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  // Check balance
  const balRes = await fetch(`${base}/api/credits/balance?userId=${userId}`);
  const { balance } = await balRes.json();
  if ((balance ?? 0) < 5) return { ok: false, reason: "Not enough credits. You need 5 credits to generate." };

  // Deduct
  const deductRes = await fetch(`${base}/api/credits/deduct`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, amount: 5, type: "ai_generate", description: "AI poster generation" }),
  });
  const { success } = await deductRes.json();
  if (!success) return { ok: false, reason: "Not enough credits. You need 5 credits to generate." };

  return { ok: true };
}

export async function POST(req: NextRequest) {
  try {
    const { prompt, imageUrl, mode, userId } = await req.json();
    if (!prompt) return NextResponse.json({ error: "Prompt required" }, { status: 400 });

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "your_gemini_api_key_here") {
      return NextResponse.json({ error: "AI not configured yet. Add your Gemini API key to .env.local" }, { status: 503 });
    }

    // Check + deduct credits if userId provided
    if (userId) {
      const credit = await checkAndDeductCredits(userId);
      if (!credit.ok) return NextResponse.json({ error: credit.reason, insufficientCredits: true }, { status: 402 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp-image-generation" } as any);

    const fullPrompt = mode === "edit"
      ? `Edit this poster image: ${prompt}. Keep it as a premium wall art print quality. High resolution, professional.`
      : `Create a high quality premium wall art poster print. ${prompt}. Professional style. High contrast. Suitable for A4 or A3 print. No watermarks.`;

    let contents: any[];
    if (imageUrl && mode === "edit") {
      const { data, mimeType } = await urlToBase64(imageUrl);
      contents = [{ role: "user", parts: [{ inlineData: { data, mimeType } }, { text: fullPrompt }] }];
    } else {
      contents = [{ role: "user", parts: [{ text: fullPrompt }] }];
    }

    const result = await (model as any).generateContent({
      contents,
      generationConfig: { responseModalities: ["image", "text"] } as any,
    });

    const parts  = result.response.candidates?.[0]?.content?.parts ?? [];
    const imgPart = parts.find((p: any) => p.inlineData);
    if (!imgPart?.inlineData) return NextResponse.json({ error: "No image generated. Try a different prompt." }, { status: 500 });

    return NextResponse.json({ image: `data:${imgPart.inlineData.mimeType};base64,${imgPart.inlineData.data}` });
  } catch (e: any) {
    console.error("AI generate error:", e);
    return NextResponse.json({ error: e.message ?? "Generation failed" }, { status: 500 });
  }
}
