import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { Button } from "../Button";
import { Modal } from "../Modal";
import { CircleCheck, CircleDashed, UserPlus } from "lucide-react";

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
  const [changedParticipant, setChangedParticipant] = useState(0);
  const [isInviteGuestsModalOpen, setIsInviteGuestsModalOpen] = useState(false);

  useEffect(() => {
    api
      .get(`trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants));
  }, [tripId, changedParticipant]);

  const handleParticipantConfirm = async (id: string) => {
    try {
      const response = await api.patch(`/participants/${id}/confirm`);
      console.log(response);

      setChangedParticipant((prev) => prev + 1);
    } catch (error) {
      console.log("Erro -" + error);
      alert("Ocorreu um erro ao confirmar o participante. Tente novamente.");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Participantes</h2>

      {/* List of participants */}
      <div className="space-y-5">
        {participants.length > 0 ? (
          participants.map(({ id, name, email, is_confirmed }) => (
            <div key={id} className="flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="block font-medium text-neutral-100">
                  {name}
                </span>
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
        <UserPlus className="size-5" />
        Convidar mais pessoas
      </Button>

      {/* Invite guests modal */}
      <Modal
        isModalOpen={isInviteGuestsModalOpen}
        closeModal={() => setIsInviteGuestsModalOpen(false)}
      >
        invite
      </Modal>
    </div>
  );
}
