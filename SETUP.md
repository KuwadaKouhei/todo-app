# Todo アプリ セットアップガイド

このドキュメントでは、Todoアプリを動作させるために必要なFirebaseの設定手順を説明します。

## 目次

1. [Firebaseプロジェクトの作成](#1-firebaseプロジェクトの作成)
2. [認証の設定](#2-認証の設定)
3. [Firestoreデータベースの設定](#3-firestoreデータベースの設定)
4. [Firebase設定情報の取得](#4-firebase設定情報の取得)
5. [環境変数の設定](#5-環境変数の設定)
6. [アプリケーションの起動](#6-アプリケーションの起動)

---

## 1. Firebaseプロジェクトの作成

### 1.1 Firebaseコンソールにアクセス

1. [Firebase Console](https://console.firebase.google.com/) にアクセス
2. Googleアカウントでログイン

### 1.2 新しいプロジェクトを作成

1. 「プロジェクトを追加」をクリック
2. プロジェクト名を入力（例: `todo-app`）
3. Google Analyticsの設定（任意、このアプリでは不要です）
4. 「プロジェクトを作成」をクリック

---

## 2. 認証の設定

### 2.1 Authentication を有効化

1. 左メニューから「構築」→「Authentication」を選択
2. 「始める」をクリック

### 2.2 Google認証を有効化

1. 「Sign-in method」タブを選択
2. 「Google」をクリック
3. 「有効にする」トグルをON
4. プロジェクトのサポートメールを選択
5. 「保存」をクリック

### 2.3 承認済みドメインの設定（本番環境の場合）

1. 「Settings」タブを選択
2. 「承認済みドメイン」セクションで本番環境のドメインを追加

> **注意**: ローカル開発環境（localhost）はデフォルトで許可されています

---

## 3. Firestoreデータベースの設定

### 3.1 Firestoreを有効化

1. 左メニューから「構築」→「Firestore Database」を選択
2. 「データベースを作成」をクリック
3. モードを選択:
   - **本番モード**: セキュリティルールを後から設定
   - **テストモード**: 30日間全アクセス許可（開発用）
4. ロケーションを選択（推奨: `asia-northeast1` = 東京）
5. 「有効にする」をクリック

### 3.2 セキュリティルールの設定

1. 「ルール」タブを選択
2. 以下のルールをコピー＆ペースト:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Todosコレクション
    match /todos/{todoId} {
      // 認証済みユーザーのみ読み書き可能
      // 自分のTodoのみアクセス可能
      allow read, write: if request.auth != null 
                         && request.auth.uid == resource.data.userId;
      
      // 新規作成時は自分のuserIdのみ設定可能
      allow create: if request.auth != null 
                    && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

1. 「公開」をクリック

### 3.3 インデックスの作成

Firestoreで複合クエリを使用するには、インデックスが必要です。

1. 「インデックス」タブを選択
2. 「複合インデックスを作成」をクリック
3. 以下の設定でインデックスを作成:

| コレクションID | フィールド | 順序 |
|---------------|-----------|------|
| todos | userId | 昇順 |
| todos | createdAt | 降順 |

> **ヒント**: インデックスが必要な場合、アプリの実行時にコンソールにエラーとリンクが表示されます。そのリンクをクリックすると自動でインデックスが作成されます。

---

## 4. Firebase設定情報の取得

### 4.1 Webアプリを追加

1. プロジェクトの概要ページに移動
2. 「Web」アイコン（`</>`）をクリック
3. アプリのニックネームを入力（例: `todo-web`）
4. 「アプリを登録」をクリック

### 4.2 設定情報をコピー

以下のような設定情報が表示されます:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDw99iephqXQRtRuI2OlnXnUPp_rlmQz6A",
  authDomain: "todo-app-3d9d5.firebaseapp.com",
  projectId: "todo-app-3d9d5",
  storageBucket: "todo-app-3d9d5.firebasestorage.app",
  messagingSenderId: "125149770942",
  appId: "1:125149770942:web:9b50b6ab839ebb6ac81aef",
  measurementId: "G-6S2W88FWQB"
};
```

これらの値をメモしておいてください。

---

## 5. 環境変数の設定

### 5.1 環境変数ファイルを作成

プロジェクトのルートディレクトリに `.env.local` ファイルを作成:

```bash
# プロジェクトのルートで実行
cp .env.local.example .env.local
```

### 5.2 設定値を入力

`.env.local` ファイルを編集し、Firebaseコンソールで取得した値を入力:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

> **重要**: `.env.local` ファイルは `.gitignore` に含まれているため、Gitにはコミットされません。

---

## 6. アプリケーションの起動

### 6.1 依存関係のインストール

```bash
npm install
```

### 6.2 開発サーバーの起動

```bash
npm run dev
```

### 6.3 ブラウザでアクセス

<http://localhost:3000> にアクセスして、アプリが正常に動作することを確認してください。

---

## トラブルシューティング

### Googleログインができない

1. Firebaseコンソールで「Authentication」→「Sign-in method」→「Google」が有効か確認
2. 承認済みドメインに `localhost` が含まれているか確認
3. ブラウザのCookieとキャッシュをクリア

### Firestoreに保存できない

1. セキュリティルールが正しく設定されているか確認
2. ブラウザの開発者ツールでエラーメッセージを確認
3. インデックスが必要な場合、エラーメッセージのリンクをクリック

### 環境変数が読み込まれない

1. `.env.local` ファイルがプロジェクトルートにあるか確認
2. 変数名が `NEXT_PUBLIC_` で始まっているか確認
3. 開発サーバーを再起動

---

## 本番環境へのデプロイ

### Vercelへのデプロイ

1. [Vercel](https://vercel.com) にアクセス
2. GitHubリポジトリを連携
3. 環境変数を設定（Settings → Environment Variables）
4. デプロイ

### 本番環境での注意事項

- Firebaseコンソールで本番ドメインを「承認済みドメイン」に追加
- セキュリティルールを本番モードに設定
- Firestoreのバックアップを設定することを推奨

---

## プロジェクト構造

```
todo-app/
├── src/
│   ├── app/
│   │   ├── globals.css      # グローバルスタイル
│   │   ├── layout.tsx       # ルートレイアウト
│   │   └── page.tsx         # メインページ
│   ├── components/
│   │   ├── AddButton.tsx    # 追加ボタン
│   │   ├── AuthButton.tsx   # 認証ボタン
│   │   ├── FilterBar.tsx    # フィルター・検索
│   │   ├── Header.tsx       # ヘッダー
│   │   ├── TodoForm.tsx     # Todo入力フォーム
│   │   ├── TodoItem.tsx     # Todoアイテム
│   │   ├── TodoList.tsx     # Todoリスト
│   │   └── WelcomeScreen.tsx # ウェルカム画面
│   ├── hooks/
│   │   ├── useAuth.ts       # 認証フック
│   │   └── useTodos.ts      # Todoフック
│   ├── lib/
│   │   ├── firebase.ts      # Firebase初期化
│   │   └── firestore.ts     # Firestore操作
│   ├── store/
│   │   ├── authStore.ts     # 認証ストア
│   │   └── todoStore.ts     # Todoストア
│   └── types/
│       └── todo.ts          # 型定義
├── .env.local.example       # 環境変数サンプル
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 使用技術

| 技術 | 用途 |
|------|------|
| Next.js 14 | フレームワーク |
| React 18 | UIライブラリ |
| TypeScript | 型安全性 |
| Tailwind CSS | スタイリング |
| Firebase Auth | 認証 |
| Firestore | データベース |
| Zustand | 状態管理 |
| Framer Motion | アニメーション |
| date-fns | 日付処理 |
| Lucide React | アイコン |
