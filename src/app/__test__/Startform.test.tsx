import { fireEvent, render, screen } from "@testing-library/react";
import Startform from "../components/Startform";

describe("Startform", () => {
  test("ボタンが正しく表示される", () => {
    render(<Startform onClick={() => {}} />);
    const button = screen.getByRole("button", { name: "ケーキを作成🎂" });
    expect(button).toBeInTheDocument();
  });
  test("クリック時にonClickが呼ばれる", () => {
    const mockOnClick = jest.fn();
    render(<Startform onClick={mockOnClick} />);
    const button = screen.getByRole("button", { name: "ケーキを作成🎂" });
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
