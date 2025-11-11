import { render, screen } from "@testing-library/react";
import Error from "../components/Error";

describe("Errorコメント", () => {
  test("正しくエラーメッセージが表示される", () => {
    render(<Error />);

    expect(
      screen.getByText("エラーが発生しました。最初からやり直してください。")
    ).toBeInTheDocument();
  });
});
