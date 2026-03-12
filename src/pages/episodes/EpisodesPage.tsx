import { Await, Link, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { isLoaderError, type LoaderErrorPayload } from "../../shared/lib/loaders";
import { useInfiniteScroll } from "../../shared/lib/useInfiniteScroll";
import type { ApiPaginatedResponse } from "../../shared/types/api";
import type { Episode } from "../../entities/episode";


export const EpisodesPage = () => {
  const { episodes: episodesPromise } = useLoaderData() as {
    episodes: Promise<ApiPaginatedResponse<Episode> | LoaderErrorPayload>;
  };
  return (
    <>
      <h1>Episodes</h1>
      <Suspense fallback={<h2>Загрузка...</h2>}>
        <Await resolve={episodesPromise}>
          {(data) => {
            if (isLoaderError(data)) throw data;
            return <EpisodesList initialData={data} />;
          }}
        </Await>
      </Suspense>
    </>
  );
};

export const EpisodesList = ({ initialData }: { initialData: ApiPaginatedResponse<Episode> }) => {
  const { items: episodes, lastNodeRef, isPending, isLoadingMore, loadError } = useInfiniteScroll<Episode>(
    initialData.results ?? [],
    initialData.info?.next ?? null
  );

  return (
    <>
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
