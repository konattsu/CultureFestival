import { useState, useRef } from "react";
import type { JSX } from "react";

import { IconClipboard, IconCheck } from "@tabler/icons-react";
import { gsap } from "gsap";

interface CopyButtonProps {
  content: string;
}

export default function CopyButton({ content }: CopyButtonProps): JSX.Element {
  const [isCopied, setIsCopied] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);

  const handleCopy = async (): Promise<void> => {
    try {
      await window.navigator.clipboard.writeText(content);

      // アニメーション: スケールダウン → アイコン変更 → スケールアップ
      if (iconRef.current !== null) {
        gsap
          .timeline()
          .to(iconRef.current, {
            scale: 0.8,
            duration: 0.3,
            ease: "ease.inDown",
          })
          .call(() => {
            setIsCopied(true);
          })
          .to(iconRef.current, {
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          });
      }

      // 2秒後にクリップボードアイコンに戻す
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="rounded-md p-2 transition-colors duration-200 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:hover:bg-gray-800"
      title={isCopied ? "コピーしました！" : "クリップボードにコピー"}
    >
      <div ref={iconRef} className="h-4 w-4">
        {isCopied ? (
          <IconCheck size={16} className="text-green-500" strokeWidth={2.5} />
        ) : (
          <IconClipboard
            size={16}
            className="text-gray-600 dark:text-gray-400"
            strokeWidth={2}
          />
        )}
      </div>
    </button>
  );
}
