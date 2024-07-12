import { CircleCheck, Plus, Tag } from "lucide-react";
import { Button } from "../Button";
import { api } from "@/lib/axios";
import { FormEvent, useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Modal } from "../Modal";
import { inputIconStyle } from "@/utils";

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
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold">Atividades</h2>
        <Button
          type="button"
          onClick={() => setIsCreateActivityModalOpen(true)}
        >
          <Plus className="size-5" />
          Cadastrar atividade
        </Button>
      </div>

      {/* List of activities */}
      <div className="space-y-8">
        {activities.map((category) => {
          return (
            <div key={category.date} className="space-y-2.5">
              <div className="flex gap-2 items-baseline">
                <span className="text-xl text-neutral-300 font-semibold">
                  Dia {format(category.date, "d")}
                </span>
                <span className="text-xs text-neutral-500">
                  {format(category.date, "EEEE", { locale: ptBR })}
                </span>
              </div>
              {category.activities.length > 0 ? (
                <div className="space-y-2.5">
                  {category.activities.map((activity) => {
                    return (
                      <div
                        key={activity.id}
                        className="px-4 py-2.5 bg-neutral-900 rounded-xl shadow-shape flex items-center gap-3"
                      >
                        <CircleCheck className="size-5 text-primary-300" />
                        <span className="text-neutral-100">
                          {activity.title}
                        </span>
                        <span className="text-neutral-400 text-sm ml-auto">
                          {format(activity.occurs_at, "HH:mm")}h
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
            <div className="h-14 px-4 bg-neutral-950 border border-neutral-800 rounded-lg flex items-center gap-2">
              <Tag className={inputIconStyle} />
              <input
                name="title"
                placeholder="Qual a atividade?"
                className="bg-transparent text-lg placeholder-neutral-400 outline-none flex-1"
              />
            </div>
            <div className="h-14 flex-1 px-4 bg-neutral-950 border border-neutral-800 rounded-lg flex items-center">
              <input
                type="datetime-local"
                name="occurs_at"
                placeholder="Data e horário da atividade"
                className="bg-transparent text-lg text-neutral-400 outline-none flex-1 dark:[color-scheme:dark]"
              />
            </div>
            <Button type="submit" className="w-full">
              Salvar atividade
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
