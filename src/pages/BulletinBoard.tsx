import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

import { motion } from "framer-motion";
import { MessageSquare, Users, Clock, ArrowLeft } from "lucide-react";

import BoardView from "../components/BoardView";
import { getBoards } from "../services/bulletin-board";
import { BOARD_IDS } from "../types/bulletin-board";

import type { Board, BoardId } from "../types/bulletin-board";

const BulletinBoardList: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoards = async (): Promise<void> => {
      try {
        const boardsData = await getBoards();
        setBoards(boardsData);
      } catch (error) {
        console.error("板の取得に失敗しました:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchBoards();
  }, []);

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
            掲示板
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            数学部の掲示板へようこそ！自由に討論や質問をしてください。
          </p>
        </motion.div>

        {/* Boards Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {boards.map((board, index) => (
            <motion.div
              key={board.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/bulletin-board?board=${board.id}`}
                className="group block"
              >
                <div className="h-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600">
                  {/* Board Header */}
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900">
                        <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                          {board.title}
                        </h3>
                        <div
                          className={`mt-1 inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                            board.status === "open"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {board.status === "open" ? "オープン" : "クローズ"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    {board.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                        <Users className="h-4 w-4" />
                        <span>{board.post_count} 投稿</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>#{board.order}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {boards.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center"
          >
            <MessageSquare className="mx-auto h-16 w-16 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              板がありません
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              まだ板が作成されていません。
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const BulletinBoard: React.FC = () => {
  const [searchParams] = useSearchParams();
  const boardId = searchParams.get("board") as BoardId | null;

  if (
    boardId !== null &&
    Object.values(BOARD_IDS).includes(boardId as BoardId)
  ) {
    return <BoardView boardId={boardId as BoardId} />;
  }

  return <BulletinBoardList />;
};

export default BulletinBoard;
