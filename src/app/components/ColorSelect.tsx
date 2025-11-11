"use client";
import UseMenu from "../context/MenuProvider";
import { handleColorSelect } from "../utils/handleColorSelect";

const ColorSelect = () => {
  const { color, setColor, setMenuStage, setIngredients } = UseMenu();

  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded-2xl shadow-sm">
      <label className="text-sm font-medium text-gray-700">
        作成したいケーキの色を指定してください
      </label>

      <input
        type="text"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        placeholder="例：ピンク、チョコブラウン、抹茶グリーン"
        className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
      />
      <button
        onClick={() =>
          handleColorSelect({ setMenuStage, color, setIngredients })
        }
        className="cursor-pointer rounded-full bg-gradient-to-r bg-gradient-to-r from-pink-400 via-red-400 to-red-400 hover:from-pink-600 hover:via-red-600 hover:to-red-600"
      >
        決定
      </button>
    </div>
  );
};

export default ColorSelect;
