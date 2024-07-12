import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "@/pages/Home";
import { TripDetails } from "./pages/TripDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/trips/:tripId",
    element: <TripDetails />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
