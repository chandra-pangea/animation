export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

async function request<T>(path: string, body: object): Promise<T> {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? 'Request failed');
  return data as T;
}

export function login(email: string, password: string) {
  return request<AuthResponse>('/api/auth/login', { email, password });
}

export function register(name: string, email: string, password: string) {
  return request<AuthResponse>('/api/auth/register', { name, email, password });
}
