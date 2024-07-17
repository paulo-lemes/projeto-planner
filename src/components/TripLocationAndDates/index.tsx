import { useDialog } from "@/hooks/useDialog";
import { api } from "@/lib/axios";
import { TripLocationAndDatesProps } from "@/types";
import { iconStyle, validateAndReturnStartDate } from "@/utils";
import { Pencil, Settings2 } from "lucide-react";
import { Button } from "../Button";
import { InputGroupWrapper } from "../InputGroupWrapper";
import { LocationAndDatesGroup } from "../LocationAndDatesGroup";

export function TripLocationAndDates(props: TripLocationAndDatesProps) {
  const {
    tripId,
    destination,
    tripStartAndEndDates,
    isLocationAndDatesDisabled,
    enableLocationAndDates,
    disableLocationAndDates,
    updateChangedTripDates,
  } = props;
  const { openDialog, closeDialog } = useDialog();

  const handleLocationAndDatesChange = async () => {
    if (!destination || destination.length < 4) {
      openDialog("Erro ao processar a alteração: informação de destino deve conter pelo menos 4 caracteres");
      return;
    }

    if (
      !tripStartAndEndDates ||
      !tripStartAndEndDates.from ||
      !tripStartAndEndDates.to
    ) {
      openDialog("Erro ao processar a alteração: informação de período deve conter data de início e fim da viagem");
      return;
    }

    const tripDateFrom = new Date(tripStartAndEndDates.from);
    const startDate = validateAndReturnStartDate(tripDateFrom);
    const endDate = new Date(tripStartAndEndDates.to).setHours(23, 59, 0, 0);

    openDialog("loading");
    try {
      const response = await api.put(`/trips/${tripId}`, {
        destination,
        starts_at: startDate,
        ends_at: endDate,
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
