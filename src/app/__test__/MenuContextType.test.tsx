import { render, screen } from "@testing-library/react";
import { MenuProvider, UseMenu } from "../context/MenuProvider";

const TestComponent = () => {
  const { menuStage, setMenuStage } = UseMenu();

  return (
    <div>
      <p data-testid="stage">{menuStage}</p>
      <button onClick={() => setMenuStage("color")}>Change Stage</button>
    </div>
  );
};

describe("MenuProvider / UseMenu", () => {
  test("MenuProviderでラップした子がUseMenu経由で値にアクセスできる", () => {
    render(
      <MenuProvider>
        <TestComponent />
      </MenuProvider>
    );

    expect(screen.getByTestId("stage").textContent).toBe("main");
  });

  test("UseMenuがMenuProvider外で使われた場合にエラーを投げる", () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const BrokenComponent = () => {
      UseMenu();
      return <div>Broken</div>;
    };

    expect(() => render(<BrokenComponent />)).toThrow(
      "useMenu must be used within MenuProvider"
    );

    consoleSpy.mockRestore();
  });
});
