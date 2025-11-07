"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { IngredientsData, MenuStage } from "../type/type";

interface MenuContextType {
  menuStage: MenuStage;
  setMenuStage: Dispatch<SetStateAction<MenuStage>>;
  ingredients: IngredientsData;
  setIngredients: Dispatch<SetStateAction<IngredientsData>>;
  selectedSeason: string | null;
  setSelectedSeason: Dispatch<SetStateAction<string | null>>;
  selectedIngredients: string[];
  setSelectedIngredients: Dispatch<SetStateAction<string[]>>;
  showMeue: boolean;
  setShowMeue: Dispatch<SetStateAction<boolean>>;
  cakeImage: string | null;
  setCakeImage: Dispatch<SetStateAction<string | null>>;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
}

//Dispatch状態を更新する関数

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menuStage, setMenuStage] = useState<MenuStage>("main");
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const [showMeue, setShowMeue] = useState(false);
  const [cakeImage, setCakeImage] = useState<string | null>(null);
  const [color, setColor] = useState("");
  const [ingredients, setIngredients] = useState<IngredientsData>({
    sponge: [],
    toppings: [],
    cream: [],
    piping: [],
  }); // AIから取得した具材一覧
  return (
    <MenuContext.Provider
      value={{
        menuStage,
        setMenuStage,
        selectedSeason,
        setSelectedSeason,
        ingredients,
        setIngredients,
        selectedIngredients,
        setSelectedIngredients,
        showMeue,
        setShowMeue,
        cakeImage,
        setCakeImage,
        color,
        setColor,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const UseMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenu must be used within MenuProvider");
  return context;
};

export default UseMenu;
