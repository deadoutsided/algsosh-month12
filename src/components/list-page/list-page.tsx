import React, { ChangeEvent, useState, useEffect, useMemo } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { LinkedList } from "./list-class";
import { TWord } from "../../types/words-state";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { nanoid } from "nanoid";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { TLoader } from "../../types/loader-state";
import { initialLoader } from "./util";

export const ListPage: React.FC = () => {
  const list = useMemo(() => new LinkedList<string>(), []);
  const [value, setValue] = useState<string>("");
  const [index, setIndex] = useState<string>("");
  const [listArr, setListArr] = useState<TWord[]>([]);
  const [loader, setLoader] = useState<TLoader>(initialLoader);
  const isDisableByLoad = (loader.constAddLoaderHead || loader.constAddLoaderTail || loader.constDelLoaderHead || loader.constDelLoaderTail || loader.indexAddLoader || loader.indexDelLoader);
  useEffect(() => {
    let temp: TWord[] | null = [];
    for (let i = 0; i < 4; i++) {
      const item = `${Math.floor(Math.random() * 10 + 1)}`;
      temp.push({
        word: `${item}`,
        id: i,
        state: ElementStates.Default,
        head: i === 0 ? "head" : "",
        tail: i === 3 ? "tail" : "",
      });
      list.append(item, i);
    }
    setListArr([...temp]);
  }, []);

  const addIndex = async (index: number) => {
    let temp: TWord[] | null = [];
    let size: number = list.getSize();
    let newItem: TWord = {
      word: value,
      id: nanoid(),
      state: ElementStates.Changing,
    };
    let listItem = list.getHead();
    let i = 0;
    setValue("");
    if (index === 0 || index === size) {
      while (listItem && i <= size) {
        if (i === index || (index === size && i === index - 1)) {
          temp.push({
            word: listItem.value,
            id: nanoid(),
            state: ElementStates.Default,
            head: newItem,
            tail: index === size ? "tail" : "",
          });
        } else {
          temp.push({
            word: listItem.value,
            id: nanoid(),
            state: ElementStates.Default,
            head: i === 0 ? "head" : "",
            tail: i === size - 1 ? "tail" : "",
          });
        }
        i++;
        listItem = listItem.next;
      }
      setListArr([...temp]);
      await delay(SHORT_DELAY_IN_MS);
    } else {
      setIndex("");
      let j = 0;
      while (j <= index) {
        temp = [];
        i = 0;
        listItem = list.getHead();
        while (listItem && i <= size) {
          if (i === j) {
            temp.push({
              word: listItem.value,
              id: nanoid(),
              state: ElementStates.Default,
              head: newItem,
              tail: index === size ? "tail" : "",
            });
          } else if (i < j) {
            temp.push({
              word: listItem.value,
              id: nanoid(),
              state: ElementStates.Changing,
              head: i === 0 ? "head" : "",
              tail: i === size - 1 ? "tail" : "",
            });
          } else {
            temp.push({
              word: listItem.value,
              id: nanoid(),
              state: ElementStates.Default,
              head: i === 0 ? "head" : "",
              tail: i === size - 1 ? "tail" : "",
            });
          }
          listItem = listItem.next;
          i++;
        }
        j++;
        setListArr([...temp]);
        await delay(SHORT_DELAY_IN_MS);
      }
    }
    list.append(value, index);
    size = list.getSize();
    listItem = list.getHead();
    temp = [];
    i = 0;
    while (listItem && i <= size) {
      temp.push({
        word: listItem.value,
        id: nanoid(),
        state: i === index ? ElementStates.Modified : ElementStates.Default,
        head: i === 0 ? "head" : "",
        tail: i === size - 1 ? "tail" : "",
      });
      i++;
      listItem = listItem.next;
    }
    setLoader({...initialLoader})
    setListArr([...temp]);
    await delay(SHORT_DELAY_IN_MS);
    temp[index].state = ElementStates.Default;
    setListArr([...temp]);
  };

  const delIndex = async (index: number) => {
    let temp: TWord[] | null = [];
    let size: number = list.getSize();
    let listItem = list.getHead();
    let i = 0;
    if (index === 0 || index === size) {
      while (listItem && i <= size) {
        if (index === i || (index === size && i === index - 1)) {
          let delItem: TWord = {
            word: listItem.value,
            id: nanoid(),
            state: ElementStates.Changing,
          };
          temp.push({
            word: "",
            id: nanoid(),
            state: ElementStates.Default,
            head: i === 0 ? "head" : "",
            tail: delItem,
          });
        } else {
          temp.push({
            word: listItem.value,
            id: nanoid(),
            state: ElementStates.Default,
            head: "",
            tail: i === size - 1 ? "tail" : "",
          });
        }
        i++;
        listItem = listItem.next;
      }
      setListArr([...temp]);
      await delay(SHORT_DELAY_IN_MS);
    } else {
      setIndex("");
      let j = 0;
      while (j <= index) {
        temp = [];
        i = 0;
        listItem = list.getHead();
        while (listItem && i <= size) {
          if (i === index && j === index) {
            let delItem: TWord = {
              word: listItem.value,
              id: nanoid(),
              state: ElementStates.Changing,
            };
            temp.push({
              word: "",
              id: nanoid(),
              state: ElementStates.Default,
              head: i === 0 ? "head" : "",
              tail: delItem,
            });
          } else if (i === j || i < j) {
            temp.push({
              word: listItem.value,
              id: nanoid(),
              state: ElementStates.Changing,
              head: i === 0 ? "head" : "",
              tail: i === size - 1 ? "tail" : "",
            });
          } else {
            temp.push({
              word: listItem.value,
              id: nanoid(),
              state: ElementStates.Default,
              head: i === 0 ? "head" : "",
              tail: i === size - 1 ? "tail" : "",
            });
          }
          listItem = listItem.next;
          i++;
        }
        j++;
        setListArr([...temp]);
        await delay(SHORT_DELAY_IN_MS);
      }
    }
    
    list.delete(index === size ? index - 1 : index);
    size = list.getSize();
    listItem = list.getHead();
    temp = [];
    i = 0;
    while (listItem && i <= size) {
      temp.push({
        word: listItem.value,
        id: nanoid(),
        state: ElementStates.Default,
        head: i === 0 ? "head" : "",
        tail: i === size - 1 ? "tail" : "",
      });
      i++;
      listItem = listItem.next;
    }
    await delay(SHORT_DELAY_IN_MS);
    setLoader({...initialLoader})
    setListArr([...temp]);
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={style.valueCont}>
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
          extraClass={style.smallBtn}
          text="Добавить в head"
          type="button"
          onClick={() => {
            setLoader({...loader, constAddLoaderHead: true})
            addIndex(0)
          }}
          isLoader={loader.constAddLoaderHead}
          disabled={value === "" || isDisableByLoad ? true : false}
        />
        <Button
          extraClass={style.smallBtn}
          text="Добавить в tail"
          type="button"
          onClick={() => {
            setLoader({...loader, constAddLoaderTail: true})
            addIndex(listArr ? listArr.length : 0)
          }}
          isLoader={loader.constAddLoaderTail}
          disabled={value === "" || isDisableByLoad ? true : false}
        />
        <Button
          extraClass={style.smallBtn}
          text="Удалить из head"
          type="button" 
          onClick={() => {
            setLoader({...loader, constDelLoaderHead: true})
            delIndex(0);
          }}
          isLoader={loader.constDelLoaderHead}
          disabled={list.getSize() === 0 || isDisableByLoad ? true : false}
        />
        <Button
          extraClass={style.smallBtn}
          text="Удалить из tail"
          type="button"
          onClick={() => {
            setLoader({...loader, constDelLoaderTail: true})
            delIndex(listArr ? listArr.length : 0);
          }}
          isLoader={loader.constDelLoaderTail}
          disabled={list.getSize() === 0 || isDisableByLoad ? true : false}
        />
      </div>
      <div className={style.indexCont}>
        <Input
          extraClass={style.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setIndex(e.target.value)
          }
          value={index}
          type="number"
          min={0}
          max={listArr ? listArr.length : 0}
        />
        <Button
          extraClass={style.bigBtn}
          text="Добавить по индексу"
          type="button"
          onClick={() => {
            setLoader({...loader, indexAddLoader: true})
            addIndex(Number(index))
          }}
          isLoader={loader.indexAddLoader}
          disabled={(value === "" || index === "" || Number(index) > (listArr ? listArr.length : 0) || Number(index) < 0 || isDisableByLoad) ? true : false}
        />
        <Button
          extraClass={style.bigBtn}
          text="Удалить по индексу"
          type="button"
          onClick={() => 
            {
              setLoader({...loader, indexDelLoader: true})
              delIndex(Number(index))
            }}
          isLoader={loader.indexDelLoader}
          disabled={index === "" || Number(index) < 0 || Number(index) > list.getSize() - 1 || isDisableByLoad ? true : false ? true : false}
        />
      </div>
      <div className={style.circleCont}>
        {listArr &&
          listArr.map((el, i) => {
            return (
              <div className={style.circleCover} key={i}>
                <Circle
                  letter={el.word}
                  key={el.id}
                  index={i}
                  state={el.state}
                  head={
                    typeof el.head === "string" ? (
                      el.head === "head" ? (
                        "head"
                      ) : (
                        ""
                      )
                    ) : (
                      <Circle
                        letter={el.head ? el.head.word : ""}
                        state={el.head ? el.head.state : ElementStates.Default}
                        isSmall={true}
                      />
                    )
                  }
                  tail={
                    typeof el.tail === "string" ? (
                      el.tail === "tail" ? (
                        "tail"
                      ) : (
                        ""
                      )
                    ) : (
                      <Circle
                        letter={el.tail ? el.tail.word : ""}
                        state={el.tail ? el.tail.state : ElementStates.Default}
                        isSmall={true}
                      />
                    )
                  }
                />
                {i < listArr.length - 1 && <ArrowIcon />}
              </div>
            );
          })}
      </div>
    </SolutionLayout>
  );
};
