const TOKEN_KEY = "token";
const USER_KEY = "user";

export const saveToken = (
  token: string
): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const saveUser = (
  user: unknown
): void => {
  localStorage.setItem(
    USER_KEY,
    JSON.stringify(user)
  );
};

export const getUser = <T>(): T | null => {
  const user = localStorage.getItem(USER_KEY);

  if (!user) {
    return null;
  }

  return JSON.parse(user) as T;
};

export const removeUser = (): void => {
  localStorage.removeItem(USER_KEY);
};

export const clearStorage = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};