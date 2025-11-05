"use client";

import { useState } from "react";
import { handleSeasonSelect } from "./utils/handleSeasonSelect";

export type MenuStage = "main" | "season" | "ingredients";

export default function Home() {
  const [showMeue, setShowMeue] = useState(false); // 開始ボタンの表示切り替え
  const [menuStage, setMenuStage] = useState<MenuStage>("main"); // 現在の画面状態
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null); // 選択中の季節
  const [ingredients, setIngredients] = useState<string[]>([]); // AIから取得した具材一覧
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]); // 選択済み具材
  const [cakeImage, setCakeImage] = useState<string | null>(null); // 生成されたケーキ画像
  const [loading, setLoading] = useState(false);

  const toggleIngredient = (ing: string) => {
    if (selectedIngredients.includes(ing)) {
      // 選択済みなら解除
      setSelectedIngredients(selectedIngredients.filter((i) => i !== ing));
    } else {
      // 未選択なら追加
      setSelectedIngredients([...selectedIngredients, ing]);
    }
  };

  const generateCakeImage = async () => {
    if (!selectedSeason) return;
    if (selectedIngredients.length === 0) return alert("具材を選んでください");

    const prompt = `${selectedSeason}のケーキで、${selectedIngredients.join(
      "と"
    )}をトッピングしたリアルなケーキ画像。`;

    try {
      const response = await fetch("/api/generateImage", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setCakeImage(data.url);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center h-screen overflow-hidden items-center ">
      {!showMeue ? (
        <div>
          <button
            onClick={() => setShowMeue(true)}
            className="cursor-pointer text-white bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 p-4 text-2xl rounded-full hover:from-amber-700 hover:via-amber-700 hover:to-amber-700"
          >
            ケーキを作成🎂
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-10">
          {menuStage === "main" && (
            <div className="flex flex-col gap-10">
              <button
                onClick={() => setMenuStage("season")}
                className="cursor-pointer text-white bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 p-4 text-2xl rounded-full hover:from-amber-700 hover:via-amber-700 hover:to-amber-700"
              >
                季節に応じたケーキを作成
              </button>

              <button className="cursor-pointer text-white bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 p-4 text-2xl rounded-full hover:from-amber-700 hover:via-amber-700 hover:to-amber-700">
                テーマに応じたケーキを作成
              </button>

              <button className="cursor-pointer text-white bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 p-4 text-2xl rounded-full hover:from-amber-700 hover:via-amber-700 hover:to-amber-700">
                オリジナルケーキを作成
              </button>
            </div>
          )}

          {menuStage === "season" && (
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <button
                  onClick={() =>
                    handleSeasonSelect({
                      season: "春",
                      setSelectedSeason,
                      setMenuStage,
                      setIngredients,
                      setLoading,
                    })
                  }
                  className="cursor-pointer text-white bg-gradient-to-r from-pink-600 via-pink-500 to-pink-600 p-4 text-2xl rounded-full hover:from-pink-700 hover:via-pink-700 hover:to-pink-700"
                >
                  春のケーキ
                </button>

                <button
                  onClick={() =>
                    handleSeasonSelect({
                      season: "夏",
                      setSelectedSeason,
                      setMenuStage,
                      setIngredients,
                      setLoading,
                    })
                  }
                  className="cursor-pointer text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 p-4 text-2xl rounded-full hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700"
                >
                  夏のケーキ
                </button>

                <button
                  onClick={() =>
                    handleSeasonSelect({
                      season: "秋",
                      setSelectedSeason,
                      setMenuStage,
                      setIngredients,
                      setLoading,
                    })
                  }
                  className="cursor-pointer text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 p-4 text-2xl rounded-full hover:from-orange-500 hover:via-orange-600 hover:to-orange-700"
                >
                  秋のケーキ
                </button>

                <button
                  onClick={() =>
                    handleSeasonSelect({
                      season: "冬",
                      setSelectedSeason,
                      setMenuStage,
                      setIngredients,
                      setLoading,
                    })
                  }
                  className="cursor-pointer text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 p-4 text-2xl rounded-full hover:from-blue-500 hover:via-blue-600 hover:to-blue-700"
                >
                  冬のケーキ
                </button>
              </div>
            </div>
          )}

          {menuStage === "ingredients" && (
            <div className="flex flex-col items-center gap-4 mt-6">
              <p>{selectedSeason}のおすすめ具材</p>
              {(ingredients ?? []).map((ing) => (
                <button
                  key={ing}
                  onClick={() => toggleIngredient(ing)}
                  className={`p-2 rounded border ${
                    selectedIngredients.includes(ing)
                      ? "bg-green-400"
                      : "bg-white"
                  }`}
                >
                  {ing}
                </button>
              ))}

              <button
                onClick={generateCakeImage}
                className="mt-4 cursor-pointer text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-3 rounded-full hover:from-purple-600 hover:via-pink-600 hover:to-red-600"
              >
                ケーキ画像を生成
              </button>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center mt-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-amber-500 border-solid"></div>
              <p className="mt-4 text-lg text-gray-700">読み込み中...</p>
            </div>
          )}

          {cakeImage && (
            <div className="flex flex-col items-center gap-4 mt-6">
              <img
                src={cakeImage}
                alt="生成ケーキ"
                className="w-96 h-96 object-cover rounded-lg"
              />
              <button
                onClick={() => {
                  setCakeImage(null);
                  setSelectedIngredients([]);
                }}
                className="cursor-pointer text-white bg-gray-600 p-3 rounded-full hover:bg-gray-700"
              >
                選び直す
              </button>
            </div>
          )}

          <button
            onClick={() => {
              if (menuStage === "season") {
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
        </div>
      )}
    </div>
  );
}
