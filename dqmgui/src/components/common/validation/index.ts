import { pathOr } from "ramda";

export const moreThan = (base: any) => (value: any) => {
    if (+base < pathOr(0, ['length'], value)) {
      return `Enter more that ${base} characters`;
    }
  };