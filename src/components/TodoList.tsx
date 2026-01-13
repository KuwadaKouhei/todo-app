"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Inbox, CheckCircle2 } from "lucide-react";
import { Todo } from "@/types/todo";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  isLoading: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

export const TodoList = ({
  todos,
  isLoading,
  onToggle,
  onDelete,
  onEdit,
}: TodoListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-24 bg-ink-100 rounded-2xl animate-pulse"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-ink-100 flex items-center justify-center mb-4">
          <Inbox className="w-10 h-10 text-ink-400" />
        </div>
        <h3 className="text-lg font-medium text-ink-700 mb-2">
          タスクはありません
        </h3>
        <p className="text-sm text-ink-500 max-w-sm">
          新しいタスクを追加して、今日やるべきことを管理しましょう
        </p>
      </motion.div>
    );
  }

  // 完了・未完了で分ける
  const activeTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);

  return (
    <div className="space-y-6">
      {/* 未完了タスク */}
      {activeTodos.length > 0 && (
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {activeTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* 完了タスク */}
      {completedTodos.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-ink-500 px-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>完了済み ({completedTodos.length})</span>
          </div>
          <AnimatePresence mode="popLayout">
            {completedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
