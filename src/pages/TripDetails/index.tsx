import { useParams } from "react-router-dom"

export function TripDetails() {
  const {tripId} = useParams()
  console.log(tripId);
  
  return (
    <div>
      
    </div>
  )
}
