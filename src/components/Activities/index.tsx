import { CircleCheck, Plus, Tag } from "lucide-react";
import { Button } from "../Button";
import { api } from "@/lib/axios";
import { FormEvent, useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Modal } from "../Modal";
import { inputIconStyle, inputModalStyle } from "@/utils";
import { InputModalWrapper } from "../InputModalWrapper";

interface ActivitiesProps {
  tripId?: string;
}

interface Activity {
  date: string;
  activities: {
    id: string;
    title: string;
    occurs_at: string;
  }[];
}

export function Activities({ tripId }: ActivitiesProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [createdActivity, setCreatedActivity] = useState(0);
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);

  useEffect(() => {
    api
      .get(`trips/${tripId}/activities`)
      .then((response) => setActivities(response.data.activities));
  }, [tripId, createdActivity]);

  const handleCreateActivity = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const title = data.get("title")?.toString();
    const occurs_at = data.get("occurs_at")?.toString();

    if (!title || !occurs_at) {
      alert("Preencha os campos para criar a atividade");
      return;
    }

    try {
      const response = await api.post(`/trips/${tripId}/activities`, {
        occurs_at,
        title,
      });
      console.log(response);

      setCreatedActivity((prev) => prev + 1);
      setIsCreateActivityModalOpen(false);
    } catch (error) {
      console.log("Erro -" + error);
      alert("Ocorreu um erro ao cadastrar a atividade. Tente novamente.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <h2 className="text-3xl font-semibold">Atividades</h2>
        <Button
          type="button"
          onClick={() => setIsCreateActivityModalOpen(true)}
          className="w-full sm:w-max"
        >
          <Plus className="size-5" />
          Cadastrar atividade
        </Button>
      </div>

      {/* List of activities */}
      <div className="space-y-8">
        {activities.map(({ date, activities }) => {
          return (
            <div key={date} className="space-y-2.5">
              <div className="flex gap-2 items-baseline">
                <span className="text-xl text-neutral-300 font-semibold">
                  Dia {format(date, "d")}
                </span>
                <span className="text-xs text-neutral-500">
                  {format(date, "EEEE", { locale: ptBR })}
                </span>
              </div>
              {activities.length > 0 ? (
                <div className="space-y-2.5">
                  {activities.map(({ id, title, occurs_at }) => {
                    return (
                      <div
                        key={id}
                        className="px-4 py-2.5 bg-neutral-900 rounded-xl shadow-shape flex items-center gap-3"
                      >
                        <CircleCheck className="size-5 text-primary-300" />
                        <span className="text-neutral-100">{title}</span>
                        <span className="text-neutral-400 text-sm ml-auto">
                          {format(occurs_at, "HH:mm")}h
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-neutral-500 text-sm">
                  Nenhuma atividade cadastrada nesta data.
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Create activity modal */}
      <Modal
        isModalOpen={isCreateActivityModalOpen}
        closeModal={() => setIsCreateActivityModalOpen(false)}
      >
        <div className="space-y-5 w-[540px] max-w-full">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Cadastrar atividade</h3>
            <p className="text-sm text-neutral-400">
              Todos convidados podem visualizar as atividades.
            </p>
          </div>
          <form onSubmit={handleCreateActivity} className="space-y-2">
            <InputModalWrapper>
              <Tag className={inputIconStyle} />
              <input
                name="title"
                placeholder="Qual a atividade?"
                className={inputModalStyle}
              />
            </InputModalWrapper>
            <InputModalWrapper>
              <input
                type="datetime-local"
                // min={"2024-10-01T00:00"}
                name="occurs_at"
                placeholder="Data e horário da atividade"
                className={`${inputModalStyle} text-neutral-400 dark:[color-scheme:dark]`}
              />
            </InputModalWrapper>
            <Button type="submit" className="w-full !mt-4 h-11">
              Salvar atividade
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
