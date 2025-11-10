"use client";

import { useState } from "react";
import UseMenu from "../context/MenuProvider";
import { OriginalImage } from "../utils/originalImage";

const OriginalInput = () => {
  const [sponge, setSponge] = useState("");
  const [cream, setCream] = useState("");
  const [toppings, setToppings] = useState("");
  const [piping, setPiping] = useState("");

  const { setMenuStage, setCakeImage } = UseMenu();

  const handleGenerate = async () => {
    if (!sponge && !cream && !toppings && !piping) {
      alert("少なくとも1つの具材を入力してください");
      return;
    }
    await OriginalImage({
      sponge,
      cream,
      toppings,
      piping,
      setMenuStage,
      setCakeImage,
    });
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-2xl shadow-sm">
      <div>
        <label className="block font-medium">スポンジ</label>
        <input
          type="text"
          placeholder="例: スポンジA"
          value={sponge}
          onChange={(e) => setSponge(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block font-medium">クリーム</label>
        <input
          type="text"
          placeholder="例: 生クリーム"
          value={cream}
          onChange={(e) => setCream(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block font-medium">トッピング</label>
        <input
          type="text"
          placeholder="例: イチゴ、チョコチップ"
          value={toppings}
          onChange={(e) => setToppings(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block font-medium">絞り方</label>
        <input
          type="text"
          placeholder="例: 星型絞り"
          value={piping}
          onChange={(e) => setPiping(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

      <button
        onClick={handleGenerate}
        className="mt-4 p-4 text-xl rounded-full text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600"
      >
        ケーキ画像を作成
      </button>
    </div>
  );
};

export default OriginalInput;
