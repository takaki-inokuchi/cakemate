"use client";

import { useState } from "react";
import { handleSeasonSelect } from "./utils/handleSeasonSelect";

export type MenuStage =
  | "main"
  | "season"
  | "ingredients"
  | "loading"
  | "cakeImage";

export interface IngredientsData {
  sponge: string[];
  toppings: string[];
  cream: string[];
  piping: string[];
}

const categories = ["sponge", "toppings", "cream", "piping"] as const;
//const categories: readonly ["sponge", "toppings", "cream", "piping"]と推論する

export default function Home() {
  const [showMeue, setShowMeue] = useState(false); // 開始ボタンの表示切り替え
  const [menuStage, setMenuStage] = useState<MenuStage>("main"); // 現在の画面状態
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null); // 選択中の季節
  const [ingredients, setIngredients] = useState<IngredientsData>({
    sponge: [],
    toppings: [],
    cream: [],
    piping: [],
  }); // AIから取得した具材一覧
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]); // 選択済み具材
  const [cakeImage, setCakeImage] = useState<string | null>(null); // 生成されたケーキ画像

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

    setMenuStage("loading");

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
      setMenuStage("cakeImage");
    } catch (err) {
      console.error(err);
      setMenuStage("cakeImage");
    }
  };

  return (
    <div className="flex justify-center h-screen items-center ">
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
            <div className="flex flex-col gap-4">
              {[
                {
                  name: "春",
                  gradient: "from-pink-600 via-pink-500 to-pink-600",
                  hover:
                    "hover:from-pink-700 hover:via-pink-700 hover:to-pink-700",
                },
                {
                  name: "夏",
                  gradient: "from-yellow-400 via-yellow-500 to-yellow-600",
                  hover:
                    "hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700",
                },
                {
                  name: "秋",
                  gradient: "from-orange-400 via-orange-500 to-orange-600",
                  hover:
                    "hover:from-orange-500 hover:via-orange-600 hover:to-orange-700",
                },
                {
                  name: "冬",
                  gradient: "from-blue-400 via-blue-500 to-blue-600",
                  hover:
                    "hover:from-blue-500 hover:via-blue-600 hover:to-blue-700",
                },
              ].map((seasonData) => (
                <button
                  key={seasonData.name}
                  onClick={() =>
                    handleSeasonSelect({
                      season: seasonData.name,
                      setSelectedSeason,
                      setMenuStage,
                      setIngredients,
                    })
                  }
                  className={`cursor-pointer text-white bg-gradient-to-r ${seasonData.gradient} p-4 text-2xl rounded-full ${seasonData.hover}`}
                >
                  {seasonData.name}のケーキ
                </button>
              ))}
            </div>
          )}

          {menuStage === "ingredients" && (
            <div className="flex flex-col gap-4 w-full">
              {categories.map((category) => (
                <div key={category} className="flex flex-col gap-2 w-full">
                  <p className="font-semibold capitalize">{category}</p>

                  <div className="grid grid-cols-5 gap-2">
                    {ingredients[category].map((item: string) => (
                      <button
                        key={item}
                        onClick={() => toggleIngredient(item)}
                        className={`p-2 border rounded ${
                          selectedIngredients.includes(item)
                            ? "bg-green-400 text-white"
                            : "bg-white"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* ここに画像作成ボタンを追加 */}
              <button
                onClick={generateCakeImage}
                className="mt-4 p-4 text-xl rounded-full text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600"
              >
                ケーキ画像を作成
              </button>
            </div>
          )}

          {menuStage === "cakeImage" && (
            <div className="flex flex-col items-center gap-4 mt-6">
              <img
                src={cakeImage as string}
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

          {menuStage === "loading" && (
            <div className="flex flex-col items-center mt-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-amber-500 border-solid"></div>
              <p className="mt-4 text-lg text-gray-700">読み込み中...</p>
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
