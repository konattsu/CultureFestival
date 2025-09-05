import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { gsap } from "gsap";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  User,
  Tag,
  Star,
  BookOpen,
  FileText,
  AlertCircle,
  BarChart3,
  TrendingUp,
} from "lucide-react";

import PostEditorModal from "../components/PostEditorModal";
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

// ブログCMS メインコンポーネント
const BlogCMS: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [metadata, setMetadata] = useState<BlogMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

  const { user, adminUser } = useAuth();
  const navigate = useNavigate();

  // GSAP refs
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);

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

  // GSAPアニメーション
  useEffect(() => {
    if (!loading && adminUser !== null && adminUser !== undefined) {
      const tl = gsap.timeline();

      // ヘッダーのアニメーション
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      );

      // 統計カードのアニメーション
      if (statsRef.current !== null && statsRef.current !== undefined) {
        tl.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.3",
        );
      }

      // フィルターのアニメーション
      tl.fromTo(
        filterRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
        "-=0.2",
      );

      // 投稿リストのアニメーション
      if (postsRef.current !== null && postsRef.current !== undefined) {
        tl.fromTo(
          postsRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.2",
        );
      }
    }
  }, [loading, adminUser, posts]);

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
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mb-8">
          <div className="mb-6">
            <button
              onClick={() => navigate("/cms")}
              className="inline-flex items-center space-x-2 text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">CMS管理パネルに戻る</span>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                ブログ管理
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                記事の作成・編集・管理を行います
              </p>
            </div>
            <button
              onClick={openCreateModal}
              className="inline-flex items-center space-x-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-black shadow-sm transition-all duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
              <Plus className="h-4 w-4" />
              <span>新規記事</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        {metadata !== null && metadata !== undefined && (
          <div
            ref={statsRef}
            className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-3"
          >
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 dark:bg-blue-900/30">
                      <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="ml-4 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                        総記事数
                      </dt>
                      <dd className="text-2xl font-bold text-gray-900 dark:text-white">
                        {metadata.total_posts}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-green-50 dark:bg-green-900/30">
                      <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <div className="ml-4 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                        公開済み
                      </dt>
                      <dd className="text-2xl font-bold text-gray-900 dark:text-white">
                        {metadata.published_posts}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-amber-50 dark:bg-amber-900/30">
                      <BarChart3 className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                  </div>
                  <div className="ml-4 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                        下書き
                      </dt>
                      <dd className="text-2xl font-bold text-gray-900 dark:text-white">
                        {metadata.draft_posts}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter */}
        <div ref={filterRef} className="mb-6">
          <div className="flex space-x-1 rounded-md bg-gray-100 p-1 dark:bg-gray-800">
            <button
              onClick={() => setFilter("all")}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
                filter === "all"
                  ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              すべて
            </button>
            <button
              onClick={() => setFilter("published")}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
                filter === "published"
                  ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              公開済み
            </button>
            <button
              onClick={() => setFilter("draft")}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
                filter === "draft"
                  ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              下書き
            </button>
          </div>
        </div>

        {/* Posts List */}
        <div ref={postsRef}>
          {filteredPosts.length === 0 ? (
            <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                記事がありません
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                新規記事を作成してください。
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
                >
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="mb-3 flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                            {post.title}
                          </h3>

                          {/* Status Badge */}
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                              post.status === "published"
                                ? "bg-green-50 text-green-700 ring-1 ring-green-600/20 dark:bg-green-900/30 dark:text-green-400 dark:ring-green-400/30"
                                : "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20 dark:bg-amber-900/30 dark:text-amber-400 dark:ring-amber-400/30"
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
                            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-yellow-50 to-orange-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-yellow-600/20 dark:from-yellow-900/30 dark:to-orange-900/30 dark:text-yellow-400 dark:ring-yellow-400/30">
                              <Star className="mr-1 h-3 w-3" />
                              注目
                            </span>
                          )}
                        </div>
                      </div>

                      {post.summary !== null &&
                        post.summary !== undefined &&
                        post.summary !== "" && (
                          <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                            {post.summary}
                          </p>
                        )}

                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(post.created_at).toLocaleDateString(
                              "ja-JP",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </span>
                        </div>
                        {post.tags !== null &&
                          post.tags !== undefined &&
                          post.tags.length > 0 && (
                            <div className="flex items-center space-x-1">
                              <Tag className="h-4 w-4" />
                              <div className="flex space-x-1">
                                {post.tags.slice(0, 2).map((tag, index) => (
                                  <span
                                    key={index}
                                    className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                                  >
                                    {tag}
                                  </span>
                                ))}
                                {post.tags.length > 2 && (
                                  <span className="text-xs text-gray-400">
                                    +{post.tags.length - 2}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                      </div>
                    </div>

                    <div className="ml-4 flex flex-shrink-0 space-x-2">
                      <button
                        onClick={() => openEditModal(post)}
                        className="rounded-md p-2 text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:hover:bg-gray-700 dark:hover:text-gray-300"
                        title="編集"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="rounded-md p-2 text-gray-400 transition-all duration-200 hover:bg-red-50 hover:text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none dark:hover:bg-red-900/30 dark:hover:text-red-400"
                        title="削除"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
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

export default BlogCMS;
