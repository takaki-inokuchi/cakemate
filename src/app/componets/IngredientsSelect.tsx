import UseMenu from "../context/MenuProvider";
import { IngredientsData } from "../type/type";
import { seasonImage } from "../utils/seasonImage";

const IngredientsSelect = () => {
  const categories: (keyof IngredientsData)[] = [
    "sponge",
    "toppings",
    "cream",
    "piping",
  ];
  const {
    selectedIngredients,
    setSelectedIngredients,
    ingredients,
    selectedSeason,
    setMenuStage,
    setCakeImage,
    color,
  } = UseMenu();

  const toggleIngredient = (category: keyof IngredientsData, item: string) => {
    setSelectedIngredients((prev) => {
      const current = prev[category];
      const updated = current.includes(item)
        ? current.filter((i) => i !== item)
        : [...current, item];
      return { ...prev, [category]: updated };
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full overflow-hidden">
      {categories.map((category) => (
        <div key={category} className="flex flex-col gap-2 w-full">
          <p className="font-semibold capitalize">{category}</p>

          <div className="grid grid-cols-5 gap-2">
            {ingredients[category].map((item) => (
              <button
                key={item}
                onClick={() => toggleIngredient(category, item)}
                className={`p-2 border rounded ${
                  selectedIngredients[category].includes(item)
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
            color,
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
