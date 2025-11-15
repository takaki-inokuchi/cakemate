import { Dispatch, SetStateAction } from "react";
import { IngredientsData, MenuStage } from "../type/type";

interface handleWorldSelectprops {
  setMenuStage: Dispatch<SetStateAction<MenuStage>>;
  world: string;
  setIngredients: (ings: IngredientsData) => void;
}

export const handleWorldSelect = async ({
  setMenuStage,
  world,
  setIngredients,
}: handleWorldSelectprops) => {
  setMenuStage("loading");

  try {
    const response = await fetch("/api/getIngredientsWorld", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ world }),
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

