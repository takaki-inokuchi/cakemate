import { useRef, useEffect } from "react";
import UseMenu from "../context/MenuProvider";
import { IngredientsData } from "../type/type";
import { seasonImage } from "../utils/seasonImage";

const IngredientsSelect = () => {
  const {
    selectedIngredients,
    setSelectedIngredients,
    ingredients,
    selectedSeason,
    setMenuStage,
    setCakeImage,
    color,
    world,
  } = UseMenu();

  const latestIngredients = useRef(selectedIngredients);

  useEffect(() => {
    latestIngredients.current = selectedIngredients;
  }, [selectedIngredients]);

  const toggleIngredient = (category: keyof IngredientsData, item: string) => {
    setSelectedIngredients((prev) => {
      const current = prev[category];
      const updated = current.includes(item)
        ? current.filter((i) => i !== item)
        : [...current, item];
      return { ...prev, [category]: updated };
    });
  };

  const handleGenerate = () => {
    const ingredients = latestIngredients.current;

    const isEmpty = Object.values(ingredients).every((v) => v.length === 0);
    if (isEmpty) {
      alert("具材を選択してください");
      return;
    }

    seasonImage({
      selectedSeason,
      selectedIngredients: ingredients,
      setMenuStage,
      setCakeImage,
      color,
      world,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {Object.keys(ingredients).map((category) => (
        <div key={category}>
          <p className="font-semibold capitalize">{category}</p>
          <div className="grid grid-cols-5 gap-2">
            {ingredients[category as keyof IngredientsData].map((item) => (
              <button
                key={item}
                onClick={() =>
                  toggleIngredient(category as keyof IngredientsData, item)
                }
                className={`p-2 border rounded ${
                  selectedIngredients[
                    category as keyof IngredientsData
                  ].includes(item)
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
        onClick={handleGenerate}
        className="mt-4 p-4 cursor-pointer text-xl rounded-full text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600"
      >
        ケーキ画像を作成
      </button>
    </div>
  );
};

export default IngredientsSelect;
