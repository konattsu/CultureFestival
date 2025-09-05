import metaData from "./data/meta.json";

import type { MagazinePost } from "./types";

// meta.jsonの型定義
interface MagazineMetaData {
  filename: string;
  title: string;
  uploadDate: string;
  description: string;
  tags?: string[];
}

// Markdown ファイルのコンテンツを取得する関数
const getMarkdownContent = async (filename: string): Promise<string> => {
  try {
    const modules = import.meta.glob("./data/*.md", {
      query: "?raw",
      import: "default",
    });
    const path = `./data/${filename}`;
    const loader = modules[path];
    if (typeof loader === "function") {
      return (await loader()) as string;
    } else {
      console.error(`Markdown file ${filename} not found`);
      return "";
    }
  } catch (e) {
    console.error(e);
    return "";
  }
};

// 部誌投稿一覧を取得
export const getMagazinePosts = async (): Promise<MagazinePost[]> => {
  try {
    const posts: MagazinePost[] = [];
    const typedMetaData = metaData as MagazineMetaData[];

    for (const meta of typedMetaData) {
      let content = "";
      try {
        content = await getMarkdownContent(meta.filename);
      } catch (e) {
        console.error(e);
      }

      const post: MagazinePost = {
        id: meta.filename.replace(".md", ""),
        title: meta.title,
        content: content,
        author: "数学部", // デフォルト作者
        created_at: meta.uploadDate,
        updated_at: meta.uploadDate,
        summary: meta.description,
        tags: meta.tags ?? [],
      };

      posts.push(post);
    }

    // 作成日時順でソート（新しい順）
    return posts.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  } catch (error) {
    console.error("部誌投稿の取得に失敗しました:", error);
    return [];
  }
};

// 特定の部誌投稿を取得
export const getMagazinePost = async (
  postId: string,
): Promise<MagazinePost | null> => {
  try {
    const allPosts = await getMagazinePosts();
    const foundPost = allPosts.find((post) => post.id === postId);
    return foundPost ?? null;
  } catch (error) {
    console.error("部誌投稿の取得に失敗しました:", error);
    return null;
  }
};
