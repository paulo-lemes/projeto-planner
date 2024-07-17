import { Home } from "@/pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DialogProvider } from "./contexts/DialogContext";
import { DefaultLayout } from "./pages/layouts/DefaultLayout";
import { TripDetails } from "./pages/TripDetails";

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
