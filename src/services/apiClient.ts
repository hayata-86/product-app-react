export async function request<T>(
  url: string,
  options?: RequestInit,
  errorMessage = "API通信に失敗しました"
): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}