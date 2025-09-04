import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Save,
  X,
  Calendar,
  User,
  Tag,
  Star,
  BookOpen,
  FileText,
  AlertCircle,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import {
  getAllBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getBlogMetadata,
} from "../services/blog";

import type {
  BlogPost,
  BlogMetadata,
  NewBlogPost,
  UpdateBlogPost,
} from "../types/blog";

// 新規投稿・編集モーダルコンポーネント
interface PostEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (post: NewBlogPost) => Promise<void>;
  editingPost?: BlogPost | null;
  loading: boolean;
}

const PostEditorModal: React.FC<PostEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingPost,
  loading,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState<"published" | "draft">("draft");
  const [featured, setFeatured] = useState(false);
  const [author, setAuthor] = useState("");

  const { adminUser } = useAuth();

  useEffect(() => {
    if (editingPost !== null && editingPost !== undefined) {
      setTitle(editingPost.title);
      setContent(editingPost.content);
      setSummary(editingPost.summary ?? "");
      setTags(editingPost.tags?.join(", ") ?? "");
      setStatus(
        editingPost.status === "archived" ? "draft" : editingPost.status,
      );
      setFeatured(editingPost.featured ?? false);
      setAuthor(editingPost.author);
    } else {
      setTitle("");
      setContent("");
      setSummary("");
      setTags("");
      setStatus("draft");
      setFeatured(false);
      setAuthor(adminUser?.email ?? "");
    }
  }, [editingPost, adminUser]);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const postData = {
      title: title.trim(),
      content: content.trim(),
      author:
        author.trim() !== "" ? author.trim() : (adminUser?.email ?? "管理者"),
      status,
      summary: summary.trim() !== "" ? summary.trim() : undefined,
      tags:
        tags.trim() === ""
          ? undefined
          : tags
              .split(",")
              .map((tag) => tag.trim())
              .filter((tag) => tag !== ""),
      featured,
    };

    await onSave(postData);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {editingPost !== null && editingPost !== undefined
              ? "記事を編集"
              : "新規記事作成"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex h-full flex-col">
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  タイトル *
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="記事のタイトルを入力..."
                  required
                />
              </div>

              {/* Summary */}
              <div>
                <label
                  htmlFor="summary"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  概要
                </label>
                <textarea
                  id="summary"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={2}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="記事の概要を入力..."
                />
              </div>

              {/* Content */}
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  本文 *
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={12}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="記事の本文を入力..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Author */}
                <div>
                  <label
                    htmlFor="author"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    投稿者
                  </label>
                  <input
                    id="author"
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="投稿者名"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label
                    htmlFor="tags"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    タグ（カンマ区切り）
                  </label>
                  <input
                    id="tags"
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="数学, プログラミング, 文化祭"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Status */}
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    ステータス
                  </label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value as "published" | "draft")
                    }
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="draft">下書き</option>
                    <option value="published">公開</option>
                  </select>
                </div>

                {/* Featured */}
                <div className="flex items-center space-x-3">
                  <input
                    id="featured"
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="featured"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    注目記事として表示
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 border-t border-gray-200 p-6 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              キャンセル
            </button>
            <button
              type="submit"
              disabled={loading || title.trim() === "" || content.trim() === ""}
              className="inline-flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              <span>{loading ? "保存中..." : "保存"}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// CMS メインコンポーネント
const CMS: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [metadata, setMetadata] = useState<BlogMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

  const { user, adminUser } = useAuth();
  const navigate = useNavigate();

  // 管理者チェック
  useEffect(() => {
    if (user !== null && adminUser === null) {
      void navigate("/admin-login");
    }
  }, [user, adminUser, navigate]);

  // データ取得
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);
        const [postsData, metadataData] = await Promise.all([
          getAllBlogPosts(),
          getBlogMetadata(),
        ]);
        setPosts(postsData);
        setMetadata(metadataData);
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
      } finally {
        setLoading(false);
      }
    };

    if (adminUser !== null && adminUser !== undefined) {
      void fetchData();
    }
  }, [adminUser]);

  const handleCreatePost = async (postData: NewBlogPost): Promise<void> => {
    setSaving(true);
    try {
      const postId = await createBlogPost(postData);
      if (postId !== null && postId !== undefined && postId !== "") {
        const [postsData, metadataData] = await Promise.all([
          getAllBlogPosts(),
          getBlogMetadata(),
        ]);
        setPosts(postsData);
        setMetadata(metadataData);
        setModalOpen(false);
        setEditingPost(null);
      }
    } catch (error) {
      console.error("投稿の作成に失敗しました:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePost = async (postData: NewBlogPost): Promise<void> => {
    if (editingPost === null || editingPost === undefined) return;

    setSaving(true);
    try {
      // NewBlogPostからUpdateBlogPostに変換（authorを除く）
      const updateData: UpdateBlogPost = {
        title: postData.title,
        content: postData.content,
        status: postData.status,
        summary: postData.summary,
        tags: postData.tags,
        featured: postData.featured,
      };
      const success = await updateBlogPost(editingPost.id, updateData);
      if (success) {
        const [postsData, metadataData] = await Promise.all([
          getAllBlogPosts(),
          getBlogMetadata(),
        ]);
        setPosts(postsData);
        setMetadata(metadataData);
        setModalOpen(false);
        setEditingPost(null);
      }
    } catch (error) {
      console.error("投稿の更新に失敗しました:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePost = async (postId: string): Promise<void> => {
    if (!window.confirm("この記事を削除しますか？この操作は取り消せません。"))
      return;

    try {
      const success = await deleteBlogPost(postId);
      if (success) {
        const [postsData, metadataData] = await Promise.all([
          getAllBlogPosts(),
          getBlogMetadata(),
        ]);
        setPosts(postsData);
        setMetadata(metadataData);
      }
    } catch (error) {
      console.error("投稿の削除に失敗しました:", error);
    }
  };

  const openEditModal = (post: BlogPost): void => {
    setEditingPost(post);
    setModalOpen(true);
  };

  const openCreateModal = (): void => {
    setEditingPost(null);
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setEditingPost(null);
  };

  const filteredPosts = posts.filter((post) => {
    if (filter === "all") return true;
    return post.status === filter;
  });

  if (adminUser === null || adminUser === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-16 w-16 text-red-500" />
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            アクセス権限がありません
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            このページにアクセスするには管理者権限が必要です。
          </p>
        </div>
      </div>
    );
  }

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
            <button
              onClick={() => navigate("/bulletin-board")}
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>掲示板に戻る</span>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                ブログ CMS
              </h1>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                記事の作成・編集・管理
              </p>
            </div>
            <button
              onClick={openCreateModal}
              className="inline-flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              <Plus className="h-5 w-5" />
              <span>新規記事</span>
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        {metadata !== null && metadata !== undefined && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                  <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    総記事数
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {metadata.total_posts}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
                  <Eye className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    公開済み
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {metadata.published_posts}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-yellow-100 p-3 dark:bg-yellow-900/30">
                  <EyeOff className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    下書き
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {metadata.draft_posts}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              すべて
            </button>
            <button
              onClick={() => setFilter("published")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                filter === "published"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              公開済み
            </button>
            <button
              onClick={() => setFilter("draft")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                filter === "draft"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              下書き
            </button>
          </div>
        </motion.div>

        {/* Posts List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {filteredPosts.length === 0 ? (
            <div className="py-12 text-center">
              <BookOpen className="mx-auto h-16 w-16 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                記事がありません
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                新規記事を作成してください。
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center space-x-3">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {post.title}
                        </h3>

                        {/* Status Badge */}
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            post.status === "published"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}
                        >
                          {post.status === "published" ? (
                            <>
                              <Eye className="mr-1 h-3 w-3" />
                              公開中
                            </>
                          ) : (
                            <>
                              <EyeOff className="mr-1 h-3 w-3" />
                              下書き
                            </>
                          )}
                        </span>

                        {/* Featured Badge */}
                        {post.featured === true && (
                          <span className="inline-flex items-center rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:from-yellow-900/30 dark:to-orange-900/30 dark:text-yellow-400">
                            <Star className="mr-1 h-3 w-3" />
                            注目
                          </span>
                        )}
                      </div>

                      {post.summary !== null &&
                        post.summary !== undefined &&
                        post.summary !== "" && (
                          <p className="mb-3 text-gray-600 dark:text-gray-400">
                            {post.summary}
                          </p>
                        )}

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
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
                        {post.tags !== null &&
                          post.tags !== undefined &&
                          post.tags.length > 0 && (
                            <div className="flex items-center space-x-1">
                              <Tag className="h-4 w-4" />
                              <span>{post.tags.slice(0, 2).join(", ")}</span>
                              {post.tags.length > 2 && <span>など</span>}
                            </div>
                          )}
                      </div>
                    </div>

                    <div className="ml-4 flex space-x-2">
                      <button
                        onClick={() => openEditModal(post)}
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/30"
                        title="編集"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="rounded-lg p-2 text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30"
                        title="削除"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Modal */}
      <PostEditorModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSave={
          editingPost !== null && editingPost !== undefined
            ? handleUpdatePost
            : handleCreatePost
        }
        editingPost={editingPost}
        loading={saving}
      />
    </div>
  );
};

export default CMS;
