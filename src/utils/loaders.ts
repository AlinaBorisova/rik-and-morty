export const loadJsonArray = async <T>(path: string): Promise<T[]> => {
  try {
    const response = await fetch(path);

    return (await response.json()) as T[];
  } catch (error) {
    console.log(error);
    throw new Response('Not Found', { status: 404 });
  }
};

export const loadJsonItem = async<T extends { id: number }> (path: string, id: string): Promise<T> => {
  const propsId = Number(id);
  if (Number.isNaN(propsId)) throw new Response('Not Found', { status: 404 });

  const data = await loadJsonArray<T>(path);

    const findItem = data.find((item) => item.id === propsId);
    if (!findItem) throw new Response('Not Found', { status: 404 });

    return findItem;
};