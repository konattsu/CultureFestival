import React, { useState, useEffect } from "react";
import { useRef } from "react";

import gsap from "gsap";

const Map: React.FC = () => {
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const mathRef = useRef<HTMLSpanElement>(null);

  // 数学部の輝きGSAPモーション
  useEffect(() => {
    if (mathRef.current !== null) {
      // メインのシャイニングエフェクト
      const shine = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.2,
      });

      // 背景グラデーションのアニメーション
      shine.to(mathRef.current, {
        backgroundPositionX: "200%",
        filter: "brightness(1.8) drop-shadow(0 0 12px #fbbf24)",
        scale: 1.05,
        duration: 1.5,
        ease: "sine.inOut",
      });

      shine.to(mathRef.current, {
        backgroundPositionX: "0%",
        filter: "brightness(1.2) drop-shadow(0 0 6px #fbbf24)",
        scale: 1,
        duration: 1.5,
        ease: "sine.inOut",
      });

      // サブティルなパルス効果（別のタイムライン）
      const pulse = gsap.timeline({
        repeat: -1,
        yoyo: true,
      });

      pulse.to(mathRef.current, {
        textShadow: "0 0 8px rgba(251, 191, 36, 0.7)",
        duration: 0.8,
        ease: "power2.inOut",
      });

      // Clean up animation on unmount
      return (): void => {
        shine.kill();
        pulse.kill();
      };
    }
    return undefined;
  }, []);

  // 拡大表示時のスクロールロック（ヘッダー優先）
  useEffect(() => {
    if (isMapExpanded) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px"; // スクロールバー分の調整
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return (): void => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isMapExpanded]);

  // 部屋割り当て情報
  const roomAssignments = [
    { room: "401", assignment: "数学部" },
    { room: "402", assignment: "社会部" },
    { room: "403", assignment: "1-3" },
    { room: "404", assignment: "1-4" },
    { room: "405", assignment: "ふれあい委員会" },
    { room: "406", assignment: "将棋部" },
    { room: "407", assignment: "1-7" },
    { room: "408", assignment: "英語部" },
    { room: "409", assignment: "美術部" },
    { room: "301", assignment: "文芸部" },
    { room: "302", assignment: "2-2" },
    { room: "303", assignment: "2-3" },
    { room: "304", assignment: "写真部" },
    { room: "305", assignment: "2-5" },
    { room: "306", assignment: "図書部" },
    { room: "307", assignment: "茶道部" },
    { room: "308", assignment: "華道部" },
    { room: "201", assignment: "書道部" },
    { room: "202", assignment: "書道部" },
    { room: "203", assignment: "バザー" },
    { room: "204", assignment: "バザー" },
    { room: "205", assignment: "バザー" },
    { room: "206", assignment: "休憩所" },
    { room: "207", assignment: "休憩所" },
    { room: "208", assignment: "休憩所" },
    { room: "209", assignment: "PTA" },
    { room: "生物室", assignment: "自然科学部" },
    { room: "化学室", assignment: "自然科学部" },

    { room: "西101", assignment: "通信制" },
    { room: "西102", assignment: "定時制" },
    { room: "階段", assignment: "2-1" },
    { room: "正門", assignment: "2-4" },

    { room: "本館入口", assignment: "1-5" },
    { room: "1体", assignment: "1-6" },
    { room: "石庭(校庭)", assignment: "2-6" },
    { room: "石庭(校庭)", assignment: "2-7" },
    { room: "石庭(校庭)", assignment: "1-1" },
    { room: "石庭(校庭)", assignment: "1-2" },
  ];

  const handleDownloadMap = (): void => {
    const link = document.createElement("a");
    link.href = "/images/room.svg";
    link.download = "2025-文化祭-地図.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="mx-auto max-w-6xl">
        <h1 className="my-12 text-center text-3xl font-bold">地図</h1>

        <div className="mb-8">
          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-bold">会場案内</h2>
            <p className="mb-4">
              数学部の展示は4階の401教室で行っています。
              以下の会場マップを参考に、ぜひお越しください。
            </p>

            <div className="mb-4 flex gap-2">
              <button
                onClick={handleDownloadMap}
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
              >
                マップをダウンロード
              </button>
              <button
                onClick={() => setIsMapExpanded(true)}
                className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500"
              >
                マップを拡大表示
              </button>
            </div>

            {/* インライン埋め込みマップ */}
            <div className="relative mb-6 overflow-hidden rounded-lg border-2 border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
              <div
                className="cursor-pointer"
                onClick={() => setIsMapExpanded(true)}
              >
                {imageError ? (
                  <div className="flex h-96 w-full items-center justify-center bg-gray-100 dark:bg-gray-600">
                    <div className="text-center">
                      <p className="text-gray-600 dark:text-gray-300">
                        マップを読み込めませんでした
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        ファイルパス: /images/room.svg
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex h-96 w-full items-center justify-center bg-white">
                      <object
                        data="/images/room.svg"
                        type="image/svg+xml"
                        className="max-h-full max-w-full"
                        style={{ width: "100%", height: "100%" }}
                        onError={() => setImageError(true)}
                      >
                        {/* フォールバック */}
                        <img
                          src="/images/room.svg"
                          alt="会場マップ"
                          className="max-h-full max-w-full object-contain"
                          onError={() => setImageError(true)}
                          onLoad={() => setImageError(false)}
                        />
                      </object>
                    </div>
                    <div className="bg-opacity-0 hover:bg-opacity-20 absolute inset-0 flex items-center justify-center transition-all">
                      <span className="bg-opacity-50 rounded px-3 py-1 font-bold text-white opacity-0 transition-opacity hover:opacity-100">
                        クリックで拡大
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-bold">部屋割り当て一覧</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800">
              <thead>
                <tr className="bg-gray-100 text-left dark:bg-gray-700">
                  <th className="border-b border-gray-200 px-4 py-2 dark:border-gray-600">
                    教室
                  </th>
                  <th className="border-b border-gray-200 px-4 py-2 dark:border-gray-600">
                    組織
                  </th>
                </tr>
              </thead>
              <tbody>
                {roomAssignments.map((item, index) => (
                  <tr
                    key={index}
                    className={
                      item.assignment === "数学部"
                        ? "bg-gradient-to-r from-blue-50 to-amber-50 dark:from-blue-900/60 dark:to-amber-900/40"
                        : ""
                    }
                  >
                    <td className="border-b border-gray-200 px-4 py-2 font-mono dark:border-gray-600">
                      {item.room}
                    </td>
                    <td
                      className={
                        item.assignment === "数学部"
                          ? "border-b border-gray-200 bg-red-950 px-4 py-2 font-mono text-white dark:bg-transparent dark:text-amber-200"
                          : "border-b border-gray-200 px-4 py-2 font-mono dark:border-gray-600"
                      }
                    >
                      {item.assignment === "数学部" ? (
                        <span
                          ref={mathRef}
                          className="relative font-bold"
                          style={{
                            background:
                              "linear-gradient(90deg,#60a5fa,#fbbf24,#60a5fa)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                            WebkitTextFillColor: "transparent",
                            backgroundSize: "200% 100%",
                            backgroundPositionX: "0%",
                            filter:
                              "brightness(1.2) drop-shadow(0 0 6px #fbbf24)",
                            position: "relative",
                            zIndex: 1,
                            transition: "filter 0.3s",
                          }}
                        >
                          {item.assignment} ✨
                        </span>
                      ) : (
                        item.assignment
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 拡大表示モーダル */}
      {isMapExpanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black pt-8"
          onClick={() => setIsMapExpanded(false)}
        >
          <div className="relative max-h-full max-w-full">
            <button
              onClick={() => setIsMapExpanded(false)}
              className="bg-opacity-20 hover:bg-opacity-30 absolute -top-12 right-0 rounded px-3 py-1 text-xl font-bold text-white"
            >
              ✕ 閉じる
            </button>
            {imageError ? (
              <div className="flex h-96 w-96 items-center justify-center rounded-lg bg-white">
                <div className="text-center text-gray-600">
                  <p>マップを読み込めませんでした</p>
                  <p className="text-sm">ファイルパス: /images/room.svg</p>
                </div>
              </div>
            ) : (
              <div
                className="max-h-full max-w-full rounded-lg bg-white shadow-lg"
                style={{ minWidth: "300px", minHeight: "300px" }}
              >
                <object
                  data="/images/room.svg"
                  type="image/svg+xml"
                  className="h-full w-full rounded-lg"
                  style={{
                    width: "90vw",
                    height: "90vh",
                    maxWidth: "1200px",
                    maxHeight: "800px",
                  }}
                  onClick={(e) => e.stopPropagation()}
                  onError={() => setImageError(true)}
                >
                  {/* フォールバック */}
                  <img
                    src="/images/room.svg"
                    alt="会場マップ（拡大表示）"
                    className="h-full w-full rounded-lg object-contain"
                    onClick={(e) => e.stopPropagation()}
                    onError={() => setImageError(true)}
                  />
                </object>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Map;
