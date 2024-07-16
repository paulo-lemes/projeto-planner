import { useEffect } from "react";
import { api } from "@/lib/axios";
import { InputGroupWrapper } from "../InputGroupWrapper";
import { LocationAndDatesGroup } from "../LocationAndDatesGroup";
import { Button } from "../Button";
import { DateRange } from "react-day-picker";
import { iconStyle } from "@/utils";
import { Pencil, Settings2 } from "lucide-react";
import { useDialog } from "@/hooks/useDialog";

interface TripLocationAndDatesProps {
  tripId?: string;
  destination: string;
  setDestination: (value: string) => void;
  tripStartAndEndDates: DateRange | undefined;
  setTripStartAndEndDates: (value: DateRange | undefined) => void;
  displayedDate: string | null;
  isLocationAndDatesDisabled: boolean;
  enableLocationAndDates: () => void;
  disableLocationAndDates: () => void;
  updateChangedTripDates: () => void;
}

export function TripLocationAndDates(props: TripLocationAndDatesProps) {
  const {
    tripId,
    destination,
    setDestination,
    tripStartAndEndDates,
    setTripStartAndEndDates,
    isLocationAndDatesDisabled,
    enableLocationAndDates,
    disableLocationAndDates,
    updateChangedTripDates,
  } = props;
  const { openDialog, closeDialog } = useDialog();

  useEffect(() => {
    api.get(`trips/${tripId}`).then((response) => {
      const trip = response.data.trip;
      setDestination(trip.destination);
      setTripStartAndEndDates({ from: trip.starts_at, to: trip.ends_at });
    });
  }, [tripId, setDestination, setTripStartAndEndDates]);

  const handleLocationAndDatesChange = async () => {
    if (!destination) {
      openDialog(
        "Erro ao processar a alteração: informação de destino deve conter pelo menos 4 caracteres"
      );
      return;
    }
    if (
      !tripStartAndEndDates ||
      !tripStartAndEndDates.from ||
      !tripStartAndEndDates.to
    ) {
      openDialog(
        "Erro ao processar a alteração: informação de período deve conter data de início e fim da viagem"
      );
      return;
    }

    openDialog("loading");
    try {
      const response = await api.put(`/trips/${tripId}`, {
        destination,
        starts_at: tripStartAndEndDates.from,
        ends_at: tripStartAndEndDates.to.setHours(23, 59, 0, 0),
      });
      console.log(response);

      disableLocationAndDates();
      setTimeout(() => {
        updateChangedTripDates();
      }, 500);
      closeDialog();
      openDialog("Informações alteradas com sucesso!");
    } catch (error) {
      console.log("Erro -" + error);
      openDialog("Ocorreu um erro ao alterar as informações da viagem");
    }
  };

  return (
    <InputGroupWrapper classCSS="min-w-full">
      <LocationAndDatesGroup
        {...props}
        isInputsDisabled={isLocationAndDatesDisabled}
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
          onClick={enableLocationAndDates}
          className="w-full sm:w-max"
        >
          Alterar local/data
          <Settings2 className={iconStyle} />
        </Button>
      )}
    </InputGroupWrapper>
  );
}
