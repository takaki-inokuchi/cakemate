import UseMenu from "../context/MenuProvider";
import { handleWorldSelect } from "../utils/handleWorldSelect";

const WorldSelect = () => {
  const { world, setWorld, setMenuStage, setIngredients } = UseMenu();

  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded-2xl shadow-sm">
      <label className="text-sm font-medium text-gray-700">
        作成したいケーキの世界観を指定してください。
      </label>

      <input
        type="text"
        value={world}
        onChange={(e) => setWorld(e.target.value)}
        placeholder="例：妖精、異世界、冒険"
        className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
      />
      <button
        onClick={() =>
          handleWorldSelect({ setMenuStage, world, setIngredients })
        }
      >
        決定
      </button>
    </div>
  );
};

export default WorldSelect;
