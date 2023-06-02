import { ElementStates } from "../../types/element-states";
import { TWord } from "../../types/words-state";
import { delay } from "../../utils/utils";

const indexes: number[] = [0, 1, 2, 3, 4, 5, 6];
export const initialQueue: TWord[] = indexes.map((el) => {
  return {
    word: "",
    id: el,
    state: ElementStates.Default,
    head: "",
    tail: "",
  };
});
