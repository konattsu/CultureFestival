// BBSのスレ
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

// レス
export interface Post {
  id: string;
  board_id: string;
  author: string;
  content: string;
  created_at: string;
  post_number: number;
}

// BBSメタデータ
export interface BulletinBoardMetadata {
  total_boards: number;
  total_posts: number;
  created_at: string;
  last_updated: string;
}

// 新規レス用の型
export interface NewPost {
  board_id: string;
  author: string;
  content: string;
}

// ページネーション用の型
export interface PostsPagination {
  posts: Post[];
  hasMore: boolean;
  totalCount: number;
}

// 固定のスレID
export const BOARD_IDS = {
  CLASSROOM: "classroom",
  BROADCAST: "broadcast",
  PLAYGROUND: "playground",
  UNDERGROUND: "underground",
} as const;

export type BoardId = (typeof BOARD_IDS)[keyof typeof BOARD_IDS];

// デフォルトのスレ設定
export const DEFAULT_BOARDS: Record<
  BoardId,
  Omit<Board, "created_at" | "created_by" | "post_count">
> = {
  [BOARD_IDS.CLASSROOM]: {
    id: BOARD_IDS.CLASSROOM,
    title: "教室【雑談/交流】",
    description:
      "(この値が表示されているときは、サーバがダウンしている可能性があります)",
    status: "open",
    order: 1,
  },
  [BOARD_IDS.BROADCAST]: {
    id: BOARD_IDS.BROADCAST,
    title: "放送室【お知らせ/告知】",
    description:
      "(この値が表示されているときは、サーバがダウンしている可能性があります)",
    status: "open",
    order: 2,
  },
  [BOARD_IDS.PLAYGROUND]: {
    id: BOARD_IDS.PLAYGROUND,
    title: "校庭【感想】",
    description:
      "(この値が表示されているときは、サーバがダウンしている可能性があります)",
    status: "open",
    order: 3,
  },
  [BOARD_IDS.UNDERGROUND]: {
    id: BOARD_IDS.UNDERGROUND,
    title: "地下【なんでも】",
    description:
      "(この値が表示されているときは、サーバがダウンしている可能性があります)",
    status: "open",
    order: 4,
  },
};
