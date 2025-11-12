import { render, screen, fireEvent } from "@testing-library/react";
import IngredientsSelect from "../components/IngredientsSelect";
import UseMenu from "../context/MenuProvider";
import { seasonImage } from "../utils/seasonImage";

jest.mock("../context/MenuProvider");
jest.mock("../utils/seasonImage");

describe("IngredientsSelect コンポーネント", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockSetSelectedIngredients = jest.fn();
  const mockSetMenuStage = jest.fn();
  const mockSetCakeImage = jest.fn();

  const mockIngredients = {
    sponge: ["chocolate", "vanilla"],
    toppings: ["strawberry", "banana"],
    cream: ["whipped"],
    piping: ["heart"],
  };

  const baseMockReturn = {
    selectedIngredients: {
      sponge: [],
      toppings: [],
      cream: [],
      piping: [],
    },
    setSelectedIngredients: mockSetSelectedIngredients,
    ingredients: mockIngredients,
    selectedSeason: "spring",
    setMenuStage: mockSetMenuStage,
    setCakeImage: mockSetCakeImage,
    color: "pink",
  };

  it("具材ボタンが正しく表示される", () => {
    (UseMenu as jest.Mock).mockReturnValue(baseMockReturn);

    render(<IngredientsSelect />);

    expect(screen.getByText("sponge")).toBeInTheDocument();
    expect(screen.getByText("toppings")).toBeInTheDocument();
    expect(screen.getByText("cream")).toBeInTheDocument();
    expect(screen.getByText("piping")).toBeInTheDocument();
    expect(screen.getByText("ケーキ画像を作成")).toBeInTheDocument();
  });

  it("具材ボタンをクリックすると setSelectedIngredients が呼ばれる", () => {
    (UseMenu as jest.Mock).mockReturnValue(baseMockReturn);

    render(<IngredientsSelect />);

    const chocolateButton = screen.getByText("chocolate");
    fireEvent.click(chocolateButton);

    expect(mockSetSelectedIngredients).toHaveBeenCalledTimes(1);
  });

  it("具材が選ばれていない状態で「ケーキ画像を作成」を押すと alert が出る", () => {
    (UseMenu as jest.Mock).mockReturnValue(baseMockReturn);
    window.alert = jest.fn(); // alertをモック化

    render(<IngredientsSelect />);

    const generateButton = screen.getByText("ケーキ画像を作成");
    fireEvent.click(generateButton);

    expect(window.alert).toHaveBeenCalledWith("具材を選択してください");
    expect(seasonImage).not.toHaveBeenCalled();
  });

  it("具材が選ばれている場合は seasonImage が呼ばれる", () => {
    (UseMenu as jest.Mock).mockReturnValue({
      ...baseMockReturn,
      selectedIngredients: {
        ...baseMockReturn.selectedIngredients,
        sponge: ["chocolate"], // 1つ選ばれている
      },
    });

    render(<IngredientsSelect />);

    const generateButton = screen.getByText("ケーキ画像を作成");
    fireEvent.click(generateButton);

    expect(seasonImage).toHaveBeenCalledTimes(1);
    expect(seasonImage).toHaveBeenCalledWith({
      selectedSeason: "spring",
      selectedIngredients: expect.any(Object),
      setMenuStage: mockSetMenuStage,
      setCakeImage: mockSetCakeImage,
      color: "pink",
    });
  });
});
