import React, { useState, useEffect } from "react";

import { motion } from "framer-motion";
import { Save, X, FileText } from "lucide-react";

import { useAuth } from "../context/AuthContext";

import MarkdownPreview from "./MarkdownPreview";

import type { BlogPost, NewBlogPost } from "../types/blog";

// PostEditorModal コンポーネント
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
        className="flex max-h-[95vh] w-full max-w-7xl flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {editingPost !== null && editingPost !== undefined
              ? "記事を編集"
              : "新規記事作成"}
          </h2>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-1 overflow-hidden">
          <form
            id="post-form"
            onSubmit={handleSubmit}
            className="flex w-full flex-1 overflow-hidden"
          >
            {/* 左側: フォーム */}
            <div className="w-1/2 overflow-y-auto border-r border-gray-200 p-6 dark:border-gray-700">
              <div className="flex h-full flex-col space-y-6">
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
                <div className="flex flex-1 flex-col">
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    本文 *{" "}
                    <span className="text-xs text-gray-500">
                      (Markdown, KaTeX, Mermaid対応)
                    </span>
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={20}
                    className="mt-1 block w-full flex-1 resize-none rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="記事の本文を入力...

## Markdownサンプル
- **太字** *斜体*
- `code`
- [リンク](https://example.com)

## 数式サンプル (KaTeX)
$E = mc^2$

$$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$

## Mermaidサンプル
\`\`\`mermaid
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
\`\`\`"
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

            {/* 右側: プレビュー */}
            <div className="w-1/2 overflow-y-auto bg-gray-50 p-6 dark:bg-gray-900">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  プレビュー
                </h3>
              </div>

              {/* Title Preview */}
              {title.trim() !== "" && (
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {title}
                  </h1>
                  {summary.trim() !== "" && (
                    <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                      {summary}
                    </p>
                  )}
                </div>
              )}

              {/* Content Preview */}
              {content.trim() !== "" ? (
                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                  <MarkdownPreview content={content} />
                </div>
              ) : (
                <div className="rounded-lg border border-gray-200 bg-gray-100 p-6 text-center text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                  <FileText className="mx-auto mb-3 h-12 w-12" />
                  <p>本文を入力するとプレビューが表示されます</p>
                </div>
              )}
            </div>
          </form>
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
            form="post-form"
            disabled={loading || title.trim() === "" || content.trim() === ""}
            className="inline-flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            <span>{loading ? "保存中..." : "保存"}</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PostEditorModal;
