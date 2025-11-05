import { MenuStage } from "../page";

interface HandleSeasonSelectParams {
  season: string;
  setSelectedSeason: (season: string) => void;
  setMenuStage: React.Dispatch<React.SetStateAction<MenuStage>>;
  setIngredients: (ings: string[]) => void;
  setLoading: (loading: boolean) => void;
}

export const handleSeasonSelect = async ({
  season,
  setSelectedSeason,
  setMenuStage,
  setIngredients,
  setLoading,
}: HandleSeasonSelectParams) => {
  setSelectedSeason(season);
  setLoading(true);

  try {
    const response = await fetch("/api/getIngredients", {
      method: "POST",
      body: JSON.stringify({ season, stage: "ingredients" }),
    });
    const data = await response.json();
    setIngredients(data.ingredients);
    setMenuStage("ingredients");
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};
