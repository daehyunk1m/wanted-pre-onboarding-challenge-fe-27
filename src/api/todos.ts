import { api } from "../shared/client";
import { TcreateTodo, TdeleteTodo, TgetTodoById, TgetTodos, TupdateTodo } from "./types";

export const getTodos = async (token: string) => {
  const response = await api.get<TgetTodos>("/todos", {
    headers: {
      Authorization: token,
    },
  });

  return response;
};

export const getTodoById = async (id: string, token: string) => {
  const response = await api.get<TgetTodoById>(`/todos/${id}`, {
    headers: {
      Authorization: token,
    },
  });

  return response;
};

export const createTodo = async (body: { title: string; content: string }, token: string) => {
  const response = await api.post<TcreateTodo>("/todos", {
    body,
    headers: {
      Authorization: token,
    },
  });

  return response;
};

export const updateTodo = async (id: string, token: string) => {
  const response = await api.put<TupdateTodo>(`/todos/${id}`, {
    headers: {
      Authorization: token,
    },
  });

  return response;
};

export const deleteTodo = async (id: string, token: string) => {
  const response = await api.delete<TdeleteTodo>(`/todos/${id}`, {
    headers: {
      Authorization: token,
    },
  });

  return response;
};
