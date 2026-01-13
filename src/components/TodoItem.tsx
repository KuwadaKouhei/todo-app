"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, isPast, isToday, isTomorrow } from "date-fns";
import { ja } from "date-fns/locale";
import {
  Check,
  Trash2,
  Edit3,
  Calendar,
  Flag,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Todo, Priority } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

const priorityConfig: Record<Priority, { label: string; color: string; bg: string }> = {
  high: { label: "高", color: "text-vermillion-600", bg: "bg-vermillion-50" },
  medium: { label: "中", color: "text-amber-600", bg: "bg-amber-50" },
  low: { label: "低", color: "text-sage-600", bg: "bg-sage-50" },
};

const formatDueDate = (date: Date): { text: string; isOverdue: boolean } => {
  const d = new Date(date);
  if (isToday(d)) return { text: "今日", isOverdue: false };
  if (isTomorrow(d)) return { text: "明日", isOverdue: false };
  if (isPast(d)) return { text: format(d, "M/d", { locale: ja }), isOverdue: true };
  return { text: format(d, "M/d", { locale: ja }), isOverdue: false };
};

export const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const priority = priorityConfig[todo.priority];
  const dueInfo = todo.dueDate ? formatDueDate(todo.dueDate) : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={`group relative bg-white rounded-2xl border transition-all duration-300
                  ${todo.completed 
                    ? "border-ink-100 bg-ink-50/50" 
                    : "border-ink-200 hover:border-ink-300 hover:shadow-lg hover:shadow-ink-200/50"
                  }`}
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-4">
          {/* チェックボックス */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onToggle(todo.id)}
            className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center
                       transition-colors duration-200
                       ${todo.completed
                         ? "bg-sage-500 border-sage-500"
                         : "border-ink-300 hover:border-sage-400 hover:bg-sage-50"
                       }`}
          >
            {todo.completed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
              </motion.div>
            )}
          </motion.button>

          {/* コンテンツ */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <h3
                className={`text-base font-medium leading-snug transition-colors
                           ${todo.completed ? "text-ink-400 line-through" : "text-ink-800"}`}
              >
                {todo.title}
              </h3>

              {/* アクションボタン */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onEdit(todo)}
                  className="p-2 text-ink-400 hover:text-ink-600 hover:bg-ink-100 rounded-lg transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onDelete(todo.id)}
                  className="p-2 text-ink-400 hover:text-vermillion-600 hover:bg-vermillion-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* メタ情報 */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {/* 優先度 */}
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium
                           ${priority.bg} ${priority.color}`}
              >
                <Flag className="w-3 h-3" />
                {priority.label}
              </span>

              {/* 期限 */}
              {dueInfo && (
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium
                             ${dueInfo.isOverdue && !todo.completed
                               ? "bg-vermillion-50 text-vermillion-600"
                               : "bg-ink-100 text-ink-600"
                             }`}
                >
                  <Calendar className="w-3 h-3" />
                  {dueInfo.text}
                </span>
              )}

              {/* 説明展開ボタン */}
              {todo.description && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="inline-flex items-center gap-1 px-2 py-0.5 text-xs text-ink-500 
                            hover:text-ink-700 hover:bg-ink-100 rounded-md transition-colors"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="w-3 h-3" />
                      閉じる
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3 h-3" />
                      詳細
                    </>
                  )}
                </button>
              )}
            </div>

            {/* 説明 */}
            <AnimatePresence>
              {isExpanded && todo.description && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 text-sm text-ink-600 leading-relaxed whitespace-pre-wrap"
                >
                  {todo.description}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 完了時のオーバーレイ効果 */}
      {todo.completed && (
        <div className="absolute inset-0 bg-gradient-to-r from-sage-500/5 to-transparent rounded-2xl pointer-events-none" />
      )}
    </motion.div>
  );
};
