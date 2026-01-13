"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { CheckSquare } from "lucide-react";
import { AuthButton } from "./AuthButton";

export const Header = () => {
  const today = new Date();
  const formattedDate = format(today, "M月d日（E）", { locale: ja });

  return (
    <header className="sticky top-0 z-20 bg-ink-50/80 backdrop-blur-lg border-b border-ink-200/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* ロゴ & 日付 */}
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sage-500 to-sage-600 
                            flex items-center justify-center shadow-lg shadow-sage-500/30">
                <CheckSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-ink-800 tracking-tight">
                  Todo
                </h1>
                <p className="text-xs text-ink-500">{formattedDate}</p>
              </div>
            </motion.div>
          </div>

          {/* 認証ボタン */}
          <AuthButton />
        </div>
      </div>
    </header>
  );
};
