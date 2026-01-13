"use client";

import { motion } from "framer-motion";
import { LogIn, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const AuthButton = () => {
  const { user, isLoading, signInWithGoogle, signOut } = useAuth();

  if (isLoading) {
    return (
      <div className="h-10 w-10 rounded-full bg-ink-200 animate-pulse" />
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || "User"}
              className="h-9 w-9 rounded-full border-2 border-ink-200 shadow-sm"
            />
          ) : (
            <div className="h-9 w-9 rounded-full bg-sage-100 flex items-center justify-center">
              <User className="h-5 w-5 text-sage-600" />
            </div>
          )}
          <span className="text-sm text-ink-700 hidden sm:block font-medium">
            {user.displayName?.split(" ")[0]}
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={signOut}
          className="flex items-center gap-2 px-3 py-2 text-sm text-ink-600 hover:text-vermillion-600 
                     transition-colors rounded-lg hover:bg-vermillion-50"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:block">ログアウト</span>
        </motion.button>
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={signInWithGoogle}
      className="flex items-center gap-2 px-4 py-2.5 bg-ink-900 text-ink-50 rounded-xl
                 hover:bg-ink-800 transition-colors shadow-lg shadow-ink-900/20
                 font-medium text-sm"
    >
      <LogIn className="h-4 w-4" />
      <span>Googleでログイン</span>
    </motion.button>
  );
};
