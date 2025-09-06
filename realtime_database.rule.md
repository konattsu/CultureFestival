# rule

```json
{
  "rules": {
    "bulletin_board": {
      "boards": {
        ".read": true,
        "$board_id": {
          ".write": "auth != null",
          "post_count": {
            ".write": true
          },
          "last_updated": {
            ".write": true
          }
        }
      },
      "posts": {
        ".read": true,
        "broadcast": {
          ".write": "auth != null"
        },
        "classroom": {
          ".write": true
        },
        "playground": {
          ".write": true
        },
        "underground": {
          ".write": true
        }
      },
      "metadata": {
        ".read": true,
        ".write": true
      }
    },
    "admin": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```
