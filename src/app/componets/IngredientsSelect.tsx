"use client";

import UseMenu from "../context/MenuProvider";
import { seasonImage } from "../utils/seasonImage";

const IngredientsSelect = () => {
  const categories = ["sponge", "toppings", "cream", "piping"] as const;
  //const categories: readonly ["sponge", "toppings", "cream", "piping"]と推論する
  const {
    selectedIngredients,
    setSelectedIngredients,
    ingredients,
    selectedSeason,
    setMenuStage,
    setCakeImage,
  } = UseMenu();
  const toggleIngredient = (ing: string) => {
    if (selectedIngredients.includes(ing)) {
      // 選択済みなら解除
      setSelectedIngredients(selectedIngredients.filter((i) => i !== ing));
    } else {
      // 未選択なら追加
      setSelectedIngredients([...selectedIngredients, ing]);
    }
  };
  return (
    <div className="flex flex-col gap-4 w-full overflow-hidden">
      {categories.map((category) => (
        <div key={category} className="flex flex-col gap-2 w-full">
          <p className="font-semibold capitalize">{category}</p>

          <div className="grid grid-cols-5 gap-2">
            {ingredients[category].map((item: string) => (
              <button
                key={item}
                onClick={() => toggleIngredient(item)}
                className={`p-2 border rounded ${
                  selectedIngredients.includes(item)
                    ? "bg-green-400 text-white"
                    : "bg-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={() =>
          seasonImage({
            selectedSeason,
            selectedIngredients,
            setMenuStage,
            setCakeImage,
          })
        }
        className="mt-4 p-4 text-xl rounded-full text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600"
      >
        ケーキ画像を作成
      </button>
    </div>
  );
};

export default IngredientsSelect;
