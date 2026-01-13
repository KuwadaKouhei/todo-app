# Todo アプリ

シンプルで美しいタスク管理アプリケーション。

## 機能

- ✅ Googleアカウントでログイン
- ✅ タスクの追加・編集・削除
- ✅ タスクの完了/未完了切り替え
- ✅ 優先度設定（高・中・低）
- ✅ 期限設定
- ✅ タスクの検索
- ✅ フィルタリング（すべて・未完了・完了）
- ✅ ソート（作成日・期限・優先度・名前順）
- ✅ リアルタイム同期

## 技術スタック

- **Next.js 14** - Reactフレームワーク
- **TypeScript** - 型安全性
- **Tailwind CSS** - スタイリング
- **Firebase** - 認証 & データベース
- **Zustand** - 状態管理
- **Framer Motion** - アニメーション

## セットアップ

詳細なセットアップ手順は [SETUP.md](./SETUP.md) を参照してください。

### クイックスタート

```bash
# 依存関係のインストール
npm install

# 環境変数の設定
cp .env.local.example .env.local
# .env.local を編集してFirebaseの設定を入力

# 開発サーバーの起動
npm run dev
```

## ライセンス

MIT
# todo-app
