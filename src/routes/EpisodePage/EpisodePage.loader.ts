import type { EpisodeData } from "../EpisodesPage/EpisodesPage";
import { loadJsonItem } from "../../utils/loaders";

export const episodeLoader = (id: string) => {
  return loadJsonItem<EpisodeData>("/data/episode.json", id);
}
