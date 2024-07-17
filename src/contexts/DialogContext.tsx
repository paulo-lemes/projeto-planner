import { ReactNode, createContext, useCallback, useState } from "react";

export interface DialogContextType {
  isDialogOpen: boolean;
  openDialog: (value: string) => void;
  closeDialog: () => void;
  dialogText: string;
  redirectAfterClose: string | null;
  setRedirectAfterClose: (value: string | null) => void;
}

export const DialogContext = createContext<DialogContextType>({
  isDialogOpen: false,
  openDialog: () => {},
  closeDialog: () => {},
  dialogText: "",
  redirectAfterClose: "",
  setRedirectAfterClose: () => {},
});

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogText, setDialogText] = useState("");
  const [redirectAfterClose, setRedirectAfterClose] = useState<string | null>(
    null
  );

  const openDialog = useCallback((text: string) => {
    setDialogText(text);
    setIsDialogOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  return (
    <DialogContext.Provider
      value={{
        isDialogOpen,
        openDialog,
        closeDialog,
        dialogText,
        redirectAfterClose,
        setRedirectAfterClose,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};
