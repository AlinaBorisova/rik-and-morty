import { CACHE_TTL_MS, cachedAsync, getCached } from "./cache";

type ListWithResults<T> = { results: T[] };

export type LoaderErrorPayload = {
  __error: true;
  status: number;
  message?: string;
};

export function isLoaderError(data: unknown): data is LoaderErrorPayload {
  return (
    typeof data === "object" &&
    data !== null &&
    "__error" in data &&
    (data as LoaderErrorPayload).__error === true
  );
}

export async function runLoader<T>(
  fn: () => Promise<T>
): Promise<T | LoaderErrorPayload> {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof Response) {
      return {
        __error: true,
        status: error.status,
        message: error.statusText || "Ошибка загрузки",
      };
    }
    return {
      __error: true,
      status: 503,
      message: "Ошибка загрузки данных",
    };
  }
}

export const loadJsonArray = async <T>(path: string): Promise<T> => {
  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Response(await response.text(), {
        status: response.status,
        statusText: response.statusText,
      });
    }

    const data = await response.json();

    return data as T;
  } catch (error) {
    if (error instanceof Response) throw error;
    console.log(error);
    throw new Response('Ошибка загрузки данных', { status: 503 })
  }
};

export const loadJsonItem = async<T extends { id: number }>(path: string, id: string): Promise<T> => {
  const propsId = Number(id);
  if (Number.isNaN(propsId)) throw new Response('Ошибка загрузки данных', { status: 503 });

  const data = await loadJsonArray<{ results: T[] }>(path);

  const listItems = Array.isArray(data) ? data : data.results;

  const findItem = listItems.find((item: { id: number }) => item.id === propsId);

  if (!findItem) throw new Response('Ошибка загрузки данных', { status: 503 });

  return findItem as T;
};

export async function loadItemFromListOrApi<T extends { id: number }>(config: {
  listCacheKey: string;
  itemId: string;
  itemCacheKeyPrefix: string;
  apiBaseUrl: string;
}): Promise<T | LoaderErrorPayload> {
  return runLoader(async () => {
    const list = getCached<ListWithResults<T>>(config.listCacheKey);
    const numId = Number(config.itemId);
    if (list?.results && Number.isInteger(numId)) {
      const fromList = list.results.find((item) => item.id === numId);
      if (fromList) return fromList;
    }
    return cachedAsync(
      `${config.itemCacheKeyPrefix}-${config.itemId}`,
      CACHE_TTL_MS,
      () => loadJsonArray<T>(`${config.apiBaseUrl}/${config.itemId}`)
    );
  });
}
