export type {
  ActivitiesProps,
  ImportantLinksProps,
  InputGroupWrapperProps,
  InputModalWrapperProps,
  InviteGuestsProps,
  LocationAndDatesGroupProps,
  ModalProps,
  ParticipantsProps,
  TripLocationAndDatesProps,
} from "./components-props";

export interface Activity {
  date: string;
  activities: {
    id: string;
    title: string;
    occurs_at: string;
  }[];
}

export interface Link {
  id: string;
  title: string;
  url: string;
}

export interface DialogContextType {
  isDialogOpen: boolean;
  openDialog: (value: string) => void;
  closeDialog: () => void;
  dialogText: string;
  redirectAfterClose: string | null;
  setRedirectAfterClose: (value: string | null) => void;
}
