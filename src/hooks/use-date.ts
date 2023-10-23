import dayjs from 'dayjs';

export const useDate = (d: string | Date) => {
  const date = dayjs(d);
  return date.format('MMM D, YYYY');
};
