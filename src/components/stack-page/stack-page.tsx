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
import { DELAY_IN_MS } from "../../constants/delays";

export const StackPage: React.FC = () => {
  const stack = useMemo(() => new Stack<TWord>(), []);
  const [stackArr, setStack] = useState<TWord[]>();
  const [value, setValue] = useState<string>("");
  const [addLoader, setAddLoader] = useState<boolean>(false);
  const [delLoader, setDelLoader] = useState<boolean>(false);
  const [clearLoader, setClearLoader] = useState<boolean>(false);

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
    await delay(DELAY_IN_MS);
    newElem.state = ElementStates.Default;
    setAddLoader(false);
  };

  const clickDelete = async () => {
    setDelLoader(true);
    const delElem = stack.getTop();
    if (delElem !== null) delElem.state = ElementStates.Changing;
    await delay(DELAY_IN_MS);
    stack.pop();
    const newTop = stack.getTop();
    if (newTop !== null) newTop.head = "top";
    setStack([...stack.getContainer()]);
    setDelLoader(false);
  };

  const erase = async() => {
    setClearLoader(true);
    await delay(DELAY_IN_MS);
    stack.clear();
    setStack([...stack.getContainer()]);
    setClearLoader(false);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={style.cont}>
        <Input
          extraClass={style.input}
          isLimitText={true}
          maxLength={4}
          min={1}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          value={value}
          data-testid="mainInput"
        />
        <Button
          text="Добавить"
          type="button"
          onClick={clickPush}
          isLoader={addLoader}
          disabled={(value.length < 1 || delLoader || clearLoader) ? true : false}
          data-testid="actionButton"
        />
        <Button
          extraClass={style.delBtn}
          text="Удалить"
          type="button"
          onClick={clickDelete}
          isLoader={delLoader}
          disabled={stack.getContainer().length === 0 || addLoader || clearLoader ? true : false}
          data-testid="delButton"
        />
        <Button
          text="Очистить"
          type="button"
          onClick={erase}
          isLoader={clearLoader}
          disabled={stack.getContainer().length === 0 || addLoader || delLoader ? true : false}
          data-testid="clearButton"
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
