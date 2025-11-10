import { Dispatch, SetStateAction } from "react";
import { IngredientsData, MenuStage } from "../type/type";

interface handleColorSelectprops {
  setMenuStage: Dispatch<SetStateAction<MenuStage>>;
  color: string;
  setIngredients: (ings: IngredientsData) => void;
}

export const handleColorSelect = async ({
  setMenuStage,
  color,
  setIngredients,
}: handleColorSelectprops) => {
  setMenuStage("loading");

  try {
    const response = await fetch("/api/getIngredientsColor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ color }),
    });
    const data = await response.json();

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
