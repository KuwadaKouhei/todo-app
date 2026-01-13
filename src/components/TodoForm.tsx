"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Calendar, Flag, FileText } from "lucide-react";
import { format } from "date-fns";
import { Todo, TodoInput, Priority } from "@/types/todo";

interface TodoFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (input: TodoInput) => Promise<void>;
  editingTodo?: Todo | null;
}

const priorities: { value: Priority; label: string; color: string }[] = [
  { value: "low", label: "低", color: "bg-sage-100 text-sage-700 border-sage-200" },
  { value: "medium", label: "中", color: "bg-amber-100 text-amber-700 border-amber-200" },
  { value: "high", label: "高", color: "bg-vermillion-100 text-vermillion-700 border-vermillion-200" },
];

export const TodoForm = ({ isOpen, onClose, onSubmit, editingTodo }: TodoFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 編集モードの初期化
  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description || "");
      setPriority(editingTodo.priority);
      setDueDate(
        editingTodo.dueDate
          ? format(new Date(editingTodo.dueDate), "yyyy-MM-dd")
          : ""
      );
    } else {
      resetForm();
    }
  }, [editingTodo, isOpen]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPriority("medium");
    setDueDate("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
      });
      resetForm();
      onClose();
    } catch (error) {
      console.error("Failed to submit:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* オーバーレイ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink-950/40 backdrop-blur-sm z-40"
          />

          {/* フォームモーダル */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 bottom-4 sm:inset-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 
                       sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg
                       bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
          >
            <form onSubmit={handleSubmit}>
              {/* ヘッダー */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-ink-100">
                <h2 className="text-lg font-semibold text-ink-800">
                  {editingTodo ? "タスクを編集" : "新しいタスク"}
                </h2>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 text-ink-400 hover:text-ink-600 hover:bg-ink-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* フォーム本体 */}
              <div className="p-6 space-y-5">
                {/* タイトル */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-ink-700 mb-2">
                    <Plus className="w-4 h-4" />
                    タイトル
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="何をしますか？"
                    className="w-full px-4 py-3 bg-ink-50 border border-ink-200 rounded-xl
                             text-ink-800 placeholder-ink-400
                             focus:outline-none focus:ring-2 focus:ring-sage-500/50 focus:border-sage-500
                             transition-all"
                    autoFocus
                  />
                </div>

                {/* 説明 */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-ink-700 mb-2">
                    <FileText className="w-4 h-4" />
                    説明（任意）
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="詳細を追加..."
                    rows={3}
                    className="w-full px-4 py-3 bg-ink-50 border border-ink-200 rounded-xl
                             text-ink-800 placeholder-ink-400 resize-none
                             focus:outline-none focus:ring-2 focus:ring-sage-500/50 focus:border-sage-500
                             transition-all"
                  />
                </div>

                {/* 優先度 & 期限 */}
                <div className="grid grid-cols-2 gap-4">
                  {/* 優先度 */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-ink-700 mb-2">
                      <Flag className="w-4 h-4" />
                      優先度
                    </label>
                    <div className="flex gap-2">
                      {priorities.map((p) => (
                        <button
                          key={p.value}
                          type="button"
                          onClick={() => setPriority(p.value)}
                          className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium border-2 transition-all
                                    ${priority === p.value
                                      ? p.color + " border-current"
                                      : "bg-ink-50 text-ink-500 border-transparent hover:bg-ink-100"
                                    }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 期限 */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-ink-700 mb-2">
                      <Calendar className="w-4 h-4" />
                      期限
                    </label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full px-4 py-2.5 bg-ink-50 border border-ink-200 rounded-xl
                               text-ink-800 
                               focus:outline-none focus:ring-2 focus:ring-sage-500/50 focus:border-sage-500
                               transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* フッター */}
              <div className="px-6 py-4 bg-ink-50 border-t border-ink-100 flex justify-end gap-3">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="px-5 py-2.5 text-sm font-medium text-ink-600 hover:text-ink-800
                           hover:bg-ink-200 rounded-xl transition-colors"
                >
                  キャンセル
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!title.trim() || isSubmitting}
                  className="px-5 py-2.5 text-sm font-medium bg-ink-900 text-ink-50 rounded-xl
                           hover:bg-ink-800 disabled:opacity-50 disabled:cursor-not-allowed
                           shadow-lg shadow-ink-900/20 transition-all"
                >
                  {isSubmitting ? "保存中..." : editingTodo ? "更新する" : "追加する"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
