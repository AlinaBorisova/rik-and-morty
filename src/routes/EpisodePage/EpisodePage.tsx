import { useLoaderData } from "react-router-dom";
import type { EpisodeData } from "../EpisodesPage/EpisodesPage";

export const EpisodePage = () => {
  const episode = useLoaderData<EpisodeData>();

  return (
    <>
      <h1>Episode</h1>
      <h2>{episode.name}</h2>
      <p>Air Date: {episode.air_date}</p>
      <p>Episode: {episode.episode}</p>
      <p>Created: {new Date(episode.created).toLocaleString('ru-RU')}</p>
    </>
  );
};
