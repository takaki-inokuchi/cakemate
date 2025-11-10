import UseMenu from "../context/MenuProvider";
import { handleSeasonSelect } from "../utils/handleSeasonSelect";

const Retry = () => {
  const { selectedSeason, setSelectedSeason, setMenuStage, setIngredients } =
    UseMenu();
  if (!selectedSeason) return;

  return (
    <div className="flex flex-col items-center gap-2">
      <p>材料データが取得できませんでした。</p>
      <button
        onClick={() =>
          handleSeasonSelect({
            season: selectedSeason,
            setSelectedSeason,
            setMenuStage,
            setIngredients,
          })
        }
        className="p-2 bg-blue-500 text-white rounded"
      >
        再試行
      </button>
    </div>
  );
};

export default Retry;
