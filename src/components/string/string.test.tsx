import React from "react";

import { reverse } from "./utils";
import { TWord } from "../../types/words-state";

const mock = jest.fn();

function prepareArr(str: string){
  const arr = [];
  for(let i = 0; i < str.length; i++){
    arr.push({
      word: str[i],
      id: i,
    })
  }
  return arr;
}

function makeString(arr: TWord[]) : string{
  let str = '';
  for(let i = 0; i < arr.length; i++){
    str = str + arr[i].word;
  };
  return str;
}

describe('string reverse working', () => {

  it('even number of letters work', async () => {
    const testingArr = prepareArr('abcd');
    await reverse(testingArr, mock);
    const reversedString = makeString(testingArr);
    expect(reversedString).toEqual('dcba');
  })

  it('odd number of letters work', async () => {
    const testingArr = prepareArr('abcde');
    await reverse(testingArr, mock);
    const reversedString = makeString(testingArr);
    expect(reversedString).toEqual('edcba');
  })

  it('reverse 1 letter', async () => {
    const testingArr = prepareArr('a');
    await reverse(testingArr, mock);
    const reversedString = makeString(testingArr);
    expect(reversedString).toEqual('a');
  })

  it('reverse 0 letter', async () => {
    const testingArr = prepareArr('');
    await reverse(testingArr, mock);
    const reversedString = makeString(testingArr);
    expect(reversedString).toEqual('');
  })
})