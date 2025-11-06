import { MenuStage, IngredientsData } from "../page";

interface HandleSeasonSelectParams {
  season: string;
  setSelectedSeason: (season: string) => void;
  setMenuStage: React.Dispatch<React.SetStateAction<MenuStage>>;
  setIngredients: (ings: IngredientsData) => void;
}

export const handleSeasonSelect = async ({
  season,
  setSelectedSeason,
  setMenuStage,
  setIngredients,
}: HandleSeasonSelectParams) => {
  setSelectedSeason(season);
  setMenuStage("loading");

  try {
    const response = await fetch("/api/getIngredients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ season }),
    });
    const data: IngredientsData = await response.json();

    setIngredients(data);
    setMenuStage("ingredients");
  } catch (err) {
    console.error(err);
    setMenuStage("ingredients");

    // 空の IngredientsData をセット
    setIngredients({
      sponge: [],
      toppings: [],
      cream: [],
      piping: [],
    });
  }
};
