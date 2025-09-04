import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ArrowRight } from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

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
  <svg viewBox="0 0 100 100" className="h-32 w-32">
    <polyline
      points="10,10 30,90 50,10"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
    />
    <line
      x1="57.5"
      y1="23.5"
      x2="92.5"
      y2="76.5"
      stroke="currentColor"
      strokeWidth="5"
    />
    <ellipse
      cx="75"
      cy="25"
      rx="17"
      ry="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
    />
    <ellipse
      cx="75"
      cy="75"
      rx="17"
      ry="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
    />
  </svg>
);

const HeatExhaustionIcon = (): React.JSX.Element => (
  <svg viewBox="0 0 100 100" className="h-32 w-32">
    <circle
      cx="50"
      cy="75"
      r="15"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M40 64 l0 -50 q10 -10, 20 0 l0 50"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
    />
    <path d="M45 72 l0 -55 q5 -5, 10 0 l0 55" stroke="#f00" fill="#f00" />
    <circle cx="50" cy="75" r="10" fill="#f00" />
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

    for (let i = 0; i < 25; i++) {
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

      container.appendChild(element);
      elements.push(element);

      gsap.set(element, {
        scale: 0.5,
        rotation: Math.random() * 360,
      });

      const tl = gsap.timeline({ repeat: -1, delay: Math.random() * 3 });

      tl.to(element, {
        opacity: 0.7,
        scale: 1,
        duration: 1,
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
            duration: 1,
            ease: "power2.in",
          },
          7,
        );
    }

    return (): void => {
      elements.forEach((element) => {
        if (container.contains(element)) {
          container.removeChild(element);
        }
      });
    };
  }, []);

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
          <span className="text-lg font-light tracking-wider text-gray-300">
            MATHEMATICS & TECHNOLOGY
          </span>
          <Sparkles className="h-6 w-6 animate-pulse text-yellow-400" />
        </motion.div>

        <motion.p
          ref={subtitleRef}
          className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          数学部が作成した部誌、記事、ミニゲームなどの一覧です。
          <br />
          <span className="text-blue-400">
            気になる項目をタップして、数学の世界を探索しましょう。
          </span>
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

  useEffect(() => {
    const card = cardRef.current;
    if (card === null) return;

    gsap.fromTo(
      card,
      {
        y: 80,
        opacity: 0,
        rotateX: -30,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        scale: 1,
        duration: 0.8,
        delay: index * 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, [index]);

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
        className="block overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg transition-all duration-500 hover:border-white/40 hover:bg-white/20 hover:shadow-2xl"
      >
        <div
          className={`flex h-48 items-center justify-center bg-gradient-to-br ${gradient} p-6 transition-all duration-500 group-hover:scale-105`}
        >
          <div className="transform text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
            {item.icon}
          </div>
        </div>

        <div className="p-6">
          <h2 className="mb-3 text-xl font-bold text-white transition-colors duration-300 group-hover:text-blue-400">
            {item.title}
          </h2>
          <p className="leading-relaxed text-gray-300 transition-colors duration-300 group-hover:text-gray-200">
            {item.description}
          </p>

          <motion.div
            className="mt-4 flex items-center text-blue-400 opacity-0 transition-all duration-300 group-hover:opacity-100"
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
    description:
      "古代から現代まで、情報を隠すために使われてきた暗号とその解読方法を解説します。",
    icon: <CryptanalysisIcon />,
  },
  {
    id: "gacha",
    title: "ガチャシミュレーション",
    description:
      "確率と統計を活用したゲームのガチャシミュレーターを体験できます。",
    icon: <GachaIcon />,
  },
  {
    id: "dva",
    title: "データ可視化分析",
    description:
      "さまざまなデータをグラフや図を使って視覚的に分析する方法を紹介します。",
    icon: <DvaIcon />,
  },
  {
    id: "heat-exhaustion",
    title: "熱中症対策",
    description:
      "統計データを元に熱中症の発生パターンと効果的な対策方法を考えます。",
    icon: <HeatExhaustionIcon />,
  },
  {
    id: "notebook",
    title: "ノートブック",
    description:
      "数学的思考を整理するためのノートの取り方と活用法を紹介します。",
    icon: <NotebookIcon />,
  },
  {
    id: "melos",
    title: "メロスの統計",
    description:
      "文学作品「走れメロス」の文章を統計的に分析した結果を展示します。",
    icon: <MelosIcon />,
  },
  {
    id: "white",
    title: "色と光の数学",
    description:
      "RGBとHSVの色空間を通して、色と光の関係性を数学的に考察します。",
    icon: <WhiteIcon />,
  },
  {
    id: "programming",
    title: "プログラミング入門",
    description:
      "「Hello, World!」から始める簡単なプログラミングの基礎を学びます。",
    icon: <ProgrammingIcon />,
  },
  {
    id: "tech",
    title: "最新テクノロジー",
    description:
      "AIや機械学習など、最新テクノロジーの背景にある数学的原理を解説します。",
    icon: <TechIcon />,
  },
];

const Contents: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (grid === null) return;

    // Grid container animation
    gsap.fromTo(
      grid,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <ContentsHero />

      {/* Main Content Grid */}
      <section className="relative px-4 py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

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
              数学部の展示コンテンツ
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
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="rounded-3xl border border-white/20 bg-white/5 p-8 backdrop-blur-lg">
              <h3 className="mb-4 text-2xl font-bold text-white">
                さらなる数学の世界へ
              </h3>
              <p className="mb-6 text-gray-300">
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
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contents;
