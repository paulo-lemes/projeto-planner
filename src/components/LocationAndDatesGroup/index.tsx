import { Button } from "../Button";
import { Modal } from "../Modal";
import { inputIconStyle } from "@/utils";
import { MapPin, Calendar } from "lucide-react";
import { DayPicker, DateRange } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import { useState } from "react";

interface LocationAndDatesGroupProps {
  destination: string;
  setDestination: (value: string) => void;
  isInputsDisabled: boolean;
  tripStartAndEndDates: DateRange | undefined;
  setTripStartAndEndDates: (value: DateRange | undefined) => void;
  displayedDate: string | null;
}

export function LocationAndDatesGroup({
  destination,
  setDestination,
  isInputsDisabled,
  tripStartAndEndDates,
  setTripStartAndEndDates,
  displayedDate,
}: LocationAndDatesGroupProps) {
  const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false);

  return (
    <>
      <div className="flex-center gap-1 w-full mt-1.5 sm:mt-0 sm:w-max sm:flex-1">
        <MapPin className={inputIconStyle} />
        <input
          className="outline-none bg-transparent flex-1 placeholder:text-neutral-400 rounded-md pl-1 h-[90%] disabled:text-neutral-300"
          type="text"
          id="location"
          name="location"
          placeholder="Para onde você vai?"
          disabled={isInputsDisabled}
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      <button
        disabled={isInputsDisabled}
        onClick={() => setIsDatePickerModalOpen(true)}
        className={`flex items-center gap-2 text-left w-full sm:w-max sm:min-w-28 lg:min-w-36 ${
          displayedDate
            ? "text-neutral-100 disabled:text-neutral-300"
            : "text-neutral-400"
        }`}
      >
        <Calendar className={inputIconStyle} />
        <span className={`w-max shrink-0`}>{displayedDate || "Quando?"}</span>
      </button>

      {/* Date picker modal */}
      <Modal
        isModalOpen={isDatePickerModalOpen}
        closeModal={() => setIsDatePickerModalOpen(false)}
      >
        <h3 className="font-bold sm:text-lg">Selecione o período</h3>
        <DayPicker
          mode="range"
          locale={ptBR}
          selected={tripStartAndEndDates}
          onSelect={setTripStartAndEndDates}
          className="overflow-x-auto"
          disabled={{ before: new Date() }}
          modifiersClassNames={{
            selected: "bg-primary-400 text-neutral-950",
          }}
        />
        <Button
          type="button"
          onClick={() => setIsDatePickerModalOpen(false)}
          className="w-full mb-3"
        >
          Confirmar
        </Button>
        {tripStartAndEndDates && (
          <Button
            variant="secondary"
            type="button"
            onClick={() => setTripStartAndEndDates(undefined)}
            className="w-full"
          >
            Limpar
          </Button>
        )}
      </Modal>

      <div className="hidden sm:block w-px h-6 sm:mx-3 bg-neutral-800 self-center" />
    </>
  );
}
