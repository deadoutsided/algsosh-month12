import { ElementStates } from "./element-states";

export type TWord = {
  word: string;
  id: number | string;
  state?: ElementStates;
  head?: string | TWord;
  tail?: string | TWord;
};
