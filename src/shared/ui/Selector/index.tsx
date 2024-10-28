import { FC } from "react";

import { classNames } from "@shared/lib/classNames/classNames";

import styles from "./Selector.module.scss";

type TSelectValue = {
  data: string;
  text: string;
};

type TSelectorProps = {
  className?: string;
  needEmptyValue?: boolean;
  currentValue: string;
  setCurrentValue: (value: string) => void;
  values: TSelectValue[];
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;

export const Selector: FC<TSelectorProps> = props => {
  const { values, needEmptyValue, currentValue, setCurrentValue, className } = props;

  console.log(currentValue);

  return (
    <select
      className={classNames(styles.selector, className)}
      onChange={e => setCurrentValue(e.currentTarget.value)}
    >
      {needEmptyValue ? <div>-</div> : null}

      {values.map(el => (
        <option
          key={el.data}
          value={el.data}
          className={classNames(styles.option, el.data === currentValue ? styles.active : null)}
        >
          {el.text}
        </option>
      ))}
    </select>
  );
};
