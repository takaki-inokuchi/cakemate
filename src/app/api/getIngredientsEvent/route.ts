import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { event } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `
あなたはパティシエAIです。
「${event}」のケーキを作成します。

次のカテゴリごとに候補を出してください。
- スポンジ: 5種類
- トッピング: 5種類
- クリーム: 5種類
- 絞り方: 5種類

出力は**必ずJSON形式**で返してください。例：
{
  "sponge": ["スポンジ1", "スポンジ2", "スポンジ3", "スポンジ4", "スポンジ5"],
  "toppings": ["トッピング1", "トッピング2", "トッピング3"],
  "cream": ["クリーム1", "クリーム2", "クリーム3", "クリーム4", "クリーム5"],
  "piping": ["絞り方1", "絞り方2", "絞り方3", "絞り方4", "絞り方5"]
}
`,
        },
      ],
    });

    const text = completion.choices[0].message?.content || "";
    let jsonData;
    try {
      jsonData = JSON.parse(text);
    } catch {
      // もしJSONパースできなければ空の構造を返す
      jsonData = {
        sponge: [],
        toppings: [],
        cream: [],
        piping: [],
      };
    }

    return NextResponse.json(jsonData);
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      sponge: [],
      toppings: [],
      cream: [],
      piping: [],
      error: "AIからデータを取得できませんでした。",
    });
  }
}
