import { Direction } from "../../types/direction";
import { TColumnState } from "../../types/column-state";
import { swap, changeStates, delay } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export enum ArrRestrictions {
  maxSize = 17,
  minSize = 3,
  maxValue = 100,
  minValue = 0,
}

export async function choiceSort(
  arr: TColumnState[],
  setState: React.Dispatch<React.SetStateAction<TColumnState[] | undefined>>,
  direction: Direction
): Promise<void> {
  if (direction === Direction.Ascending) {
    for (let i = 0; i <= arr.length - 1; i++) {
      let minInd = i;
      changeStates(arr, ElementStates.Changing, [i]);
      setState([...arr]);
      await delay(SHORT_DELAY_IN_MS);
      for (let j = i + 1; j < arr.length; j++) {
        changeStates(arr, ElementStates.Changing, [j]);
        setState([...arr]);
        await delay(SHORT_DELAY_IN_MS);
        if (arr[j].num < arr[minInd].num) {
          minInd = j;
        }
        changeStates(arr, ElementStates.Default, [j]);
      }
      changeStates(arr, ElementStates.Modified, [minInd]);
      if (minInd !== i) changeStates(arr, ElementStates.Default, [i]);
      swap(arr, i, minInd);
      setState([...arr]);
    }
  } else {
    for (let i = 0; i <= arr.length - 1; i++) {
      let maxInd = i;
      changeStates(arr, ElementStates.Changing, [i]);
      setState([...arr]);
      await delay(SHORT_DELAY_IN_MS);
      for (let j = i + 1; j < arr.length; j++) {
        changeStates(arr, ElementStates.Changing, [j]);
        setState([...arr]);
        await delay(SHORT_DELAY_IN_MS);
        if (arr[j].num > arr[maxInd].num) {
          maxInd = j;
        }
        changeStates(arr, ElementStates.Default, [j]);
      }
      changeStates(arr, ElementStates.Modified, [maxInd]);
      if (i !== maxInd) {
        changeStates(arr, ElementStates.Default, [i]);
      }
      swap(arr, i, maxInd);
      setState([...arr]);
    }
  }
}

export async function bubbleSort(
  arr: TColumnState[],
  setState: React.Dispatch<React.SetStateAction<TColumnState[] | undefined>>,
  direction: Direction
): Promise<void> {
  if (direction === Direction.Ascending) {
    for (let j = 0; j <= arr.length - 1; j++) {
      for (let i = 0; i < arr.length - 1 - j; i++) {
        changeStates(arr, ElementStates.Changing, [i, i + 1]);
        setState([...arr]);
        await delay(SHORT_DELAY_IN_MS);
        if (arr[i].num > arr[i + 1].num) {
          swap(arr, i, i + 1);
          setState([...arr]);
          await delay(SHORT_DELAY_IN_MS);
        }
        changeStates(arr, ElementStates.Default, [i, i + 1]);
        setState([...arr]);
      }
      changeStates(arr, ElementStates.Modified, [arr.length - 1 - j]);
    }
    changeStates(arr, ElementStates.Modified, [0, 1]);
    setState([...arr]);
  } else {
    for (let j = 0; j <= arr.length - 1; j++) {
      for (let i = 0; i < arr.length - 1 - j; i++) {
        changeStates(arr, ElementStates.Changing, [i, i + 1]);
        setState([...arr]);
        await delay(SHORT_DELAY_IN_MS);
        if (arr[i].num < arr[i + 1].num) {
          swap(arr, i, i + 1);
          setState([...arr]);
          await delay(SHORT_DELAY_IN_MS);
        }
        changeStates(arr, ElementStates.Default, [i, i + 1]);
        setState([...arr]);
      }
      changeStates(arr, ElementStates.Modified, [arr.length - 1 - j]);
    }
    changeStates(arr, ElementStates.Modified, [0, 1]);
    setState([...arr]);
  }
}
