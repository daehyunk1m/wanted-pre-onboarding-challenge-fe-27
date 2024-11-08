import { api } from "../shared/client";
import { TCreateTodo, TDeleteTodo, TGetTodoById, TGetTodos, TUpdateTodo } from "./types";

export const getTodos = async (token: string) => {
  const response = await api.get<TGetTodos>("/todos", {
    headers: {
      Authorization: token,
    },
  });

  return response;
};

export const getTodoById = async (id: string, token: string) => {
  const response = await api.get<TGetTodoById>(`/todos/${id}`, {
    headers: {
      Authorization: token,
    },
  });

  return response;
};

export const createTodo = async ({ body, token }: { body: { title: string; content: string }; token: string }) => {
  const response = await api.post<TCreateTodo>("/todos", {
    body,
    headers: {
      Authorization: token,
    },
  });

  return response;
};

export const updateTodo = async ({ id, body, token }: { id: string; body: { title: string; content: string }; token: string }) => {
  const response = await api.put<TUpdateTodo>(`/todos/${id}`, {
    body,
    headers: {
      Authorization: token,
    },
  });

  return response;
};

export const deleteTodo = async ({ id, token }: { id: string; token: string }) => {
  const response = await api.delete<TDeleteTodo>(`/todos/${id}`, {
    headers: {
      Authorization: token,
    },
  });

  return response;
};
