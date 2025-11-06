import { Dispatch, SetStateAction } from "react";
import { MenuStage } from "../page";

export const seasonImage = async ({
  selectedSeason,
  selectedIngredients,
  setMenuStage,
  setCakeImage,
}: {
  selectedSeason: string | null;
  selectedIngredients: string[];
  setMenuStage: Dispatch<SetStateAction<MenuStage>>;
  setCakeImage: (url: string | null) => void;
}) => {
  if (!selectedSeason) return;
  if (selectedIngredients.length === 0) {
    alert("具材を選んでください");
    return;
  }

  setMenuStage("loading");

  const prompt = `${selectedSeason}のケーキで、${selectedIngredients.join(
    "と"
  )}をトッピングしたリアルなケーキ画像。`;

  try {
    const response = await fetch("/api/generateImage", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    setCakeImage(data.url);
    setMenuStage("cakeImage");
  } catch (err) {
    console.error(err);
    setMenuStage("cakeImage");
  }
};
