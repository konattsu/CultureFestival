import React from "react";

import WhiteCanvas from "./WhiteCanvas";

interface WhiteGeneratorProps {
  whiteName: string;
  whiteColor: string;
  onWhiteNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGenerateWhite: () => void;
}

const WhiteGenerator: React.FC<WhiteGeneratorProps> = ({
  whiteName,
  whiteColor,
  onWhiteNameChange,
  onGenerateWhite,
}) => {
  const handleSaveImage = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    const canvas = document.querySelector("#white-canvas") as HTMLCanvasElement;
    if (canvas != null) {
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = "white.png";
      a.click();
    }
  };

  return (
    <div className="my-6 space-y-4 rounded-lg border border-gray-300 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="flex flex-col gap-2 lg:flex-grow lg:flex-row lg:items-center">
          <label
            htmlFor="input-white-name"
            className="font-medium whitespace-nowrap"
          >
            色の名前(1-10字):
          </label>
          <input
            type="text"
            id="input-white-name"
            className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none lg:min-w-0 lg:flex-grow dark:border-gray-600 dark:bg-gray-700"
            value={whiteName}
            onChange={onWhiteNameChange}
            maxLength={10}
            placeholder="ここに入力"
          />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row lg:flex-shrink-0">
          <button
            onClick={onGenerateWhite}
            className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            別の白色
          </button>

          <a
            href="#"
            download="white.png"
            className="rounded bg-green-600 px-4 py-2 text-center font-medium text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
            onClick={handleSaveImage}
          >
            画像を保存
          </a>
        </div>
      </div>

      <div className="relative aspect-video w-full overflow-hidden rounded border border-gray-300 bg-white dark:border-gray-600">
        <WhiteCanvas color={whiteColor} name={whiteName} />
      </div>
    </div>
  );
};

export default WhiteGenerator;
