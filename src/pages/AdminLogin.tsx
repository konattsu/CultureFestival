import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { Key, User, Eye, EyeOff, Shield, AlertCircle } from "lucide-react";

import { useAuth } from "../context/AuthContext";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn, user, adminUser } = useAuth();
  const navigate = useNavigate();

  // ログイン済みの管理者は掲示板にリダイレクト
  useEffect(() => {
    if (user !== null && adminUser !== null) {
      void navigate("/bulletin-board");
    }
  }, [user, adminUser, navigate]);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("メールアドレスとパスワードを入力してください");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await signIn(email, password);
      // AuthContextで管理者チェックが行われ、成功すれば自動的にリダイレクトされる
    } catch (error) {
      console.error("Login error:", error);
      setError(
        "ログインに失敗しました。メールアドレスとパスワードを確認してください。",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg"
            >
              <Shield className="h-8 w-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              管理者ログイン
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              掲示板管理のためのログインページです
            </p>
          </div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-gray-200 bg-white/80 p-8 shadow-xl backdrop-blur-lg dark:border-gray-700 dark:bg-gray-800/80"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error !== "" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center space-x-2 rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                >
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm">{error}</span>
                </motion.div>
              )}

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  メールアドレス
                </label>
                <div className="relative mt-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-white/50 py-3 pr-3 pl-10 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400"
                    placeholder="admin@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  パスワード
                </label>
                <div className="relative mt-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Key className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-white/50 py-3 pr-10 pl-10 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="flex w-full items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>ログイン中...</span>
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5" />
                    <span>管理者としてログイン</span>
                  </>
                )}
              </motion.button>
            </form>

            {/* Info */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                このページは管理者専用です。
                <br />
                一般ユーザーの方は掲示板で直接投稿できます。
              </p>
            </div>
          </motion.div>

          {/* Decorative elements */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute top-1/4 left-1/4 h-32 w-32 animate-pulse rounded-full bg-blue-200/30 blur-xl dark:bg-blue-500/20" />
            <div className="absolute right-1/4 bottom-1/4 h-40 w-40 animate-pulse rounded-full bg-purple-200/30 blur-xl dark:bg-purple-500/20" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
