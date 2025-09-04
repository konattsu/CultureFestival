import React, { useState, useCallback } from "react";

import ContentPageLayout from "../../components/ContentPageLayout";

const DVA: React.FC = () => {
  const [gameState, setGameState] = useState<"idle" | "running" | "finished">(
    "idle",
  );
  const [displayColor, setDisplayColor] = useState<"white" | "black">("white");
  const [winner, setWinner] = useState<1 | 2 | null>(null);
  const [foulPlayer, setFoulPlayer] = useState<1 | 2 | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleStart = useCallback(() => {
    if (gameState !== "idle") return;

    setGameState("running");
    setDisplayColor("white");
    setWinner(null);
    setFoulPlayer(null);

    // Random delay between 2 and 10 seconds
    const delay = Math.floor(Math.random() * 8000) + 2000;

    const id = setTimeout(() => {
      setDisplayColor("black");
    }, delay);

    setTimeoutId(id);
  }, [gameState]);

  const handlePlayerClick = useCallback(
    (player: 1 | 2) => {
      if (gameState !== "running") return;

      if (displayColor === "white") {
        // Foul - clicked too early
        setFoulPlayer(player);
        setWinner(player === 1 ? 2 : 1);
        setGameState("finished");
        if (timeoutId) clearTimeout(timeoutId);
      } else {
        // Valid click - display turned black
        setWinner(player);
        setGameState("finished");
      }
    },
    [displayColor, gameState, timeoutId],
  );

  const resetGame = useCallback(() => {
    setGameState("idle");
    setDisplayColor("white");
    setWinner(null);
    setFoulPlayer(null);
    if (timeoutId) clearTimeout(timeoutId);
  }, [timeoutId]);

  // SVG Symbol for DVA visualization
  const svgSymbols = (
    <svg>
      <symbol id="dva-svg-src" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
        />
        <line
          x1="20"
          y1="50"
          x2="80"
          y2="50"
          stroke="currentColor"
          strokeWidth="3"
        />
        <line
          x1="50"
          y1="20"
          x2="50"
          y2="80"
          stroke="currentColor"
          strokeWidth="3"
        />
      </symbol>
    </svg>
  );

  return (
    <ContentPageLayout title="動体視力勝負" svgSymbols={svgSymbols}>
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="mt-8 text-2xl font-bold">ルール</h2>
        <p className="text-lg">
          下の「開始」をクリックすると始まります。画面中央の「白色」が「黒色」になった瞬間にそれぞれの場所をクリックしてください。早いほうが勝ちです。フライングは負けになります。
        </p>

        <div className="mt-10 flex flex-col items-center">
          <button
            onClick={gameState === "idle" ? handleStart : resetGame}
            className="rounded-lg bg-blue-600 px-8 py-4 text-xl font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-blue-700 focus:outline-none"
          >
            {gameState === "idle" ? "開始" : "リセット"}
          </button>

          <div
            className={`mt-10 flex w-full flex-col items-center md:flex-row md:justify-center ${gameState === "finished" && foulPlayer ? "bg-red-100 dark:bg-red-900/20" : ""}`}
          >
            <div
              className={`flex h-40 w-full cursor-pointer items-center justify-center rounded-lg bg-gray-100 text-center text-2xl font-bold md:w-1/3 dark:bg-gray-800 ${winner === 1 ? "bg-green-200 dark:bg-green-800/30" : ""} ${foulPlayer === 1 ? "bg-red-200 dark:bg-red-800/30" : ""}`}
              onClick={() => handlePlayerClick(1)}
            >
              プレイヤー1
              {foulPlayer === 1 && (
                <div className="text-red-600 dark:text-red-400">
                  フライング!
                </div>
              )}
            </div>

            <div
              className={`mx-4 my-6 flex h-32 w-32 items-center justify-center rounded-full ${displayColor === "white" ? "bg-white dark:bg-gray-200" : "bg-black"} shadow-lg md:mx-8`}
            >
              <span
                className={`text-xl font-bold ${displayColor === "black" ? "text-white" : "text-black dark:text-gray-800"}`}
              >
                {gameState === "idle" && "..."}
                {gameState === "running" &&
                  displayColor === "white" &&
                  "待機中"}
                {gameState === "running" && displayColor === "black" && "今!"}
                {gameState === "finished" &&
                  (foulPlayer
                    ? "反則!"
                    : winner
                      ? `${winner}の勝ち!`
                      : "引き分け")}
              </span>
            </div>

            <div
              className={`flex h-40 w-full cursor-pointer items-center justify-center rounded-lg bg-gray-100 text-center text-2xl font-bold md:w-1/3 dark:bg-gray-800 ${winner === 2 ? "bg-green-200 dark:bg-green-800/30" : ""} ${foulPlayer === 2 ? "bg-red-200 dark:bg-red-800/30" : ""}`}
              onClick={() => handlePlayerClick(2)}
            >
              プレイヤー2
              {foulPlayer === 2 && (
                <div className="text-red-600 dark:text-red-400">
                  フライング!
                </div>
              )}
            </div>
          </div>

          {gameState === "finished" && (
            <button
              onClick={resetGame}
              className="mt-8 rounded bg-gray-300 px-4 py-2 font-medium dark:bg-gray-700"
            >
              もう一回
            </button>
          )}
        </div>
      </div>
    </ContentPageLayout>
  );
};

export default DVA;
