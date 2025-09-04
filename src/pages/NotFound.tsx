import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
    <h1 className="mb-4 text-4xl font-bold">404 - ページが見つかりません</h1>
    <p className="mb-8 text-lg text-gray-600">お探しのページは存在しません。</p>
    <Link
      to="/"
      className="rounded-lg bg-blue-400 px-8 py-3 font-semibold text-white shadow transition-colors duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none"
    >
      ホームに戻る
    </Link>
  </div>
);

export default NotFound;
