type startbuttonProps = {
  onClick: () => void;
};

const Startform = ({ onClick }: startbuttonProps) => {
  return (
    <div className="overflow-hidden">
      <button
        onClick={onClick}
        className="cursor-pointer text-white bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 p-4 text-2xl rounded-full hover:from-amber-700 hover:via-amber-700 hover:to-amber-700"
      >
        ケーキを作成🎂
      </button>
    </div>
  );
};

export default Startform;
