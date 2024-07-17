import { iconStyle, inputIconStyle } from "@/utils";
import { AtSign, Plus, X } from "lucide-react";
import { FormEvent, ReactNode } from "react";
import { Button } from "../Button";

interface InviteGuestsProps {
  guestList: string[];
  addGuestEmail: (event: FormEvent<HTMLFormElement>) => void;
  deleteGuestEmail: (value: string) => void;
  children?: ReactNode;
}

export function InviteGuests({
  guestList,
  addGuestEmail,
  deleteGuestEmail,
  children,
}: InviteGuestsProps) {
  return (
    <div className="lg:w-[720px] max-w-full flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h2 className="font-lg font-semibold">Selecionar convidados</h2>
        <p className="text-sm text-zinc-400">
          Os convidados irão receber e-mails para confirmar a participação na
          viagem.
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
        <div className="flex-center gap-1 flex-1 h-full mt-1.5 sm:mt-0">
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
      {children}
    </div>
  );
}
