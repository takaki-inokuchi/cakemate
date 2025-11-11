import UseMenu from "../context/MenuProvider";

const Backbutton = () => {
  const { menuStage, setMenuStage, setShowMenu } = UseMenu();

  return (
    <button
      onClick={() => {
        if (
          menuStage === "season" ||
          menuStage === "theme" ||
          menuStage === "original"
        ) {
          setMenuStage("main");
        } else if (
          menuStage === "color" ||
          menuStage === "world" ||
          menuStage === "event"
        ) {
          setMenuStage("theme");
        } else {
          setShowMenu(false);
          setMenuStage("main");
        }
      }}
      className="fixed bottom-15 right-4 cursor-pointer text-white bg-gray-600 p-3 rounded-full hover:bg-gray-700"
    >
      戻る
    </button>
  );
};

export default Backbutton;
