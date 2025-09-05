# rule

```json
{
  "rules": {
    "bulletin_board": {
      "boards": {
        ".read": true,
        "$board_id": {
          ".write": "auth != null"
        }
      },
      "posts": {
        ".read": true,
        "$board_id": {
          "$post_id": {
            // 新規投稿のみ許可（編集・削除不可）
            ".write": "auth != null && !data.exists()"
          }
        }
      },
      "metadata": {
        ".read": true,
        ".write": "auth != null"
      }
    },
    "admin": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```
