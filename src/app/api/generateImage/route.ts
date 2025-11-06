import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "prompt is required" },
        { status: 400 }
      );
    }

    const res = await fetch("https://api.deepai.org/api/text2img", {
      method: "POST",
      headers: {
        "Api-Key": process.env.DEEPAI_API_KEY || "",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ text: prompt }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("DeepAI API Error:", text);
      return NextResponse.json({ error: "DeepAI API Error" }, { status: 500 });
    }
    const data = await res.json();
    console.log(data);

    if (!data.output_url) {
      return NextResponse.json(
        { error: "Failed to generate image" },
        { status: 500 }
      );
    }

    return NextResponse.json({ imageUrl: data.output_url });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
