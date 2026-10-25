# CGPポートフォリオ

Project Astralのメンバーが手がけたゲーム、イラスト、Live2D、3Dモデル、音楽を紹介する静的ポートフォリオサイトです。

HTML・CSS・JavaScriptのみで構成しています。インストールやビルドは不要です。

## ローカルで見る

`index.html`をブラウザで開いてください。作品の絞り込み、詳細表示、画像の拡大を利用できます。

開発用のHTTPサーバーを使う場合は、このフォルダーで次を実行します。

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

ブラウザで `http://127.0.0.1:4173/` を開きます。

## GitHub Pagesで公開する

1. GitHubでサイト用リポジトリを作ります。例：`project-astral-portfolio`。GitHub Freeでは公開リポジトリを使います。
2. このフォルダーの**中身**をリポジトリの直下にアップロードします。`index.html`、`style.css`、`script.js`、`.nojekyll`、`assets/`を同じ階層に配置してください。
3. リポジトリの `Settings → Pages` を開きます。
4. `Build and deployment → Source` を `Deploy from a branch` にします。
5. `Branch` を `main`、フォルダーを `/(root)` にして `Save` を押します。
6. デプロイ完了後、Pages設定に表示されたURLを開きます。初回の反映には数分かかることがあります。

プロジェクトサイトのURLは通常 `https://アカウント名.github.io/リポジトリ名/` です。
画像・CSS・JavaScriptは相対パスで参照しているため、リポジトリ名の変更にも対応します。

公式手順：

- [GitHub Pages クイックスタート](https://docs.github.com/en/pages/quickstart)
- [公開元の設定](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## 編集する

- `index.html`：作品名、紹介メンバー、各作品の公開先、掲載画像。
- `style.css`：配色、レイアウト、スマートフォン表示、印刷表示。
- `script.js`：カテゴリ絞り込み、詳細ダイアログ、印刷リンク。
- `assets/`：掲載画像。期限付きのDiscord画像URLへの参照はありません。

作品を追加するときは、一覧の `.work-card`、詳細の `.work-detail`、メンバー一覧のリンク、カテゴリ件数を合わせて更新します。作品IDはカードの `data-open` と詳細セクションの `id` で一致させます。

各作品は `#raythm`、`#lizeria` などのURLフラグメントで直接開くことができます。

JavaScriptが使えない場合も、一覧と同じページの下部にある作品詳細へ移動できます。

## 公開範囲と作品の権利

一般公開されたサイト・リポジトリには、誰でもアクセスできます。提出先の企業だけに限定する仕組みはありません。

このサイトには `noindex, nofollow` を設定してあります。これは検索エンジンへのインデックス抑制の指定であり、閲覧制限にはなりません。

作品・画像・元キャラクターの権利は各制作者および権利者に帰属します。画像素材を再配布可能とするライセンスは付与していません。

## 構成

```text
index.html
style.css
script.js
.nojekyll
README.md
assets/
```
