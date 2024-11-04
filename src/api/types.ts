// Base types
export type Tresponse<T> = { data: T };
/**
 * Auth
 * --
 * @example {
  "message": "성공적으로 로그인 했습니다",
  "token": "eyJhbGciOiJIUzI1NiJ9.YXNkZkBhc2RmYXNkZi5jb20.h-oLZnV0pCeNKa_AM3ilQzerD2Uj7bKUn1xDft5DzOk"
  }
 */
export type Tauth = Record<"message" | "token", string>;
/**
 * Todos
 * --
 * @example {
    title: "hi";
    content: "hello";
    id: "z3FGrcRL55qDCFnP4KRtn";
    createdAt: "2022-07-24T14:15:55.537Z";
    updatedAt: "2022-07-24T14:15:55.537Z";
  }
 */
export type Ttodos = Record<"title" | "content" | "id" | "createdAt" | "updatedAt", string>;

// API types
export type TgetTodos = Tresponse<Ttodos[]>;
export type TgetTodoById = Tresponse<Ttodos>;
export type TcreateTodo = Tresponse<Ttodos>;
export type TupdateTodo = Tresponse<Ttodos>;
export type TdeleteTodo = Tresponse<null>;
