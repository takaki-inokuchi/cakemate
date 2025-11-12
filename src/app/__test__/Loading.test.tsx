import { render, screen } from "@testing-library/react";
import Loading from "../components/Loading";

describe("Loading コンポーネント", () => {
  it("読み込み中テキストが表示される", () => {
    render(<Loading />);

    const text = screen.getByText("読み込み中...");
    expect(text).toBeInTheDocument();
  });

  it("スピナーが表示される", () => {
    render(<Loading />);

    const spinner = document.querySelector(".animate-spin");

    expect(spinner).toBeInTheDocument();

    expect(spinner).toHaveClass("rounded-full");
    expect(spinner).toHaveClass("border-t-4");
    expect(spinner).toHaveClass("border-amber-500");
  });
});
