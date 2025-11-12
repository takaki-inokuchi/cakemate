import { render, screen, fireEvent } from "@testing-library/react";
import SelectThemebutton from "../components/SelectThemebutton";

jest.mock("../context/MenuProvider", () => ({
  __esModule: true,
  default: jest.fn(),
}));

import UseMenu from "../context/MenuProvider";

describe("SelectThemebutton", () => {
  const mockSetMenuStage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (UseMenu as jest.Mock).mockReturnValue({
      setMenuStage: mockSetMenuStage,
    });
  });

  test("「色で決める」ボタンをクリックすると setMenuStage('color') が呼ばれる", () => {
    render(<SelectThemebutton />);
    const colorButton = screen.getByText("色で決める");
    fireEvent.click(colorButton);
    expect(mockSetMenuStage).toHaveBeenCalledWith("color");
  });

  test("「世界観で決める」ボタンをクリックすると setMenuStage('world') が呼ばれる", () => {
    render(<SelectThemebutton />);
    const worldButton = screen.getByText("世界観で決める");
    fireEvent.click(worldButton);
    expect(mockSetMenuStage).toHaveBeenCalledWith("world");
  });

  test("「イベントで決める」ボタンをクリックすると setMenuStage('event') が呼ばれる", () => {
    render(<SelectThemebutton />);
    const eventButton = screen.getByText("イベントで決める");
    fireEvent.click(eventButton);
    expect(mockSetMenuStage).toHaveBeenCalledWith("event");
  });
});
