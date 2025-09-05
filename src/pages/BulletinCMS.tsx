import React from "react";
import { useNavigate } from "react-router-dom";

import { ArrowLeft, MessageSquare } from "lucide-react";

const BulletinCMS: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4">
            <button
              onClick={() => navigate("/cms")}
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
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
          </div>
        </div>

        {/* Coming Soon */}
        <div className="py-12 text-center">
          <MessageSquare className="mx-auto h-16 w-16 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            掲示板CMS（開発予定）
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            掲示板の管理機能は現在開発中です。
          </p>
        </div>
      </div>
    </div>
  );
};

export default BulletinCMS;
