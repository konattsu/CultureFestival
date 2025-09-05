import React, { useEffect, useRef } from "react";

import { gsap } from "gsap";

const LoadingSpinner: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<HTMLDivElement[]>([]);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const dots = dotRefs.current;
    const circle = circleRef.current;

    if (container === null || circle === null) return;

    // タイムラインを作成
    const tl = gsap.timeline({ repeat: -1 });

    // 円形のローダーアニメーション
    tl.to(circle, {
      rotation: 360,
      duration: 1.5,
      ease: "none",
    });

    // ドットのアニメーション
    dots.forEach((dot, index) => {
      if (dot !== null && dot !== undefined) {
        gsap.set(dot, { scale: 0.5, opacity: 0.3 });

        gsap.to(dot, {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          repeat: -1,
          yoyo: true,
          delay: index * 0.1,
          ease: "power2.inOut",
        });
      }
    });

    // コンテナのフェードイン
    gsap.fromTo(
      container,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
    );

    return (): void => {
      gsap.killTweensOf([container, circle, ...dots]);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
      <div ref={containerRef} className="flex flex-col items-center space-y-8">
        {/* 円形ローダー */}
        <div className="relative">
          <div
            ref={circleRef}
            className="h-16 w-16 rounded-full border-4 border-gray-200 border-t-blue-600 dark:border-gray-700 dark:border-t-blue-400"
          />
          <div className="animate-spin-reverse absolute inset-2 h-12 w-12 rounded-full border-2 border-gray-100 border-b-purple-500 dark:border-gray-800 dark:border-b-purple-400" />
        </div>

        {/* ドットアニメーション */}
        <div className="flex space-x-2">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              ref={(el): void => {
                if (el !== null && el !== undefined) {
                  dotRefs.current[index] = el;
                }
              }}
              className="h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
            />
          ))}
        </div>

        {/* ローディングテキスト */}
        <div className="text-center">
          <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
            読み込み中...
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            しばらくお待ちください
          </p>
        </div>

        {/* プログレスバー風の装飾 */}
        <div className="h-1 w-48 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div className="h-full animate-pulse rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
