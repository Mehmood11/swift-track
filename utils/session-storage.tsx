export function getSessionStorage(key: string): string | null {
  let data: string | null = null;
  try {
    data = typeof window !== "undefined" ? sessionStorage.getItem(key) : null;
    if (data) {
      data = JSON.parse(data);
    }
  } catch (error) {
    // If stored data is not a stringified JSON this might fail,
    // that's why we catch the error
  }
  return data;
}

export function setSessionStorage(key: string, data: any): void {
  try {
    typeof window !== "undefined" &&
      sessionStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    /* empty */
  }
}

export function removeSessionStorage(key: string): void {
  try {
    typeof window !== "undefined" && sessionStorage.removeItem(key);
  } catch (error) {
    // If stored data is not a stringified JSON this might fail,
    // that's why we catch the error
  }
}

export function clearSessionStorage(): void {
  sessionStorage.clear();
}
