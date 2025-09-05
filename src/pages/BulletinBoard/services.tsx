import {
  ref,
  push,
  set,
  get,
  update,
  serverTimestamp,
} from "firebase/database";

import {
  DEFAULT_BOARDS,
  type Board,
  type Post,
  type BulletinBoardMetadata,
  type NewPost,
  type BoardId,
  type PostsPagination,
} from "./types";

import { database } from "@/config/firebase";
import { withFirebaseTimeout } from "@/utils/timeout";

// スレ一覧を取得
export const getBoards = async (): Promise<Board[]> => {
  try {
    const boardsRef = ref(database, "bulletin_board/boards");
    const snapshot = await withFirebaseTimeout(get(boardsRef));
    if (!snapshot.exists()) {
      // 初期スレを作成
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
    console.error("スレの取得に失敗しました:", error);
    throw new Error("サーバーへの接続に失敗しました");
  }
};

// 特定のスレを取得
export const getBoard = async (boardId: BoardId): Promise<Board | null> => {
  try {
    const boardRef = ref(database, `bulletin_board/boards/${boardId}`);
    const snapshot = await withFirebaseTimeout(get(boardRef));

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.val();
  } catch (error) {
    console.error("スレの取得に失敗しました:", error);
    throw new Error("サーバーへの接続に失敗しました");
  }
};

// スレのレス一覧を取得
export const getPosts = async (boardId: BoardId): Promise<Post[]> => {
  try {
    const postsRef = ref(database, `bulletin_board/posts/${boardId}`);
    const snapshot = await withFirebaseTimeout(get(postsRef));

    if (!snapshot.exists()) {
      return [];
    }

    const postsData = snapshot.val() as Record<string, Post>;
    return Object.values(postsData).sort(
      (a: Post, b: Post) => b.post_number - a.post_number, // 最新が上に来るように降順にソート
    );
  } catch (error) {
    console.error("レスの取得に失敗しました:", error);
    throw new Error("サーバーへの接続に失敗しました");
  }
};

// ページネーション対応のレス一覧を取得
export const getPostsWithPagination = async (
  boardId: BoardId,
  offset: number = 0,
  limit: number = 20,
): Promise<PostsPagination> => {
  try {
    const postsRef = ref(database, `bulletin_board/posts/${boardId}`);
    const snapshot = await withFirebaseTimeout(get(postsRef));

    if (!snapshot.exists()) {
      return {
        posts: [],
        hasMore: false,
        totalCount: 0,
      };
    }

    const postsData = snapshot.val() as Record<string, Post>;
    const allPosts = Object.values(postsData).sort(
      (a: Post, b: Post) => b.post_number - a.post_number, // 最新が上に来るように降順にソート
    );

    const totalCount = allPosts.length;
    const paginatedPosts = allPosts.slice(offset, offset + limit);
    const hasMore = offset + limit < totalCount;

    return {
      posts: paginatedPosts,
      hasMore,
      totalCount,
    };
  } catch (error) {
    console.error("レスの取得に失敗しました:", error);
    throw new Error("サーバーへの接続に失敗しました");
  }
};

// 新規レス作成
export const createPost = async (newPost: NewPost): Promise<boolean> => {
  try {
    const { board_id, author, content } = newPost;

    // レス番号を取得
    const boardRef = ref(database, `bulletin_board/boards/${board_id}`);
    const boardSnapshot = await withFirebaseTimeout(get(boardRef));

    if (!boardSnapshot.exists()) {
      throw new Error("スレが存在しません");
    }

    const board: Board = boardSnapshot.val();
    const postNumber = board.post_count + 1;

    // 新しいレスのデータ
    const postData: Omit<Post, "id"> = {
      board_id,
      author,
      content,
      created_at: new Date().toISOString(),
      post_number: postNumber,
    };

    // レスを追加
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

    await withFirebaseTimeout(update(ref(database), updates));

    // メタデータ更新
    await updateMetadata();

    return true;
  } catch (error) {
    console.error("レスの作成に失敗しました:", error);
    return false;
  }
};

// メタデータ更新
const updateMetadata = async (): Promise<void> => {
  try {
    const boardsRef = ref(database, "bulletin_board/boards");
    const postsRef = ref(database, "bulletin_board/posts");

    const [boardsSnapshot, postsSnapshot] = await Promise.all([
      withFirebaseTimeout(get(boardsRef)),
      withFirebaseTimeout(get(postsRef)),
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
    await withFirebaseTimeout(set(metadataRef, metadata));
  } catch (error) {
    console.error("メタデータの更新に失敗しました:", error);
  }
};

// 初期スレの作成
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
    await withFirebaseTimeout(set(boardsRef, boardsData));

    await updateMetadata();
  } catch (error) {
    console.error("初期スレの作成に失敗しました:", error);
  }
};

// スレのタイトル更新（管理者のみ）
export const updateBoardTitle = async (
  boardId: BoardId,
  title: string,
): Promise<boolean> => {
  try {
    const boardRef = ref(database, `bulletin_board/boards/${boardId}/title`);
    await withFirebaseTimeout(set(boardRef, title));
    return true;
  } catch (error) {
    console.error("スレのタイトル更新に失敗しました:", error);
    return false;
  }
};

// スレの説明更新（管理者のみ）
export const updateBoardDescription = async (
  boardId: BoardId,
  description: string,
): Promise<boolean> => {
  try {
    const boardRef = ref(
      database,
      `bulletin_board/boards/${boardId}/description`,
    );
    await withFirebaseTimeout(set(boardRef, description));
    return true;
  } catch (error) {
    console.error("スレの説明更新に失敗しました:", error);
    return false;
  }
};

// レス削除（管理者のみ）
export const deletePost = async (
  boardId: BoardId,
  postId: string,
): Promise<boolean> => {
  try {
    const postRef = ref(database, `bulletin_board/posts/${boardId}/${postId}`);
    await withFirebaseTimeout(set(postRef, null));
    return true;
  } catch (error) {
    console.error("レスの削除に失敗しました:", error);
    return false;
  }
};
