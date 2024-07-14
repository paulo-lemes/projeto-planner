import { api } from "@/lib/axios";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

export const iconStyle = "size-5";
export const inputIconStyle = "size-5 text-neutral-300";
export const inputModalStyle =
  "bg-transparent text-lg placeholder-neutral-400 outline-none flex-1 rounded-md pl-1 h-[95%]";

export function formatDisplayedDate(dates: DateRange | undefined) {
  return dates && dates.from && dates.to
    ? format(dates.from, "d' de 'LLL")
        .concat(" até ")
        .concat(format(dates.to, "d' de 'LLL"))
    : null;
}

export const handleDelete = async (
  path: string,
  id: string,
  callback: () => void
) => {
  try {
    const response = await api.delete(`/${path}/${id}`);
    console.log(response);

    callback();
  } catch (error) {
    console.log("Erro -" + error);
    alert("Ocorreu um erro ao deletar o link. Tente novamente.");
  }
};
