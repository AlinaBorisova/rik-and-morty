import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./routes/RootLayout/RootLayout";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
  }
]);