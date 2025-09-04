import React from "react";

const Map: React.FC = () => {
  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-8 text-center text-3xl font-bold">会場マップ</h1>

      <div className="mb-8">
        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-bold">会場案内</h2>
          <p className="mb-4">
            数学部の展示は3階の理科室2で行っています。
            以下の会場マップを参考に、ぜひお越しください。
          </p>

          <div className="relative mb-6 h-96 w-full rounded-lg border-2 border-gray-300 dark:border-gray-600">
            {/* 簡易的な会場マップの表示エリア */}
            <div className="absolute inset-0 flex flex-col p-4">
              <div className="flex flex-1 items-center justify-center border-b-2 border-gray-300 text-center dark:border-gray-600">
                <div className="w-full">
                  <div className="mb-2 font-bold">4階</div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded bg-gray-100 p-2 dark:bg-gray-700">
                      音楽室
                    </div>
                    <div className="rounded bg-gray-100 p-2 dark:bg-gray-700">
                      美術室
                    </div>
                    <div className="rounded bg-gray-100 p-2 dark:bg-gray-700">
                      PC室
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 items-center justify-center border-b-2 border-gray-300 text-center dark:border-gray-600">
                <div className="w-full">
                  <div className="mb-2 font-bold">3階</div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded bg-gray-100 p-2 dark:bg-gray-700">
                      理科室1
                    </div>
                    <div className="rounded bg-blue-100 p-2 font-bold dark:bg-blue-900">
                      理科室2
                      <br />
                      （数学部）
                    </div>
                    <div className="rounded bg-gray-100 p-2 dark:bg-gray-700">
                      3年1組
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 items-center justify-center border-b-2 border-gray-300 text-center dark:border-gray-600">
                <div className="w-full">
                  <div className="mb-2 font-bold">2階</div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded bg-gray-100 p-2 dark:bg-gray-700">
                      2年1組
                    </div>
                    <div className="rounded bg-gray-100 p-2 dark:bg-gray-700">
                      2年2組
                    </div>
                    <div className="rounded bg-gray-100 p-2 dark:bg-gray-700">
                      2年3組
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 items-center justify-center text-center">
                <div className="w-full">
                  <div className="mb-2 font-bold">1階</div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded bg-gray-100 p-2 dark:bg-gray-700">
                      職員室
                    </div>
                    <div className="rounded bg-gray-100 p-2 dark:bg-gray-700">
                      体育館
                    </div>
                    <div className="rounded bg-gray-100 p-2 dark:bg-gray-700">
                      保健室
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 凡例 */}
            <div className="absolute right-2 bottom-2 rounded border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-800">
              <div className="mb-1 flex items-center">
                <div className="mr-2 h-4 w-4 bg-blue-100 dark:bg-blue-900"></div>
                <span className="text-sm">数学部</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-4 w-4 bg-gray-100 dark:bg-gray-700"></div>
                <span className="text-sm">その他の展示</span>
              </div>
            </div>
          </div>

          <h3 className="mb-2 text-xl font-bold">アクセス情報</h3>
          <ul className="mb-6 list-inside list-disc space-y-2">
            <li>住所: 〒123-4567 東京都○○区△△ X-XX-XX</li>
            <li>最寄り駅: ○○線△△駅から徒歩10分</li>
            <li>バス: ○○バス「△△高校前」下車徒歩1分</li>
          </ul>

          <h3 className="mb-2 text-xl font-bold">開催時間</h3>
          <ul className="list-inside list-disc space-y-2">
            <li>9月10日(土) 10:00〜16:00</li>
            <li>9月11日(日) 10:00〜15:00</li>
          </ul>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <h2 className="mb-4 text-2xl font-bold">展示内容案内</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead>
              <tr className="bg-gray-100 text-left dark:bg-gray-700">
                <th className="border-b border-gray-200 px-4 py-2 dark:border-gray-600">
                  展示名
                </th>
                <th className="border-b border-gray-200 px-4 py-2 dark:border-gray-600">
                  場所
                </th>
                <th className="border-b border-gray-200 px-4 py-2 dark:border-gray-600">
                  内容
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b border-gray-200 px-4 py-2 dark:border-gray-600">
                  暗号解析
                </td>
                <td className="border-b border-gray-200 px-4 py-2 dark:border-gray-600">
                  理科室2 入口付近
                </td>
                <td className="border-b border-gray-200 px-4 py-2 dark:border-gray-600">
                  暗号化と解読の歴史と手法を展示
                </td>
              </tr>
              <tr>
                <td className="border-b border-gray-200 px-4 py-2 dark:border-gray-600">
                  ガチャシミュレーション
                </td>
                <td className="border-b border-gray-200 px-4 py-2 dark:border-gray-600">
                  理科室2 中央
                </td>
                <td className="border-b border-gray-200 px-4 py-2 dark:border-gray-600">
                  確率統計の実例としてのガチャ体験
                </td>
              </tr>
              <tr>
                <td className="border-b border-gray-200 px-4 py-2 dark:border-gray-600">
                  データ可視化
                </td>
                <td className="border-b border-gray-200 px-4 py-2 dark:border-gray-600">
                  理科室2 窓側
                </td>
                <td className="border-b border-gray-200 px-4 py-2 dark:border-gray-600">
                  様々なデータのグラフィカルな表現
                </td>
              </tr>
              <tr>
                <td className="border-b border-gray-200 px-4 py-2 dark:border-gray-600">
                  熱中症対策
                </td>
                <td className="border-b border-gray-200 px-4 py-2 dark:border-gray-600">
                  理科室2 廊下側
                </td>
                <td className="border-b border-gray-200 px-4 py-2 dark:border-gray-600">
                  統計から見る熱中症の予防法
                </td>
              </tr>
              <tr>
                <td className="border-b border-gray-200 px-4 py-2 dark:border-gray-600">
                  休憩スペース
                </td>
                <td className="border-b border-gray-200 px-4 py-2 dark:border-gray-600">
                  理科室2 奥
                </td>
                <td className="border-b border-gray-200 px-4 py-2 dark:border-gray-600">
                  数学パズルや簡単なゲームを用意
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Map;
