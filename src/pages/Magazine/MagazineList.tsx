import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag, Search, BookOpen } from "lucide-react";
import seedrandom from "seedrandom";

import { getMagazinePosts } from "./services";

import type { MagazinePost } from "./types";

// 部誌一覧コンポーネント
const MagazineList: React.FC = () => {
  const [posts, setPosts] = useState<MagazinePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPosts = async (): Promise<void> => {
      try {
        setLoading(true);
        const postsData = await getMagazinePosts();
        // ローカルストレージからseed取得・保存
        let seedStr = window.localStorage.getItem("magazine-seed");
        if (seedStr === null) {
          seedStr = Date.now().toString();
          window.localStorage.setItem("magazine-seed", seedStr);
        }
        const seed = seedStr;
        // 外部ライブラリseedrandomでシャッフル
        const rng = seedrandom(seed);
        const shuffleArray = (array: MagazinePost[]): MagazinePost[] => {
          const arr = array.slice();
          for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(rng() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
          }
          return arr;
        };
        setPosts(shuffleArray(postsData));
      } catch (error) {
        console.error("部誌投稿の取得に失敗しました:", error);
      } finally {
        setLoading(false);
      }
    };
    void fetchPosts();
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.summary !== undefined &&
        post.summary.length > 0 &&
        post.summary.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="mb-4">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>ホームに戻る</span>
            </Link>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            数学部誌
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            数学部の研究成果や活動記録を部誌として公開しています。
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="記事を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-white py-3 pr-3 pl-10 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            />
          </div>
        </motion.div>

        {/* All Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            {searchTerm.length > 0 ? "検索結果" : "すべての記事"}
          </h2>

          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 text-center"
            >
              <BookOpen className="mx-auto h-16 w-16 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                {searchTerm.length > 0
                  ? "検索結果がありません"
                  : "記事がありません"}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {searchTerm.length > 0
                  ? "別のキーワードでお試しください。"
                  : "まだ記事が投稿されていません。"}
              </p>
            </motion.div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <Link
                    to={`/magazine?post=${post.id}`}
                    className="group block h-full"
                  >
                    <div className="h-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600">
                      <h3 className="mb-3 text-lg font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                        {post.title}
                      </h3>

                      {post.summary !== undefined &&
                        post.summary.length > 0 && (
                          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                            {post.summary.length > 80
                              ? `${post.summary.slice(0, 80)}...`
                              : post.summary}
                          </p>
                        )}

                      {/* Tags */}
                      {post.tags !== undefined && post.tags.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-1">
                          {post.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="inline-flex items-center space-x-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            >
                              <Tag className="h-3 w-3" />
                              <span>{tag}</span>
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              +{post.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(post.created_at).toLocaleDateString(
                              "ja-JP",
                              {
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MagazineList;
