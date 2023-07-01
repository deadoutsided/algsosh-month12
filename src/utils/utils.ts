import { ElementStates } from "../types/element-states";

export function swap(arr: any[], i: number, j: number): any[] {
  let temp: any;
  temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;

  return arr;
}

export function changeStates(
  el: any[],
  state: ElementStates,
  indexes: number[]
): void {
  indexes.forEach((i) => {if(el[i] !== undefined) el[i].state = state});
}

export const delay = (milsecs: number) => {
  return new Promise((resolve) => setTimeout(resolve, milsecs));
};

export function randomArr(
  minSize: number,
  maxSize: number,
  minValue: number,
  maxValue: number
): number[] {
  const size = minSize + Math.floor(Math.random() * (maxSize - minSize + 1));
  const arr = [];
  for (let i = 0; i < size; i++) {
    const randNum = Math.floor(
      Math.random() * (maxValue - minValue + 1) + minValue
    );
    arr.push(randNum);
  }
  return arr;
}
