import React, { useState } from "react";

import ContentPageLayout from "../../components/ContentPageLayout";

const Gacha: React.FC = () => {
  const [selectedGacha, setSelectedGacha] = useState("");
  const [rollResults, setRollResults] = useState<string[]>([]);
  const [totals, setTotals] = useState({
    total: 0,
    pu: 0,
    rare: 0,
    lose: 0,
  });

  const PROBABILITY_DEF = new Map([
    ["genshin", [0.003, 0.003]],
    ["proseka", [0.004, 0.026]],
    ["bluaka", [0.007, 0.023]],
    ["monsuto", [0.035, 0.12]],
    ["nikke", [0.02, 0.02]],
  ]);

  const GACHA_NAMES = new Map([
    ["genshin", "gemshim"],
    ["proseka", "projectMakai"],
    ["bluaka", "blueAchieve"],
    ["monsuto", "monsterStripe"],
    ["nikke", "nike"],
  ]);

  const rollGacha = (probability: number[], times: number): string[] => {
    const results: string[] = [];
    for (let i = 0; i < times; i++) {
      const x = Math.random();
      if (probability[0] > x) {
        results.push("pu");
      } else if (probability[0] + probability[1] > x) {
        results.push("rare");
      } else {
        results.push("lose");
      }
    }
    return results;
  };

  const handleRoll = (times: number): void => {
    if (selectedGacha === "") return;

    const probability = PROBABILITY_DEF.get(selectedGacha);
    if (probability === undefined) return;

    const results = rollGacha(probability, times);
    setRollResults(results);

    const puCount = results.filter((r) => r === "pu").length;
    const rareCount = results.filter((r) => r === "rare").length;
    const loseCount = results.filter((r) => r === "lose").length;

    setTotals({
      total: times,
      pu: puCount,
      rare: rareCount,
      lose: loseCount,
    });
  };

  const getResultColor = (result: string): string => {
    switch (result) {
      case "pu":
        return "bg-yellow-400 border-yellow-500";
      case "rare":
        return "bg-purple-400 border-purple-500";
      case "lose":
        return "bg-gray-400 border-gray-500";
      default:
        return "bg-gray-300 border-gray-400";
    }
  };

  return (
    <ContentPageLayout title="ガチャシミュ">
      <div className="prose dark:prose-invert max-w-none">
        <p>
          色々なガチャを回せます。PU, すり抜け,
          はずれから抽選されます。天井は実装が難しいため無いです。
          <br />
          なお、実際に存在する企業、キャラクター、人物とは一切関係ありません。
        </p>

        <div className="not-prose mt-8 space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <select
              value={selectedGacha}
              onChange={(e) => setSelectedGacha(e.target.value)}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
            >
              <option value="">--選択してください--</option>
              {Array.from(GACHA_NAMES.entries()).map(([key, name]) => (
                <option key={key} value={key}>
                  {name}
                </option>
              ))}
            </select>

            <div className="flex gap-2">
              <button
                onClick={() => handleRoll(1)}
                disabled={selectedGacha === ""}
                className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:bg-gray-400"
              >
                一連
              </button>
              <button
                onClick={() => handleRoll(10)}
                disabled={selectedGacha === ""}
                className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:bg-gray-400"
              >
                十連
              </button>
              <button
                onClick={() => handleRoll(100)}
                disabled={selectedGacha === ""}
                className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:bg-gray-400"
              >
                百連
              </button>
              <button
                onClick={() => handleRoll(1000)}
                disabled={selectedGacha === ""}
                className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:bg-gray-400"
              >
                千連
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                回数
              </label>
              <input
                type="number"
                value={totals.total}
                readOnly
                className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-yellow-600 dark:text-yellow-400">
                PU
              </label>
              <input
                type="number"
                value={totals.pu}
                readOnly
                className="w-full rounded-md border border-yellow-300 bg-yellow-50 px-3 py-2 text-yellow-900 dark:border-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-100"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-purple-600 dark:text-purple-400">
                すり抜け
              </label>
              <input
                type="number"
                value={totals.rare}
                readOnly
                className="w-full rounded-md border border-purple-300 bg-purple-50 px-3 py-2 text-purple-900 dark:border-purple-600 dark:bg-purple-900/20 dark:text-purple-100"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                はずれ
              </label>
              <input
                type="number"
                value={totals.lose}
                readOnly
                className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
          </div>

          {rollResults.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                結果
              </h3>
              <div className="grid max-h-64 grid-cols-10 gap-1 overflow-y-auto rounded-lg border border-gray-300 bg-gray-50 p-4 sm:grid-cols-20 dark:border-gray-600 dark:bg-gray-800">
                {rollResults.map((result, index) => (
                  <div
                    key={index}
                    className={`h-6 w-6 rounded border-2 ${getResultColor(result)}`}
                    title={result}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </ContentPageLayout>
  );
};

export default Gacha;
