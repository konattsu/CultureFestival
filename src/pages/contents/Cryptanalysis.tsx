import React, { useState, useRef, useEffect } from "react";

import ContentPageLayout from "../../components/ContentPageLayout";

interface CipherPair {
  plain: string;
  encrypted: string;
}

const Cryptanalysis: React.FC = () => {
  const [sortColumn, setSortColumn] = useState<number>(0);
  const [plainText, setPlainText] = useState<string>("");
  const [encryptedText, setEncryptedText] = useState<string>("");

  const plainTextRef = useRef<HTMLDivElement>(null);
  const encryptedTextRef = useRef<HTMLDivElement>(null);

  // Cipher alphabet mapping - matches the HTML page exactly
  const cipherPairs: CipherPair[] = [
    { plain: "a", encrypted: "e" },
    { plain: "b", encrypted: "d" },
    { plain: "c", encrypted: "t" },
    { plain: "d", encrypted: "h" },
    { plain: "e", encrypted: "y" },
    { plain: "f", encrypted: "s" },
    { plain: "g", encrypted: "f" },
    { plain: "h", encrypted: "l" },
    { plain: "i", encrypted: "g" },
    { plain: "j", encrypted: "z" },
    { plain: "k", encrypted: "b" },
    { plain: "l", encrypted: "r" },
    { plain: "m", encrypted: "j" },
    { plain: "n", encrypted: "k" },
    { plain: "o", encrypted: "c" },
    { plain: "p", encrypted: "i" },
    { plain: "q", encrypted: "p" },
    { plain: "r", encrypted: "x" },
    { plain: "s", encrypted: "n" },
    { plain: "t", encrypted: "q" },
    { plain: "u", encrypted: "o" },
    { plain: "v", encrypted: "u" },
    { plain: "w", encrypted: "a" },
    { plain: "x", encrypted: "v" },
    { plain: "y", encrypted: "m" },
    { plain: "z", encrypted: "w" },
  ];

  // Sort the cipher pairs based on the selected column
  const sortedPairs = [...cipherPairs].sort((a, b) => {
    const valueA = sortColumn === 0 ? a.plain : a.encrypted;
    const valueB = sortColumn === 0 ? b.plain : b.encrypted;
    return valueA.localeCompare(valueB);
  });

  // Scroll outputs to right end when text changes
  useEffect(() => {
    if (plainTextRef.current !== null) {
      plainTextRef.current.scrollLeft = plainTextRef.current.scrollWidth;
    }
    if (encryptedTextRef.current !== null) {
      encryptedTextRef.current.scrollLeft =
        encryptedTextRef.current.scrollWidth;
    }
  }, [plainText, encryptedText]);

  const handleSort = (columnIndex: number): void => {
    setSortColumn(columnIndex);
  };

  const handleCharClick = (pair: CipherPair): void => {
    setPlainText((prev) => prev + pair.plain);
    setEncryptedText((prev) => prev + pair.encrypted);
  };

  const handleDelete = (): void => {
    setPlainText((prev) => prev.slice(0, -1));
    setEncryptedText((prev) => prev.slice(0, -1));
  };

  const handleClear = (): void => {
    if (window.confirm("全部削除してよろしいですか?")) {
      setPlainText("");
      setEncryptedText("");
    }
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
      <div className="prose dark:prose-invert max-w-none">
        <p className="rounded bg-blue-100/80 p-4 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
          パンフレット記載の暗号解読はこのページです。無くても別の文字列を解読できます。
        </p>

        <h2 className="mt-8 text-2xl font-bold">使用する暗号化方式</h2>
        <p>
          単一換字式暗号(たんいつかえじしき)という手法で暗号化された文字列を解読していただきます。
          これは暗号化前の文章「平文」に対して、必ず同じ暗号文の文字に変換される暗号のことです。
        </p>
        <p>
          例えば、平文の "a" が、暗号文の "f" に
          <strong className="font-bold">必ず</strong>
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
          <span className="font-semibold text-amber-600 dark:text-amber-400">
            「暗号後」をクリックしてソート
          </span>
          すると操作しやすいです。
          <br />
          <br />
          書かれたアルファベットをクリックすると下のボックスに入っていきます。「暗号前の"a"」
          「暗号後の"e"」のどちらをクリックしても同様の動作をします。
        </p>

        <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th
                  className={`cursor-pointer p-3 font-bold hover:bg-gray-200 dark:hover:bg-gray-700 ${sortColumn === 0 ? "text-blue-600 dark:text-blue-400" : ""}`}
                  onClick={() => handleSort(0)}
                >
                  暗号前 {sortColumn === 0 && "↓"}
                </th>
                <th
                  className={`cursor-pointer p-3 font-bold hover:bg-gray-200 dark:hover:bg-gray-700 ${sortColumn === 1 ? "text-blue-600 dark:text-blue-400" : ""}`}
                  onClick={() => handleSort(1)}
                >
                  暗号後 {sortColumn === 1 && "↓"}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedPairs.map((pair, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td
                    className="cursor-pointer p-3 font-mono hover:bg-blue-100/50 dark:hover:bg-blue-900/30"
                    onClick={() => handleCharClick(pair)}
                  >
                    {pair.plain}
                  </td>
                  <td
                    className="cursor-pointer p-3 font-mono hover:bg-blue-100/50 dark:hover:bg-blue-900/30"
                    onClick={() => handleCharClick(pair)}
                  >
                    {pair.encrypted}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
          <p className="mb-4 font-medium">以下の文字列を解読してみてください</p>
          <ul className="mb-2 space-y-2 font-mono">
            <li>「ejy」</li>
            <li>「jeqltrod」</li>
            <li>「ixcfxejjgkf」</li>
          </ul>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex space-x-2">
            <button
              onClick={handleDelete}
              className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-500"
            >
              1つ削除
            </button>
            <button
              onClick={handleClear}
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500"
            >
              全削除
            </button>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              暗号前:
            </p>
            <div
              ref={plainTextRef}
              className="h-10 overflow-x-auto rounded border border-gray-200 bg-white p-2 font-mono whitespace-nowrap dark:border-gray-700 dark:bg-gray-900"
            >
              {plainText}
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              暗号後:
            </p>
            <div
              ref={encryptedTextRef}
              className="h-10 overflow-x-auto rounded border border-gray-200 bg-white p-2 font-mono whitespace-nowrap dark:border-gray-700 dark:bg-gray-900"
            >
              {encryptedText}
            </div>
          </div>
        </div>

        <p className="mt-16">
          逆に自分で暗号化して他人に解読してもらうというのも面白いかもしれません。生成した文字列はクリックしてコピーできるのでぜひ試してみてください。
          <br />
          <br />
          ちなみにこのサイトは"https"というスキームで、"ssl/tls"という通信プロトコルを使用しています。これはwebサイトを閲覧する際の通信を暗号化する仕組みなのですが、これにも上述のRSA,
          AESといった複雑な暗号方式が使用されています。
        </p>
      </div>
    </ContentPageLayout>
  );
};

export default Cryptanalysis;
