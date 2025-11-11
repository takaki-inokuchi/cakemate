"use client";
import UseMenu from "../context/MenuProvider";
import { MenuStage } from "../type/type";
import Cakemenubutton from "./Cakemenubutton";

const SelectMenuOption = () => {
  const { setMenuStage } = UseMenu();
  const menuOptions = [
    { label: "季節に応じたケーキを作成", stage: "season" },
    { label: "テーマに応じたケーキを作成", stage: "theme" },
    { label: "オリジナルケーキを作成", stage: "original" },
  ];
  return (
    <div className="flex flex-col gap-10">
      {menuOptions.map((option) => (
        <Cakemenubutton
          key={option.stage}
          label={option.label}
          onClick={() => setMenuStage(option.stage as MenuStage)}
        />
      ))}
    </div>
  );
};

export default SelectMenuOption;
