import { pathUtil } from "../utils/pathUtil";

type TApiOption = Pick<RequestInit, "headers"> & { body?: Record<string, unknown> };

/**
 * fetch api 핸들링 함수
 * --
 */
export const api = {
  async get<T>(path: string, option?: TApiOption) {
    return await enhancedFetch<T>("get", path, option);
  },
  async post<T>(path: string, option?: TApiOption) {
    return await enhancedFetch<T>("post", path, option);
  },
  async put<T>(path: string, option?: TApiOption) {
    return await enhancedFetch<T>("put", path, option);
  },
  async delete<T>(path: string, option?: TApiOption) {
    return await enhancedFetch<T>("delete", path, option);
  },
};

const enhancedFetch = async <T>(method: "get" | "post" | "put" | "delete", path: string, option?: TApiOption) => {
  const host = import.meta.env.VITE_HOST;
  console.log(host);
  const { validated } = pathUtil;
  // const body = JSON.stringify(option.body);

  let init: RequestInit = {
    method,
    headers: option?.headers ?? {},
    // mode: "cors",
  };

  if (method === "post" || method === "put") {
    if (!option?.body) throw new Error("Body is empty");
    init = { ...init, body: JSON.stringify(option.body) };
  }

  try {
    const response = await fetch(`${host}/${validated(path)}`, init);

    console.log(response);
    if (response.ok) return response.json() as T;
    else throw new Error(response.statusText);
  } catch (error) {
    throw console.error(error);
  }
};
