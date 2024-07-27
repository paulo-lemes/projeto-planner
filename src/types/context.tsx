export interface DialogContextType {
  isDialogOpen: boolean;
  openDialog: (value: string) => void;
  closeDialog: () => void;
  dialogText: string;
  redirectAfterClose: string | null;
  setRedirectAfterClose: (value: string | null) => void;
}
