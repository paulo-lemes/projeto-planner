import { useParams } from "react-router-dom";
import { TripLocationAndDates } from "@/components/TripLocationAndDates";
import { Activities } from "@/components/Activities";
import { ImportantLinks } from "@/components/ImportantLinks";
import { Participants } from "@/components/Participants";

export function TripDetails() {
  const { tripId } = useParams();

  return (
    <div className="min-h-dvh flex flex-col items-center py-10 px-5 lg:px-32 xl:px-40">
      <TripLocationAndDates tripId={tripId} />
      <main className="w-full sm:px-6 py-8 flex flex-wrap sm:flex-nowrap justify-stretch gap-8 lg:gap-16">
        <section className="w-full sm:flex-1">
          <Activities tripId={tripId} />
        </section>
        <section className="w-full sm:w-60 lg:w-68 xl:w-80 flex flex-col gap-6">
          <ImportantLinks tripId={tripId} />
          <div className="h-px bg-neutral-800" />
          <Participants tripId={tripId} />
        </section>
      </main>
    </div>
  );
}
