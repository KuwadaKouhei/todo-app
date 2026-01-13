export type Priority = "low" | "medium" | "high";

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  dueDate?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface TodoInput {
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: Date | null;
}

export type SortOption = "createdAt" | "dueDate" | "priority" | "title";
export type FilterOption = "all" | "active" | "completed";
