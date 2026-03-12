import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import { RootLayout } from "./ui/RootLayout";
import { PrivateRoute } from "@/features/auth";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index
          lazy={async () => {
            const module = await import('../pages/home/HomePage');
            return { element: <module.HomePage /> };
          }}
        />
        <Route
          path="characters"
          lazy={async () => {
            const [pageModule, loaderModule] = await Promise.all([
              import('../pages/characters/CharactersPage'),
              import('../pages/characters/CharactersPage.loader'),
            ]);
            return {
              element: <PrivateRoute><pageModule.CharactersPage /></PrivateRoute>,
              loader: loaderModule.charactersLoader,
            };
          }}
        />
        <Route
          path="characters/:id"
          lazy={async () => {
            const [pageModule, loaderModule] = await Promise.all([
              import('../pages/character/CharacterPage'),
              import('../pages/character/CharacterPage.loader')
            ]);
            return {
              element: <PrivateRoute><pageModule.CharacterPage /></PrivateRoute>,
              loader: loaderModule.characterLoader,
            };
          }}
        />
        <Route
          path="locations"
          lazy={async () => {
            const [pageModule, loaderModule] = await Promise.all([
              import('../pages/locations/LocationsPage'),
              import('../pages/locations/LocationsPage.loader')
            ])

            return {
              element: <PrivateRoute><pageModule.LocationsPage /></PrivateRoute>,
              loader: loaderModule.locationsLoader,
            };
          }}
        />
        <Route
          path="locations/:id"
          lazy={async () => {
            const [pageModule, loaderModule] = await Promise.all([
              import('../pages/location/LocationPage'),
              import('../pages/location/LocationPage.loader'),
            ]);
            return {
              element: <PrivateRoute><pageModule.LocationPage /></PrivateRoute>,
              loader: loaderModule.locationLoader,
            };
          }}
        />
        <Route
          path="episodes"
          lazy={async () => {
            const [pageModule, loaderModule] = await Promise.all([
              import('../pages/episodes/EpisodesPage'),
              import('../pages/episodes/EpisodesPage.loader'),
            ]);
            return {
              element: <PrivateRoute><pageModule.EpisodesPage /></PrivateRoute>,
              loader: loaderModule.episodesLoader,
            };
          }}
        />
        <Route
          path="episodes/:id"
          lazy={async () => {
            const [pageModule, loaderModule] = await Promise.all([
              import('../pages/episode/EpisodePage'),
              import('../pages/episode/EpisodePage.loader'),
            ]);
            return {
              element: <PrivateRoute><pageModule.EpisodePage /></PrivateRoute>,
              loader: loaderModule.episodeLoader,
            };
          }}
        />
      </Route>
      <Route
        path="/login"
        lazy={async () => {
          const module = await import('../pages/login/LoginPage');
          return { element: <module.LoginPage /> };
        }}
      />
      <Route
        path="*"
        lazy={async () => {
          const module = await import('../pages/notFound/NotFoundPage');
          return { element: <module.NotFoundPage /> };
        }}
      />
    </>
  )
);
