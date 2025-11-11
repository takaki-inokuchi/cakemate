"use client";
import UseMenu from "../context/MenuProvider";

const ImageResults = () => {
const { cakeImage } = UseMenu();

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      <img
        src={cakeImage as string}
        alt="生成ケーキ"
        className="w-96 h-96 object-cover rounded-lg"
      />
    </div>
  );
};

export default ImageResults;
