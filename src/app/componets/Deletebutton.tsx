import UseMenu from "../context/MenuProvider";

const Deletebutton = () => {
  const { menuStage, setMenuStage, setShowMeue } = UseMenu();

  return (
    <button
      onClick={() => {
        if (
          menuStage === "season" ||
          menuStage === "theme" ||
          menuStage === "original"
        ) {
          setMenuStage("main");
        } else {
          setShowMeue(false);
          setMenuStage("main");
        }
      }}
      className="fixed bottom-4 right-4 cursor-pointer text-white bg-gray-600 p-3 rounded-full hover:bg-gray-700"
    >
      戻る
    </button>
  );
};

export default Deletebutton;
