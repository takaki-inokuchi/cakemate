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
  | "color"
  | "error"
  | "world"
  | "event";

export interface IngredientsData {
  sponge: string[];
  toppings: string[];
  cream: string[];
  piping: string[];
}
