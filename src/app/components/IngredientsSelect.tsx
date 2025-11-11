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

    // 🟢 refに入っている「確実に最新の」データを渡す
    seasonImage({
      selectedSeason,
      selectedIngredients: ingredients,
      setMenuStage,
      setCakeImage,
      color,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 各カテゴリのボタン */}
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
                  selectedIngredients[category as keyof IngredientsData].includes(item)
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

      {/* 生成ボタン */}
      <button
        onClick={handleGenerate}
        className="mt-4 p-4 text-xl rounded-full text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
      >
        ケーキ画像を作成
      </button>
    </div>
  );
};

export default IngredientsSelect;
