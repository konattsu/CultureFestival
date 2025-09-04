// 掲示板の板
export interface Board {
  id: string;
  title: string;
  description: string;
  created_at: string;
  created_by: string;
  status: "open" | "closed" | "archived";
  post_count: number;
  order: number;
}

// 投稿
export interface Post {
  id: string;
  board_id: string;
  author: string;
  content: string;
  created_at: string;
  post_number: number;
}

// 掲示板メタデータ
export interface BulletinBoardMetadata {
  total_boards: number;
  total_posts: number;
  created_at: string;
  last_updated: string;
}

// 新規投稿用の型
export interface NewPost {
  board_id: string;
  author: string;
  content: string;
}

// 固定の板ID
export const BOARD_IDS = {
  GENERAL: "general",
  MATH: "math",
  PROGRAMMING: "programming",
  EVENT: "event",
} as const;

export type BoardId = (typeof BOARD_IDS)[keyof typeof BOARD_IDS];

// デフォルトの板設定
export const DEFAULT_BOARDS: Record<
  BoardId,
  Omit<Board, "created_at" | "created_by" | "post_count">
> = {
  [BOARD_IDS.GENERAL]: {
    id: BOARD_IDS.GENERAL,
    title: "一般討論",
    description: "自由に討論できる場所です",
    status: "open",
    order: 1,
  },
  [BOARD_IDS.MATH]: {
    id: BOARD_IDS.MATH,
    title: "数学関連",
    description: "数学の問題や疑問について討論しましょう",
    status: "open",
    order: 2,
  },
  [BOARD_IDS.PROGRAMMING]: {
    id: BOARD_IDS.PROGRAMMING,
    title: "プログラミング",
    description: "プログラミングの話題について",
    status: "open",
    order: 3,
  },
  [BOARD_IDS.EVENT]: {
    id: BOARD_IDS.EVENT,
    title: "イベント・文化祭",
    description: "文化祭やイベントに関する話題",
    status: "open",
    order: 4,
  },
};
