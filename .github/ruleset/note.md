# ruleset

手動でrest api叩いてupload必須っぽい

```txt
curl -X POST \
  -H "Authorization: Bearer <______________________TOKEN______________________>" \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/konattsu/CultureFestival/rulesets \
  -d @./.github/ruleset/gh-pages-branch-protection.json
```

```txt
curl -X POST \
  -H "Authorization: Bearer <______________________TOKEN______________________>" \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/konattsu/CultureFestival/rulesets \
  -d @./.github/ruleset/main-branch-protection.json
```

ai, context7使っても無能すぎるのでdocsの参照推奨

- [docs](https://docs.github.com/en/rest/repos/rules?apiVersion=2022-11-28#create-a-repository-ruleset): 読みずらい
- [レシピ](https://github.com/github/ruleset-recipes/blob/main/branch-rulesets/were-just-normal-repositories.json): 少ない

スキーマファイルぐらい公開してよな...
