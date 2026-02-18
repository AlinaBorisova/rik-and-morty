import { Link, useLoaderData } from "react-router-dom";

export interface EpisodeData {
  id: number,
  name: string,
  air_date: string,
  episode: string,
  created: string
};

export const EpisodesPage = () => {
  const episodes = useLoaderData<EpisodeData[]>();

  return (
    <>
      <h1>Episodes</h1>
      {episodes.map((episode: EpisodeData) => (
        <div key={episode.id}>
          <Link to={`${episode.id}`}>
            <h2>{episode.name}</h2>
          </Link>
        </div>
      ))}
    </>
  );
};
