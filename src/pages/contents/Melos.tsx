import React, { useState, useEffect } from "react";

import ContentPageLayout from "../../components/ContentPageLayout";

const Melos: React.FC = () => {
  const [maxKmHBase, setMaxKmHBase] = useState(1);
  const [maxKmHPow, setMaxKmHPow] = useState(1);
  const [maxKmH, setMaxKmH] = useState(1);
  const [currentKmH, setCurrentKmH] = useState(0);
  const [currentMS, setCurrentMS] = useState(0);
  const [currentMelos, setCurrentMelos] = useState(0);

  const kmHToMelos = 13320;

  useEffect(() => {
    const newMaxKmH = Math.pow(maxKmHBase, maxKmHPow);
    setMaxKmH(newMaxKmH);
  }, [maxKmHBase, maxKmHPow]);

  useEffect(() => {
    const relativeValue = currentKmH / maxKmH;
    const actualKmH = relativeValue * maxKmH;
    const actualMS = actualKmH / 3.6;
    const actualMelos = actualKmH / kmHToMelos;

    setCurrentMS(Math.round(actualMS * 10) / 10);
    setCurrentMelos(Math.round(actualMelos * 10000) / 10000);
  }, [currentKmH, maxKmH]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseFloat(e.target.value);
    setCurrentKmH(value);
  };

  const speedData = [
    { name: "歩き", kmH: 4, melos: 0.0003 },
    { name: "走り", kmH: 12, melos: 0.0009 },
    { name: "自転車", kmH: 20, melos: 0.0015 },
    { name: "車", kmH: 60, melos: 0.0045 },
    { name: "電車", kmH: 120, melos: 0.009 },
    { name: "大谷翔平", kmH: 160, melos: 0.012 },
    { name: "新幹線", kmH: 300, melos: 0.023 },
    { name: "リニア", kmH: 500, melos: 0.038 },
    { name: "飛行機(普通)", kmH: 900, melos: 0.068 },
    { name: "音速", kmH: 1220, melos: 0.091 },
    { name: "飛行機(最速)", kmH: 2180, melos: 0.164 },
    { name: "第一宇宙速度", kmH: 28800, melos: 2.162 },
    { name: "第二宇宙速度", kmH: 40300, melos: 3.026 },
    { name: "第三宇宙速度", kmH: 60100, melos: 4.512 },
    { name: "光", kmH: "10億7900万", melos: 78754 },
  ];

  return (
    <ContentPageLayout title="メロスの統計">
      <div className="prose dark:prose-invert max-w-none">
        <h2>走れメロス</h2>
        <p>
          「走れメロス」は太宰治さんが1940年に出版された短編小説です。有名なシーンとして主人公「メロス」が「沈みゆく速度の10倍の速度で走った」という描写があります。
          <br />
          太宰治さんが好きな人や文系の人は日常的に速さの単位として[メロス]を使用したいに違いないと考え、「SI組立単位」の速さと「メロス」の速さを相互変換できるツールを作成しました。
        </p>

        <h2>メロスの定義</h2>
        <p>
          「沈みゆく太陽の速度の10倍の速度で走った」という表現から考察していきます。国語科であれば「メロス」の心情を読み取り定義するのでしょうが、数学部なのでそのような高度な技は使えません。
          <br />
          ですので、沈みゆく太陽の速さを算出しこれを10倍にしたものを 1[メロス]
          と定義します。
          <br />
          地球を球とみなし、メロスがいる場所はイタリアのシチリア島なので北緯37度、赤道の長さを40000kmとします。
        </p>
        <p>
          <br />
          <span className="rounded bg-gray-100 px-2 py-1 font-mono text-sm dark:bg-gray-800">
            赤道 : 北緯37度地点での緯線の長さ = 1 : cos(37deg)
          </span>
          <br />
          なので 北緯37度地点での緯線の長さは
          <br />
          <span className="rounded bg-gray-100 px-2 py-1 font-mono text-sm dark:bg-gray-800">
            40000km x 0.799 = 31960km
          </span>
          <br />
          このときの、自転の速さは
          <br />
          <span className="rounded bg-gray-100 px-2 py-1 font-mono text-sm dark:bg-gray-800">
            31960km / 24h = 1332km/h
          </span>
          <br />
          これの10倍で走っているので
          <br />
          <span className="rounded bg-gray-100 px-2 py-1 font-mono text-sm dark:bg-gray-800">
            1332km/h x 10 = 13320km/h
          </span>
          <br />
          これを1[メロス]と定義します。
        </p>

        <h2>相互変換ツール</h2>
        <p>先ほどの定義を基に作成した相互変換ツールです。</p>

        <div className="not-prose my-8">
          <div className="space-y-6 rounded-lg border border-gray-300 bg-gray-50 p-6 dark:border-gray-600 dark:bg-gray-800">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                最大値設定
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-red-600 dark:text-red-400">
                    max km/h base: {maxKmHBase}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={maxKmHBase}
                    onChange={(e) => setMaxKmHBase(parseInt(e.target.value))}
                    className="w-full accent-red-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-red-600 dark:text-red-400">
                    max km/h pow: {maxKmHPow}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={maxKmHPow}
                    onChange={(e) => setMaxKmHPow(parseInt(e.target.value))}
                    className="w-full accent-red-600"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                速度変換
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max={maxKmH}
                    step={maxKmH / 10000}
                    value={currentKmH}
                    onChange={handleSliderChange}
                    className="w-full accent-blue-600"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      km/h
                    </label>
                    <input
                      type="number"
                      value={Math.round(currentKmH * 10) / 10}
                      readOnly
                      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      m/s
                    </label>
                    <input
                      type="number"
                      value={currentMS}
                      readOnly
                      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      melos
                    </label>
                    <input
                      type="number"
                      value={currentMelos}
                      readOnly
                      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3>使い方</h3>
        <p>
          2つの赤色スライダーは[km/h]の最大値を指定します。baseが基数、powが指数です。100km/hを最大値にしたいときは
          10^2 = 100 なので、baseを10、powを2にします。
        </p>
        <p>
          青色のスライダーで単位の相互変換が行えます。範囲は0から先ほど設定した最大値までです。
        </p>

        <h3>様々な速さ</h3>
        <p>
          日常でよく見る物体の速さを調べてみました。今日から[メロス]を単位として使っていきましょう!
        </p>

        <div className="not-prose my-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                    物体/状態
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                    [km/h]
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                    [melos]
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-600 dark:bg-gray-800">
                {speedData.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900 dark:text-gray-100">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-300">
                      {item.kmH}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-300">
                      {item.melos}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ContentPageLayout>
  );
};

export default Melos;
