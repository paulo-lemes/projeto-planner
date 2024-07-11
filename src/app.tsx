import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/trips/:tripId",
    element: <p>Trip details page</p>,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
