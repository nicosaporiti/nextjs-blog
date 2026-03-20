import { parseISO, format } from "date-fns";
import { es } from "date-fns/locale";

export default function Date({ dateString }) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "d 'de' MMMM, yyyy", { locale: es })}</time>;
}
