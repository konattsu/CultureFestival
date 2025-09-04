import React from "react";
import { Link } from "react-router-dom";

// --- BEGIN SVG ICON COMPONENTS ---
const CryptanalysisIcon = (): React.JSX.Element => (
  <svg viewBox="0 0 48 48" className="h-30 w-30">
    <rect fill="none" className="h-30 w-30" />
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
  <svg viewBox="0 0 100 100" className="h-30 w-30">
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
  <svg viewBox="0 0 100 100" className="h-30 w-30">
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
  <svg viewBox="0 0 100 100" className="h-30 w-30">
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
  <svg viewBox="0 0 100 100" className="h-30 w-30">
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
  <svg viewBox="0 0 200 200" className="h-30 w-30">
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
  <svg viewBox="0 0 200 200" className="h-30 w-30">
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
  <svg viewBox="0 0 100 100" className="h-30 w-30">
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
  <svg viewBox="0 0 100 100" className="h-30 w-30">
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
    description: "確率や統計を使ったゲームのガチャをシミュレーションできます。",
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
    title: "ノートブック",
    description: "数学の考えを整理するノートの取り方や活用法を紹介します。",
    icon: <NotebookIcon />,
  },
  {
    id: "melos",
    title: "メロスの統計",
    description:
      "『走れメロス』のメロスがどれくらいの速さで走ったのかを調べます。",
    icon: <MelosIcon />,
  },
  {
    id: "white",
    title: "色と光の数学",
    description:
      "RGBやHSVなどの色空間を使って、色と光の関係を数学的に考えます。",
    icon: <WhiteIcon />,
  },
  {
    id: "programming",
    title: "プログラミング",
    description:
      "「Hello, World!」から始めて、プログラミングの基礎を学びます。",
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
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="my-4 text-center text-3xl font-bold">コンテンツ一覧</h1>
      <p className="my-8 text-center text-lg">
        数学部が作成した部誌、記事、ミニゲームなどの一覧です。
        気になる項目をタップしていただくことで各ページに移動できます。
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {contentItems.map((item) => (
          <Link
            key={item.id}
            to={`/contents/${item.id}`}
            className="group transform overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:scale-105 dark:bg-gray-800"
          >
            <div className="flex h-40 items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-4 dark:from-gray-700 dark:to-gray-900">
              {item.icon}
            </div>
            <div className="p-4">
              <h2 className="mb-2 text-xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {item.title}
              </h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Contents;
