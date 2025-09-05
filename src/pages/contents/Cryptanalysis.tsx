import React, { useState, useRef, useEffect } from "react";

import ContentPageLayout from "../../components/ContentPageLayout";

interface StickyState {
  isSticky: boolean;
  scrollY: number;
}

interface CipherPair {
  plain: string;
  encrypted: string;
}

const Cryptanalysis: React.FC = () => {
  const [sortColumn, setSortColumn] = useState<number>(0);
  const [plainText, setPlainText] = useState<string>("");
  const [encryptedText, setEncryptedText] = useState<string>("");
  const [stickyState, setStickyState] = useState<StickyState>({
    isSticky: false,
    scrollY: 0,
  });

  const plainTextRef = useRef<HTMLDivElement>(null);
  const encryptedTextRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  // Cipher alphabet mapping - matches the HTML page exactly
  const cipherPairs: CipherPair[] = [
    { plain: "A", encrypted: "E" },
    { plain: "B", encrypted: "D" },
    { plain: "C", encrypted: "T" },
    { plain: "D", encrypted: "H" },
    { plain: "E", encrypted: "Y" },
    { plain: "F", encrypted: "S" },
    { plain: "G", encrypted: "F" },
    { plain: "H", encrypted: "L" },
    { plain: "I", encrypted: "G" },
    { plain: "J", encrypted: "Z" },
    { plain: "K", encrypted: "B" },
    { plain: "L", encrypted: "R" },
    { plain: "M", encrypted: "J" },
    { plain: "N", encrypted: "K" },
    { plain: "O", encrypted: "C" },
    { plain: "P", encrypted: "I" },
    { plain: "Q", encrypted: "P" },
    { plain: "R", encrypted: "X" },
    { plain: "S", encrypted: "N" },
    { plain: "T", encrypted: "Q" },
    { plain: "U", encrypted: "O" },
    { plain: "V", encrypted: "U" },
    { plain: "W", encrypted: "A" },
    { plain: "X", encrypted: "V" },
    { plain: "Y", encrypted: "M" },
    { plain: "Z", encrypted: "W" },
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

  // スクロール位置に基づいて固定表示を制御
  useEffect(() => {
    const handleScroll = (): void => {
      if (tableRef.current !== null && containerRef.current !== null) {
        const tableBottom = tableRef.current.getBoundingClientRect().bottom;
        const tableTop = tableRef.current.getBoundingClientRect().top;

        // テーブルが表示領域内にある場合のみ固定表示を有効にする
        if (tableTop < 500 && tableBottom > 400) {
          setStickyState({
            isSticky: true,
            scrollY: window.scrollY,
          });
        } else {
          setStickyState({
            isSticky: false,
            scrollY: window.scrollY,
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初期状態を設定

    return (): void => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

        <div
          ref={tableRef}
          className="mt-6 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th
                  className={`cursor-pointer p-4 font-sans text-2xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 ${sortColumn === 0 ? "text-blue-600 dark:text-blue-400" : ""}`}
                  onClick={() => handleSort(0)}
                >
                  暗号前 {sortColumn === 0 && "↓"}
                </th>
                <th
                  className={`cursor-pointer p-4 font-sans text-2xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 ${sortColumn === 1 ? "text-blue-600 dark:text-blue-400" : ""}`}
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
                    className="cursor-pointer p-4 font-sans text-2xl hover:bg-blue-100/50 dark:hover:bg-blue-900/30"
                    onClick={() => handleCharClick(pair)}
                  >
                    {pair.plain}
                  </td>
                  <td
                    className="cursor-pointer p-4 font-sans text-2xl hover:bg-blue-100/50 dark:hover:bg-blue-900/30"
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
            <li>「EJY」</li>
            <li>「JEQLTROD」</li>
            <li>「IXCFXEJJGKF」</li>
          </ul>
        </div>

        <div ref={containerRef} className="mt-8 space-y-4">
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
        </div>

        {/* 暗号前/後のテキスト表示ボックス - スクロール位置に応じて固定表示 */}
        <div
          className={`space-y-4 ${stickyState.isSticky ? "fixed right-0 bottom-4 left-0 z-10 mx-auto max-w-screen-lg px-4 pb-4" : "mt-4"}`}
        >
          <div
            className={`${stickyState.isSticky ? "rounded-lg bg-white/90 p-4 shadow-lg backdrop-blur-md transition-all duration-300 dark:bg-gray-800/90" : ""}`}
          >
            <div className="space-y-1">
              <p className="font-medium text-gray-600 dark:text-gray-300">
                暗号前:
              </p>
              <div
                ref={plainTextRef}
                className="h-10 overflow-x-auto rounded border border-gray-200 bg-white p-2 font-mono text-xl whitespace-nowrap dark:border-gray-700 dark:bg-gray-900"
              >
                {plainText}
              </div>
            </div>

            <div className="space-y-1">
              <p className="font-medium text-gray-600 dark:text-gray-300">
                暗号後:
              </p>
              <div
                ref={encryptedTextRef}
                className="h-10 overflow-x-auto rounded border border-gray-200 bg-white p-2 font-mono text-xl whitespace-nowrap dark:border-gray-700 dark:bg-gray-900"
              >
                {encryptedText}
              </div>
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
