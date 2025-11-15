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