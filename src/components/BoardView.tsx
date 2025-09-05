"use client";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  MessageSquare,
  Send,
  Clock,
  User,
  Trash2,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import {
  getBoard,
  getPosts,
  createPost,
  deletePost,
} from "../services/bulletin-board";
import { safeLocalStorage } from "../utils/safeLocalStorage";

import type { Board, Post, BoardId } from "../types/bulletin-board";

interface BoardViewProps {
  boardId: BoardId;
}

const BoardView: React.FC<BoardViewProps> = ({ boardId }) => {
  const [board, setBoard] = useState<Board | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { isAdmin } = useAuth();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        const [boardData, postsData] = await Promise.all([
          getBoard(boardId),
          getPosts(boardId),
        ]);

        setBoard(boardData);
        setPosts(postsData);
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
        setError(
          "掲示板の読み込みに失敗しました。サーバーがダウンしている可能性があります。しばらく時間をおいてから再度お試しください。",
        );
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [boardId]);

  useEffect(() => {
    // localStorageからユーザー名を取得
    const savedUserName = safeLocalStorage.getItem("bulletin_board_username");
    if (savedUserName !== null && savedUserName !== "") {
      setUserName(savedUserName);
    }
  }, []);

  const handleSubmitPost = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (newPostContent.trim() === "") return;

    setPosting(true);
    try {
      const author =
        userName.trim() === "" ? "不明なユーザー" : userName.trim();

      // ユーザー名をlocalStorageに保存
      if (userName.trim() !== "") {
        safeLocalStorage.setItem("bulletin_board_username", userName.trim());
      }

      const success = await createPost({
        board_id: boardId,
        author,
        content: newPostContent.trim(),
      });

      if (success) {
        setNewPostContent("");
        // 投稿一覧を再取得
        const updatedPosts = await getPosts(boardId);
        setPosts(updatedPosts);

        // 板情報も更新（投稿数が変わる）
        const updatedBoard = await getBoard(boardId);
        setBoard(updatedBoard);
      } else {
        console.error("投稿に失敗しました");
        // TODO: トースト通知などの適切なエラー表示に置き換える
        window.alert(
          "投稿に失敗しました。サーバーがダウンしている可能性があります。もう一度お試しください。",
        );
      }
    } catch (error) {
      console.error("投稿エラー:", error);
      // TODO: トースト通知などの適切なエラー表示に置き換える
      window.alert(
        "投稿に失敗しました。サーバーがダウンしている可能性があります。",
      );
    } finally {
      setPosting(false);
    }
  };

  const handleDeletePost = async (postId: string): Promise<void> => {
    if (!window.confirm("この投稿を削除しますか？")) return;

    try {
      const success = await deletePost(boardId, postId);
      if (success) {
        const updatedPosts = await getPosts(boardId);
        setPosts(updatedPosts);

        const updatedBoard = await getBoard(boardId);
        setBoard(updatedBoard);
      } else {
        // TODO: トースト通知などの適切なエラー表示に置き換える
        window.alert(
          "削除に失敗しました。サーバーがダウンしている可能性があります。",
        );
      }
    } catch (error) {
      console.error("削除エラー:", error);
      // TODO: トースト通知などの適切なエラー表示に置き換える
      window.alert(
        "削除に失敗しました。サーバーがダウンしている可能性があります。",
      );
    }
  };

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

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

  if (error !== null) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-4">
            <Link
              to="/bulletin-board"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>掲示板一覧に戻る</span>
            </Link>
          </div>
          <div className="mx-auto max-w-md text-center">
            <div className="mb-4 rounded-full bg-red-100 p-3 dark:bg-red-900">
              <MessageSquare className="mx-auto h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              接続エラー
            </h2>
            <p className="mb-4 text-gray-600 dark:text-gray-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              再読み込み
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (board === null) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              板が見つかりません
            </h1>
            <Link
              to="/bulletin-board"
              className="mt-4 inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>掲示板一覧に戻る</span>
            </Link>
          </div>
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
              to="/bulletin-board"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>掲示板一覧に戻る</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900">
              <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {board.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {board.description}
              </p>
              <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <span>{board.post_count} 投稿</span>
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                    board.status === "open"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  {board.status === "open" ? "オープン" : "クローズ"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Post Form */}
        {board.status === "open" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                新規投稿
              </h3>
              <form onSubmit={handleSubmitPost} className="space-y-4">
                <div>
                  <label
                    htmlFor="userName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    ユーザー名（任意）
                  </label>
                  <input
                    type="text"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="不明なユーザー"
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="postContent"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    投稿内容
                  </label>
                  <textarea
                    id="postContent"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    rows={4}
                    placeholder="投稿内容を入力してください..."
                    required
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  disabled={posting || newPostContent.trim() === ""}
                  className="inline-flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  <Send className="h-4 w-4" />
                  <span>{posting ? "投稿中..." : "投稿する"}</span>
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {/* Posts List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                      <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {post.author}
                      </p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="h-3 w-3" />
                        <span>{formatDate(post.created_at)}</span>
                        <span>#{post.post_number}</span>
                      </div>
                    </div>
                  </div>

                  {isAdmin && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900"
                        title="投稿を削除"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                  {post.content}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center"
          >
            <MessageSquare className="mx-auto h-16 w-16 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              まだ投稿がありません
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              最初の投稿をしてみませんか？
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BoardView;
