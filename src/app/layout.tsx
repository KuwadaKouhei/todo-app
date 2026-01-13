import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todo - シンプルなタスク管理",
  description: "シンプルで美しいタスク管理アプリ。Firebaseでリアルタイム同期。",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="bg-ink-50 text-ink-800 antialiased">
        {children}
      </body>
    </html>
  );
}
