import { Dispatch, SetStateAction } from "react";
import { IngredientsData, MenuStage } from "../type/type";

export const seasonImage = async ({
  selectedSeason,
  selectedIngredients,
  setMenuStage,
  setCakeImage,
  color,
  event,
  world,
}: {
  selectedSeason?: string | null;
  selectedIngredients: IngredientsData;
  setMenuStage: Dispatch<SetStateAction<MenuStage>>;
  setCakeImage: (url: string | null) => void;
  color?: string | null;
  event?: string | null;
  world?: string | null;
}) => {
  if (!selectedSeason && !color && !event && !world) return;

  const isEmpty =
    !selectedIngredients.sponge.length &&
    !selectedIngredients.toppings.length &&
    !selectedIngredients.cream.length &&
    !selectedIngredients.piping.length;

  if (isEmpty) {
    alert("具材を選んでください");
    return;
  }

  setMenuStage("loading");

  const prompt =
    `${selectedSeason}${color}${event}${world}のケーキで、` +
    (selectedIngredients.sponge.length
      ? `スポンジ: ${selectedIngredients.sponge.join("、")}、`
      : "") +
    (selectedIngredients.cream.length
      ? `クリーム: ${selectedIngredients.cream.join("、")}、`
      : "") +
    (selectedIngredients.toppings.length
      ? `トッピング: ${selectedIngredients.toppings.join("、")}、`
      : "") +
    (selectedIngredients.piping.length
      ? `絞り方: ${selectedIngredients.piping.join("、")}、`
      : "") +
    `を使ったホールケーキを作成して。🎂`;

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
