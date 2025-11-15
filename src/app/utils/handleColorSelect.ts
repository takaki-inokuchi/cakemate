import { Dispatch, SetStateAction } from "react";
import { IngredientsData, MenuStage } from "../type/type";

interface handleColorSelectprops {
  color: string;
  setMenuStage: Dispatch<SetStateAction<MenuStage>>;
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

