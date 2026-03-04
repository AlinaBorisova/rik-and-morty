export const CACHE_TTL_MS = 10 * 60 * 1000;

const cacheStore = new Map<string, { data: unknown; timestamp: number }>();

export async function cachedAsync<T>(
  key: string,
  ttlMs: number,
  loader: () => Promise<T>
): Promise<T> {
  const now = Date.now();
  const entry = cacheStore.get(key);

  if (entry && now - entry.timestamp < ttlMs) {
    return entry.data as T;
  }

  const data = await loader();
  cacheStore.set(key, { data, timestamp: now });
  
  return data;
}