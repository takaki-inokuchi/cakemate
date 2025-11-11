import { fireEvent, render, screen } from "@testing-library/react";
import Backbutton from "../components/Backbutton";

const mockSetMenuStage = jest.fn();
const mockSetShowMenu = jest.fn();
const mockUseMenu = require("../context/MenuProvider").default;

jest.mock("../context/MenuProvider", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Backbutton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("menuStage が season の場合は main に戻る", () => {
    mockUseMenu.mockReturnValue({
      menuStage: "season",
      setMenuStage: mockSetMenuStage,
      setShowMenu: mockSetShowMenu,
    });
    render(<Backbutton />);
    fireEvent.click(screen.getByText("戻る"));

    expect(mockSetMenuStage).toHaveBeenCalledWith("main");
    expect(mockSetShowMenu).not.toHaveBeenCalled();
  });

  test("menuStage が color の場合は theme に戻る", () => {
    mockUseMenu.mockReturnValue({
      menuStage: "color",
      setMenuStage: mockSetMenuStage,
      setShowMenu: mockSetShowMenu,
    });

    render(<Backbutton />);
    fireEvent.click(screen.getByText("戻る"));
    expect(mockSetMenuStage).toHaveBeenCalledWith("theme");
    expect(mockSetShowMenu).not.toHaveBeenCalled();
  });

  test("menuStage が それ以外の場合は setShowMenu(false) と setMenu('main') が呼ばれる", () => {
    mockUseMenu.mockReturnValue({
      menuStage: "random",
      setMenuStage: mockSetMenuStage,
      setShowMenu: mockSetShowMenu,
    });
    render(<Backbutton />);
    fireEvent.click(screen.getByText("戻る"));

    expect(mockSetShowMenu).toHaveBeenCalledWith(false);
    expect(mockSetMenuStage).toHaveBeenCalledWith("main");
  });
});
