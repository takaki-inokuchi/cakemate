import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { season, stage } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `
あなたはパティシエAIです。
「${season}」の季節にぴったりのケーキを作ります。
次のカテゴリ「${stage}」に合うおすすめの候補を5つ、日本語で出してください。
出力は**必ず**次のJSON形式で返してください。
`,
        },
      ],
    });

    const text = completion.choices[0].message?.content || "";
    const match = text.match(/\{[\s\S]*\}/);
    const json = match ? JSON.parse(match[0]) : { ingredients: [] };

    return NextResponse.json(json);
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      ingredients: [],
      error: "AIからデータを取得できませんでした。",
    });
  }
}
