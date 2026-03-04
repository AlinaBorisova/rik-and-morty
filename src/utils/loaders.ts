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
    throw new Response('Not Found', { status: 404 });
  }
};

export const loadJsonItem = async<T extends { id: number }>(path: string, id: string): Promise<T> => {
  const propsId = Number(id);
  if (Number.isNaN(propsId)) throw new Response('Not Found', { status: 404 });

  const data = await loadJsonArray<{ results: T[] }>(path);

  const listItems = Array.isArray(data) ? data : data.results;

  const findItem = listItems.find((item: { id: number }) => item.id === propsId);

  if (!findItem) throw new Response('Not Found', { status: 404 });

  return findItem as T;
};