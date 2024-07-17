import { FormEvent, ReactNode } from "react";
import { DateRange } from "react-day-picker";

export interface ActivitiesProps {
  tripId?: string;
  tripStartAndEndDates: DateRange | undefined;
  changedTripDates: number;
}

export interface ImportantLinksProps {
  tripId?: string;
}

export interface InputGroupWrapperProps {
  children: ReactNode;
  classCSS?: string;
}

export interface InputModalWrapperProps {
  children: ReactNode;
}

export interface InviteGuestsProps {
  guestList: string[];
  addGuestEmail: (event: FormEvent<HTMLFormElement>) => void;
  deleteGuestEmail: (value: string) => void;
  children?: ReactNode;
}

export interface LocationAndDatesGroupProps {
  destination: string;
  setDestination: (value: string) => void;
  isInputsDisabled: boolean;
  tripStartAndEndDates: DateRange | undefined;
  setTripStartAndEndDates: (value: DateRange | undefined) => void;
  displayedDate: string | null;
}

export interface ModalProps {
  children: ReactNode;
  isModalOpen: boolean;
  closeModal: () => void;
}

export interface ParticipantsProps {
  tripId?: string;
}

export interface TripLocationAndDatesProps {
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
