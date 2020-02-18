import { pathOr } from "ramda";

export const mustBeMoreThan = (availableLenght: number) => (value: string) =>
  (pathOr(0, ['length'], value) < 3 ? `Enter more than ${availableLenght} characters` : undefined)
