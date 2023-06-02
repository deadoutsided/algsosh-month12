import React, { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import style from "./string.module.css";
import { TWord } from "../../types/words-state";
import { ElementStates } from "../../types/element-states";
import { reverse } from "./utils";

export const StringComponent: React.FC = () => {
  const [value, changeValue] = useState<string>("");
  const [words, changeWords] = useState<TWord[] | null>(null);
  const [isLoader, setLoader] = useState<boolean | undefined>(false);
  const changeInput = (event: ChangeEvent<HTMLInputElement>) => {
    changeValue(event.target.value);
  };

  const onSubmit = async () => {
    setLoader(true);
    changeValue("");
    const wordsObjs = Array.from(value).map((el, i) => {
      return { word: el, id: i, state: ElementStates.Default };
    });
    changeWords([...wordsObjs]);
    await reverse(wordsObjs, changeWords);
    setLoader(false);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={style.formCont}>
        <Input
          maxLength={11}
          isLimitText={true}
          type="text"
          onChange={changeInput}
          value={value}
        />
        <Button
          isLoader={isLoader}
          type="button"
          text="Развернуть"
          onClick={onSubmit}
        />
      </div>
      <div className={style.circles}>
        {words
          ? words.map((word) => {
              return (
                <Circle letter={word.word} key={word.id} state={word.state} />
              );
            })
          : null}
      </div>
    </SolutionLayout>
  );
};
