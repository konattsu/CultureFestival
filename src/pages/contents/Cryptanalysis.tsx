import React, { useState } from "react";

import ContentPageLayout from "../../components/ContentPageLayout";

interface CipherPair {
  plain: string;
  encrypted: string;
}

const Cryptanalysis: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<number>(0);
  const [enteredChars, setEnteredChars] = useState<string[]>([]);

  // Cipher alphabet mapping
  const cipherPairs: CipherPair[] = [
    { plain: "a", encrypted: "e" },
    { plain: "b", encrypted: "d" },
    { plain: "c", encrypted: "t" },
    { plain: "d", encrypted: "h" },
    { plain: "e", encrypted: "y" },
    { plain: "f", encrypted: "w" },
    { plain: "g", encrypted: "b" },
    { plain: "h", encrypted: "n" },
    { plain: "i", encrypted: "l" },
    { plain: "j", encrypted: "k" },
    { plain: "k", encrypted: "j" },
    { plain: "l", encrypted: "r" },
    { plain: "m", encrypted: "c" },
    { plain: "n", encrypted: "q" },
    { plain: "o", encrypted: "v" },
    { plain: "p", encrypted: "s" },
    { plain: "q", encrypted: "f" },
    { plain: "r", encrypted: "a" },
    { plain: "s", encrypted: "x" },
    { plain: "t", encrypted: "z" },
    { plain: "u", encrypted: "i" },
    { plain: "v", encrypted: "m" },
    { plain: "w", encrypted: "o" },
    { plain: "x", encrypted: "g" },
    { plain: "y", encrypted: "p" },
    { plain: "z", encrypted: "u" },
  ];

  // Sort the cipher pairs based on the selected column
  const sortedPairs = [...cipherPairs].sort((a, b) => {
    const valueA = sortColumn === 0 ? a.plain : a.encrypted;
    const valueB = sortColumn === 0 ? b.plain : b.encrypted;
    return valueA.localeCompare(valueB);
  });

  const handleSort = (columnIndex: number): void => {
    setSortColumn(columnIndex);
  };

  const handleCharClick = (char: string): void => {
    setEnteredChars([...enteredChars, char]);
    setInputText(inputText + char);
  };

  const handleClear = (): void => {
    setEnteredChars([]);
    setInputText("");
  };

  const svgSymbols = (
    <svg>
      <symbol id="cryptanalysis-svg-src" viewBox="0 0 48 48">
        <defs>
          <style>{`
            .cryptanalysis-svg-internal-a,
            .cryptanalysis-svg-a,
            .cryptanalysis-svg-b {
              fill: none;
            }
            .cryptanalysis-svg-a,
            .cryptanalysis-svg-b {
              stroke: currentColor;
              stroke-linejoin: round;
              stroke-width: 2px;
            }
            .cryptanalysis-svg-b {
              stroke-linecap: round;
            }
          `}</style>
        </defs>
        <title>lock_open_24</title>
        <g id="レイヤー_2_cryptanalysis-svg">
          <g id="Rect_最後透明に_cryptanalysis-svg">
            <rect
              className="cryptanalysis-svg-internal-a"
              width="48"
              height="48"
            />
          </g>
          <g id="icon">
            <rect
              className="cryptanalysis-svg-a"
              x="11.13"
              y="20.13"
              width="26"
              height="22"
            />
            <path
              className="cryptanalysis-svg-b"
              d="M33.12,20.12v-6a9,9,0,0,0-17.29-3.5"
            />
            <line
              className="cryptanalysis-svg-b"
              x1="24.13"
              y1="29.13"
              x2="24.13"
              y2="33.13"
            />
          </g>
        </g>
      </symbol>
    </svg>
  );

  return (
    <ContentPageLayout title="暗号解読" svgSymbols={svgSymbols}>
      <>
        <h2 className="mt-8 text-2xl font-bold">使用する暗号化方式</h2>
        <p>
          単一換字式暗号(たんいつかえじしき)という手法で暗号化された文字列を解読していただきます。
          これは暗号化前の文章「平文」に対して、必ず同じ暗号文の文字に変換される暗号のことです。
        </p>
        <p>
          例えば、平文の "a" が、暗号文の "f" に<strong>必ず</strong>
          暗号化されるとき、これは単一換字式暗号化です。
        </p>
        <p>
          有名な暗号化方式として「シーザ暗号」というものがあります。これは特定の文字を、それよりも辞書順に特定の数だけ後ろにある文字と置き換えるものです。
          <br />
          例えば、[a, b, c, ...] =&gt; [c, d, e,
          ...]です。これは右に3つシフトしています。
          <br />
          これは先ほどの条件を満たすため単一換字式暗号の一種です。
        </p>
        <p>
          今回は、シーザ暗号のようにシフトするのではなく a =&gt; f, b =&gt; z
          のように一対一で紐づいた形式を使用します。
          <br />
          この形式であればシーザ暗号よりは強度が高くなり、より機密性が増します。
          <br />
          しかし、仕組みが単純なため頻度分析などを用いると簡単に解読できてしまいます。そのため現在では公開鍵暗号方式(RSA)や共通鍵暗号方式(AES)というものが使用されています。RSA暗号という単語を聞いたことがある人も少なくないはずです。
        </p>

        <h2 className="mt-8 text-2xl font-bold">対応表</h2>
        <p>
          以下が対応表です。
          <br />
          <br />
          「暗号前」「暗号後」をクリックするとソートできます。
          <br />
          解読の際は
          <span className="font-bold text-blue-600">
            「暗号後」をクリックしてソート
          </span>
          すると操作しやすいです。
          <br />
          <br />
          書かれたアルファベットをクリックすると下のボックスに入っていきます。「暗号前の"a"」
          「暗号後の"e"」のどちらをクリックしても同様の動作をします。
        </p>

        <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-gray-100">
                <th
                  className="cursor-pointer p-3 font-bold hover:bg-gray-200"
                  onClick={() => handleSort(0)}
                >
                  暗号前 {sortColumn === 0 && "↓"}
                </th>
                <th
                  className="cursor-pointer p-3 font-bold hover:bg-gray-200"
                  onClick={() => handleSort(1)}
                >
                  暗号後 {sortColumn === 1 && "↓"}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedPairs.map((pair, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td
                    className="cursor-pointer p-3 hover:bg-blue-100"
                    onClick={() => handleCharClick(pair.plain)}
                  >
                    {pair.plain}
                  </td>
                  <td
                    className="cursor-pointer p-3 hover:bg-blue-100"
                    onClick={() => handleCharClick(pair.encrypted)}
                  >
                    {pair.encrypted}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <label className="block text-lg font-medium">入力ボックス</label>
          <div className="mt-2 flex">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={handleClear}
              className="ml-2 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              クリア
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold">暗号解読のヒント</h3>
          <ul className="list-inside list-disc">
            <li>
              頻度分析を行ってみましょう。日本語の文章では「あ」「い」「う」などの文字が多く使われます。
            </li>
            <li>
              文脈から推測してみましょう。特に短い単語や助詞などは予測しやすいです。
            </li>
            <li>
              パターンを見つけましょう。同じパターンの繰り返しがあれば、それは同じ意味の可能性があります。
            </li>
          </ul>
        </div>
      </>
    </ContentPageLayout>
  );
};

export default Cryptanalysis;
