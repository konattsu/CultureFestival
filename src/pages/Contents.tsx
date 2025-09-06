import React, { useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ArrowRight } from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// デバイス判定とパフォーマンス設定
const useDevicePerformance = (): {
  isMobile: boolean;
  isLowEnd: boolean;
  prefersReducedMotion: boolean;
  shouldReduceAnimations: boolean;
  animationElementCount: number;
  animationDuration: number;
  complexAnimations: boolean;
} => {
  return useMemo(() => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        window.navigator.userAgent,
      ) || window.innerWidth < 768;
    const isLowEnd =
      window.navigator.hardwareConcurrency !== undefined &&
      window.navigator.hardwareConcurrency <= 4;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    return {
      isMobile,
      isLowEnd,
      prefersReducedMotion,
      shouldReduceAnimations: Boolean(
        isMobile || isLowEnd || prefersReducedMotion,
      ),
      animationElementCount: isMobile ? 8 : 25,
      animationDuration: isMobile ? 0.3 : 1.2,
      complexAnimations: Boolean(
        !isMobile && !isLowEnd && !prefersReducedMotion,
      ),
    };
  }, []);
};

// --- BEGIN SVG ICON COMPONENTS ---
const CryptanalysisIcon = (): React.JSX.Element => (
  <svg viewBox="0 0 48 48" className="h-32 w-32">
    <rect fill="none" className="h-32 w-32" />
    <rect
      x="11.13"
      y="20.13"
      width="26"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M33.12,20.12v-6a9,9,0,0,0-17.29-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <line
      x1="24.13"
      y1="29.13"
      x2="24.13"
      y2="33.13"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
);

const GachaIcon = (): React.JSX.Element => (
  <svg viewBox="0 0 100 100" className="h-32 w-32">
    <ellipse
      cx="50"
      cy="50"
      rx="35"
      ry="40"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
    />
    <path
      d="M15 50 q35 20, 70 0"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
    />
    <ellipse cx="50" cy="75" rx="3" ry="5" stroke="none" fill="currentColor" />
  </svg>
);

const DvaIcon = (): React.JSX.Element => (
  <svg
    viewBox="0 0 100 100"
    className="flex h-32 w-32 items-center justify-center"
  >
    <text
      x="50%"
      y="55%"
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize="48"
      fill="currentColor"
      fontWeight="bold"
    >
      VS
    </text>
  </svg>
);

const HeatExhaustionIcon = (): React.JSX.Element => (
  <svg viewBox="0 0 100 100" className="h-32 w-32">
    {/* メインのやつ */}
    <circle cx="50" cy="75" r="15" fill="#fff" stroke="#000" strokeWidth="2" />
    <path
      d="M40 64 l0 -50 q10 -10, 20 0 l0 50"
      stroke="#000"
      strokeWidth="2"
      fill="#fff"
    />
    <path d="M45 75 l0 -55 q5 -5, 10 0 l0 55" stroke="none" fill="#f00" />
    <circle cx="50" cy="75" r="10" fill="#f00" />
    {/* 目盛り */}
    <line
      x1="65"
      y1="20"
      x2="80"
      y2="20"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="65"
      y1="40"
      x2="80"
      y2="40"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="65"
      y1="60"
      x2="80"
      y2="60"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="65"
      y1="24"
      x2="72"
      y2="24"
      stroke="currentColor"
      strokeWidth="1"
    />
    <line
      x1="65"
      y1="28"
      x2="72"
      y2="28"
      stroke="currentColor"
      strokeWidth="1"
    />
    <line
      x1="65"
      y1="32"
      x2="72"
      y2="32"
      stroke="currentColor"
      strokeWidth="1"
    />
    <line
      x1="65"
      y1="36"
      x2="72"
      y2="36"
      stroke="currentColor"
      strokeWidth="1"
    />
    <line
      x1="65"
      y1="44"
      x2="72"
      y2="44"
      stroke="currentColor"
      strokeWidth="1"
    />
    <line
      x1="65"
      y1="48"
      x2="72"
      y2="48"
      stroke="currentColor"
      strokeWidth="1"
    />
    <line
      x1="65"
      y1="52"
      x2="72"
      y2="52"
      stroke="currentColor"
      strokeWidth="1"
    />
    <line
      x1="65"
      y1="56"
      x2="72"
      y2="56"
      stroke="currentColor"
      strokeWidth="1"
    />
    {/* 太陽 */}
    <circle cx="20" cy="30" r="5" fill="currentColor" />
    <line
      x1="28"
      y1="30"
      x2="35"
      y2="30"
      stroke="currentColor"
      strokeWidth="1"
    />
    <line
      x1="12"
      y1="30"
      x2="5"
      y2="30"
      stroke="currentColor"
      strokeWidth="1"
    />
    <line
      x1="20"
      y1="38"
      x2="20"
      y2="45"
      stroke="currentColor"
      strokeWidth="1"
    />
    <line
      x1="20"
      y1="22"
      x2="20"
      y2="15"
      stroke="currentColor"
      strokeWidth="1"
    />
    <line
      x1="15"
      y1="25"
      x2="10"
      y2="20"
      stroke="currentColor"
      strokeWidth="1"
    />
    <line
      x1="15"
      y1="35"
      x2="10"
      y2="40"
      stroke="currentColor"
      strokeWidth="1"
    />
    <line
      x1="25"
      y1="35"
      x2="30"
      y2="40"
      stroke="currentColor"
      strokeWidth="1"
    />
    <line
      x1="25"
      y1="25"
      x2="30"
      y2="20"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>
);

const NotebookIcon = (): React.JSX.Element => (
  <svg viewBox="0 0 100 100" className="h-32 w-32">
    <rect
      x="20"
      y="10"
      width="60"
      height="80"
      rx="10"
      ry="10"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
    />
    <line
      x1="35"
      y1="25"
      x2="70"
      y2="25"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="30"
      y1="40"
      x2="65"
      y2="40"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="35"
      y1="55"
      x2="70"
      y2="55"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="30"
      y1="70"
      x2="65"
      y2="70"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const MelosIcon = (): React.JSX.Element => (
  <svg viewBox="0 0 200 200" className="h-32 w-32">
    <line
      x1="60"
      y1="50"
      x2="140"
      y2="50"
      stroke="currentColor"
      strokeWidth="10"
      strokeLinecap="round"
    />
    <line
      x1="40"
      y1="80"
      x2="160"
      y2="80"
      stroke="currentColor"
      strokeWidth="10"
      strokeLinecap="round"
    />
    <line
      x1="100"
      y1="25"
      x2="100"
      y2="150"
      stroke="currentColor"
      strokeWidth="10"
      strokeLinecap="round"
    />
    <line
      x1="100"
      y1="110"
      x2="140"
      y2="110"
      stroke="currentColor"
      strokeWidth="10"
      strokeLinecap="round"
    />
    <line
      x1="60"
      y1="110"
      x2="40"
      y2="160"
      stroke="currentColor"
      strokeWidth="10"
      strokeLinecap="round"
    />
    <line
      x1="58"
      y1="130"
      x2="120"
      y2="160"
      stroke="currentColor"
      strokeWidth="10"
      strokeLinecap="round"
    />
    <line
      x1="120"
      y1="160"
      x2="170"
      y2="160"
      stroke="currentColor"
      strokeWidth="10"
      strokeLinecap="round"
    />
  </svg>
);

const WhiteIcon = (): React.JSX.Element => (
  <svg viewBox="0 0 200 200" className="h-32 w-32">
    <line
      x1="50"
      y1="70"
      x2="150"
      y2="70"
      stroke="currentColor"
      strokeWidth="10"
      strokeLinecap="round"
    />
    <line
      x1="50"
      y1="110"
      x2="150"
      y2="110"
      stroke="currentColor"
      strokeWidth="10"
      strokeLinecap="round"
    />
    <line
      x1="50"
      y1="150"
      x2="150"
      y2="150"
      stroke="currentColor"
      strokeWidth="10"
      strokeLinecap="round"
    />
    <line
      x1="100"
      y1="30"
      x2="50"
      y2="70"
      stroke="currentColor"
      strokeWidth="10"
      strokeLinecap="round"
    />
    <line
      x1="50"
      y1="70"
      x2="50"
      y2="150"
      stroke="currentColor"
      strokeWidth="10"
      strokeLinecap="round"
    />
    <line
      x1="150"
      y1="70"
      x2="150"
      y2="150"
      stroke="currentColor"
      strokeWidth="10"
      strokeLinecap="round"
    />
  </svg>
);

const ProgrammingIcon = (): React.JSX.Element => (
  <svg viewBox="0 0 100 100" className="h-32 w-32">
    <line
      x1="20"
      y1="35"
      x2="80"
      y2="35"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <line
      x1="20"
      y1="65"
      x2="80"
      y2="65"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <line
      x1="43"
      y1="12"
      x2="33"
      y2="88"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <line
      x1="67"
      y1="12"
      x2="57"
      y2="88"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
    />
  </svg>
);

const TechIcon = (): React.JSX.Element => (
  <svg viewBox="0 0 100 100" className="h-32 w-32">
    <rect
      x="20"
      y="10"
      width="60"
      height="80"
      rx="10"
      ry="10"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
    />
    <line
      x1="35"
      y1="25"
      x2="70"
      y2="25"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="30"
      y1="40"
      x2="65"
      y2="40"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="35"
      y1="55"
      x2="70"
      y2="55"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="30"
      y1="70"
      x2="46"
      y2="70"
      stroke="currentColor"
      strokeWidth="2"
    />
    <polygon
      points="50,70 90,5 85,2 45,67 44.5,73.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>
);

// --- END SVG ICON COMPONENTS ---

// Floating mathematics elements
const FloatingMathElements: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const performance = useDevicePerformance();

  useEffect(() => {
    const container = containerRef.current;
    if (container === null) return;

    const mathSymbols = [
      "∫",
      "∂",
      "∑",
      "∏",
      "√",
      "∞",
      "π",
      "θ",
      "α",
      "β",
      "γ",
      "δ",
      "ε",
      "λ",
      "μ",
      "σ",
      "φ",
      "ψ",
      "ω",
      "≈",
      "≠",
      "≤",
      "≥",
      "∈",
      "∉",
      "⊂",
      "⊃",
      "∪",
      "∩",
      "∀",
      "∃",
      "→",
      "⇒",
      "⇔",
      "ℝ",
      "ℂ",
      "ℕ",
      "ℤ",
      "ℚ",
      "∅",
      "△",
      "∇",
      "⊕",
      "⊗",
      "⊙",
      "∧",
      "∨",
      "¬",
      "⊥",
      "∥",
    ];

    const elements: HTMLDivElement[] = [];
    const elementCount = performance.animationElementCount;

    for (let i = 0; i < elementCount; i++) {
      const element = document.createElement("div");
      const symbol =
        mathSymbols[Math.floor(Math.random() * mathSymbols.length)];

      element.textContent = symbol;
      element.className =
        "absolute text-blue-400 font-bold opacity-0 select-none pointer-events-none";
      element.style.fontSize = `${Math.random() * 16 + 14}px`;
      element.style.textShadow = "0 0 8px rgba(59, 130, 246, 0.6)";
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;
      element.style.zIndex = `${Math.floor(Math.random() * 5)}`;
      // モバイル最適化のためwill-changeを追加
      element.style.willChange = "transform, opacity";

      container.appendChild(element);
      elements.push(element);

      gsap.set(element, {
        scale: 0.5,
        rotation: Math.random() * 360,
      });

      const animationDuration = performance.animationDuration;
      const tl = gsap.timeline({
        repeat: -1,
        delay: Math.random() * (performance.isMobile ? 1.5 : 3),
      });

      if (performance.complexAnimations) {
        // デスクトップ版: 複雑なアニメーション
        tl.to(element, {
          opacity: 0.7,
          scale: 1,
          duration: animationDuration,
          ease: "power2.out",
        })
          .to(
            element,
            {
              x: (Math.random() - 0.5) * 300,
              y: (Math.random() - 0.5) * 300,
              rotation: `+=${Math.random() * 180 - 90}`,
              duration: 8,
              ease: "sine.inOut",
            },
            0,
          )
          .to(
            element,
            {
              opacity: 0,
              scale: 0.3,
              duration: animationDuration,
              ease: "power2.in",
            },
            7,
          );
      } else {
        // モバイル版: シンプルなアニメーション
        tl.to(element, {
          opacity: 0.5,
          scale: 1,
          duration: animationDuration,
          ease: "none",
        })
          .to(
            element,
            {
              x: (Math.random() - 0.5) * 150,
              y: (Math.random() - 0.5) * 150,
              duration: 4,
              ease: "none",
            },
            0,
          )
          .to(
            element,
            {
              opacity: 0,
              scale: 0.5,
              duration: animationDuration,
              ease: "none",
            },
            3,
          );
      }
    }

    return (): void => {
      elements.forEach((element) => {
        if (container.contains(element)) {
          container.removeChild(element);
        }
      });
    };
  }, [performance]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    />
  );
};

// Hero section for Contents
const ContentsHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    if (hero === null || title === null || subtitle === null) return;

    const tl = gsap.timeline();

    tl.fromTo(
      title,
      { scale: 0.3, rotateY: -180, opacity: 0, y: 50 },
      {
        scale: 1,
        rotateY: 0,
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
      },
    ).fromTo(
      subtitle,
      { opacity: 0, y: 30, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5",
    );

    const handleMouseMove = (e: MouseEvent): void => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 10;
      const y = (clientY / innerHeight - 0.5) * 10;

      gsap.to(title, {
        rotateY: x,
        rotateX: -y,
        transformPerspective: 800,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    hero.addEventListener("mousemove", handleMouseMove);
    return (): void => hero.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative flex h-96 items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
    >
      <FloatingMathElements />

      <div className="relative z-10 text-center">
        <motion.h1
          ref={titleRef}
          className="mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-6xl font-extrabold text-transparent"
          style={{
            filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))",
            transformStyle: "preserve-3d",
          }}
        >
          コンテンツ一覧
        </motion.h1>

        <motion.div
          className="mb-6 flex items-center justify-center space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Sparkles className="h-6 w-6 animate-pulse text-yellow-400" />
          <span className="text-lg font-light tracking-wider text-white">
            MATHEMATICS & TECHNOLOGY
          </span>
          <Sparkles className="h-6 w-6 animate-pulse text-yellow-400" />
        </motion.div>

        <motion.p
          ref={subtitleRef}
          className="mx-auto max-w-3xl text-lg leading-relaxed text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          数学部が作成した部誌、記事、ミニゲームなどの一覧です。
          <br />
          気になるコンテンツをタップして、数学の世界を体験してみましょう。
        </motion.p>
      </div>
    </div>
  );
};

// Enhanced content card with 3D effects
const ContentCard: React.FC<{
  item: ContentItem;
  index: number;
}> = ({ item, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const performance = useDevicePerformance();

  useEffect(() => {
    const card = cardRef.current;
    if (card === null) return;

    gsap.fromTo(
      card,
      {
        y: performance.isMobile ? 20 : 80,
        opacity: 0,
        rotateX: performance.isMobile ? 0 : -30,
        scale: performance.isMobile ? 0.95 : 0.8,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        scale: 1,
        duration: performance.isMobile ? 0.1 : 0.4,
        delay: performance.isMobile ? index * 0.03 : index * 0.05,
        ease: performance.isMobile ? "power2.out" : "back.out(1.7)",
        scrollTrigger: {
          trigger: card,
          start: performance.isMobile ? "top 95%" : "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, [index, performance]);

  const gradients = [
    "from-purple-600 to-blue-600",
    "from-pink-600 to-rose-600",
    "from-green-600 to-teal-600",
    "from-yellow-600 to-orange-600",
    "from-indigo-600 to-purple-600",
    "from-red-600 to-pink-600",
    "from-teal-600 to-cyan-600",
    "from-orange-600 to-red-600",
    "from-blue-600 to-indigo-600",
  ];

  const gradient = gradients[index % gradients.length];

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group transform transition-all duration-300"
      style={{ transformStyle: "preserve-3d" }}
    >
      <Link
        to={`/contents/${item.id}`}
        className="block overflow-hidden rounded-2xl border border-black/20 bg-black/4 backdrop-blur-lg transition-all duration-500 hover:border-white/40 hover:bg-white/20 hover:shadow-2xl dark:border-white/20 dark:bg-white/10"
      >
        <div
          className={`flex h-48 items-center justify-center bg-gradient-to-br ${gradient} p-6 transition-all duration-500 group-hover:scale-105`}
        >
          <div className="transform text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
            {item.icon}
          </div>
        </div>

        <div className="p-6">
          <h2 className="mb-3 text-xl font-bold transition-colors duration-300 group-hover:text-blue-800 dark:group-hover:text-blue-400">
            {item.title}
          </h2>
          <p className="leading-relaxed transition-colors duration-300 group-hover:text-gray-800 dark:group-hover:text-gray-200">
            {item.description}
          </p>

          <motion.div
            className="mt-4 flex items-center text-blue-500 opacity-0 transition-all duration-300 group-hover:opacity-100"
            initial={{ x: -10 }}
            whileHover={{ x: 0 }}
          >
            <span className="mr-2 text-sm font-medium">詳細を見る</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.div>
        </div>

        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </Link>
    </motion.div>
  );
};

interface ContentItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const contentItems: ContentItem[] = [
  {
    id: "cryptanalysis",
    title: "暗号解析",
    description: "単一換字式暗号を作ったり、解析したりできます。",
    icon: <CryptanalysisIcon />,
  },
  {
    id: "gacha",
    title: "ガチャシミュレーション",
    description: "ガチャシミュレーションを体験できます。",
    icon: <GachaIcon />,
  },
  {
    id: "dva",
    title: "動体視力勝負",
    description: "動体視力を競い合うゲームです。",
    icon: <DvaIcon />,
  },
  {
    id: "heat-exhaustion",
    title: "熱中症対策",
    description: "校内で体調が悪くなったときの対処法を紹介します。",
    icon: <HeatExhaustionIcon />,
  },
  {
    id: "notebook",
    title: "書籍",
    description: "部員が読んで特に印象に残った書籍を紹介します。",
    icon: <NotebookIcon />,
  },
  {
    id: "melos",
    title: "メロスは速い? 遅い?",
    description:
      "『走れメロス』のメロスがどれくらいの速さで走ったのかを研究します。",
    icon: <MelosIcon />,
  },
  {
    id: "white",
    title: "白く見える範囲は?",
    description:
      "RGBやHSVなどの色空間を使って、白く見える色の範囲を数学的に考えます。",
    icon: <WhiteIcon />,
  },
  {
    id: "programming",
    title: "プログラミング",
    description:
      "よく目にする「Hello, World!」の由来や出力方法について調べます。",
    icon: <ProgrammingIcon />,
  },
  {
    id: "tech",
    title: "ブラウザで開発",
    description: "ブラウザ上で使える開発環境を体験できます。",
    icon: <TechIcon />,
  },
];

const Contents: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const performance = useDevicePerformance();

  useEffect(() => {
    const grid = gridRef.current;
    if (grid === null) return;

    // Grid container animation
    gsap.fromTo(
      grid,
      { opacity: 0, y: performance.isMobile ? 20 : 40 },
      {
        opacity: 1,
        y: 0,
        duration: performance.isMobile ? 0.4 : 1,
        ease: performance.isMobile ? "power2.out" : "power3.out",
        scrollTrigger: {
          trigger: grid,
          start: performance.isMobile ? "top 90%" : "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, [performance]);

  return (
    <div className="min-h-screen bg-black">
      <ContentsHero />

      {/* Main Content Grid */}
      <section className="relative px-4 py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-200 to-white dark:from-black dark:via-gray-900 dark:to-black" />

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Section Header */}
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-4xl font-bold text-transparent">
              コンテンツ
            </h2>
            <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />
          </motion.div>

          {/* Content Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {contentItems.map((item, index) => (
              <ContentCard key={item.id} item={item} index={index} />
            ))}
          </div>

          {/* Call to Action */}
          {/* <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="rounded-3xl border border-gray-500/100 bg-gray-500/5 p-8 backdrop-blur-lg">
              <h3 className="mb-4 text-2xl font-bold">さらなる数学の世界へ</h3>
              <p className="mb-6">
                これらのコンテンツは数学部員が制作したものです。
                <br />
                数学とテクノロジーの融合をお楽しみください。
              </p>
              <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
                <Link
                  to="/map"
                  className="group rounded-full border-2 border-blue-400 px-6 py-3 font-semibold text-blue-400 transition-all duration-300 hover:bg-blue-400 hover:text-black"
                >
                  <span className="flex items-center">
                    マップを見る
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
                <Link
                  to="/"
                  className="group rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105"
                >
                  <span className="flex items-center">
                    ホームに戻る
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>
            </div>
          </motion.div> */}
        </div>
      </section>
    </div>
  );
};

export default Contents;
