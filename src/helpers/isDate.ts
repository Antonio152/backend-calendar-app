//import { Request } from 'express';

export const isDate = (value: string | number) => {
  if (!value || isNaN(new Date(value).getTime())) {
    return false;
  }
  return true;
};
