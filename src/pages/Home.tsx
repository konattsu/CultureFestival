import React from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";

// Animation variants for staggered sections
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible(custom: number): {
    opacity: number;
    y: number;
    transition: {
      delay: number;
      duration: number;
      ease: [number, number, number, number];
    };
  } {
    return {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.5 + custom * 0.25,
        duration: 0.8,
        ease: [0.42, 0, 0.58, 1] as [number, number, number, number],
      },
    };
  },
};

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="animate-gradient-move pointer-events-none absolute inset-0 -z-10 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 opacity-60 blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />
      <motion.div
        className="mx-auto max-w-4xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <section className="mb-12 text-center">
          <motion.h1
            className="my-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-5xl font-extrabold text-transparent drop-shadow-lg"
            initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
            animate={{ opacity: 1, scale: 1.1, rotate: 0 }}
            transition={{ duration: 1.1, ease: "backOut" }}
            whileHover={{ scale: 1.15, rotate: 2 }}
          >
            数学部公式HP
          </motion.h1>
        </section>
        <motion.section
          className="mb-12"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <h2 className="mb-4 text-2xl font-bold">このサイトについて</h2>
          <p className="mb-4">
            数学部 文化祭特設
            公式サイトです。主に数学、IT関連の内容を記載しております。ぜひご堪能ください！
          </p>
        </motion.section>
        <motion.section
          className="mb-12"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <h2 className="mb-4 text-2xl font-bold">コンテンツ一覧</h2>
          <p className="mb-4">
            数学部員が作成した部誌、ブラウザ上で遊べるミニゲームなどがあります。
            <Link
              to="/contents"
              className="text-blue-600 underline dark:text-blue-400"
            >
              こちらのページ
            </Link>
            に掲載しています。
          </p>
        </motion.section>
        <motion.section
          className="mb-12"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <h2 className="mb-4 text-2xl font-bold">数学部の展示</h2>
          <p>
            数学部は4階401室にて展示をしています。
            <br />
            例年通りパズルの設置と、数学に関連する動画を再生しています。冷房の効いた涼しい室内で視聴できますので、ぜひお越しください。
          </p>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default Home;
