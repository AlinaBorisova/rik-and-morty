import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import { RootLayout } from "./routes/RootLayout/RootLayout";
import { ErrorPage } from "./routes/ErrorPage/ErrorPage";
import { HomePage } from "./routes/HomePage/HomePage";
import { charactersLoader } from "./routes/CharactersPage/CharactersPage.loader";
import { characterLoader } from "./routes/CharacterPage/CharacterPage.loader";
import { CharacterPage } from "./routes/CharacterPage/CharacterPage";
import { locationsLoader } from "./routes/LocationsPage/LocationsPage.loader";
import { LocationPage } from "./routes/LocationPage/LocationPage";
import { locationLoader } from "./routes/LocationPage/LocationPage.loader";
import { episodesLoader } from "./routes/EpisodesPage/EpisodesPage.loader";
import { EpisodePage } from "./routes/EpisodePage/EpisodePage";
import { episodeLoader } from "./routes/EpisodePage/EpisodePage.loader";
import {NotFoundPage} from "./routes/NotFoundPage/NotFoundPage.tsx";
import { LoginPage } from "./routes/LoginPage/LoginPage.tsx";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
        <Route index element={<HomePage />} />
        <Route
          path="characters"
          loader={charactersLoader}
          lazy={async () => {
            const module = await import('./routes/CharactersPage/CharactersPage');
            return { element: <PrivateRoute><module.CharactersPage /></PrivateRoute> };
          }}
        />
        <Route
          path="characters/:id"
          element={<PrivateRoute><CharacterPage /></PrivateRoute>}
          loader={({ params }) => characterLoader(params.id ?? '')}
        />
        <Route
          path="locations"
          loader={locationsLoader}
          lazy={async () => {
            const module = await import('./routes/LocationsPage/LocationsPage');
            return { element: <PrivateRoute><module.LocationsPage /></PrivateRoute> };
          }}
        />
        <Route
          path="locations/:id"
          element={<PrivateRoute><LocationPage /></PrivateRoute>}
          loader={({ params }) => locationLoader(params.id ?? '')}
        />
        <Route
          path="episodes"
          loader={episodesLoader}
          lazy={async () => {
            const module = await import('./routes/EpisodesPage/EpisodesPage');
            return { element: <PrivateRoute><module.EpisodesPage /></PrivateRoute> };
          }}
        />
        <Route
          path="episodes/:id"
          element={<PrivateRoute><EpisodePage /></PrivateRoute>}
          loader={({ params }) => episodeLoader(params.id ?? '')}
        />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
);
