import {
  AtSign,
  CircleCheck,
  CircleDashed,
  Pencil,
  Plus,
  User,
  UserPlus,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { Button } from "../Button";
import { Modal } from "../Modal";
import { InputModalWrapper } from "../InputModalWrapper";
import { iconStyle, inputIconStyle, inputModalStyle } from "@/utils";

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
        <div className="lg:w-[720px] max-w-full flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h2 className="font-lg font-semibold">Selecionar convidados</h2>
            <p className="text-sm text-zinc-400">
              Os convidados irão receber e-mails para confirmar a participação
              na viagem.
            </p>
          </div>
          {guestList.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {guestList.map((email) => (
                <div
                  key={email}
                  className="py-1.5 px-2.5 bg-neutral-800 flex gap-2.5 rounded-md"
                >
                  <p className="text-neutral-300">{email}</p>
                  <button
                    type="button"
                    title="remover"
                    onClick={() => deleteGuestEmail(email)}
                  >
                    <X className={iconStyle} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="h-px w-full bg-neutral-800" />
          <form
            onSubmit={addGuestEmail}
            className="w-full min-h-16 py-3 px-6 rounded-xl shadow-shape flex-center flex-wrap gap-4 sm:gap-2 bg-neutral-950 sm:h-14"
          >
            <div className="flex-center gap-1 flex-1 h-full">
              <AtSign className={inputIconStyle} />
              <input
                className="outline-none bg-transparent flex-1 text-xs sm:text-base placeholder:text-neutral-400 rounded-md pl-1 h-[95%]"
                type="email"
                id="guestEmail"
                name="guestEmail"
                placeholder="Digite o e-mail do convidado"
              />
            </div>
            <Button type="submit" className="w-full sm:w-max">
              Convidar
              <Plus className={iconStyle} />
            </Button>
          </form>
        </div>
        {guestList.length > 0 && (
          <Button onClick={handleInviteGuests} className="w-full h-11 mt-4">
            Enviar convite{guestList.length > 1 && "s"}
          </Button>
        )}
      </Modal>
    </div>
  );
}
