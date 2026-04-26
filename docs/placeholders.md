# placeholder差し替え一覧

公開後フェーズで差し替える環境変数とURLの管理表です。秘密情報は入れず、公開可能なURLだけを設定します。

| 項目 | 使われている場所 | 差し替える内容 | 未設定時の表示・挙動 | 優先度 |
| --- | --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `src/config/site.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`, metadata | Vercel Production URLまたは独自ドメイン | `fallbackSiteUrl` でビルド可能。ただしsitemap/robots/OGPの基準URLが仮URLになる | 高 |
| `NEXT_PUBLIC_NOTE_URL` | `siteConfig.noteUrl`, note記事リンク, 相談fallback | 公式note `https://note.com/life_to_ai` | 既定で `https://note.com/life_to_ai` | 高 |
| `NEXT_PUBLIC_CONTACT_EMAIL` | `/consulting`, `ContactSection`, `getMailHref` | 公開用問い合わせメール | 未設定時はnote導線へfallback。メールリンクは表示されない | 中 |
| `NEXT_PUBLIC_ZENN_URL` | `src/data/platforms.ts`, `src/data/products.ts` | ZennプロフィールまたはZenn本URL | `#` 扱い。外部リンクは非クリックの「準備中」表示 | 中 |
| `NEXT_PUBLIC_MEDIUM_URL` | `src/data/platforms.ts`, `/en` 導線想定 | MediumプロフィールまたはPublication URL | `#` 扱い。外部リンクは非クリックの「準備中」表示 | 中 |
| `NEXT_PUBLIC_BOOTH_URL` | `src/data/platforms.ts`, `src/data/products.ts`, `/free` 配布導線想定 | BOOTHショップまたは無料配布商品URL | `#` 扱い。商品カードは「外部URLは公開前に設定」表示 | 高 |
| `NEXT_PUBLIC_GITHUB_URL` | `src/data/platforms.ts`, 技術キット導線 | GitHubリポジトリまたはOrganization URL | 既定で `https://github.com/kenken0830/ai-note-homepage` | 中 |
| `NEXT_PUBLIC_X_URL` | `src/data/platforms.ts`, 発見導線 | XプロフィールURL | `#` 扱い。外部リンクは非クリックの「準備中」表示 | 中 |
| `NEXT_PUBLIC_YOUTUBE_URL` | `src/data/platforms.ts` | YouTubeチャンネルURL | `#` 扱い。外部リンクは非クリックの「準備中」表示 | 低 |
| `NEXT_PUBLIC_NEWSLETTER_URL` | `src/data/platforms.ts`, `/newsletter` 将来差し替え | Kit / Substack / LINEなどの登録URL | `#` 扱い。ページ上では未接続・準備中として表示 | 高 |
| `NEXT_PUBLIC_COMMUNITY_URL` | `src/data/platforms.ts`, `/community` 将来差し替え | noteメンバーシップ / Discord / LINE公式URL | `#` 扱い。コミュニティは準備中表示 | 低 |

## 差し替えルール

- VercelのEnvironment Variablesを優先して更新する
- 本物URLがないものは空欄のままにする
- `src/config/site.ts` のfallbackは公開前の安全な初期値として残す
- 商品や記事単位のURLが決まった場合は `src/data/products.ts` または `src/data/articles.ts` も更新する
