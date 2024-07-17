import { Dialog } from "@/components/Dialog";
import { Outlet } from "react-router-dom";

export function DefaultLayout() {
  return (
    <>
      <Outlet />
      <Dialog />
    </>
  );
}
