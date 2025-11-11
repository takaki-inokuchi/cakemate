import EventSelect from "../components/EventSelect";
import { render, screen, fireEvent } from "@testing-library/react";

const mockSetEvent = jest.fn();
const mockSetMenuStage = jest.fn();
const mockSetIngredients = jest.fn();
const mockHandleEventSelect = jest.fn();

jest.mock("../context/MenuProvider", () => ({
  __esModule: true,
  default: () => ({
    event: "",
    setEvent: mockSetEvent,
    setMenuStage: mockSetMenuStage,
    setIngredients: mockSetIngredients,
  }),
}));

jest.mock("../utils/handleEventSelect", () => ({
  handleEventSelect: (...args: any[]) => mockHandleEventSelect(...args),
}));

describe("EventSelect", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("入力欄とボタンがレンダリングされる", () => {
    render(<EventSelect />);
    expect(
      screen.getByPlaceholderText("例：誕生日、お正月、入学式")
    ).toBeInTheDocument();
    expect(screen.getByText("決定")).toBeInTheDocument();
  });

  test("入力欄の変更でsetEventが呼ばれる", () => {
    render(<EventSelect />);
    const input = screen.getByPlaceholderText("例：誕生日、お正月、入学式");
    fireEvent.change(input, { target: { value: "誕生日" } });

    expect(mockSetEvent).toHaveBeenCalledWith("誕生日");
    expect(mockSetEvent).toHaveBeenCalledTimes(1);
  });

  test("決定ボタンでhandleEventSelectが呼ばれる", () => {
    render(<EventSelect />);
    const button = screen.getByText("決定");
    fireEvent.click(button);

    expect(mockHandleEventSelect).toHaveBeenCalledWith({
      event: "",
      setMenuStage: mockSetMenuStage,
      setIngredients: mockSetIngredients,
    });
    expect(mockHandleEventSelect).toHaveBeenCalledTimes(1);
  });
});
