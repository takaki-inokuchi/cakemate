"use client";
import UseMenu from "../context/MenuProvider";
import { handleSeasonSelect } from "../utils/handleSeasonSelect";

const SelectSeasonbutton = () => {
  const { setMenuStage, setIngredients, setSelectedSeason } = UseMenu();
  return (
    <div className="flex flex-col gap-10">
      {[
        {
          name: "春",
          gradient: "from-pink-600 via-pink-500 to-pink-600",
          hover: "hover:from-pink-700 hover:via-pink-700 hover:to-pink-700",
        },
        {
          name: "夏",
          gradient: "from-yellow-400 via-yellow-500 to-yellow-600",
          hover:
            "hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700",
        },
        {
          name: "秋",
          gradient: "from-orange-400 via-orange-500 to-orange-600",
          hover:
            "hover:from-orange-500 hover:via-orange-600 hover:to-orange-700",
        },
        {
          name: "冬",
          gradient: "from-blue-400 via-blue-500 to-blue-600",
          hover: "hover:from-blue-500 hover:via-blue-600 hover:to-blue-700",
        },
      ].map((seasonData) => (
        <button
          key={seasonData.name}
          onClick={() =>
            handleSeasonSelect({
              season: seasonData.name,
              setSelectedSeason,
              setMenuStage,
              setIngredients,
            })
          }
          className={`cursor-pointer text-white bg-gradient-to-r ${seasonData.gradient} p-4 text-2xl rounded-full ${seasonData.hover}`}
        >
          {seasonData.name}のケーキ
        </button>
      ))}
    </div>
  );
};

export default SelectSeasonbutton;
