import type { Episode } from "../EpisodesPage/EpisodesPage";
import { loadItemFromListOrApi, loadJsonItem } from "../../utils/loaders";

const API_EPISODES = "https://rickandmortyapi.com/api/episode";

export const episodeLoader = ({ params }: { params: { id?: string } }) => {
  const id = params.id ?? "";
  return {
    episode: loadItemFromListOrApi<Episode>({
      listCacheKey: "episodes",
      itemId: id,
      itemCacheKeyPrefix: "episode",
      apiBaseUrl: API_EPISODES,
    }),
  };
};

