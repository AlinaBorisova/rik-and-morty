import type { EpisodeData } from "./EpisodesPage";

export const episodesLoader = async (): Promise<EpisodeData[]> => {
  try {
    const response = await fetch('/data/episode.json')
    const data = (await response.json()) as EpisodeData[];

    return data;
  } catch (error) {
    throw new Response('Not Found', { status: 404 });
  }
}