import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { TWord } from "../../types/words-state";
import { delay } from "../../utils/utils";

function generateFibSeq(fibNum: number): TWord[] {
  let arr: number[] = [1];
  for (let i = 1; i < fibNum+1; i++) {
    if (i === 1) {
      arr.push(arr[i - 1]);
    } else {
      arr.push(arr[i - 1] + arr[i - 2]);
    }
  }
  let res: TWord[] = arr.map((el, i) => {
    return {
      word: String(el),
      id: i,
      state: ElementStates.Default,
      tail: String(i),
    };
  });
  return res;
}

export async function logFibSeq(
  num: number,
  setState: React.Dispatch<React.SetStateAction<TWord[] | null>>
): Promise<void> {
  const seq = generateFibSeq(num);
  let tempArr: TWord[] | null = [];
  for(let i = 0; i < num+1; i++){
    await delay(SHORT_DELAY_IN_MS);
    tempArr.push(seq[i]);
    setState([...tempArr]);
  }
}
