import { NextResponse } from "next/server";

// Flux API 用の進捗確認関数
async function waitForFluxImage(
  taskId: string,
  apiKey: string,
  maxRetries = 20,
  interval = 2000
) {
  for (let i = 0; i < maxRetries; i++) {
    const res = await fetch(`https://api.segmind.com/v1/tasks/${taskId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "x-api-key": apiKey,
      },
    });

    const data = await res.json();

    // 完了時に画像URLを返す
    if (data.status === "completed" && data.result?.length > 0) {
      return data.result[0].url;
    }

    // 失敗時
    if (data.status === "failed") {
      throw new Error("Flux image generation failed");
    }

    // 待機
    await new Promise((resolve) => setTimeout(resolve, interval));
  }

  throw new Error("Flux image generation timed out");
}

export const POST = async (req: Request) => {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "prompt is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.FLUX_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Flux API key not set" },
        { status: 500 }
      );
    }

    console.log("Flux 画像作成中");

    // タスク作成
    const taskRes = await fetch("https://api.segmind.com/v1/flux-dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        prompt,
        width: 512,
        height: 512,
        samples: 1,
      }),
    });

    if (!taskRes.ok) {
      const text = await taskRes.text();
      console.error("Flux API Error (task creation):", text);
      return NextResponse.json(
        { error: "Flux API task creation failed" },
        { status: 500 }
      );
    }

    const taskData = await taskRes.json();
    const taskId = taskData?.id || taskData?.task_id;

    if (!taskId) {
      return NextResponse.json(
        { error: "No task ID returned by Flux API" },
        { status: 500 }
      );
    }

    // タスク完了まで待機
    const imageUrl = await waitForFluxImage(taskId, apiKey);

    return NextResponse.json({ imageUrl });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
};
