import { format } from "date-fns";
import { DateRange } from "react-day-picker";

export const iconStyle = "size-5";
export const inputIconStyle = "size-5 text-neutral-300";

export function formatDisplayedDate(dates: DateRange | undefined) {
  return dates && dates.from && dates.to
    ? format(dates.from, "d' de 'LLL")
        .concat(" até ")
        .concat(format(dates.to, "d' de 'LLL"))
    : null;
}
