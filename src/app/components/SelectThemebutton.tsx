"use client";
import UseMenu from "../context/MenuProvider";

const SelectThemebutton = () => {
  const { setMenuStage } = UseMenu();
  return (
    <div className="flex flex-col gap-10">
      <button
        onClick={() => setMenuStage("color")}
        className="p-4 text-2xl rounded-full cursor-pointer text-white bg-gradient-to-r from-pink-400 via-red-400 to-red-400 hover:from-pink-600 hover:via-red-600 hover:to-red-600"
      >
        色で決める
      </button>
      <button
        onClick={() => setMenuStage("world")}
        className="p-4 text-2xl rounded-full cursor-pointer text-white bg-gradient-to-r from-green-400 via-blue-400 to-blue-400 hover:from-green-600 hover:via-blue-600 hover:to-blue-600"
      >
        世界観で決める
      </button>
      <button
        onClick={() => setMenuStage("event")}
        className="p-4 text-2xl rounded-full cursor-pointer text-white bg-gradient-to-r from-orange-400 via-yellow-400 to-yellow-400 hover:from-orange-600 hover:via-yellow-600 hover:to-yellow-600"
      >
        イベントで決める
      </button>
    </div>
  );
};

export default SelectThemebutton;
