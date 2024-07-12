import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { InputGroupWrapper } from "../InputGroupWrapper";
import { LocationAndDatesGroup } from "../LocationAndDatesGroup";
import { Button } from "../Button";
import { DateRange } from "react-day-picker";
import { formatDisplayedDate, iconStyle } from "@/utils";
import { Pencil, Settings2 } from "lucide-react";

interface TripLocationAndDatesProps {
  tripId?: string;
}

export function TripLocationAndDates({ tripId }: TripLocationAndDatesProps) {
  const [destination, setDestination] = useState("");
  const [isLocationAndDatesDisabled, setIsLocationAndDatesDisabled] =
    useState(true);
  const [tripStartAndEndDates, setTripStartAndEndDates] = useState<
    DateRange | undefined
  >();

  useEffect(() => {
    api.get(`trips/${tripId}`).then((response) => {
      const trip = response.data.trip;
      setDestination(trip.destination);
      setTripStartAndEndDates({ from: trip.starts_at, to: trip.ends_at });
    });
  }, [tripId]);

  const handleLocationAndDatesChange = async () => {
    if (!destination) {
      alert(
        "Erro ao processar a alteração: informação de destino deve conter pelo menos 4 caracteres."
      );
      return;
    }
    if (
      !tripStartAndEndDates ||
      !tripStartAndEndDates.from ||
      !tripStartAndEndDates.to
    ) {
      alert(
        "Erro ao processar a alteração: informação de período deve conter data de início e fim da viagem."
      );
      return;
    }

    try {
      const response = await api.put(`/trips/${tripId}`, {
        destination,
        starts_at: tripStartAndEndDates.from,
        ends_at: tripStartAndEndDates.to,
      });
      console.log(response);

      setIsLocationAndDatesDisabled(true);
    } catch (error) {
      console.log("Erro -" + error);
      alert("Ocorreu um erro ao criar a viagem. Tente novamente.");
    }
  };

  const displayedDate = formatDisplayedDate(tripStartAndEndDates);

  return (
    <InputGroupWrapper classCSS="min-w-full">
      <LocationAndDatesGroup
        destination={destination}
        setDestination={setDestination}
        isInputsDisabled={isLocationAndDatesDisabled}
        tripStartAndEndDates={tripStartAndEndDates}
        setTripStartAndEndDates={setTripStartAndEndDates}
        displayedDate={displayedDate}
      />
      {!isLocationAndDatesDisabled ? (
        <Button
          type="button"
          onClick={handleLocationAndDatesChange}
          className="w-full sm:w-max"
        >
          Confirmar alteração
          <Pencil className={iconStyle} />
        </Button>
      ) : (
        <Button
          variant="secondary"
          type="button"
          onClick={() => setIsLocationAndDatesDisabled(false)}
          className="w-full sm:w-max"
        >
          Alterar local/data
          <Settings2 className={iconStyle} />
        </Button>
      )}
    </InputGroupWrapper>
  );
}
