import type { FC } from "react";

import { classNames } from "@shared/lib/classNames/classNames";

import styles from "./Checkbox.module.scss";

type TCheckbox = {
  radio?: boolean;
  className?: string;
  label?: string;
  onChange: (checked: boolean) => void;
  value: boolean;
};

export const Checkbox: FC<TCheckbox> = props => {
  const { className, label, value, onChange, radio } = props;

  return (
    <span className={classNames(className, styles.container)}>
      <label className={styles.label}>{label}</label>

      <input
        onChange={() => onChange(!value)}
        checked={value}
        className={styles.checkbox}
        type={radio ? "radio" : "checkbox"}
      />
    </span>
  );
};
