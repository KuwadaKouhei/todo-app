"use client";

import { motion } from "framer-motion";
import {
  Search,
  ArrowUpDown,
  ListFilter,
  Clock,
  Flag,
  Calendar,
  ArrowDownAZ
} from "lucide-react";
import { FilterOption, SortOption } from "@/types/todo";

interface FilterBarProps {
  filter: FilterOption;
  sort: SortOption;
  searchQuery: string;
  onFilterChange: (filter: FilterOption) => void;
  onSortChange: (sort: SortOption) => void;
  onSearchChange: (query: string) => void;
  totalCount: number;
  activeCount: number;
}

const filters: { value: FilterOption; label: string }[] = [
  { value: "all", label: "すべて" },
  { value: "active", label: "未完了" },
  { value: "completed", label: "完了" },
];

const sorts: { value: SortOption; label: string; icon: typeof Clock }[] = [
  { value: "createdAt", label: "作成日", icon: Clock },
  { value: "dueDate", label: "期限", icon: Calendar },
  { value: "priority", label: "優先度", icon: Flag },
  { value: "title", label: "名前順", icon: ArrowDownAZ },
];

export const FilterBar = ({
  filter,
  sort,
  searchQuery,
  onFilterChange,
  onSortChange,
  onSearchChange,
  totalCount,
  activeCount,
}: FilterBarProps) => {
  return (
    <div className="space-y-4">
      {/* 検索バー */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="タスクを検索..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-ink-200 rounded-2xl
                   text-ink-800 placeholder-ink-400
                   focus:outline-none focus:ring-2 focus:ring-sage-500/50 focus:border-sage-500
                   transition-all shadow-sm"
        />
      </div>

      {/* フィルター & ソート */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        {/* フィルタータブ */}
        <div className="flex items-center gap-1 p-1 bg-ink-100 rounded-xl">
          {filters.map((f) => (
            <motion.button
              key={f.value}
              whileTap={{ scale: 0.95 }}
              onClick={() => onFilterChange(f.value)}
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors
                        ${filter === f.value
                  ? "text-ink-800"
                  : "text-ink-500 hover:text-ink-700"
                }`}
            >
              {filter === f.value && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-white rounded-lg shadow-sm"
                  transition={{ type: "spring", duration: 0.3 }}
                />
              )}
              <span className="relative z-10">{f.label}</span>
            </motion.button>
          ))}
        </div>

        {/* ソートドロップダウン */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-ink-500">
            {activeCount} / {totalCount} タスク
          </span>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="appearance-none pl-4 pr-10 py-2 bg-white border border-ink-200 rounded-xl
                       text-sm text-ink-700 font-medium
                       focus:outline-none focus:ring-2 focus:ring-sage-500/50 focus:border-sage-500
                       cursor-pointer transition-all shadow-sm"
            >
              {sorts.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
