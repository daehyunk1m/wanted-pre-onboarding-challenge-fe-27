import { api } from "../shared/client";
import { TAuth } from "./types";

export const login = async (body: { email: string; password: string }) => {
  const response = await api.post<TAuth>("/users/login", { body });

  return response;
};

export const signUp = async (body: { email: string; password: string }) => {
  const response = await api.post<TAuth>("/users/create", { body });

  return response;
};
