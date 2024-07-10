import {
  ArrowRight,
  Calendar,
  MapPin,
  Settings2,
  UserRoundPlus,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/Button";

export function Home() {
  const [isInviteInputOpen, setIsInviteInputOpen] = useState(false);

  return (
    <main className="bg-pattern bg-no-repeat bg-center h-screen flex flex-col justify-center items-center gap-10 px-8">
      <div className="flex-center flex-col gap-2">
        <img src="/planner-logo.svg" alt="plann.er logo" />
        <p className="text-center">
          Convide seus amigos e planeje sua próxima viagem!
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="w-[760px] max-w-full min-h-16 py-3 px-6 rounded-xl shadow-shape flex-center flex-wrap gap-4 sm:gap-2 bg-neutral-900">
          <div className="flex-center gap-2 sm:flex-1">
            <MapPin className="size-5" />
            <input
              className="outline-none bg-transparent flex-1"
              type="text"
              id="location"
              name="location"
              placeholder="Para onde você vai?"
              disabled={isInviteInputOpen}
            />
          </div>
          <div className="flex-center gap-2">
            <Calendar className="size-5" />
            <input
              className="outline-none bg-transparent max-w-36 flex-1"
              type="text"
              id="date"
              name="date"
              placeholder="Quando?"
              disabled={isInviteInputOpen}
            />
          </div>
          <div className="w-px h-6 sm:mx-3 bg-neutral-800" />
          {!isInviteInputOpen ? (
            <Button
              primaryStyle
              type="button"
              onClick={() => setIsInviteInputOpen(true)}
            >
              Continuar
              <ArrowRight className="size-5" />
            </Button>
          ) : (
            <Button type="button" onClick={() => setIsInviteInputOpen(false)}>
              Alterar local/data
              <Settings2 className="size-5" />
            </Button>
          )}
        </div>
        {isInviteInputOpen && (
          <div className="w-[760px] max-w-full min-h-16 py-3 px-6 rounded-xl shadow-shape flex-center flex-wrap gap-4 sm:gap-2 bg-neutral-900">
            <button className="flex-center gap-2 sm:flex-1 text-left">
              <UserRoundPlus className="size-5" />
              <span className="text-neutral-400 sm:flex-1">
                Quem estará na viagem?
              </span>
            </button>
            <Button primaryStyle type="button">
              Confirmar viagem
              <ArrowRight className="size-5" />
            </Button>
          </div>
        )}
      </div>
      <p className="text-neutral-500 text-sm text-center">
        Ao planejar sua viagem pela plann.er você automaticamente concorda{" "}
        <br className="hidden sm:block" />
        com nossos{" "}
        <a href="#" className="text-neutral-300 underline">
          termos de uso
        </a>{" "}
        e{" "}
        <a href="#" className="text-neutral-300 underline">
          políticas de privacidade
        </a>
        .
      </p>
    </main>
  );
}
