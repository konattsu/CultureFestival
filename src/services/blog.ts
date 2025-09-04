import { ref, push, set, get, update, remove } from "firebase/database";

import { database } from "../config/firebase";

import type {
  BlogPost,
  BlogMetadata,
  NewBlogPost,
  UpdateBlogPost,
} from "../types/blog";

// ブログ投稿一覧を取得（公開済みのみ）
export const getPublishedBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const postsRef = ref(database, "blog/posts");
    const snapshot = await get(postsRef);

    if (!snapshot.exists()) {
      return [];
    }

    const postsData = snapshot.val() as Record<string, BlogPost>;
    return Object.values(postsData)
      .filter((post) => post.status === "published")
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
  } catch (error) {
    console.error("ブログ投稿の取得に失敗しました:", error);
    return [];
  }
};

// 全ブログ投稿を取得（管理者用）
export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const postsRef = ref(database, "blog/posts");
    const snapshot = await get(postsRef);

    if (!snapshot.exists()) {
      return [];
    }

    const postsData = snapshot.val() as Record<string, BlogPost>;
    return Object.values(postsData).sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  } catch (error) {
    console.error("ブログ投稿の取得に失敗しました:", error);
    return [];
  }
};

// 特定のブログ投稿を取得
export const getBlogPost = async (postId: string): Promise<BlogPost | null> => {
  try {
    const postRef = ref(database, `blog/posts/${postId}`);
    const snapshot = await get(postRef);

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.val() as BlogPost;
  } catch (error) {
    console.error("ブログ投稿の取得に失敗しました:", error);
    return null;
  }
};

// 新規ブログ投稿作成（管理者のみ）
export const createBlogPost = async (
  newPost: NewBlogPost,
): Promise<string | null> => {
  try {
    const postsRef = ref(database, "blog/posts");
    const newPostRef = push(postsRef);

    if (newPostRef.key === null || newPostRef.key === "") {
      throw new Error("投稿IDの生成に失敗しました");
    }

    const now = new Date().toISOString();
    const postData: BlogPost = {
      id: newPostRef.key,
      ...newPost,
      created_at: now,
      updated_at: now,
    };

    await set(newPostRef, postData);
    await updateBlogMetadata();

    return newPostRef.key;
  } catch (error) {
    console.error("ブログ投稿の作成に失敗しました:", error);
    return null;
  }
};

// ブログ投稿更新（管理者のみ）
export const updateBlogPost = async (
  postId: string,
  updateData: UpdateBlogPost,
): Promise<boolean> => {
  try {
    const postRef = ref(database, `blog/posts/${postId}`);
    const updates = {
      ...updateData,
      updated_at: new Date().toISOString(),
    };

    await update(postRef, updates);
    await updateBlogMetadata();

    return true;
  } catch (error) {
    console.error("ブログ投稿の更新に失敗しました:", error);
    return false;
  }
};

// ブログ投稿削除（管理者のみ）
export const deleteBlogPost = async (postId: string): Promise<boolean> => {
  try {
    const postRef = ref(database, `blog/posts/${postId}`);
    await remove(postRef);
    await updateBlogMetadata();

    return true;
  } catch (error) {
    console.error("ブログ投稿の削除に失敗しました:", error);
    return false;
  }
};

// ブログメタデータ取得
export const getBlogMetadata = async (): Promise<BlogMetadata | null> => {
  try {
    const metadataRef = ref(database, "blog/metadata");
    const snapshot = await get(metadataRef);

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.val() as BlogMetadata;
  } catch (error) {
    console.error("ブログメタデータの取得に失敗しました:", error);
    return null;
  }
};

// ブログメタデータ更新
const updateBlogMetadata = async (): Promise<void> => {
  try {
    const postsRef = ref(database, "blog/posts");
    const snapshot = await get(postsRef);

    let totalPosts = 0;
    let publishedPosts = 0;
    let draftPosts = 0;

    if (snapshot.exists()) {
      const postsData = snapshot.val() as Record<string, BlogPost>;
      const posts = Object.values(postsData);

      totalPosts = posts.length;
      publishedPosts = posts.filter(
        (post) => post.status === "published",
      ).length;
      draftPosts = posts.filter((post) => post.status === "draft").length;
    }

    const metadata: BlogMetadata = {
      total_posts: totalPosts,
      published_posts: publishedPosts,
      draft_posts: draftPosts,
      created_at: new Date().toISOString(),
      last_updated: new Date().toISOString(),
    };

    const metadataRef = ref(database, "blog/metadata");
    await set(metadataRef, metadata);
  } catch (error) {
    console.error("ブログメタデータの更新に失敗しました:", error);
  }
};
