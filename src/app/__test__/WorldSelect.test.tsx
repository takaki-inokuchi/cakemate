import { render, screen, fireEvent } from "@testing-library/react";
import WorldSelect from "../components/WorldSelect";

// --- モック設定 ---
jest.mock("../context/MenuProvider", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../utils/handleWorldSelect", () => ({
  handleWorldSelect: jest.fn(),
}));

describe("WorldSelect コンポーネント", () => {
  const mockSetWorld = jest.fn();
  const mockSetMenuStage = jest.fn();
  const mockSetIngredients = jest.fn();
  const { handleWorldSelect } = require("../utils/handleWorldSelect");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("ラベル・入力欄・ボタンが表示される", () => {
    const UseMenu = require("../context/MenuProvider").default;
    UseMenu.mockReturnValue({
      world: "",
      setWorld: mockSetWorld,
      setMenuStage: mockSetMenuStage,
      setIngredients: mockSetIngredients,
    });

    render(<WorldSelect />);

    expect(
      screen.getByText("作成したいケーキの世界観を指定してください。")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("例：妖精、異世界、冒険")
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "決定" })).toBeInTheDocument();
  });

  test("入力値が setWorld に渡される", () => {
    const UseMenu = require("../context/MenuProvider").default;
    UseMenu.mockReturnValue({
      world: "",
      setWorld: mockSetWorld,
      setMenuStage: mockSetMenuStage,
      setIngredients: mockSetIngredients,
    });

    render(<WorldSelect />);

    const input = screen.getByPlaceholderText("例：妖精、異世界、冒険");
    fireEvent.change(input, { target: { value: "ファンタジー" } });

    expect(mockSetWorld).toHaveBeenCalledWith("ファンタジー");
  });

  test("ボタン押下で handleWorldSelect が正しく呼ばれる", () => {
    const UseMenu = require("../context/MenuProvider").default;
    UseMenu.mockReturnValue({
      world: "冒険の森",
      setWorld: mockSetWorld,
      setMenuStage: mockSetMenuStage,
      setIngredients: mockSetIngredients,
    });

    render(<WorldSelect />);

    const button = screen.getByRole("button", { name: "決定" });
    fireEvent.click(button);

    expect(handleWorldSelect).toHaveBeenCalledWith({
      setMenuStage: mockSetMenuStage,
      world: "冒険の森",
      setIngredients: mockSetIngredients,
    });
  });
});
