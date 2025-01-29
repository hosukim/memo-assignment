import { DEFAULT_DATE_FROMAT } from "@/constant";
import { format } from "date-fns";

export const formatDate = (
  date: Date | string,
  dateFormat = DEFAULT_DATE_FROMAT
) => {
  try {
    return format(new Date(date.toString()), dateFormat);
  } catch (e) {
    console.error(e);

    return e ?? "날짜 형식이 잘못되었습니다.";
  }
};
