import { render, screen, fireEvent } from "@testing-library/react";
import Retry from "../components/Retry";

jest.mock("../context/MenuProvider", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../utils/handleSeasonSelect", () => ({
  handleSeasonSelect: jest.fn(),
}));

describe("Retry コンポーネント", () => {
  const mockSetSelectedSeason = jest.fn();
  const mockSetMenuStage = jest.fn();
  const mockSetIngredients = jest.fn();
  const { handleSeasonSelect } = require("../utils/handleSeasonSelect");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("selectedSeason が存在しない場合、何も表示されない", () => {
    const UseMenu = require("../context/MenuProvider").default;
    UseMenu.mockReturnValue({
      selectedSeason: null,
      setSelectedSeason: mockSetSelectedSeason,
      setMenuStage: mockSetMenuStage,
      setIngredients: mockSetIngredients,
    });

    const { container } = render(<Retry />);
    expect(container.firstChild).toBeNull();
  });

  test("selectedSeason が存在する場合、ボタンとテキストが表示される", () => {
    const UseMenu = require("../context/MenuProvider").default;
    UseMenu.mockReturnValue({
      selectedSeason: "spring",
      setSelectedSeason: mockSetSelectedSeason,
      setMenuStage: mockSetMenuStage,
      setIngredients: mockSetIngredients,
    });

    render(<Retry />);

    expect(
      screen.getByText("材料データが取得できませんでした。")
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "再試行" })).toBeInTheDocument();
  });

  test("ボタン押下で handleSeasonSelect が正しく呼ばれる", () => {
    const UseMenu = require("../context/MenuProvider").default;
    UseMenu.mockReturnValue({
      selectedSeason: "summer",
      setSelectedSeason: mockSetSelectedSeason,
      setMenuStage: mockSetMenuStage,
      setIngredients: mockSetIngredients,
    });

    render(<Retry />);

    const button = screen.getByRole("button", { name: "再試行" });
    fireEvent.click(button);

    expect(handleSeasonSelect).toHaveBeenCalledWith({
      season: "summer",
      setSelectedSeason: mockSetSelectedSeason,
      setMenuStage: mockSetMenuStage,
      setIngredients: mockSetIngredients,
    });
  });
});
