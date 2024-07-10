import {
  ArrowRight,
  AtSign,
  Calendar,
  Mail,
  MapPin,
  Plus,
  Settings2,
  User,
  UserRoundPlus,
  X,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { iconStyle, inputIconStyle } from "../../utils";

export function Home() {
  const [isInviteInputOpen, setIsInviteInputOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
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

  const deleteGuestEmail = (selectedEmail: string) => {
    const newGuestList = guestList.filter((email) => email !== selectedEmail);
    setGuestList(newGuestList);
  };

  return (
    <main className="bg-pattern bg-no-repeat bg-center min-h-screen flex flex-col justify-center items-center gap-10 px-8 py-5">
      <div className="flex-center flex-col gap-2">
        <img src="/planner-logo.svg" alt="plann.er logo" />
        <p className="text-center">
          Convide seus amigos e planeje sua próxima viagem!
        </p>
      </div>
      <div className="w-full flex-center flex-col gap-4">
        <div className="w-[760px] max-w-full min-h-16 py-3 px-6 rounded-xl shadow-shape flex-center flex-wrap gap-4 sm:gap-2 bg-neutral-900">
          <div className="flex-center gap-2 w-full sm:w-max sm:flex-1">
            <MapPin className={inputIconStyle} />
            <input
              className="outline-none bg-transparent flex-1"
              type="text"
              id="location"
              name="location"
              placeholder="Para onde você vai?"
              disabled={isInviteInputOpen}
            />
          </div>
          <div className="flex-center gap-2 w-full sm:w-max">
            <Calendar className={inputIconStyle} />
            <input
              className="outline-none bg-transparent sm:max-w-28 lg:max-w-36 flex-1"
              type="text"
              id="date"
              name="date"
              placeholder="Quando?"
              disabled={isInviteInputOpen}
            />
          </div>
          <div className="hidden sm:block w-px h-6 sm:mx-3 bg-neutral-800" />
          {!isInviteInputOpen ? (
            <Button
              type="button"
              onClick={() => setIsInviteInputOpen(true)}
              className="w-full sm:w-max"
            >
              Continuar
              <ArrowRight className={iconStyle} />
            </Button>
          ) : (
            <Button
              variant="secondary"
              type="button"
              onClick={() => setIsInviteInputOpen(false)}
              className="w-full sm:w-max"
            >
              Alterar local/data
              <Settings2 className={iconStyle} />
            </Button>
          )}
        </div>
        {isInviteInputOpen && (
          <div className="w-[760px] max-w-full min-h-16 py-3 px-6 rounded-xl shadow-shape flex-center flex-wrap gap-4 sm:gap-2 bg-neutral-900">
            <button
              className="flex items-center gap-2 sm:flex-1 text-left w-full sm:w-max"
              onClick={() => setIsGuestModalOpen(true)}
            >
              <UserRoundPlus className={inputIconStyle} />
              {guestList.length > 0 ? (
                <span className="text-neutral-100 sm:text-lg sm:flex-1">
                  {guestList.length} pessoa(s) convidada(s)
                </span>
              ) : (
                <span className="text-neutral-400 sm:flex-1">
                  Quem estará na viagem?
                </span>
              )}
            </button>
            <Button
              type="button"
              className="w-full sm:w-max"
              onClick={() => setIsConfirmModalOpen(true)}
            >
              Confirmar viagem
              <ArrowRight className={iconStyle} />
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
      <Modal
        isModalOpen={isGuestModalOpen}
        closeModal={() => setIsGuestModalOpen(false)}
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
            onSubmit={handleGuestInvite}
            className="w-full min-h-16 py-3 px-6 rounded-xl shadow-shape flex-center flex-wrap gap-4 sm:gap-2 bg-neutral-950"
          >
            <div className="flex-center gap-2 flex-1">
              <AtSign className={inputIconStyle} />
              <input
                className="outline-none bg-transparent flex-1 text-xs sm:text-base"
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
      </Modal>
      <Modal
        isModalOpen={isConfirmModalOpen}
        closeModal={() => setIsConfirmModalOpen(false)}
      >
        <div className="lg:w-[540px] max-w-full flex flex-col gap-2">
          <div className="flex flex-col gap-2 mb-2">
            <h2 className="font-lg font-semibold">
              Confirmar criação da viagem
            </h2>
            <p className="text-sm text-zinc-400">
              Para concluir a criação da viagem para{" "}
              <span className="text-neutral-100 font-bold">SP</span> nas datas
              de{" "}
              <span className="text-neutral-100 font-bold">
                16 a 27 de Agosto de 2024
              </span>{" "}
              preencha seus dados abaixo:
            </p>
          </div>
          <div className="flex-center gap-2 w-full bg-neutral-950 px-4 py-2.5 rounded-lg h-14">
            <User className={inputIconStyle} />
            <input
              className="outline-none bg-transparent flex-1 text-xs sm:text-base"
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Seu nome completo"
            />
          </div>
          <div className="flex-center gap-2 w-full bg-neutral-950 px-4 py-2.5 rounded-lg h-14">
            <Mail className={inputIconStyle} />
            <input
              className="outline-none bg-transparent flex-1 text-xs sm:text-base"
              type="email"
              id="personalEmail"
              name="personalEmail"
              placeholder="Seu e-mail pessoal"
            />
          </div>
          <Button type="submit" className="w-full mt-1">
            Confirmar criação da viagem
          </Button>
        </div>
      </Modal>
    </main>
  );
}
