const USER_LOCAL_STORAGE_KEY = "userToken";

function getTokenUser(): string | null {
  const storedUser = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
}

function setTokenUser(token: string): void {
  window.localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(token));
}

function clearTokenUser(): void {
  window.localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
}

export { getTokenUser, setTokenUser, clearTokenUser };
