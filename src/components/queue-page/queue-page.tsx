import React, { ChangeEvent, useState, useMemo, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./queue-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { initialQueue } from "./utils";
import { Queue } from "./queue-class";
import { TWord } from "../../types/words-state";
import { ElementStates } from "../../types/element-states";
import { changeStates, delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const QueuePage: React.FC = () => {
  const queue = useMemo(() => new Queue<string>(7), []);

  const [value, setValue] = useState<string>("");
  const [objQueue, setQueue] = useState<TWord[]>();
  const [addLoader, setAddLoader] = useState<boolean>(false);
  const [delLoader, setDelLoader] = useState<boolean>(false);
  const [length, setLength] = useState<number>(0);

  useEffect(() => {
    setQueue([...initialQueue]);
  }, []);

  const addValue = async (val: string) => {
    queue.enqueue(val);
    setValue("");
    const arr = [...queue.getCont()];
    const tail = queue.getTail();
    const head = queue.getHead();
    const size = queue.getSize();
    if (length === size) {
      throw new Error("queue is full");
      return;
    }
    setAddLoader(true);
    setLength(queue.getLength());
    let temp = objQueue ? [...objQueue] : [...initialQueue];
    changeStates(
      temp,
      ElementStates.Changing,
      tail !== null ? [tail % size] : []
    );
    setQueue([...temp]);
    temp = arr.map((el, i) => {
      return {
        word: el ? el : "",
        id: i,
        state: ElementStates.Default,
        head: head !== null && i === head % size ? "head" : "",
        tail: tail !== null && i === tail % size ? "tail" : "",
      };
    });
    await delay(SHORT_DELAY_IN_MS);
    changeStates(
      temp,
      ElementStates.Default,
      tail !== null ? [tail % size] : []
    );
    setQueue([...temp]);
    setAddLoader(false);
  };

  const deleteValue = async () => {
    setDelLoader(true);
    queue.dequeue();
    setLength(queue.getLength());
    const arr = [...queue.getCont()];
    let tail = queue.getTail();
    let head = queue.getHead();
    const size = queue.getSize();
    if (length === 1) {
      tail = null;
      head = null;
    }
    let temp = objQueue ? [...objQueue] : [...initialQueue];
    changeStates(
      temp,
      ElementStates.Changing,
      head !== null ? [(head - 1) % size] : []
    );
    setQueue([...temp]);
    temp = arr.map((el, i) => {
      return {
        word: el ? el : "",
        id: i,
        state: ElementStates.Default,
        head: head !== null && i === head % size ? "head" : "",
        tail: tail !== null && i === tail % size ? "tail" : "",
      };
    });
    await delay(SHORT_DELAY_IN_MS);
    changeStates(
      temp,
      ElementStates.Default,
      head !== null ? [(head - 1) % size] : []
    );
    setQueue([...temp]);
    setDelLoader(false);
  };

  const clear = () => {
    queue.erase();
    setLength(queue.getLength());
    initialQueue[0].state = ElementStates.Default;
    setQueue(initialQueue);
  };

  return (
    <SolutionLayout title="Очередь">
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
          onClick={() => addValue(value)}
          isLoader={addLoader}
          disabled={value === "" ? true : false}
        />
        <Button
          extraClass={style.delBtn}
          text="Удалить"
          type="button"
          onClick={deleteValue}
          isLoader={delLoader}
          disabled={length === 0 || delLoader === true ? true : false}
        />
        <Button
          text="Очистить"
          type="button"
          onClick={clear}
          disabled={length === 0 ? true : false}
        />
      </div>
      <div className={style.circleCont}>
        {objQueue
          ? objQueue.map((el, i) => {
              return (
                <Circle
                  letter={el.word}
                  key={el.id}
                  index={i}
                  state={el.state}
                  head={el.head ? "head" : ""}
                  tail={el.tail ? "tail" : ""}
                />
              );
            })
          : null}
      </div>
    </SolutionLayout>
  );
};
