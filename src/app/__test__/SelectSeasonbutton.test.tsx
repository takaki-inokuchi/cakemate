import { render, screen, fireEvent } from "@testing-library/react";
import SelectSeasonbutton from "../components/SelectSeasonbutton";

const mockSetMenuStage = jest.fn();
const mockSetIngredients = jest.fn();
const mockSetSelectedSeason = jest.fn();
const mockHandleSeasonSelect = jest.fn();

jest.mock("../context/MenuProvider", () => ({
  __esModule: true,
  default: () => ({
    setMenuStage: mockSetMenuStage,
    setIngredients: mockSetIngredients,
    setSelectedSeason: mockSetSelectedSeason,
  }),
}));

jest.mock("../utils/handleSeasonSelect", () => ({
  handleSeasonSelect: (...args: any[]) => mockHandleSeasonSelect(...args),
}));

describe("SelectSeasonbutton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("4つの季節のボタンがレンダリングされる", () => {
    render(<SelectSeasonbutton />);
    ["春", "夏", "秋", "冬"].forEach((season) => {
      expect(screen.getByText(`${season}のケーキ`)).toBeInTheDocument();
    });
  });

  test("ボタンクリックでhandleSeasonSelectが正しい引数で呼ばれる", () => {
    render(<SelectSeasonbutton />);
    const springButton = screen.getByText("春のケーキ");
    fireEvent.click(springButton);

    expect(mockHandleSeasonSelect).toHaveBeenCalledWith({
      season: "春",
      setSelectedSeason: mockSetSelectedSeason,
      setMenuStage: mockSetMenuStage,
      setIngredients: mockSetIngredients,
    });
    expect(mockHandleSeasonSelect).toHaveBeenCalledTimes(1);
  });
});
