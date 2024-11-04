import { api } from "../shared/client";
import { Tauth } from "./types";

export const login = async (body: { email: string; password: string }) => {
  const response = await api.post<Tauth>("/users/login", { body });

  return response;
};

export const signUp = async (body: { email: string; password: string }) => {
  const response = await api.post<Tauth>("/users/create", { body });

  return response;
};
