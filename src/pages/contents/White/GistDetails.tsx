import React from "react";

interface GistDetailsProps {
  showGistDetails: boolean;
  setShowGistDetails: (show: boolean) => void;
}

const GistDetails: React.FC<GistDetailsProps> = ({
  showGistDetails,
  setShowGistDetails,
}) => (
  <div className="my-6">
    <div className="rounded-lg border border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
      <button
        onClick={() => setShowGistDetails(!showGistDetails)}
        className="flex w-full items-center justify-between p-4 text-left font-medium focus:outline-none"
      >
        <span>詳細を{showGistDetails ? "隠す" : "表示"}</span>
        <svg
          className={`h-5 w-5 transform transition-transform ${showGistDetails ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {showGistDetails && (
        <div className="border-t border-gray-300 p-4 dark:border-gray-700">
          <p className="mb-4">
            <strong>HSVをRGBに変換した理由</strong>
            <br />
            RGBは色の重複が無いが、HSVは重複がある。例えば、S:0%,
            V:100%のとき、色はHの値に関わらず#fff(真っ白)となるから。
          </p>

          <p>
            <strong>9825個の算出方法</strong>
            <br />
            HSVをRGBに変換し、Rが255の時のG,
            Bの範囲、Rが254の...と繰り返していき、G,Bについても同様に求める。その後重複を除き数えた。
            <br />
            かなり無理やりですが、ソースは
            <a
              className="ml-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              href="https://gist.github.com/konattsu/00c6195f3ee3a2df83e03311e6b64dbb"
              target="_blank"
              rel="noreferrer"
            >
              ここ. (gistで開きます)
            </a>
            。
          </p>
        </div>
      )}
    </div>
  </div>
);

export default GistDetails;
