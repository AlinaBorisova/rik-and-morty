import type { EpisodeData } from "./EpisodesPage";
import { loadJsonArray } from "../../utils/loaders";

export const episodesLoader = () => {
  return loadJsonArray<EpisodeData>("/data/episode.json");
}