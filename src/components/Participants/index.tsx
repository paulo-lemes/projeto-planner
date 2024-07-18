import { useDialog } from "@/hooks/useDialog";
import { useInviteGuests } from "@/hooks/useInviteGuests";
import { api } from "@/lib/axios";
import { Participant, ParticipantsProps } from "@/types";
import {
  handleDelete,
  iconStyle,
  inputIconStyle,
  inputModalStyle,
} from "@/utils";
import {
  CircleCheck,
  CircleDashed,
  Pencil,
  User,
  UserPlus,
  UserX,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "../Button";
import { InputModalWrapper } from "../InputModalWrapper";
import { InviteGuests } from "../InviteGuests";
import { Modal } from "../Modal";

export function Participants({ tripId }: ParticipantsProps) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [idGuestUpdateName, setIdGuestUpdateName] = useState("");
  const [changedParticipant, setChangedParticipant] = useState(0);
  const [isEditNameModalOpen, setIsEditNameModalOpen] = useState(false);

  const {
    isInviteGuestsModalOpen,
    openInviteGuestsModal,
    closeInviteGuestsModal,
    guestList,
    setGuestList,
    addGuestEmail,
    deleteGuestEmail,
  } = useInviteGuests();
  const { openDialog, closeDialog } = useDialog();

  useEffect(() => {
    api
      .get(`trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants));
  }, [tripId, changedParticipant]);

  const handleParticipantConfirm = async (id: string) => {
    try {
      const response = await api.get(`/participants/${id}/confirm`);
      console.log(response);

      setChangedParticipant((prev) => prev + 1);
    } catch (error) {
      console.log("Erro -" + error);
      openDialog("Ocorreu um erro ao confirmar o participante");
    }
  };

  const openEditNameModal = (id: string) => {
    setIdGuestUpdateName(id);
    setIsEditNameModalOpen(true);
  };

  const handleUpdateGuestName = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = data.get("name")?.toString();

    if (!name) {
      openDialog("Preencha o campo para alterar o nome");
      return;
    }

    try {
      const response = await api.patch(`/participants/${idGuestUpdateName}`, {
        name,
      });
      console.log(response);

      setChangedParticipant((prev) => prev + 1);
      setIsEditNameModalOpen(false);
      setIdGuestUpdateName("");
      openDialog("Nome alterado com sucesso!");
    } catch (error) {
      console.log("Erro -" + error);
      openDialog("Ocorreu um erro ao atualizar o nome");
    }
  };

  const handleInviteGuests = async () => {
    openDialog("loading");
    try {
      const response = await api.post(`/trips/${tripId}/invites`, {
        emails_to_invite: guestList,
      });
      console.log(response);

      setChangedParticipant((prev) => prev + 1);
      closeInviteGuestsModal();
      setGuestList([]);
      closeDialog();
      openDialog("Convite(s) enviado(s) por e-mail com sucesso!");
    } catch (error) {
      closeDialog();
      console.log("Erro -" + error);
      openDialog("Ocorreu um erro ao convidar");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Participantes</h2>

      {/* List of participants */}
      <div className="space-y-5">
        {participants.length > 0 ? (
          participants.map(({ id, name, email, is_confirmed }, index) => (
            <div key={id} className="flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <p className="flex font-medium text-neutral-100 space-x-2">
                  <span className="truncate">
                    {name ?? `Convidado ${index}`}
                  </span>
                  <button
                    title="editar nome"
                    onClick={() => openEditNameModal(id)}
                  >
                    <Pencil className="size-3" />
                  </button>
                </p>
                <p className="block text-xs text-neutral-400 truncate">
                  {email}
                </p>
              </div>
              <div className="shrink-0 flex gap-2">
                {is_confirmed ? (
                  <span title="participante confirmado">
                    <CircleCheck className="text-primary-400 size-5 shrink-0" />
                  </span>
                ) : (
                  <button
                    type="button"
                    title="confirmar participante"
                    onClick={() => handleParticipantConfirm(id)}
                  >
                    <CircleDashed className="text-neutral-400 hover:text-neutral-200 size-5 shrink-0" />
                  </button>
                )}
                <button
                  type="button"
                  title="remover participante"
                  onClick={() =>
                    handleDelete(
                      "participants",
                      id,
                      () => setChangedParticipant((prev) => prev + 1),
                      () => openDialog("Participante removido com sucesso"),
                      () =>
                        openDialog("Ocorreu um erro ao remover o participante")
                    )
                  }
                  className="text-neutral-400 hover:text-neutral-200"
                >
                  <UserX className={iconStyle} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-neutral-500 text-sm">
            Nenhum participante cadastrado.
          </p>
        )}
      </div>
      <Button
        variant="secondary"
        className="w-full"
        onClick={openInviteGuestsModal}
      >
        <UserPlus className={iconStyle} />
        Convidar
      </Button>

      {/* Edit guest name modal */}
      <Modal
        isModalOpen={isEditNameModalOpen}
        closeModal={() => setIsEditNameModalOpen(false)}
      >
        <div className="space-y-4 w-[540px] max-w-full">
          <h3 className="font-semibold text-lg">
            Alterar nome do participante
          </h3>
          <form onSubmit={handleUpdateGuestName} className="space-y-3">
            <InputModalWrapper>
              <User className={inputIconStyle} />
              <input
                name="name"
                placeholder="Novo nome"
                className={inputModalStyle}
              />
            </InputModalWrapper>
            <Button type="submit" className="w-full h-11">
              Confirmar
            </Button>
          </form>
        </div>
      </Modal>

      {/* Invite guests modal */}
      <Modal
        isModalOpen={isInviteGuestsModalOpen}
        closeModal={closeInviteGuestsModal}
      >
        <InviteGuests
          guestList={guestList}
          addGuestEmail={addGuestEmail}
          deleteGuestEmail={deleteGuestEmail}
        >
          {guestList.length > 0 && (
            <Button onClick={handleInviteGuests} className="w-full h-11 -mt-2">
              Enviar convite{guestList.length > 1 && "s"}
            </Button>
          )}
        </InviteGuests>
      </Modal>
    </div>
  );
}
