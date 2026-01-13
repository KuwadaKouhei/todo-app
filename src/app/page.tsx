"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { TodoList } from "@/components/TodoList";
import { TodoForm } from "@/components/TodoForm";
import { FilterBar } from "@/components/FilterBar";
import { AddButton } from "@/components/AddButton";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { useAuth } from "@/hooks/useAuth";
import { useTodos } from "@/hooks/useTodos";
import { Todo, TodoInput } from "@/types/todo";

export default function Home() {
  const { user, isLoading: authLoading } = useAuth();
  const {
    todos,
    filteredTodos,
    filter,
    sort,
    searchQuery,
    isLoading,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    setFilter,
    setSort,
    setSearchQuery,
  } = useTodos();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  // フォームを開く
  const openForm = useCallback(() => {
    setEditingTodo(null);
    setIsFormOpen(true);
  }, []);

  // 編集モードでフォームを開く
  const openEditForm = useCallback((todo: Todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  }, []);

  // フォームを閉じる
  const closeForm = useCallback(() => {
    setIsFormOpen(false);
    setEditingTodo(null);
  }, []);

  // フォーム送信
  const handleSubmit = useCallback(
    async (input: TodoInput) => {
      if (editingTodo) {
        await updateTodo(editingTodo.id, input);
      } else {
        await addTodo(input);
      }
    },
    [editingTodo, addTodo, updateTodo]
  );

  // 認証中のローディング
  if (authLoading) {
    return (
      <div className="min-h-screen bg-ink-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-12 h-12 border-4 border-sage-200 border-t-sage-600 rounded-full animate-spin"
        />
      </div>
    );
  }

  // 未ログイン
  if (!user) {
    return <WelcomeScreen />;
  }

  // メイン画面
  return (
    <div className="min-h-screen bg-ink-50">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* フィルター・検索 */}
          <FilterBar
            filter={filter}
            sort={sort}
            searchQuery={searchQuery}
            onFilterChange={setFilter}
            onSortChange={setSort}
            onSearchChange={setSearchQuery}
            totalCount={todos.length}
            activeCount={todos.filter((t) => !t.completed).length}
          />

          {/* Todoリスト */}
          <TodoList
            todos={filteredTodos}
            isLoading={isLoading}
            onToggle={toggleComplete}
            onDelete={deleteTodo}
            onEdit={openEditForm}
          />
        </motion.div>
      </main>

      {/* 追加ボタン */}
      <AddButton onClick={openForm} />

      {/* フォームモーダル */}
      <TodoForm
        isOpen={isFormOpen}
        onClose={closeForm}
        onSubmit={handleSubmit}
        editingTodo={editingTodo}
      />
    </div>
  );
}
