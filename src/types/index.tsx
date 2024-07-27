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

export type { Activity, Link, Participant } from "./common";

export interface DialogContextType {
  isDialogOpen: boolean;
  openDialog: (value: string) => void;
  closeDialog: () => void;
  dialogText: string;
  redirectAfterClose: string | null;
  setRedirectAfterClose: (value: string | null) => void;
}
