import { ModalProps } from "@/types";
import { X } from "lucide-react";
import { useEffect } from "react";

export function Modal({ isModalOpen, children, closeModal }: ModalProps) {
  useEffect(() => {
    isModalOpen
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalOpen]);

  return (
    isModalOpen && (
      <div className="fixed inset-0 flex z-40 items-center justify-center">
        <div
          className="modal-overlay fixed inset-0 z-40 bg-black/60"
          onClick={closeModal}
        />
        <div className="modal-container max-w-full p-5 flex-center z-50 animate-fade-in">
          <div className="relative bg-neutral-900 py-5 px-6 rounded-xl shadow-shape">
            <button
              type="button"
              title="fechar"
              onClick={closeModal}
              className="absolute top-5 right-6"
            >
              <X className="size-5" />
            </button>
            {children}
          </div>
        </div>
      </div>
    )
  );
}
