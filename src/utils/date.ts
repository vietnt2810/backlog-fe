import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const formatDateTime = (date?: string | number | Date) => {
  if (!date) {
    return undefined;
  }
  return dayjs(date).format("YYYY/MM/DD HH:mm:ss");
};

export const formatDate = (date?: string | number | Date) => {
  if (!date) {
    return undefined;
  }
  return dayjs(date).format("YYYY/MM/DD");
};

export const formatYearMonth = (date?: string | number | Date) => {
  if (!date) {
    return undefined;
  }
  return dayjs(date).format("YYYY/MM");
};

export const formatDateJa = (date?: string | number | Date) => {
  if (!date) {
    return undefined;
  }
  return dayjs(date).format("YYYY年/M月/DD日");
};

export const formatYearMonthJa = (date?: string | number | Date) => {
  if (!date) {
    return undefined;
  }
  return dayjs(date).format("YYYY年/M月");
};

export const formatYearJa = (date?: string | number | Date) => {
  if (!date) {
    return undefined;
  }
  return dayjs(date).format("YYYY年");
};

export const convertToUtc = (date: string | number | Date) =>
  dayjs(date).utc().format();
