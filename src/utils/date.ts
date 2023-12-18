import dayjs from "dayjs";

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
