import type { EpisodeData } from "../EpisodesPage/EpisodesPage";

export const episodeLoader = async (id: string): Promise<EpisodeData> => {
  try {
    const response = await fetch('/data/episode.json');
    const data = (await response.json()) as EpisodeData[];

    const findEpisode = data.find((episode: EpisodeData) => episode.id === Number(id));
    if (!findEpisode) throw new Response('Not Found', { status: 404 });

    return findEpisode;
  } catch (error) {
    throw new Response('Not Found', { status: 404 });
  }
}