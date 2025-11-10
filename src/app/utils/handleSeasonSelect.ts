import { Dispatch, SetStateAction } from "react";
import { IngredientsData, MenuStage } from "../type/type";

interface HandleSeasonSelectParams {
  season: string;
  setSelectedSeason: (season: string) => void;
  setMenuStage: Dispatch<SetStateAction<MenuStage>>;
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
    const response = await fetch("/api/getIngredientsSeason", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ season }),
    });
    const data: IngredientsData = await response.json();

    const isEmpty =
      !data ||
      (!data.sponge?.length &&
        !data.toppings?.length &&
        !data.cream?.length &&
        !data.piping?.length);

     if (isEmpty) {
    setMenuStage("retry");
    setIngredients({
      sponge: [],
      toppings: [],
      cream: [],
      piping: [],
    });
    return;
  }

    setIngredients(data);
    setMenuStage("ingredients");
  } catch (err) {
    console.error(err);
    setMenuStage("error");

    setIngredients({
      sponge: [],
      toppings: [],
      cream: [],
      piping: [],
    });
  }
};
