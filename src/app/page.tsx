"use client";

import Startform from "./componets/Startform";
import UseMenu from "./context/MenuProvider";
import MenuOption from "./componets/SelectMenuOption";
import SelectSeasonbutton from "./componets/SelectSeasonbutton";
import IngredientsSelect from "./componets/IngredientsSelect";
import SelectThemebutton from "./componets/SelectThemebutton";
import ColorSelect from "./componets/ColorSelect";
import ImageResults from "./componets/ImageResults";
import Deletebutton from "./componets/Deletebutton";
import Loading from "./componets/Loading";
import Error from "./componets/Error";
import WorldSelect from "./componets/WorldSelect";
import EventSelect from "./componets/EventSelect";
import OriginalSelect from "./componets/OriginalSelect";
import Retry from "./componets/Retry";

export default function Home() {
  const { menuStage, showMeue, setShowMeue } = UseMenu();

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

          {menuStage === "world" && <WorldSelect />}

          {menuStage === "loading" && <Loading />}

          {menuStage === "original" && <OriginalSelect />}

          {menuStage === "event" && <EventSelect />}

          {menuStage === "retry" && <Retry />}

          {menuStage === "error" && <Error />}

          <Deletebutton />
        </div>
      )}
    </div>
  );
}
