import React, { useState, useCallback, useEffect, useRef } from "react";

import ContentPageLayout from "../../components/ContentPageLayout";

const DVA: React.FC = () => {
  const [gameState, setGameState] = useState<
    "idle" | "waiting" | "active" | "finished"
  >("idle");
  const [displayText, setDisplayText] = useState<string>("...");
  const [winner, setWinner] = useState<1 | 2 | null>(null);
  const [foulPlayer, setFoulPlayer] = useState<1 | 2 | null>(null);
  const [timeoutId, setTimeoutId] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const gameDisplayRef = useRef<HTMLDivElement>(null);

  const resetGame = useCallback(() => {
    setGameState("idle");
    setDisplayText("...");
    setWinner(null);
    setFoulPlayer(null);
    document.body.style.overflow = "auto";
    if (timeoutId !== null) clearTimeout(timeoutId);
  }, [timeoutId]);

  const handleStart = useCallback(() => {
    if (gameState !== "idle") {
      // Reset game
      resetGame();
      return;
    }

    // Start game
    setGameState("waiting");
    setDisplayText("Waiting...");
    setWinner(null);
    setFoulPlayer(null);

    // Scroll to game area
    if (gameDisplayRef.current !== null) {
      gameDisplayRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    // Lock scroll during game
    document.body.style.overflow = "hidden";

    // Random delay between 2 and 10 seconds
    const delay = Math.floor(Math.random() * 8000) + 2000;

    const id = setTimeout(() => {
      setDisplayText("Go!!!!!!!");
      setGameState("active");
    }, delay);

    setTimeoutId(id);
  }, [gameState, resetGame]);

  const handlePlayerClick = useCallback(
    (player: 1 | 2) => {
      if (gameState === "idle" || gameState === "finished") return;

      if (gameState === "waiting") {
        // Foul - clicked too early
        setFoulPlayer(player);
        setWinner(player === 1 ? 2 : 1);
        setGameState("finished");
        document.body.style.overflow = "auto";
        if (timeoutId !== null) clearTimeout(timeoutId);
      } else if (gameState === "active") {
        // Valid click - player won
        setWinner(player);
        setGameState("finished");
        document.body.style.overflow = "auto";
      }
    },
    [gameState, timeoutId],
  );

  // Clean up on unmount
  useEffect(() => {
    return (): void => {
      if (timeoutId !== null) clearTimeout(timeoutId);
      document.body.style.overflow = "auto";
    };
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
        <p>動体視力勝負です。</p>

        <h2 className="mt-8 text-2xl font-bold">ルール</h2>
        <p className="text-lg">
          下の「開始」をクリックすると始まります。画面中央の「白色」が「黒色」になった瞬間にそれぞれの場所をクリックしてください。早いほうが勝ちです。フライングは負けになります。
        </p>

        <div className="mt-10 flex flex-col items-center">
          <button
            onClick={handleStart}
            className="rounded-lg bg-blue-600 px-8 py-4 text-xl font-bold text-white shadow-lg transition-colors hover:bg-blue-700 focus:outline-none dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            {gameState === "idle" ? "開始" : "リセット"}
          </button>

          <div
            ref={gameDisplayRef}
            className={`mt-10 flex w-full flex-col items-stretch sm:flex-row sm:justify-center ${gameState === "idle" ? "opacity-70" : "opacity-100"}`}
          >
            <div
              className={`flex-1 cursor-pointer border border-gray-300 bg-blue-100 p-8 text-center font-medium transition-colors dark:border-gray-700 dark:bg-blue-900/30 ${winner === 1 && foulPlayer === null ? "bg-green-200 dark:bg-green-900/50" : ""} ${foulPlayer === 1 ? "bg-red-200 dark:bg-red-900/50" : ""} `}
              onClick={() => handlePlayerClick(1)}
            >
              player 1
              {foulPlayer === 1 && (
                <div className="mt-2 text-red-600 dark:text-red-400">
                  フライング!
                </div>
              )}
            </div>

            <div
              className={`flex items-center justify-center border-t border-b border-gray-300 p-4 font-mono text-lg transition-colors dark:border-gray-700 ${gameState === "active" ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900" : "bg-white text-gray-900 dark:bg-gray-900 dark:text-white"} `}
            >
              {displayText}
            </div>

            <div
              className={`flex-1 cursor-pointer border border-gray-300 bg-red-100 p-8 text-center font-medium transition-colors dark:border-gray-700 dark:bg-red-900/30 ${winner === 2 && foulPlayer === null ? "bg-green-200 dark:bg-green-900/50" : ""} ${foulPlayer === 2 ? "bg-red-200 dark:bg-red-900/50" : ""} `}
              onClick={() => handlePlayerClick(2)}
            >
              player 2
              {foulPlayer === 2 && (
                <div className="mt-2 text-red-600 dark:text-red-400">
                  フライング!
                </div>
              )}
            </div>
          </div>

          {gameState === "finished" && (
            <div className="mt-4 text-center">
              {foulPlayer !== null ? (
                <p className="text-red-600 dark:text-red-400">
                  Player {foulPlayer} フライング! Player {winner} の勝ち!
                </p>
              ) : (
                <p className="text-green-600 dark:text-green-400">
                  Player {winner} の勝ち!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </ContentPageLayout>
  );
};

export default DVA;
