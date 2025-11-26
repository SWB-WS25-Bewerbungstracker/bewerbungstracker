import keycloak from '../keycloak';

const API_BASE_URL = 'http://localhost:8080/api';

export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  await keycloak.updateToken(30).catch(() => {
    keycloak.login();
  });

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${keycloak.token}`,
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export const apiGet = <T,>(endpoint: string) => apiCall<T>(endpoint);
export const apiPost = <T,>(endpoint: string, body: unknown) =>
  apiCall<T>(endpoint, { method: 'POST', body: JSON.stringify(body) });
export const apiPut = <T,>(endpoint: string, body: unknown) =>
  apiCall<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) });
export const apiDelete = <T,>(endpoint: string) =>
  apiCall<T>(endpoint, { method: 'DELETE' });