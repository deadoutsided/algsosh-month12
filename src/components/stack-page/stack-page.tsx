import React, { ChangeEvent, useState, useMemo, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { TWord } from "../../types/words-state";
import style from "./stack-page.module.css";
import { Circle } from "../ui/circle/circle";
import { Stack } from "./stack-class";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const StackPage: React.FC = () => {
  const stack = useMemo(() => new Stack<TWord>(), []);
  const [stackArr, setStack] = useState<TWord[]>();
  const [value, setValue] = useState<string>("");
  const [addLoader, setAddLoader] = useState<boolean>(false);
  const [delLoader, setDelLoader] = useState<boolean>(false);

  const clickPush = async () => {
    const oldTop = stack.getTop();
    setAddLoader(true);
    setValue("");
    if (oldTop !== null) {
      oldTop.head = "";
    }
    const newElem: TWord = {
      word: value,
      id: stack.getSize(),
      state: ElementStates.Changing,
      head: "top",
    };
    stack.push(newElem);
    setStack([...stack.getContainer()]);
    await delay(SHORT_DELAY_IN_MS);
    newElem.state = ElementStates.Default;
    setAddLoader(false);
  };

  const clickDelete = async () => {
    setDelLoader(true);
    const delElem = stack.getTop();
    if (delElem !== null) delElem.state = ElementStates.Changing;
    console.log(delElem);
    await delay(SHORT_DELAY_IN_MS);
    stack.pop();
    const newTop = stack.getTop();
    if (newTop !== null) newTop.head = "top";
    setStack([...stack.getContainer()]);
    setDelLoader(false);
  };

  const erase = () => {
    stack.clear();
    setStack([...stack.getContainer()]);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={style.cont}>
        <Input
          extraClass={style.input}
          isLimitText={true}
          maxLength={4}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          value={value}
        />
        <Button
          text="Добавить"
          type="button"
          onClick={clickPush}
          isLoader={addLoader}
        />
        <Button
          extraClass={style.delBtn}
          text="Удалить"
          type="button"
          onClick={clickDelete}
          isLoader={delLoader}
          disabled={stack ? false : true}
        />
        <Button
          text="Очистить"
          type="button"
          onClick={erase}
          disabled={stack ? false : true}
        />
      </div>
      <div className={style.circleCont}>
        {stackArr
          ? stackArr.map((el) => {
              return (
                <Circle
                  letter={el.word}
                  key={el.id}
                  state={el.state}
                  head={typeof el.head === "string" ? el.head : ""}
                  index={Number(el.id)}
                />
              );
            })
          : null}
      </div>
    </SolutionLayout>
  );
};
