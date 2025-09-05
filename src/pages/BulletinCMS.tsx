import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  MessageSquare,
  Trash2,
  Users,
  BarChart3,
  RefreshCw,
  Search,
  Eye,
  EyeOff,
  Archive,
  Lock,
  Unlock,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import {
  getBoards,
  getPosts,
  deletePost,
  updateBoardTitle,
  updateBoardDescription,
} from "../services/bulletin-board";

import type { Board, Post, BoardId } from "../types/bulletin-board";

interface BoardWithPosts extends Board {
  posts: Post[];
}

const BulletinCMS: React.FC = () => {
  const navigate = useNavigate();
  const { adminUser } = useAuth();
  const [boards, setBoards] = useState<BoardWithPosts[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingBoard, setEditingBoard] = useState<{
    id: string;
    field: "title" | "description";
    value: string;
  } | null>(null);
  const [showDetails, setShowDetails] = useState<Record<string, boolean>>({});

  // 認証チェック
  useEffect(() => {
    if (adminUser === null) {
      void navigate("/admin");
      return;
    }
  }, [adminUser, navigate]);

  // データ読み込み
  useEffect(() => {
    void loadBoardsAndPosts();
  }, []);

  const loadBoardsAndPosts = async (): Promise<void> => {
    setLoading(true);
    try {
      const boardsData = await getBoards();
      const boardsWithPosts: BoardWithPosts[] = await Promise.all(
        boardsData.map(async (board: Board) => {
          const posts = await getPosts(board.id as BoardId);
          return { ...board, posts };
        }),
      );
      setBoards(boardsWithPosts);
    } catch (error) {
      console.error("データの読み込みに失敗しました:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (
    boardId: string,
    postId: string,
  ): Promise<void> => {
    if (!window.confirm("この投稿を削除しますか？")) return;

    try {
      const success = await deletePost(boardId as BoardId, postId);
      if (success) {
        await loadBoardsAndPosts();
      }
    } catch (error) {
      console.error("投稿の削除に失敗しました:", error);
    }
  };

  const handleBoardEdit = async (
    boardId: string,
    field: "title" | "description",
    value: string,
  ): Promise<void> => {
    try {
      let success = false;
      if (field === "title") {
        success = await updateBoardTitle(boardId as BoardId, value);
      } else {
        success = await updateBoardDescription(boardId as BoardId, value);
      }

      if (success) {
        await loadBoardsAndPosts();
        setEditingBoard(null);
      }
    } catch (error) {
      console.error("板の更新に失敗しました:", error);
    }
  };

  const filteredBoards = boards.filter(
    (board: BoardWithPosts) =>
      board.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      board.posts.some(
        (post: Post) =>
          post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  const totalPosts = boards.reduce(
    (sum: number, board: BoardWithPosts) => sum + board.posts.length,
    0,
  );

  if (adminUser === null) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4">
            <button
              onClick={() => navigate("/cms")}
              className="inline-flex items-center space-x-2 text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>CMS管理パネルに戻る</span>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                掲示板 CMS
              </h1>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                掲示板の投稿とコメントの管理
              </p>
            </div>
            <button
              onClick={() => void loadBoardsAndPosts()}
              disabled={loading}
              className="inline-flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
            >
              <RefreshCw
                className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
              />
              <span>更新</span>
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  総板数
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {boards.length}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  総投稿数
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalPosts}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  平均投稿数/板
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {boards.length > 0
                    ? Math.round(totalPosts / boards.length)
                    : 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <input
              type="text"
              placeholder="板名、投稿者、投稿内容で検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white py-2 pr-4 pl-10 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        {/* Boards List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBoards.map((board: BoardWithPosts) => (
              <div
                key={board.id}
                className="rounded-lg bg-white shadow dark:bg-gray-800"
              >
                {/* Board Header */}
                <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      {editingBoard?.id === board.id &&
                      editingBoard.field === "title" ? (
                        <input
                          type="text"
                          value={editingBoard.value}
                          onChange={(e) =>
                            setEditingBoard({
                              ...editingBoard,
                              value: e.target.value,
                            })
                          }
                          onBlur={() =>
                            void handleBoardEdit(
                              board.id,
                              "title",
                              editingBoard.value,
                            )
                          }
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              void handleBoardEdit(
                                board.id,
                                "title",
                                editingBoard.value,
                              );
                            }
                          }}
                          className="border-b-2 border-blue-600 bg-transparent text-xl font-bold text-gray-900 focus:outline-none dark:text-white"
                          autoFocus
                        />
                      ) : (
                        <h3
                          className="cursor-pointer text-xl font-bold text-gray-900 hover:text-blue-600 dark:text-white"
                          onClick={() =>
                            setEditingBoard({
                              id: board.id,
                              field: "title",
                              value: board.title,
                            })
                          }
                        >
                          {board.title}
                        </h3>
                      )}
                      {editingBoard?.id === board.id &&
                      editingBoard.field === "description" ? (
                        <textarea
                          value={editingBoard.value}
                          onChange={(e) =>
                            setEditingBoard({
                              ...editingBoard,
                              value: e.target.value,
                            })
                          }
                          onBlur={() =>
                            void handleBoardEdit(
                              board.id,
                              "description",
                              editingBoard.value,
                            )
                          }
                          className="mt-1 w-full resize-none border-b-2 border-blue-600 bg-transparent text-gray-600 focus:outline-none dark:text-gray-400"
                          autoFocus
                        />
                      ) : (
                        <p
                          className="mt-1 cursor-pointer text-gray-600 hover:text-blue-600 dark:text-gray-400"
                          onClick={() =>
                            setEditingBoard({
                              id: board.id,
                              field: "description",
                              value: board.description,
                            })
                          }
                        >
                          {board.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="inline-flex items-center">
                          <MessageSquare className="mr-1 h-4 w-4" />
                          {board.posts.length} 投稿
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${
                            board.status === "open"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : board.status === "closed"
                                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                          }`}
                        >
                          {board.status === "open" && (
                            <>
                              <Unlock className="mr-1 inline h-3 w-3" />
                              開放中
                            </>
                          )}
                          {board.status === "closed" && (
                            <>
                              <Lock className="mr-1 inline h-3 w-3" />
                              閉鎖中
                            </>
                          )}
                          {board.status === "archived" && (
                            <>
                              <Archive className="mr-1 inline h-3 w-3" />
                              アーカイブ
                            </>
                          )}
                        </span>
                        <button
                          onClick={() =>
                            setShowDetails((prev: Record<string, boolean>) => ({
                              ...prev,
                              [board.id]: !prev[board.id],
                            }))
                          }
                          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showDetails[board.id] ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Posts List */}
                {showDetails[board.id] && (
                  <div className="px-6 py-4">
                    {board.posts.length === 0 ? (
                      <p className="py-8 text-center text-gray-500 dark:text-gray-400">
                        この板には投稿がありません
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {board.posts.map((post: Post) => (
                          <div
                            key={post.id}
                            className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="mb-2 flex items-center space-x-2">
                                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    #{post.post_number}
                                  </span>
                                  <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {post.author}
                                  </span>
                                  <span className="text-sm text-gray-400 dark:text-gray-500">
                                    {new Date(post.created_at).toLocaleString(
                                      "ja-JP",
                                    )}
                                  </span>
                                </div>
                                <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                                  {post.content}
                                </p>
                              </div>
                              <button
                                onClick={() =>
                                  void handleDeletePost(board.id, post.id)
                                }
                                className="ml-4 rounded-lg p-2 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BulletinCMS;
