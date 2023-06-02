import { delay, swap, changeStates } from "../../utils/utils";
import { TWord } from "../../types/words-state";
import { SHORT_DELAY_IN_MS, DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

export async function reverse(
  arr: TWord[] | null,
  setState: React.Dispatch<React.SetStateAction<TWord[] | null>>
) {
  if (arr === null) return;
  let size = arr.length - 1;
  for (let i = 0; i <= Math.floor((size + 1) / 2); i++) {
    if (i > size - i) return;
    if (i === size - i) {
      await delay(SHORT_DELAY_IN_MS);
      changeStates(arr, ElementStates.Modified, [i, size - i]);
      return;
    }
    await delay(SHORT_DELAY_IN_MS);
    changeStates(arr, ElementStates.Changing, [i, size - i]);
    setState([...arr]);
    await delay(DELAY_IN_MS);
    swap(arr, i, size - i);
    changeStates(arr, ElementStates.Modified, [i, size - i]);
    setState([...arr]);
    console.log(`I:${i}  SIZE-i:${size - i}`);
  }
}
