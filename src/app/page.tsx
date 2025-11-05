"use client";

import { useState } from "react";

export default function Home() {
  const [showMeue, setShowMeue] = useState(false);
  const [menuStage, setMenuStage] = useState("main");

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
        <div className="relative text-center">
          {menuStage === "main" && (
            <div className="flex flex-col gap-20" >
              <button onClick={() => setMenuStage("season")} className="cursor-pointer text-white bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 p-4 text-2xl rounded-full hover:from-amber-700 hover:via-amber-700 hover:to-amber-700">
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
            <div>
              <button className="cursor-pointer text-white bg-gradient-to-r from-pink-600 via-pink-500 to-pink-600 p-4 text-2xl rounded-full hover:from-pink-700 hover:via-pink-700 hover:to-pink-700">
                春のケーキ
              </button>
              <button className="cursor-pointer text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 p-4 text-2xl rounded-full hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700">
                夏のケーキ
              </button>
              <button className="cursor-pointer text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 p-4 text-2xl rounded-full hover:from-orange-500 hover:via-orange-600 hover:to-orange-700">
                秋のケーキ
              </button>
              <button className="cursor-pointer text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 p-4 text-2xl rounded-full hover:from-blue-500 hover:via-blue-600 hover:to-blue-700">
                冬のケーキ
              </button>
            </div>
          )}

          {/* 戻るボタン（右下固定） */}
          <button
            onClick={() => setMenuStage(menuStage === "season" ? "main" : "")}
            className="fixed bottom-4 right-4 cursor-pointer text-white bg-gray-600 p-3 rounded-full hover:bg-gray-700"
          >
            戻る
          </button>
        </div>
      )}
    </div>
  );
}
