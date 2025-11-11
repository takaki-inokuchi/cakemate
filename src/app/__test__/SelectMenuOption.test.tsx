import SelectMenuOption from "../components/SelectMenuOption";
import { fireEvent, render, screen } from "@testing-library/react";

const mockSetMenuStage = jest.fn();

jest.mock("../context/MenuProvider", () => ({
  __esModule: true,
  default: () => ({ setMenuStage: mockSetMenuStage }),
}));

describe("SelectMenuOption", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("三つのボタンが正しく表示される", () => {
    render(<SelectMenuOption />);

    fireEvent.click(screen.getByText("季節に応じたケーキを作成"));
    expect(mockSetMenuStage).toHaveBeenCalledWith("season");

    fireEvent.click(screen.getByText("テーマに応じたケーキを作成"));
    expect(mockSetMenuStage).toHaveBeenCalledWith("theme");

    fireEvent.click(screen.getByText("オリジナルケーキを作成"));
    expect(mockSetMenuStage).toHaveBeenCalledWith("original");

    expect(mockSetMenuStage).toHaveBeenCalledTimes(3);
  });
});
