import ColorSelect from "../components/ColorSelect";
import { fireEvent, render, screen } from "@testing-library/react";

const mockSetColor = jest.fn();
const mockSetMenuStage = jest.fn();
const mockSetIngredients = jest.fn();
const mockHnadleColorSelect = jest.fn();

jest.mock("../context/MenuProvider", () => ({
  __esModule: true,
  default: () => ({
    color: "",
    setColor: mockSetColor,
    setMenuStage: mockSetMenuStage,
    setIngredients: mockSetIngredients,
  }),
}));

jest.mock("../utils/handleColorSelect", () => ({
  handleColorSelect: (...args: any[]) => mockHnadleColorSelect(...args),
}));

describe("ColorSelect", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("入力欄とボタンがレンダリングされる", () => {
    render(<ColorSelect />);
    expect(
      screen.getByPlaceholderText("例：ピンク、チョコブラウン、抹茶グリーン")
    ).toBeInTheDocument();
    expect(screen.getByText("決定")).toBeInTheDocument();
  });

  test("入力欄の変更でsetColorが呼ばれる", () => {
    render(<ColorSelect />);
    const input = screen.getByPlaceholderText(
      "例：ピンク、チョコブラウン、抹茶グリーン"
    );
    fireEvent.change(input, { target: { value: "チョコブラウン" } });
    expect(mockSetColor).toHaveBeenCalledWith("チョコブラウン");
    expect(mockSetColor).toHaveBeenCalledTimes(1);
  });

  test("決定ボタンでhandleColorSelectが呼ばれる", () => {
    render(<ColorSelect />);
    const button = screen.getByText("決定");
    fireEvent.click(button);

    expect(mockHnadleColorSelect).toHaveBeenCalledWith({
      color: "",
      setMenuStage: mockSetMenuStage,
      setIngredients: mockSetIngredients,
    });
    expect(mockHnadleColorSelect).toHaveBeenCalledTimes(1);
  });
});
