import { api } from "@/lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DateRange } from "react-day-picker";

export const iconStyle = "size-5";
export const inputIconStyle = "size-5 text-neutral-300";
export const inputModalStyle =
  "bg-transparent text-lg placeholder-neutral-400 outline-none flex-1 rounded-md pl-1 h-[95%]";

export function formatDisplayedDate(dates: DateRange | undefined) {
  return dates && dates.from && dates.to
    ? format(dates.from, "d' de 'LLL", { locale: ptBR })
        .concat(" até ")
        .concat(format(dates.to, "d' de 'LLL", { locale: ptBR }))
    : null;
}

export function formatDates(dates: DateRange | undefined) {
  const dateToLocaleString = (dateStr: Date) => {
    const date = new Date(dateStr);
    const pad = (num: number) => num.toString().padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  if (dates && dates.from && dates.to) {
    const localStartDate = dateToLocaleString(dates.from);
    const localEndDate = dateToLocaleString(dates.to);

    return { min: localStartDate, max: localEndDate };
  }
}

export function validateAndReturnStartDate(date: Date) {
  return date.getDate() === new Date().getDate()
    ? date.setTime(new Date().getTime() + 1000)
    : date;
}

export async function handleDelete(
  path: string,
  id: string,
  update: () => void,
  dialog: () => void,
  errorDialog: () => void
) {
  try {
    const response = await api.delete(`/${path}/${id}`);
    console.log(response);

    update()
    dialog();
  } catch (error) {
    console.log("Erro -" + error);
    errorDialog();
  }
}
