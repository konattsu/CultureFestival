import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  User,
  Tag,
  Clock,
  Star,
  Search,
  BookOpen,
} from "lucide-react";

import { getPublishedBlogPosts, getBlogPost } from "../services/blog";

import type { BlogPost } from "../types/blog";

// ブログ投稿詳細コンポーネント
interface BlogPostDetailProps {
  postId: string;
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ postId }) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async (): Promise<void> => {
      try {
        setLoading(true);
        const postData = await getBlogPost(postId);
        setPost(postData);
      } catch (error) {
        console.error("ブログ投稿の取得に失敗しました:", error);
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

  if (post === null || post.status !== "published") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              to="/blog"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>ブログ一覧に戻る</span>
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
              指定された投稿は存在しないか、公開されていません。
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
            to="/blog"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>ブログ一覧に戻る</span>
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
            {/* Featured Badge */}
            {post.featured === true && (
              <div className="mb-4">
                <span className="inline-flex items-center space-x-1 rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-1 text-sm font-medium text-yellow-800 dark:from-yellow-900/30 dark:to-orange-900/30 dark:text-yellow-400">
                  <Star className="h-4 w-4" />
                  <span>注目記事</span>
                </span>
              </div>
            )}

            <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
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
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div
                className="whitespace-pre-wrap text-gray-700 dark:text-gray-300"
                style={{ lineHeight: "1.8" }}
              >
                {post.content}
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
};

// ブログ一覧コンポーネント
const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPosts = async (): Promise<void> => {
      try {
        setLoading(true);
        const postsData = await getPublishedBlogPosts();
        setPosts(postsData);
      } catch (error) {
        console.error("ブログ投稿の取得に失敗しました:", error);
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
            数学部ブログ
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            数学部の活動や発見、考察を記事にして共有しています。
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

        {/* Featured Posts */}
        {posts.some((post) => post.featured === true) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              注目記事
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {posts
                .filter((post) => post.featured === true)
                .slice(0, 2)
                .map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Link
                      to={`/blog?post=${post.id}`}
                      className="group block h-full"
                    >
                      <div className="h-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-yellow-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-yellow-600">
                        <div className="mb-3 flex items-center justify-between">
                          <span className="inline-flex items-center space-x-1 rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-1 text-sm font-medium text-yellow-800 dark:from-yellow-900/30 dark:to-orange-900/30 dark:text-yellow-400">
                            <Star className="h-4 w-4" />
                            <span>注目</span>
                          </span>
                        </div>

                        <h3 className="mb-3 text-xl font-semibold text-gray-900 group-hover:text-yellow-600 dark:text-white dark:group-hover:text-yellow-400">
                          {post.title}
                        </h3>

                        {post.summary !== undefined &&
                          post.summary.length > 0 && (
                            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                              {post.summary.length > 100
                                ? `${post.summary.slice(0, 100)}...`
                                : post.summary}
                            </p>
                          )}

                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4" />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {new Date(post.created_at).toLocaleDateString(
                                  "ja-JP",
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}

        {/* All Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
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
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  <Link
                    to={`/blog?post=${post.id}`}
                    className="group block h-full"
                  >
                    <div className="h-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600">
                      {/* Featured Badge */}
                      {post.featured === true && (
                        <div className="mb-3">
                          <span className="inline-flex items-center space-x-1 rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:from-yellow-900/30 dark:to-orange-900/30 dark:text-yellow-400">
                            <Star className="h-3 w-3" />
                            <span>注目</span>
                          </span>
                        </div>
                      )}

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
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{post.author}</span>
                          </div>
                        </div>
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

// メインコンポーネント
const Blog: React.FC = () => {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("post");

  if (postId !== null && postId.length > 0) {
    return <BlogPostDetail postId={postId} />;
  }

  return <BlogList />;
};

export default Blog;
