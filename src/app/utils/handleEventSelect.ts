import { Dispatch, SetStateAction } from "react";
import { IngredientsData, MenuStage } from "../type/type";

interface handleEventSelectprops {
  setMenuStage: Dispatch<SetStateAction<MenuStage>>;
  event: string;
  setIngredients: (ings: IngredientsData) => void;
}

export const handleEventSelect = async ({
  setMenuStage,
  event,
  setIngredients,
}: handleEventSelectprops) => {
  setMenuStage("loading");

  try {
    const response = await fetch("/api/getIngredientsEvent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event }),
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
