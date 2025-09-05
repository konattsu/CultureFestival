import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { gsap } from "gsap";
import {
  ArrowLeft,
  BookOpen,
  MessageSquare,
  Settings,
  ChevronRight,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const CMSSelection: React.FC = () => {
  const { user, adminUser } = useAuth();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // 管理者チェック
  useEffect(() => {
    if (user !== null && adminUser === null) {
      void navigate("/admin-login");
    }
  }, [user, adminUser, navigate]);

  // GSAPアニメーション
  useEffect(() => {
    if (adminUser === null || adminUser === undefined) return;

    const ctx = gsap.context(() => {
      // ヘッダーアニメーション
      gsap.fromTo(
        headerRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      );

      // カードアニメーション
      gsap.fromTo(
        ".cms-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          delay: 0.3,
          ease: "power2.out",
        },
      );
    }, containerRef);

    return (): void => ctx.revert();
  }, [adminUser]);

  if (adminUser === null || adminUser === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Settings className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            認証が必要です
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            管理者権限でログインしてください
          </p>
        </div>
      </div>
    );
  }

  const cmsOptions = [
    {
      id: "blog",
      title: "ブログ管理",
      description: "記事の作成・編集・公開管理",
      icon: BookOpen,
      path: "/blog-cms",
    },
    {
      id: "bulletin",
      title: "掲示板管理",
      description: "投稿とコメントの管理",
      icon: MessageSquare,
      path: "/bulletin-cms",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <div className="mb-6">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">ホームに戻る</span>
            </button>
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-light text-gray-900 dark:text-white">
              コンテンツ管理システム
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              管理するコンテンツタイプを選択してください
            </p>
          </div>
        </div>

        {/* CMS Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {cmsOptions.map((option) => (
            <div
              key={option.id}
              className="cms-card group cursor-pointer"
              onClick={() => navigate(option.path)}
            >
              <div className="h-full rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                      <option.icon className="h-6 w-6" />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {option.title}
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      {option.description}
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    <ChevronRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Admin Info */}
        <div className="mt-16 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                管理者として認証済み
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {adminUser.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMSSelection;
