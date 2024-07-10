import {
  ArrowRight,
  AtSign,
  Calendar,
  MapPin,
  Plus,
  Settings2,
  UserRoundPlus,
  X,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";

export function Home() {
  const [isInviteInputOpen, setIsInviteInputOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestList, setGuestList] = useState<string[]>([]);

  const handleGuestInvite = (event: FormEvent<HTMLFormElement>) => {
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
            <button
              className="flex-center gap-2 sm:flex-1 text-left"
              onClick={() => setIsModalOpen(true)}
            >
              <UserRoundPlus className="size-5" />
              {guestList.length > 0 ? (
                <span className="text-neutral-100 text-lg sm:flex-1">
                  {guestList.length} pessoa(s) convidada(s)
                </span>
              ) : (
                <span className="text-neutral-400 sm:flex-1">
                  Quem estará na viagem?
                </span>
              )}
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
      <Modal isModalOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <div className="w-[720px] flex flex-col gap-5">
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
                  <button type="button" title="remover">
                    <X className="size-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="h-px w-full bg-neutral-800" />
          <form
            onSubmit={handleGuestInvite}
            className="w-full min-h-16 py-3 px-6 rounded-xl shadow-shape flex-center flex-wrap gap-4 sm:gap-2 bg-neutral-950"
          >
            <div className="flex-center gap-2 sm:flex-1">
              <AtSign className="size-5" />
              <input
                className="outline-none bg-transparent flex-1"
                type="email"
                id="guestEmail"
                name="guestEmail"
                placeholder="Digite o e-mail do convidado"
              />
            </div>
            <Button primaryStyle type="submit">
              Convidar
              <Plus className="size-5" />
            </Button>
          </form>
        </div>
      </Modal>
    </main>
  );
}
