import { useDialog } from "@/hooks/useDialog";
import { Button } from "../Button";

export function Dialog() {
  const { isDialogOpen, closeDialog, dialogText, redirectAfterClose } =
    useDialog();

  const handleCloseDialog = () => {
    closeDialog();
    if (redirectAfterClose) window.location.href = redirectAfterClose;
  };

  const isLoading = dialogText === "loading";

  return (
    isDialogOpen && (
      <div className="fixed inset-0 flex z-40 items-center justify-center">
        <div
          className="modal-overlay fixed inset-0 z-40 bg-black/60"
          onClick={isLoading ? undefined : handleCloseDialog}
        />
        <div className="modal-container max-w-full p-5 flex-center z-50 animate-fade-in">
          {isLoading ? (
            <div className="animate-spin-slow rounded-full size-10 border-4 border-b-transparent border-primary-500 border-solid" />
          ) : (
            <div className="relative bg-neutral-900 py-6 px-12 rounded-xl shadow-shape">
              <div className="w-max max-w-full flex flex-col gap-5">
                <p className="text-lg text-center">{dialogText}</p>
                <Button onClick={handleCloseDialog} className="m-auto">
                  Fechar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
}
