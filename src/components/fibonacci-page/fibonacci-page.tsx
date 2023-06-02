import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import style from "./fibonacci-page.module.css";
import { TWord } from "../../types/words-state";
import { logFibSeq } from "./utils";
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [words, setWords] = useState<TWord[] | null>(null);
  const [isLoader, setLoader] = useState<boolean>(false);
  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onSubmit = async () => {
    const fibNum: number = Number(value);
    setLoader(true);
    setValue("");
    await logFibSeq(fibNum, setWords);
    setLoader(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={style.formCont}>
        <Input
          max={19}
          min={1}
          isLimitText={true}
          type="number"
          onChange={changeInput}
          value={value}
        />
        <Button
          isLoader={isLoader}
          type="button"
          text="Рассчитать"
          onClick={onSubmit}
          disabled={Number(value) > 19 || Number(value) < 1 ? true : false}
        />
      </div>
      <div className={style.circles}>
        {words
          ? words.map((word) => {
              return (
                <Circle
                  letter={word.word}
                  key={word.id}
                  state={word.state}
                  tail={typeof word.tail === "string" ? word.tail : ""}
                />
              );
            })
          : null}
      </div>
    </SolutionLayout>
  );
};
