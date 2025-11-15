export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import OpenAI from "openai";

export const POST = async (req: Request) => {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "prompt is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenAI API key not set" },
        { status: 500 }
      );
    }

    const openai = new OpenAI({ apiKey });

    console.log("OpenAI 画像生成中");

    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
      n: 1,
    });

    if (!response.data || response.data.length === 0) {
      return NextResponse.json(
        { error: "画像生成に失敗しました" },
        { status: 500 }
      );
    }

    const image_base64 = response.data[0].b64_json;

    if (!image_base64) {
      return NextResponse.json(
        { error: "画像生成に失敗しました（base64なし）" },
        { status: 500 }
      );
    }

    // base64 をブラウザでそのまま img src に使える形へ
    const imageUrl = `data:image/png;base64,${image_base64}`;

    return NextResponse.json({ imageUrl });
  } catch (err: unknown) {
    console.error("IMAGE API ERROR:", err);

    const message =
      err instanceof Error ? err.message : "Internal Server Error";

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
};
