"use client";

import Startform from "./components/Startform";
import UseMenu from "./context/MenuProvider";
import SelectMenuOption from "./components/SelectMenuOption";
import SelectSeasonbutton from "./components/SelectSeasonbutton";
import IngredientsSelect from "./components/IngredientsSelect";
import SelectThemebutton from "./components/SelectThemebutton";
import ColorSelect from "./components/ColorSelect";
import ImageResults from "./components/ImageResults";
import Backbutton from "./components/Backbutton";
import Loading from "./components/Loading";
import Error from "./components/Error";
import WorldSelect from "./components/WorldSelect";
import EventSelect from "./components/EventSelect";
import OriginalSelect from "./components/OriginalSelect";
import Retry from "./components/Retry";

export default function Home() {
  const { menuStage, showMenu, setShowMenu } = UseMenu();

  return (
    <div className="flex justify-center h-screen items-center overflow-hidden ">
      {!showMenu ? (
        <Startform onClick={() => setShowMenu(true)} />
      ) : (
        <div className="flex flex-col items-center gap-10">
          {menuStage === "main" && <SelectMenuOption />}

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

          <Backbutton />
        </div>
      )}
    </div>
  );
}
