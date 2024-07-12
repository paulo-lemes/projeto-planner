import { useParams } from "react-router-dom"
import { TripLocationAndDates } from "@/components/TripLocationAndDates";
import { Activities } from "@/components/Activities";

export function TripDetails() {
  const {tripId} = useParams()
  
  return (
    <div className="min-h-dvh flex flex-col items-center py-10 px-5 lg:px-40">
      <TripLocationAndDates tripId={tripId} />
      <main className="w-full px-6 py-8 flex flex-wrap sm:flex-nowrap justify-stretch lg:gap-16">
        <section className="flex-1">
          <Activities tripId={tripId} />
        </section>
        <section>
          Important Links
        </section>
      </main>
    </div>
  )
}
