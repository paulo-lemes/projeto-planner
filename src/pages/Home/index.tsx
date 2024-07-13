import { ArrowRight, Mail, Settings2, User, UserRoundPlus } from "lucide-react";
import { FormEvent, useState } from "react";
import { InputGroupWrapper } from "@/components/InputGroupWrapper";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { formatDisplayedDate, iconStyle, inputIconStyle } from "@/utils";
import { api } from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import { LocationAndDatesGroup } from "@/components/LocationAndDatesGroup";
import { InputModalWrapper } from "@/components/InputModalWrapper";
import { InviteGuests } from "@/components/InviteGuests";

export function Home() {
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

  const displayedDate = formatDisplayedDate(tripStartAndEndDates);

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
        <InputGroupWrapper>
          <LocationAndDatesGroup
            destination={destination}
            setDestination={setDestination}
            isInputsDisabled={isInviteSectionOpen}
            tripStartAndEndDates={tripStartAndEndDates}
            setTripStartAndEndDates={setTripStartAndEndDates}
            displayedDate={displayedDate}
          />
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
        </InputGroupWrapper>

        {/* Invite and continue section */}
        {isInviteSectionOpen && (
          <InputGroupWrapper>
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
          </InputGroupWrapper>
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
        <InviteGuests
          guestList={guestList}
          addGuestEmail={addGuestEmail}
          deleteGuestEmail={deleteGuestEmail}
        />
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
          <InputModalWrapper>
            <User className={inputIconStyle} />
            <input
              className="outline-none bg-transparent flex-1 text-xs sm:text-base placeholder:text-neutral-400 rounded-md pl-1 h-full"
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Seu nome completo"
            />
          </InputModalWrapper>
          <InputModalWrapper>
            <Mail className={inputIconStyle} />
            <input
              className="outline-none bg-transparent flex-1 text-xs sm:text-base placeholder:text-neutral-400 rounded-md pl-1 h-full"
              type="email"
              id="personalEmail"
              name="personalEmail"
              placeholder="Seu e-mail pessoal"
            />
          </InputModalWrapper>
          <Button type="submit" className="w-full mt-2 h-11">
            Confirmar criação da viagem
          </Button>
        </form>
      </Modal>
    </div>
  );
}
