"use client";
import UseMenu from "../context/MenuProvider";


const ColorSelect = () => {
const { color, setColor } = UseMenu();

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
    </div>
  );
};

export default ColorSelect;
