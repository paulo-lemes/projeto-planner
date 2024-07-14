import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { api } from "@/lib/axios";
import { formatDisplayedDate } from "@/utils";

export function useLocationAndDates(tripId?: string) {
  const [destination, setDestination] = useState("");
  const [isLocationAndDatesDisabled, setIsLocationAndDatesDisabled] =
    useState(true);
  const [tripStartAndEndDates, setTripStartAndEndDates] = useState<
    DateRange | undefined
  >();
  const [changedTripDates, setChangedTripDates] = useState(0);

  const enableLocationAndDates = () => {
    setIsLocationAndDatesDisabled(false);
  };

  const disableLocationAndDates = () => {
    setIsLocationAndDatesDisabled(true);
  };

  const updateChangedTripDates = () => {
    setChangedTripDates((prev) => prev + 1);
  };

  useEffect(() => {
    if (tripId)
      api.get(`trips/${tripId}`).then((response) => {
        const trip = response.data.trip;
        setDestination(trip.destination);
        setTripStartAndEndDates({ from: trip.starts_at, to: trip.ends_at });
      });
  }, [tripId]);

  const displayedDate = formatDisplayedDate(tripStartAndEndDates);

  return {
    destination,
    setDestination,
    tripStartAndEndDates,
    setTripStartAndEndDates,
    displayedDate,
    isLocationAndDatesDisabled,
    enableLocationAndDates,
    disableLocationAndDates,
    changedTripDates,
    updateChangedTripDates,
  };
}
