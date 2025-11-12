import { render, screen, fireEvent } from "@testing-library/react";
import OriginalInput from "../components/OriginalSelect";

jest.mock("../context/MenuProvider", () => ({
  __esModule: true,
  default: () => ({
    setMenuStage: jest.fn(),
    setCakeImage: jest.fn(),
  }),
}));

jest.mock("../utils/originalImage", () => ({
  OriginalImage: jest.fn(),
}));

describe("OriginalInput コンポーネント", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("全ての入力フィールドが表示される", () => {
    render(<OriginalInput />);

    expect(screen.getByPlaceholderText("例: スポンジA")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("例: 生クリーム")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("例: イチゴ、チョコチップ")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("例: 星型絞り")).toBeInTheDocument();
  });

  it("入力した値が反映される", () => {
    render(<OriginalInput />);

    const spongeInput = screen.getByPlaceholderText("例: スポンジA");
    fireEvent.change(spongeInput, { target: { value: "テストスポンジ" } });
    expect(spongeInput).toHaveValue("テストスポンジ");
  });

  it("全て空でボタン押下 → alert が呼ばれる", () => {
    window.alert = jest.fn();
    render(<OriginalInput />);

    const button = screen.getByRole("button", { name: "ケーキ画像を作成" });
    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith(
      "少なくとも1つの具材を入力してください"
    );
  });

  it("値を入力してボタン押下 → OriginalImage が呼ばれる", async () => {
    const { OriginalImage } = require("../utils/originalImage");
    render(<OriginalInput />);

    fireEvent.change(screen.getByPlaceholderText("例: スポンジA"), {
      target: { value: "スポンジテスト" },
    });

    const button = screen.getByRole("button", { name: "ケーキ画像を作成" });
    fireEvent.click(button);

    await Promise.resolve();

    expect(OriginalImage).toHaveBeenCalledWith(
      expect.objectContaining({
        sponge: "スポンジテスト",
      })
    );
  });
});
