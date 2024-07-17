import { Activities } from "@/components/Activities";
import { ImportantLinks } from "@/components/ImportantLinks";
import { Participants } from "@/components/Participants";
import { TripLocationAndDates } from "@/components/TripLocationAndDates";
import { useLocationAndDates } from "@/hooks/useLocationAndDates";
import { useParams } from "react-router-dom";

export function TripDetails() {
  const { tripId } = useParams();

  const locationAndDatesProps = useLocationAndDates(tripId);

  return (
    <div className="min-h-dvh flex flex-col items-center py-10 px-5 lg:px-32 xl:px-40">
      <TripLocationAndDates tripId={tripId} {...locationAndDatesProps} />
      <main className="w-full sm:px-6 py-8 flex flex-wrap sm:flex-nowrap justify-stretch gap-8 lg:gap-16">
        <section className="w-full sm:flex-1">
          <Activities
            tripId={tripId}
            tripStartAndEndDates={locationAndDatesProps.tripStartAndEndDates}
            changedTripDates={locationAndDatesProps.changedTripDates}
          />
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
