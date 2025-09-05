import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag, Clock, BookOpen } from "lucide-react";

import MarkdownPreview from "../../components/MarkdownPreview";

import { getMagazinePost } from "./services";

import type { MagazinePost } from "./types";

// Magazine専用のCSSをインポート
import "./Magazine.css";

// 部誌投稿詳細コンポーネント
interface MagazinePostDetailProps {
  postId: string;
}

const MagazinePostDetail: React.FC<MagazinePostDetailProps> = ({ postId }) => {
  const [post, setPost] = useState<MagazinePost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async (): Promise<void> => {
      try {
        setLoading(true);
        const postData = await getMagazinePost(postId);
        setPost(postData);
        // 部誌記事を読み込んだ後に画面を一番上にスクロール
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("部誌投稿の取得に失敗しました:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchPost();
  }, [postId]);

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

  if (post === null) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              to="/magazine"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>部誌一覧に戻る</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center"
          >
            <BookOpen className="mx-auto h-16 w-16 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              投稿が見つかりません
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              指定された投稿は存在しません。
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/magazine"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>部誌一覧に戻る</span>
          </Link>
        </motion.div>

        {/* Article */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-4xl"
        >
          {/* Header */}
          <div className="mb-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(post.created_at).toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              {post.updated_at !== post.created_at && (
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>
                    更新:{" "}
                    {new Date(post.updated_at).toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}
            </div>

            {/* Tags */}
            {post.tags !== undefined && post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                  >
                    <Tag className="h-3 w-3" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            )}

            {/* Summary */}
            {post.summary !== undefined && post.summary.length > 0 && (
              <div className="mt-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                <p className="text-gray-700 dark:text-gray-300">
                  {post.summary}
                </p>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="magazine-content-container">
            <div className="magazine-content">
              <MarkdownPreview content={post.content} />
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
};

export default MagazinePostDetail;
