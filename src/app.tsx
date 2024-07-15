import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DefaultLayout } from "./pages/layouts/DefaultLayout";
import { Home } from "@/pages/Home";
import { TripDetails } from "./pages/TripDetails";
import { DialogProvider } from "./contexts/DialogContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/trips/:tripId",
        element: <TripDetails />,
      },
    ],
  },
]);

export function App() {
  return (
    <DialogProvider>
      <RouterProvider router={router} />
    </DialogProvider>
  );
}
