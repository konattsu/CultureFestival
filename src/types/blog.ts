// ブログ投稿
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
  updated_at: string;
  status: "published" | "draft" | "archived";
  summary?: string;
  tags?: string[];
  featured?: boolean;
}

// ブログメタデータ
export interface BlogMetadata {
  total_posts: number;
  published_posts: number;
  draft_posts: number;
  created_at: string;
  last_updated: string;
}

// 新規ブログ投稿用の型
export interface NewBlogPost {
  title: string;
  content: string;
  author: string;
  status: "published" | "draft";
  summary?: string;
  tags?: string[];
  featured?: boolean;
}

// ブログ投稿更新用の型
export interface UpdateBlogPost {
  title?: string;
  content?: string;
  status?: "published" | "draft" | "archived";
  summary?: string;
  tags?: string[];
  featured?: boolean;
}
