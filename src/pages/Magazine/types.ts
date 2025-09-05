// 部誌投稿
export interface MagazinePost {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
  updated_at: string;
  summary?: string;
  tags?: string[];
}

// 部誌メタデータ
export interface MagazineMetadata {
  total_posts: number;
  created_at: string;
  last_updated: string;
}
