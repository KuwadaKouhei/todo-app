"use client";

import { motion } from "framer-motion";
import { CheckSquare, Sparkles, Shield, Zap } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const WelcomeScreen = () => {
  const { signInWithGoogle } = useAuth();

  const features = [
    { icon: Zap, title: "シンプル", desc: "直感的な操作でタスクを管理" },
    { icon: Shield, title: "安全", desc: "Googleアカウントで安全に保存" },
    { icon: Sparkles, title: "リアルタイム", desc: "変更は即座に同期" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-ink-50 to-ink-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        {/* ロゴ */}
        <motion.div
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex justify-center mb-8"
        >
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-sage-500 to-sage-600 
                        flex items-center justify-center shadow-2xl shadow-sage-500/40">
            <CheckSquare className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        {/* タイトル */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-ink-800 mb-3">
            Todo
          </h1>
          <p className="text-ink-600">
            シンプルで美しいタスク管理
          </p>
        </motion.div>

        {/* 特徴 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-3 gap-4 mb-10"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-white shadow-lg mx-auto mb-2
                            flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-sage-600" />
              </div>
              <h3 className="text-sm font-semibold text-ink-800">
                {feature.title}
              </h3>
              <p className="text-xs text-ink-500 mt-1">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ログインボタン */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={signInWithGoogle}
          className="w-full py-4 bg-ink-900 text-ink-50 rounded-2xl
                   font-semibold text-lg shadow-xl shadow-ink-900/30
                   hover:bg-ink-800 transition-colors
                   flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Googleでログイン
        </motion.button>

        {/* 注釈 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center text-xs text-ink-400 mt-6"
        >
          ログインすると、データはFirebaseに安全に保存されます
        </motion.p>
      </motion.div>
    </div>
  );
};
