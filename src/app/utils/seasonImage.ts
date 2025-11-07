import { Dispatch, SetStateAction } from "react";
import { MenuStage } from "../type/type";

export const seasonImage = async ({
  selectedSeason,
  selectedIngredients,
  setMenuStage,
  setCakeImage,
  color,
}: {
  selectedSeason?: string | null;
  selectedIngredients: string[];
  setMenuStage: Dispatch<SetStateAction<MenuStage>>;
  setCakeImage: (url: string | null) => void;
  color?: string;
}) => {
  if (!selectedSeason) return;
  if (selectedIngredients.length === 0) {
    alert("具材を選んでください");
    return;
  }

  setMenuStage("loading");

  const prompt = `${selectedSeason}${color}のケーキで、${selectedIngredients.join(
    "と"
  )}をトッピングした、ホールケーキを作成して。🎂`;

  try {
    const response = await fetch("/api/generateImage", {
      method: "POST",
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
