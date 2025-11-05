import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const image = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
   size: "1024x1024",
    });

    const imageUrl = image.data?.[0]?.url || "";
    return NextResponse.json({ url: imageUrl });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ url: "" }, { status: 500 });
  }
}
