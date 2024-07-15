import { FormEvent, useState } from "react";
import { useDialog } from "./useDialog";

export function useInviteGuests() {
  const [isInviteGuestsModalOpen, setIsInviteGuestsModalOpen] = useState(false);
  const [guestList, setGuestList] = useState<string[]>([]);

  const { openDialog } = useDialog();

  const openInviteGuestsModal = () => {
    setIsInviteGuestsModalOpen(true)
  }

  const closeInviteGuestsModal = () => {
    setIsInviteGuestsModalOpen(false)
  }

  const addGuestEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("guestEmail")?.toString();

    if (!email) {
      openDialog("Digite um e-mail válido");
      return;
    }

    if (guestList.includes(email)) {
      openDialog("E-mail digitado já está na lista");
      return;
    }

    const newGuestList = [...guestList, email];
    setGuestList(newGuestList);

    event.currentTarget.reset();
  };

  const deleteGuestEmail = (selectedEmail: string) => {
    const newGuestList = guestList.filter((email) => email !== selectedEmail);
    setGuestList(newGuestList);
  };

  return {
    isInviteGuestsModalOpen,
    openInviteGuestsModal,
    closeInviteGuestsModal,
    guestList,
    setGuestList,
    addGuestEmail,
    deleteGuestEmail
  }
}
