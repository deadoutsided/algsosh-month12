import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { SortType } from "../../types/sort";
import { TColumnState } from "../../types/column-state";
import { randomArr } from "../../utils/utils";
import { ArrRestrictions, bubbleSort, choiceSort } from "./algos";
import { ElementStates } from "../../types/element-states";
import { Column } from "../ui/column/column";
import style from "./sorting-page.module.css";

export const SortingPage: React.FC = () => {
  const [isLoader, setLoader] = useState<boolean>(false);
  //const [direction, setDirection] = useState<Direction>();
  const [sortType, setSortType] = useState<SortType>(SortType.Choose);
  const [arr, setArr] = useState<TColumnState[]>();

  const changeSort = (sort: SortType) => {
    setSortType(sort);
  };

  const setRandomArr = () => {
    const newRandArr = randomArr(
      ArrRestrictions.minSize,
      ArrRestrictions.maxSize,
      ArrRestrictions.minValue,
      ArrRestrictions.maxValue
    );
    const columnObjs: TColumnState[] = newRandArr.map((num, i) => {
      return {
        num,
        id: i,
        state: ElementStates.Default,
      };
    });
    setArr([...columnObjs]);
  };

  const sort = async (dir: Direction) => {
    const tempArr: TColumnState[] | undefined = arr;
    if (sortType === SortType.Choose) {
      if (tempArr !== undefined) {
        setLoader(true);
        await choiceSort(tempArr, setArr, dir);
        setLoader(false);
      }
    } else {
      if (tempArr !== undefined) {
        setLoader(true);
        await bubbleSort(tempArr, setArr, dir);
        setLoader(false);
      }
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={style.controlCont}>
        <RadioInput
          label="Выбор"
          onChange={() => changeSort(SortType.Choose)}
          name="sort"
          checked={sortType === SortType.Choose ? true : false}
          extraClass={style.mr52}
        />
        <RadioInput
          label="Пузырёк"
          onChange={() => changeSort(SortType.Bubble)}
          name="sort"
          extraClass={style.mr52}
        />
        <Button
          sorting={Direction.Ascending}
          text="По возрастанию"
          type="button"
          onClick={() => {
            sort(Direction.Ascending);
          }}
          extraClass={style.mr12}
          disabled={isLoader}
        />
        <Button
          sorting={Direction.Descending}
          text="По убыванию"
          type="button"
          onClick={() => {
            sort(Direction.Descending);
          }}
          extraClass={style.mr80}
          disabled={isLoader}
        />
        <Button
          text="Новый массив"
          type="button"
          isLoader={isLoader}
          onClick={setRandomArr}
        />
      </div>
      <div className={style.columnCont}>
        {arr
          ? arr.map((el) => {
              return <Column index={el.num} key={el.id} state={el.state} />;
            })
          : null}
      </div>
    </SolutionLayout>
  );
};
