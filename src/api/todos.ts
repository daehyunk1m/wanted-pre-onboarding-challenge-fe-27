import { api } from "../shared/client";
import { TcreateTodo, TdeleteTodo, TgetTodoById, TgetTodos, TupdateTodo } from "./types";

export const getTodos = async () => {
  const response = await api.get<TgetTodos>("/todos");

  return response;
};

export const getTodoById = async (id: string) => {
  const response = await api.get<TgetTodoById>(`/todos/${id}`);

  return response;
};

export const createTodo = async (body: { title: string; content: string }) => {
  const response = await api.post<TcreateTodo>("/todos", {
    body,
  });

  return response;
};

export const updateTodo = async (id: string) => {
  const response = await api.put<TupdateTodo>(`/todos/${id}`);

  return response;
};

export const deleteTodo = async (id: string) => {
  const response = await api.delete<TdeleteTodo>(`/todos/${id}`);

  return response;
};
