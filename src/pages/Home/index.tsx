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
import { DateRange, DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/axios";
import { ptBR } from "date-fns/locale";

export function Home() {
  const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false);
  const [isInviteSectionOpen, setIsInviteSectionOpen] = useState(false);
  const [isInviteGuestsModalOpen, setIsInviteGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  const [destination, setDestination] = useState<string>("");
  const [tripStartAndEndDates, setTripStartAndEndDates] = useState<
    DateRange | undefined
  >();
  const [guestList, setGuestList] = useState<string[]>([]);

  const navigate = useNavigate();

  const openInviteSection = () => {
    destination && displayedDate
      ? setIsInviteSectionOpen(true)
      : alert("Preencha as informações de destino e período para prosseguir");
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

  const handleConfirmTrip = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const fullName = data.get("fullName")?.toString();
    const personalEmail = data.get("personalEmail")?.toString();

    if (!fullName || !personalEmail || !tripStartAndEndDates) {
      alert("Preencha os campos para criar a viagem");
      return;
    }

    try {
      const response = await api.post("/trips", {
        destination,
        starts_at: tripStartAndEndDates.from,
        ends_at: tripStartAndEndDates.to,
        emails_to_invite: guestList,
        owner_name: fullName,
        owner_email: personalEmail,
      });

      console.log(response);
      const { tripId } = response.data;

      navigate(`/trips/${tripId}`);
    } catch (error) {
      console.log("Erro -" + error);
      alert("Ocorreu um erro ao criar a viagem. Tente novamente.");
    }
  };

  const displayedDate =
    tripStartAndEndDates && tripStartAndEndDates.from && tripStartAndEndDates.to
      ? format(tripStartAndEndDates.from, "d' de 'LLL")
          .concat(" até ")
          .concat(format(tripStartAndEndDates.to, "d' de 'LLL"))
      : null;

  return (
    <div className="bg-pattern bg-no-repeat bg-center min-h-screen flex flex-col justify-center items-center gap-10 px-8 py-5">
      {/* Logo and description div */}
      <header className="flex-center flex-col gap-2">
        <img src="/planner-logo.svg" alt="plann.er logo" />
        <p className="text-center">
          Convide seus amigos e planeje sua próxima viagem!
        </p>
      </header>

      {/* Inputs section */}
      <main className="w-full flex-center flex-col gap-4">
        {/* Location and date inputs */}
        <div className="w-[760px] max-w-full min-h-16 py-3 px-6 rounded-xl shadow-shape flex-center flex-wrap gap-4 sm:gap-2 bg-neutral-900">
          <div className="flex-center gap-1 w-full mt-1.5 sm:mt-0 sm:w-max sm:flex-1">
            <MapPin className={inputIconStyle} />
            <input
              className="outline-none bg-transparent flex-1 placeholder:text-neutral-400 rounded-md pl-1"
              type="text"
              id="location"
              name="location"
              placeholder="Para onde você vai?"
              disabled={isInviteSectionOpen}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <button
            disabled={isInviteSectionOpen}
            onClick={() => setIsDatePickerModalOpen(true)}
            className="flex items-center gap-2 text-left w-full sm:w-max sm:min-w-28 lg:min-w-36"
          >
            <Calendar className={inputIconStyle} />
            <span
              className={`w-max shrink-0 ${
                displayedDate ? "text-neutral-100" : "text-neutral-400"
              }`}
            >
              {displayedDate || "Quando?"}
            </span>
          </button>

          {/* Date picker modal */}
          <Modal
            isModalOpen={isDatePickerModalOpen}
            closeModal={() => setIsDatePickerModalOpen(false)}
          >
            <h3 className="font-bold sm:text-lg">Selecione o período</h3>
            <DayPicker
              mode="range"
              locale={ptBR}
              selected={tripStartAndEndDates}
              onSelect={setTripStartAndEndDates}
              className="overflow-x-auto"
              disabled={{ before: new Date() }}
              modifiersClassNames={{
                selected: "bg-primary-400 text-neutral-950",
              }}
            />
            <Button
              type="button"
              onClick={() => setIsDatePickerModalOpen(false)}
              className="w-full mb-3"
            >
              Confirmar
            </Button>
            {tripStartAndEndDates && (
              <Button
                variant="secondary"
                type="button"
                onClick={() => setTripStartAndEndDates(undefined)}
                className="w-full"
              >
                Limpar
              </Button>
            )}
          </Modal>

          <div className="hidden sm:block w-px h-6 sm:mx-3 bg-neutral-800" />
          {!isInviteSectionOpen ? (
            <Button
              type="button"
              onClick={openInviteSection}
              className="w-full sm:w-max"
            >
              Continuar
              <ArrowRight className={iconStyle} />
            </Button>
          ) : (
            <Button
              variant="secondary"
              type="button"
              onClick={() => setIsInviteSectionOpen(false)}
              className="w-full sm:w-max"
            >
              Alterar local/data
              <Settings2 className={iconStyle} />
            </Button>
          )}
        </div>

        {/* Invite and continue section */}
        {isInviteSectionOpen && (
          <div className="w-[760px] max-w-full min-h-16 py-3 px-6 rounded-xl shadow-shape flex-center flex-wrap gap-4 sm:gap-2 bg-neutral-900">
            <button
              type="button"
              className="flex items-center gap-2 sm:flex-1 text-left w-full sm:w-max"
              onClick={() => setIsInviteGuestsModalOpen(true)}
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
              onClick={() => setIsConfirmTripModalOpen(true)}
            >
              Confirmar viagem
              <ArrowRight className={iconStyle} />
            </Button>
          </div>
        )}
      </main>

      {/* Footer description   */}
      <footer>
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
      </footer>

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

      {/* Confirm trip modal */}
      <Modal
        isModalOpen={isConfirmTripModalOpen}
        closeModal={() => setIsConfirmTripModalOpen(false)}
      >
        <form
          onSubmit={handleConfirmTrip}
          className="lg:w-[540px] max-w-full flex flex-col gap-2"
        >
          <div className="flex flex-col gap-2 mb-2">
            <h2 className="font-lg font-semibold">
              Confirmar criação da viagem
            </h2>
            <p className="text-sm text-zinc-400">
              Para concluir a criação da viagem para{" "}
              <span className="text-neutral-100 font-bold">{destination}</span>{" "}
              nas datas de{" "}
              <span className="text-neutral-100 font-bold">
                {displayedDate}
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
        </form>
      </Modal>
    </div>
  );
}
