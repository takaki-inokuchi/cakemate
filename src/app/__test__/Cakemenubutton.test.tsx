import Cakemenubutton from "../components/Cakemenubutton";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Cakemenubutton", () => {
  test("labelが正しく表示される", () => {
    render(<Cakemenubutton label="ケーキを作る🎂" onClick={() => {}} />);
    expect(screen.getByText("ケーキを作る🎂")).toBeInTheDocument();
  });

  test("クリック時にonClickが呼ばれる", () => {
    const handleClick = jest.fn();
    render(<Cakemenubutton label="作成" onClick={handleClick} />);

    const button = screen.getByRole("button", { name: "作成" });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
