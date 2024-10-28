import { type FC } from "react";

import { classNames } from "@shared/lib/classNames/classNames";

import styles from "./Selector.module.scss";

export type TSelectValue = {
  data: string;
  text: string;
};

type TSelectorProps = {
  className?: string;
  needEmptyValue?: boolean;
  currentValue: string;
  setCurrentValue: (value: string) => void;
  values: TSelectValue[];
  disabled?: boolean;
  addButton?: { text: string; event: () => void };
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;

export const Selector: FC<TSelectorProps> = props => {
  const { values, needEmptyValue, currentValue, setCurrentValue, className, addButton, disabled } = props;

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.currentTarget.value;

    if (addButton && newValue === "add") {
      setCurrentValue(prev => prev);
      addButton.event();

      return;
    }

    setCurrentValue(newValue);
  };

  return (
    <select
      className={classNames(styles.selector, className)}
      value={currentValue}
      disabled={disabled}
      onChange={handleSelect}
    >
      {needEmptyValue ? (
        <option className={classNames(styles.option, "-" === currentValue ? styles.active : null)}>-</option>
      ) : null}

      {values.map(el => (
        <option
          key={el.data}
          value={el.data}
          className={classNames(styles.option, el.data === currentValue ? styles.active : null)}
        >
          {el.text}
        </option>
      ))}

      {addButton ? (
        <option
          className={styles.option}
          value={"add"}
        >
          {addButton.text}
        </option>
      ) : null}
    </select>
  );
};
