import { Dispatch, SetStateAction } from "react";
import { MenuStage } from "../type/type";

interface OriginalImageProps {
  sponge: string;
  cream: string;
  toppings: string;
  piping: string;
  setMenuStage: Dispatch<SetStateAction<MenuStage>>;
  setCakeImage: Dispatch<SetStateAction<string | null>>;
}

export const OriginalImage = async ({
  sponge,
  cream,
  toppings,
  piping,
  setMenuStage,
  setCakeImage,
}: OriginalImageProps) => {
  setMenuStage("loading");

  const promptParts = [];
  if (sponge) promptParts.push(`スポンジ: ${sponge}`);
  if (cream) promptParts.push(`クリーム: ${cream}`);
  if (toppings) promptParts.push(`トッピング: ${toppings}`);
  if (piping) promptParts.push(`絞り方: ${piping}`);

  const prompt = `オリジナルケーキを作成。${promptParts.join(
    "、"
  )}。ホールケーキの画像を作成してください。`;

  try {
    const response = await fetch("/api/generateImage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    setCakeImage(data.imageUrl);
    setMenuStage("cakeImage");
  } catch (err) {
    console.error(err);
    setMenuStage("cakeImage");
  }
};
