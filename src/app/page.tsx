"use client";

import Startform from "./componets/Startform";
import UseMenu from "./context/MenuProvider";
import MenuOption from "./componets/SelectMenuOption";
import SelectSeasonbutton from "./componets/SelectSeasonbutton";
import IngredientsSelect from "./componets/IngredientsSelect";
import SelectThemebutton from "./componets/SelectThemebutton";
import ColorSelect from "./componets/ColorSelect";
import ImageResults from "./componets/ImageResults";

export type MenuStage =
  | "main"
  | "season"
  | "ingredients"
  | "loading"
  | "cakeImage"
  | "theme"
  | "original"
  | "worldview"
  | "event"
  | "color";

export interface IngredientsData {
  sponge: string[];
  toppings: string[];
  cream: string[];
  piping: string[];
}

export default function Home() {
  const { menuStage, setMenuStage, showMeue, setShowMeue } = UseMenu();

  return (
    <div className="flex justify-center h-screen items-center overflow-hidden">
      {!showMeue ? (
        <Startform onClick={() => setShowMeue(true)} />
      ) : (
        <div className="flex flex-col items-center gap-10">
          {menuStage === "main" && <MenuOption />}

          {menuStage === "season" && <SelectSeasonbutton />}

          {menuStage === "ingredients" && <IngredientsSelect />}

          {menuStage === "theme" && <SelectThemebutton />}

          {menuStage === "color" && <ColorSelect />}

          {menuStage === "cakeImage" && <ImageResults />}

          {menuStage === "loading" && (
            <div className="flex flex-col items-center mt-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-amber-500 border-solid"></div>
              <p className="mt-4 text-lg text-gray-700">読み込み中...</p>
            </div>
          )}
          <button
            onClick={() => {
              if (
                menuStage === "season" ||
                menuStage === "theme" ||
                menuStage === "original"
              ) {
                setMenuStage("main");
              } else {
                setShowMeue(false);
                setMenuStage("main");
              }
            }}
            className="fixed bottom-4 right-4 cursor-pointer text-white bg-gray-600 p-3 rounded-full hover:bg-gray-700"
          >
            戻る
          </button>
        </div>
      )}
    </div>
  );
}
