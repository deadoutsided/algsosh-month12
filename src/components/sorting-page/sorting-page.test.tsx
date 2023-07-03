import React from "react";

import { choiceSort, bubbleSort } from "./utils";
import { ElementStates } from "../../types/element-states";
import { TColumnState } from "../../types/column-state";
import { Direction } from "../../types/direction";

const mock = jest.fn();

function prepareArr(arr: number[]){
  if(arr.length === 0) return [];
  const prepArr = arr.map((num, i) => {
    return {
      num,
      id: i,
      state: ElementStates.Default,
    }
  })

  return prepArr;
}

function makeArrNormal(arr: TColumnState[]){
  if(arr.length === 0) return [];
  const numArr = arr.map((column) => {
    return column.num;
  })
  return numArr;
}

describe('sortings', () => {
  it('bubble sorts empty arr', async () => {
    const testArr = prepareArr([]);
    await bubbleSort(testArr, mock, Direction.Ascending);
    expect(makeArrNormal(testArr)).toEqual([]);
  })

  it('selection sorts empty arr', async () => {
    const testArr = prepareArr([]);
    await choiceSort(testArr, mock, Direction.Ascending);
    expect(makeArrNormal(testArr)).toEqual([]);
  })

  it('bubble sorts 1 num arr', async () => {
    const testArr = prepareArr([83]);
    await bubbleSort(testArr, mock, Direction.Ascending);
    expect(makeArrNormal(testArr)).toEqual([83]);
  })

  it('selection sorts 1 num arr', async () => {
    const testArr = prepareArr([83]);
    await choiceSort(testArr, mock, Direction.Ascending);
    expect(makeArrNormal(testArr)).toEqual([83]);
  })

  it('bubble sorts arr of several nums ascending', async () => {
    const testArr = prepareArr([83, 94, 12, 14, 2, 54, 12]);
    await bubbleSort(testArr, mock, Direction.Ascending);
    expect(makeArrNormal(testArr)).toEqual([2, 12, 12, 14, 54, 83, 94]);
  }, 20000)

  it('selection sorts arr of several nums descending', async () => {
    const testArr = prepareArr([83, 94, 12, 14, 2, 54, 12]);
    await choiceSort(testArr, mock, Direction.Descending);
    expect(makeArrNormal(testArr)).toEqual([94, 83, 54, 14, 12, 12, 2]);
  }, 15000)

  it('bubble sorts arr of several nums descending', async () => {
    const testArr = prepareArr([83, 94, 12, 14, 2, 54, 12]);
    await bubbleSort(testArr, mock, Direction.Descending);
    expect(makeArrNormal(testArr)).toEqual([94, 83, 54, 14, 12, 12, 2]);
  }, 20000)

  it('selection sorts arr of several nums ascending', async () => {
    const testArr = prepareArr([83, 94, 12, 14, 2, 54, 12]);
    await choiceSort(testArr, mock, Direction.Ascending);
    expect(makeArrNormal(testArr)).toEqual([2, 12, 12, 14, 54, 83, 94]);
  }, 15000)
})