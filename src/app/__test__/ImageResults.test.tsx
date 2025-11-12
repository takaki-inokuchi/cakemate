import { render, screen } from "@testing-library/react";
import ImageResults from "../components/ImageResults";
import UseMenu from "../context/MenuProvider";

jest.mock("../context/MenuProvider");

describe("ImageResults コンポーネント", () => {
  it("cakeImage が正しく表示される", () => {
    (UseMenu as jest.Mock).mockReturnValue({
      cakeImage: "https://example.com/cake.jpg",
    });

    render(<ImageResults />);

    const img = screen.getByAltText("生成ケーキ") as HTMLImageElement;

    expect(img).toBeInTheDocument();
    expect(img.src).toBe("https://example.com/cake.jpg");
  });

  it("cakeImage が null の場合でもエラーなくレンダーされる", () => {
    (UseMenu as jest.Mock).mockReturnValue({
      cakeImage: null,
    });

    render(<ImageResults />);

    const img = screen.getByAltText("生成ケーキ");
    expect(img).toBeInTheDocument();
  });
});
