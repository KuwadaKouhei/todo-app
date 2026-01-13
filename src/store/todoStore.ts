import { create } from "zustand";
import { Todo, FilterOption, SortOption } from "@/types/todo";

interface TodoState {
  todos: Todo[];
  filter: FilterOption;
  sort: SortOption;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setTodos: (todos: Todo[]) => void;
  setFilter: (filter: FilterOption) => void;
  setSort: (sort: SortOption) => void;
  setSearchQuery: (query: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Computed
  getFilteredAndSortedTodos: () => Todo[];
}

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  filter: "all",
  sort: "createdAt",
  searchQuery: "",
  isLoading: true,
  error: null,
  
  setTodos: (todos) => set({ todos }),
  setFilter: (filter) => set({ filter }),
  setSort: (sort) => set({ sort }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  getFilteredAndSortedTodos: () => {
    const { todos, filter, sort, searchQuery } = get();
    
    // フィルタリング
    let filtered = todos.filter((todo) => {
      // 検索フィルター
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = todo.title.toLowerCase().includes(query);
        const matchesDesc = todo.description?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc) return false;
      }
      
      // ステータスフィルター
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true;
    });
    
    // ソート
    filtered.sort((a, b) => {
      switch (sort) {
        case "dueDate":
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case "priority":
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case "title":
          return a.title.localeCompare(b.title, "ja");
        case "createdAt":
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
    
    return filtered;
  },
}));
