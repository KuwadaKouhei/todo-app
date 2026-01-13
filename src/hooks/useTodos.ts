"use client";

import { useEffect, useCallback } from "react";
import { useTodoStore } from "@/store/todoStore";
import { useAuthStore } from "@/store/authStore";
import {
  subscribeTodos,
  addTodo as addTodoToDb,
  updateTodo as updateTodoInDb,
  deleteTodo as deleteTodoFromDb,
} from "@/lib/firestore";
import { TodoInput } from "@/types/todo";

export const useTodos = () => {
  const { user } = useAuthStore();
  const {
    todos,
    filter,
    sort,
    searchQuery,
    isLoading,
    error,
    setTodos,
    setFilter,
    setSort,
    setSearchQuery,
    setLoading,
    setError,
    getFilteredAndSortedTodos,
  } = useTodoStore();

  // リアルタイム購読
  useEffect(() => {
    if (!user) {
      setTodos([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = subscribeTodos(user.uid, (todos) => {
      setTodos(todos);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, setTodos, setLoading]);

  // Todo追加
  const addTodo = useCallback(
    async (input: TodoInput) => {
      if (!user) throw new Error("ログインが必要です");
      try {
        setError(null);
        await addTodoToDb(input, user.uid);
      } catch (err) {
        setError("Todoの追加に失敗しました");
        throw err;
      }
    },
    [user, setError]
  );

  // Todo更新
  const updateTodo = useCallback(
    async (id: string, updates: Partial<TodoInput> & { completed?: boolean }) => {
      try {
        setError(null);
        await updateTodoInDb(id, updates);
      } catch (err) {
        setError("Todoの更新に失敗しました");
        throw err;
      }
    },
    [setError]
  );

  // Todo削除
  const deleteTodo = useCallback(
    async (id: string) => {
      try {
        setError(null);
        await deleteTodoFromDb(id);
      } catch (err) {
        setError("Todoの削除に失敗しました");
        throw err;
      }
    },
    [setError]
  );

  // 完了切り替え
  const toggleComplete = useCallback(
    async (id: string) => {
      const todo = todos.find((t) => t.id === id);
      if (todo) {
        await updateTodo(id, { completed: !todo.completed });
      }
    },
    [todos, updateTodo]
  );

  return {
    todos,
    filteredTodos: getFilteredAndSortedTodos(),
    filter,
    sort,
    searchQuery,
    isLoading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    setFilter,
    setSort,
    setSearchQuery,
  };
};
