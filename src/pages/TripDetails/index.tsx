import { TripLocationAndDates } from "@/components/TripLocationAndDates";
import { useParams } from "react-router-dom"

export function TripDetails() {
  const {tripId} = useParams()
  console.log(tripId);
  
  return (
    <div className="min-h-dvh flex flex-col items-center py-10 lg:px-40">
      <TripLocationAndDates tripId={tripId} />
    </div>
  )
}
