import { Link, useLoaderData } from "react-router-dom";
import { isLoaderError, type LoaderErrorPayload } from "../../utils/loaders";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import type { ApiPaginatedResponse } from "../../types/api";

export interface Episode {
  id: number,
  name: string,
  air_date: string,
  episode: string,
  created: string
}

export const EpisodesPage = () => {
  const rawData = useLoaderData<ApiPaginatedResponse<Episode> | LoaderErrorPayload | undefined>();
  const fallback = { results: [] as Episode[], info: { count: 0, next: null, pages: 0 } };
  const initialData = isLoaderError(rawData) ? fallback : (rawData ?? fallback);
  const { items: episodes, lastNodeRef, isPending, isLoadingMore, loadError } = useInfiniteScroll<Episode>(
    initialData.results ?? [],
    initialData.info?.next ?? null
  );

  if (isLoaderError(rawData)) throw rawData;

  return (
    <>
      <h1>Episodes</h1>
      {episodes.map((episode: Episode) => (
        <div key={episode.id}>
          <Link to={`${episode.id}`}>
            <h2>{episode.name}</h2>
          </Link>
        </div>
      ))}
      {(isPending || isLoadingMore) && <h2>Загрузка...</h2>}
      {loadError && (<p>{loadError}</p>)}
      <div ref={lastNodeRef} style={{ opacity: 0 }}></div>
    </>
  );
};
