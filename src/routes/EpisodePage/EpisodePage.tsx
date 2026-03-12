import { Await, useLoaderData } from "react-router-dom";
import type { Episode } from "../EpisodesPage/EpisodesPage";
import { isLoaderError, type LoaderErrorPayload } from "../../shared/lib/loaders";
import { Suspense } from "react";

export const EpisodePage = () => {
  const { episode: episodePromise } = useLoaderData<{
    episode: Promise<Episode | LoaderErrorPayload>;
  }>();

  return (
    <>
      <h1>Episode</h1>
      <Suspense fallback={<h2>Загрузка...</h2>}>
        <Await resolve={episodePromise}>
          {(episode) => {
            if (isLoaderError(episode)) throw episode;
            return (
              <div>
                <h2>{episode.name}</h2>
                <p>Air Date: {episode.air_date}</p>
                <p>Episode: {episode.episode}</p>
                <p>Created: {new Date(episode.created).toLocaleString('ru-RU')}</p>
              </div>
            );
          }}

        </Await>
      </Suspense>
    </>
  );
};
