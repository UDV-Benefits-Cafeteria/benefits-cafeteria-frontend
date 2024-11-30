import type { FC, PropsWithChildren } from "react";

import { classNames } from "@shared/lib/classNames/classNames";
import { Text } from "@shared/ui/Text";

import styles from "./Input.module.scss";

type TInputLabelProps = {
  className?: string;
} & PropsWithChildren;

export const InputLabel: FC<TInputLabelProps> = props => {
  const { className, children } = props;

  return (
    <label className={classNames(className)}>
      <Text
        boldness={"bold"}
        className={styles.label}
      >
        {children}
      </Text>
    </label>
  );
};
