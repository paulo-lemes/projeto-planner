import {
  CircleCheck,
  CircleDashed,
  Pencil,
  User,
  UserPlus,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { iconStyle, inputIconStyle, inputModalStyle } from "@/utils";
import { Button } from "../Button";
import { Modal } from "../Modal";
import { InputModalWrapper } from "../InputModalWrapper";
import { InviteGuests } from "../InviteGuests";

interface ParticipantsProps {
  tripId?: string;
}

interface Participant {
  id: string;
  name: string;
  email: string;
  is_confirmed: boolean;
}

export function Participants({ tripId }: ParticipantsProps) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [idGuestUpdateName, setIdGuestUpdateName] = useState("");
  const [changedParticipant, setChangedParticipant] = useState(0);
  const [isInviteGuestsModalOpen, setIsInviteGuestsModalOpen] = useState(false);
  const [isEditNameModalOpen, setIsEditNameModalOpen] = useState(false);
  const [guestList, setGuestList] = useState<string[]>([]);

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
      alert("Ocorreu um erro ao confirmar o participante. Tente novamente.");
    }
  };

  const openEditNameModal = (id: string) => {
    setIdGuestUpdateName(id);
    setIsEditNameModalOpen(true);
  };

  const handleUpdateGuest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = data.get("name")?.toString();

    if (!name) {
      alert("Preencha o campo para alterar o nome.");
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
    } catch (error) {
      console.log("Erro -" + error);
      alert("Ocorreu um erro ao cadastrar o link. Tente novamente.");
    }
  };

  const addGuestEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("guestEmail")?.toString();

    if (!email) {
      alert("Digite um e-mail válido");
      return;
    }

    if (guestList.includes(email)) {
      alert("E-mail digitado já está na lista");
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

  const handleInviteGuests = async () => {
    try {
      const response = await api.post(`/trips/${tripId}/invites`, {
        emails_to_invite: guestList,
      });
      console.log(response);

      setChangedParticipant((prev) => prev + 1);
      setIsInviteGuestsModalOpen(false);
      setGuestList([]);
    } catch (error) {
      console.log("Erro -" + error);
      alert("Ocorreu um erro ao cadastrar o link. Tente novamente.");
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
                <p className="block font-medium text-neutral-100 space-x-2">
                  <span>{name ?? `Convidado ${index}`}</span>

                  <button
                    title="editar nome"
                    onClick={() => openEditNameModal(id)}
                  >
                    <Pencil className="size-4" />
                  </button>
                </p>
                <p className="block text-xs text-neutral-400 truncate">
                  {email}
                </p>
              </div>
              {is_confirmed ? (
                <CircleCheck className="text-primary-400 size-5 shrink-0" />
              ) : (
                <button
                  type="button"
                  onClick={() => handleParticipantConfirm(id)}
                >
                  <CircleDashed className="text-neutral-400 size-5 shrink-0" />
                </button>
              )}
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
        onClick={() => setIsInviteGuestsModalOpen(true)}
      >
        <UserPlus className={iconStyle} />
        Convidar
      </Button>

      {/* Create link modal */}
      <Modal
        isModalOpen={isEditNameModalOpen}
        closeModal={() => setIsEditNameModalOpen(false)}
      >
        <div className="space-y-4 w-[540px] max-w-full">
          <h3 className="font-semibold text-lg">
            Alterar nome do participante
          </h3>
          <form onSubmit={handleUpdateGuest} className="space-y-3">
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
        closeModal={() => setIsInviteGuestsModalOpen(false)}
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
