import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "./firebase";
import { Todo, TodoInput } from "@/types/todo";

const COLLECTION_NAME = "todos";

// Firestoreのドキュメントをアプリのモデルに変換
const convertTodo = (doc: DocumentData, id: string): Todo => {
  const data = doc;
  return {
    id,
    title: data.title,
    description: data.description || "",
    completed: data.completed,
    priority: data.priority,
    dueDate: data.dueDate ? data.dueDate.toDate() : null,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
    userId: data.userId,
  };
};

// Todoを追加
export const addTodo = async (
  todo: TodoInput,
  userId: string
): Promise<string> => {
  const now = Timestamp.now();
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...todo,
    completed: false,
    dueDate: todo.dueDate ? Timestamp.fromDate(todo.dueDate) : null,
    createdAt: now,
    updatedAt: now,
    userId,
  });
  return docRef.id;
};

// Todoを更新
export const updateTodo = async (
  id: string,
  updates: Partial<TodoInput> & { completed?: boolean }
): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const updateData: Record<string, unknown> = {
    ...updates,
    updatedAt: Timestamp.now(),
  };
  
  if (updates.dueDate !== undefined) {
    updateData.dueDate = updates.dueDate
      ? Timestamp.fromDate(updates.dueDate)
      : null;
  }
  
  await updateDoc(docRef, updateData);
};

// Todoを削除
export const deleteTodo = async (id: string): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
};

// ユーザーの全Todoを取得（一度だけ）
export const getTodos = async (userId: string): Promise<Todo[]> => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => convertTodo(doc.data(), doc.id));
};

// リアルタイム購読
export const subscribeTodos = (
  userId: string,
  callback: (todos: Todo[]) => void
): (() => void) => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  
  const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
    const todos = snapshot.docs.map((doc) => convertTodo(doc.data(), doc.id));
    callback(todos);
  });
  
  return unsubscribe;
};
