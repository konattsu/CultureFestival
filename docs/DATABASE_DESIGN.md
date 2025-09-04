# 掲示板システム データベース設計（修正版）

## 要件

- Firebase Realtime Database + Firebase Auth使用
- ブログ機能と分離した構造
- 板の種類は固定（管理者のみ管理）
- レス制限なし
- 投稿者名は「不明なユーザー」またはlocalStorageの値
- 静的サイトホスティング対応（クエリパラメータ使用）
- Firebase Auth による管理者権限管理

## データベース構造

```json
{
  "bulletin_board": {
    "boards": {
      "general": {
        "id": "general",
        "title": "一般討論",
        "description": "自由に討論できる場所です",
        "created_at": "2025-09-04T10:00:00.000Z",
        "created_by": "admin@example.com",
        "status": "open",
        "post_count": 0,
        "order": 1
      },
      "math": {
        "id": "math",
        "title": "数学関連",
        "description": "数学の問題や疑問について討論しましょう",
        "created_at": "2025-09-04T10:00:00.000Z",
        "created_by": "admin@example.com",
        "status": "open",
        "post_count": 0,
        "order": 2
      },
      "programming": {
        "id": "programming",
        "title": "プログラミング",
        "description": "プログラミングの話題について",
        "created_at": "2025-09-04T10:00:00.000Z",
        "created_by": "admin@example.com",
        "status": "open",
        "post_count": 0,
        "order": 3
      },
      "event": {
        "id": "event",
        "title": "イベント・文化祭",
        "description": "文化祭やイベントに関する話題",
        "created_at": "2025-09-04T10:00:00.000Z",
        "created_by": "admin@example.com",
        "status": "open",
        "post_count": 0,
        "order": 4
      }
    },
    "posts": {
      "general": {
        "post_001": {
          "id": "post_001",
          "board_id": "general",
          "author": "数学太郎",
          "content": "こんにちは！よろしくお願いします。",
          "created_at": "2025-09-04T12:00:00.000Z",
          "post_number": 1
        }
      },
      "math": {
        "post_002": {
          "id": "post_002",
          "board_id": "math",
          "author": "不明なユーザー",
          "content": "微分積分について質問があります。",
          "created_at": "2025-09-04T12:05:00.000Z",
          "post_number": 1
        }
      }
    },
    "metadata": {
      "total_boards": 4,
      "total_posts": 2,
      "created_at": "2025-09-04T10:00:00.000Z",
      "last_updated": "2025-09-04T12:05:00.000Z"
    }
  },
  "blog": {
    "posts": {
      "blog_post_001": {
        "id": "blog_post_001",
        "title": "数学部の活動について",
        "content": "...",
        "created_at": "2025-09-04T09:00:00.000Z",
        "author": "部長"
      }
    },
    "metadata": {
      "total_posts": 1,
      "created_at": "2025-09-04T09:00:00.000Z"
    }
  },
  "admin": {
    "users": {
      "admin_uid_1": {
        "email": "admin@example.com",
        "role": "admin",
        "created_at": "2025-09-04T09:00:00.000Z"
      }
    }
  }
}
```

## データ構造の説明

### 1. boards（板管理）

- 固定の板ID: `general`, `math`, `programming`, `event`
- `status`: "open" | "closed" | "archived"
- `order`: 表示順序
- `post_count`: 投稿数（レス制限なし）

### 2. posts（投稿管理）

- 板ID別にネストした構造
- レス制限なし
- `post_number`: 板内での連番

### 3. admin（管理者権限）

- Firebase Auth UIDをキーとした管理者情報
- `role`: "admin" | "moderator"

## URL構造

```
/bulletin-board - 掲示板トップ（板一覧）
/bulletin-board?board=general - 一般討論板
/bulletin-board?board=math - 数学関連板
/bulletin-board?board=programming - プログラミング板
/bulletin-board?board=event - イベント板
```

## Firebase Auth 設定

- 管理者のみログイン可能
- 一般ユーザーは投稿のみ可能（認証不要）
- 管理者は板の管理、投稿削除可能

## セキュリティルール

```json
{
  "rules": {
    "bulletin_board": {
      "boards": {
        ".read": true,
        ".write": "auth != null && root.child('admin/users').child(auth.uid).child('role').val() == 'admin'"
      },
      "posts": {
        ".read": true,
        "$board_id": {
          "$post_id": {
            ".write": "(!data.exists() && auth == null) || (auth != null && root.child('admin/users').child(auth.uid).exists())"
          }
        }
      },
      "metadata": {
        ".read": true,
        ".write": "auth != null && root.child('admin/users').child(auth.uid).child('role').val() == 'admin'"
      }
    },
    "admin": {
      ".read": "auth != null && root.child('admin/users').child(auth.uid).exists()",
      ".write": "auth != null && root.child('admin/users').child(auth.uid).child('role').val() == 'admin'"
    },
    "blog": {
      ".read": true,
      ".write": "auth != null && root.child('admin/users').child(auth.uid).child('role').val() == 'admin'"
    }
  }
}
```
