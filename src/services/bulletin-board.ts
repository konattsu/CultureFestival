import {
  ref,
  push,
  set,
  get,
  update,
  serverTimestamp,
} from "firebase/database";

import { database } from "../config/firebase";
import {
  DEFAULT_BOARDS,
  type Board,
  type Post,
  type BulletinBoardMetadata,
  type NewPost,
  type BoardId,
} from "../types/bulletin-board";

// 板一覧を取得
export const getBoards = async (): Promise<Board[]> => {
  try {
    const boardsRef = ref(database, "bulletin_board/boards");
    const snapshot = await get(boardsRef);
    if (!snapshot.exists()) {
      // 初期板を作成
      await initializeBoards();
      return Object.values(DEFAULT_BOARDS).map((board) => ({
        ...board,
        created_at: new Date().toISOString(),
        created_by: "system",
        post_count: 0,
      }));
    }

    const boardsData = snapshot.val() as Record<string, Board>;
    return Object.values(boardsData).sort(
      (a: Board, b: Board) => a.order - b.order,
    );
  } catch (error) {
    console.error("板の取得に失敗しました:", error);
    return [];
  }
};

// 特定の板を取得
export const getBoard = async (boardId: BoardId): Promise<Board | null> => {
  try {
    const boardRef = ref(database, `bulletin_board/boards/${boardId}`);
    const snapshot = await get(boardRef);

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.val();
  } catch (error) {
    console.error("板の取得に失敗しました:", error);
    return null;
  }
};

// 板の投稿一覧を取得
export const getPosts = async (boardId: BoardId): Promise<Post[]> => {
  try {
    const postsRef = ref(database, `bulletin_board/posts/${boardId}`);
    const snapshot = await get(postsRef);

    if (!snapshot.exists()) {
      return [];
    }

    const postsData = snapshot.val() as Record<string, Post>;
    return Object.values(postsData).sort(
      (a: Post, b: Post) => a.post_number - b.post_number,
    );
  } catch (error) {
    console.error("投稿の取得に失敗しました:", error);
    return [];
  }
};

// 新規投稿作成
export const createPost = async (newPost: NewPost): Promise<boolean> => {
  try {
    const { board_id, author, content } = newPost;

    // 投稿番号を取得
    const boardRef = ref(database, `bulletin_board/boards/${board_id}`);
    const boardSnapshot = await get(boardRef);

    if (!boardSnapshot.exists()) {
      throw new Error("板が存在しません");
    }

    const board: Board = boardSnapshot.val();
    const postNumber = board.post_count + 1;

    // 新しい投稿のデータ
    const postData: Omit<Post, "id"> = {
      board_id,
      author,
      content,
      created_at: new Date().toISOString(),
      post_number: postNumber,
    };

    // 投稿を追加
    const postsRef = ref(database, `bulletin_board/posts/${board_id}`);
    const newPostRef = push(postsRef);

    const postWithId: Post = {
      ...postData,
      id: newPostRef.key!,
    };

    // トランザクション的な更新
    const updates: Record<string, unknown> = {};
    updates[`bulletin_board/posts/${board_id}/${newPostRef.key}`] = postWithId;
    updates[`bulletin_board/boards/${board_id}/post_count`] = postNumber;
    updates[`bulletin_board/boards/${board_id}/last_updated`] =
      serverTimestamp();

    await update(ref(database), updates);

    // メタデータ更新
    await updateMetadata();

    return true;
  } catch (error) {
    console.error("投稿の作成に失敗しました:", error);
    return false;
  }
};

// メタデータ更新
const updateMetadata = async (): Promise<void> => {
  try {
    const boardsRef = ref(database, "bulletin_board/boards");
    const postsRef = ref(database, "bulletin_board/posts");

    const [boardsSnapshot, postsSnapshot] = await Promise.all([
      get(boardsRef),
      get(postsRef),
    ]);

    let totalBoards = 0;
    let totalPosts = 0;

    if (boardsSnapshot.exists()) {
      totalBoards = Object.keys(boardsSnapshot.val()).length;
    }

    if (postsSnapshot.exists()) {
      const postsData = postsSnapshot.val();
      Object.values(postsData).forEach((boardPosts: unknown) => {
        if (typeof boardPosts === "object" && boardPosts !== null) {
          totalPosts += Object.keys(boardPosts).length;
        }
      });
    }

    const metadata: BulletinBoardMetadata = {
      total_boards: totalBoards,
      total_posts: totalPosts,
      created_at: new Date().toISOString(),
      last_updated: new Date().toISOString(),
    };

    const metadataRef = ref(database, "bulletin_board/metadata");
    await set(metadataRef, metadata);
  } catch (error) {
    console.error("メタデータの更新に失敗しました:", error);
  }
};

// 初期板の作成
const initializeBoards = async (): Promise<void> => {
  try {
    const now = new Date().toISOString();
    const boardsData: Record<string, Board> = {};

    Object.entries(DEFAULT_BOARDS).forEach(([id, boardConfig]) => {
      boardsData[id] = {
        ...boardConfig,
        created_at: now,
        created_by: "system",
        post_count: 0,
      };
    });

    const boardsRef = ref(database, "bulletin_board/boards");
    await set(boardsRef, boardsData);

    await updateMetadata();
  } catch (error) {
    console.error("初期板の作成に失敗しました:", error);
  }
};

// 板のタイトル更新（管理者のみ）
export const updateBoardTitle = async (
  boardId: BoardId,
  title: string,
): Promise<boolean> => {
  try {
    const boardRef = ref(database, `bulletin_board/boards/${boardId}/title`);
    await set(boardRef, title);
    return true;
  } catch (error) {
    console.error("板のタイトル更新に失敗しました:", error);
    return false;
  }
};

// 板の説明更新（管理者のみ）
export const updateBoardDescription = async (
  boardId: BoardId,
  description: string,
): Promise<boolean> => {
  try {
    const boardRef = ref(
      database,
      `bulletin_board/boards/${boardId}/description`,
    );
    await set(boardRef, description);
    return true;
  } catch (error) {
    console.error("板の説明更新に失敗しました:", error);
    return false;
  }
};

// 投稿削除（管理者のみ）
export const deletePost = async (
  boardId: BoardId,
  postId: string,
): Promise<boolean> => {
  try {
    const postRef = ref(database, `bulletin_board/posts/${boardId}/${postId}`);
    await set(postRef, null);
    return true;
  } catch (error) {
    console.error("投稿の削除に失敗しました:", error);
    return false;
  }
};
