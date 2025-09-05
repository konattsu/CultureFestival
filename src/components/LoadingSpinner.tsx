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

    // 洗練された円形ローダーアニメーション
    tl.to(circle, {
      rotation: 360,
      duration: 2,
      ease: "power2.inOut",
    });

    // 企業的なドットのアニメーション
    dots.forEach((dot, index) => {
      if (dot !== null && dot !== undefined) {
        gsap.set(dot, { scale: 0.8, opacity: 0.6 });

        gsap.to(dot, {
          scale: 1.2,
          opacity: 1,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          delay: index * 0.15,
          ease: "back.inOut(1.7)",
        });

        // 微妙な色の変化アニメーション
        gsap.to(dot, {
          filter: "brightness(1.2) saturate(1.1)",
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          delay: index * 0.2,
          ease: "sine.inOut",
        });
      }
    });

    // スムーズなコンテナの登場
    gsap.fromTo(
      container,
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.2)",
      },
    );

    return (): void => {
      gsap.killTweensOf([container, circle, ...dots]);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-md dark:bg-slate-900/90">
      <div ref={containerRef} className="flex flex-col items-center space-y-10">
        {/* モダンなローダー */}
        <div className="relative">
          <div
            ref={circleRef}
            className="h-20 w-20 rounded-full border-4 border-orange-100 border-t-orange-500 shadow-lg dark:border-slate-700 dark:border-t-orange-400"
          />
          <div className="animate-spin-reverse absolute inset-3 h-14 w-14 rounded-full border-3 border-emerald-100 border-b-emerald-500 dark:border-slate-800 dark:border-b-emerald-400" />
          <div className="absolute inset-6 h-8 w-8 rounded-full bg-gradient-to-br from-orange-400 to-emerald-500 opacity-20" />
        </div>

        {/* 企業カラーのドットアニメーション */}
        <div className="flex space-x-3">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              ref={(el): void => {
                if (el !== null && el !== undefined) {
                  dotRefs.current[index] = el;
                }
              }}
              className={`h-4 w-4 rounded-full shadow-md ${
                index % 2 === 0
                  ? "bg-gradient-to-br from-orange-400 to-orange-600"
                  : "bg-gradient-to-br from-emerald-400 to-emerald-600"
              }`}
            />
          ))}
        </div>

        {/* 洗練されたローディングテキスト */}
        <div className="text-center">
          <h3 className="mb-3 text-xl font-bold text-slate-800 dark:text-slate-100">
            文化祭を準備中
          </h3>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
            素敵な体験をお届けします
          </p>
        </div>

        {/* 企業カラーのプログレスバー */}
        <div className="relative h-2 w-56 overflow-hidden rounded-full bg-slate-200 shadow-inner dark:bg-slate-700">
          <div className="h-full animate-pulse rounded-full bg-gradient-to-r from-orange-500 via-emerald-500 to-orange-500 shadow-lg" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
