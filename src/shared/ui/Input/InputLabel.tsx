import { FC } from "react";

import { classNames } from "@shared/lib/classNames/classNames";
import { Text } from "@shared/ui/Text";

import styles from "./Input.module.scss";

type TInputLabelProps = {
  className?: string;
  children: React.ReactNode;
};

export const InputLabel: FC<TInputLabelProps> = props => {
  const { className, children } = props;

  return (
    <label className={classNames(className)}>
      <Text
        boldness={"medium"}
        className={styles.label}
      >
        {children}
      </Text>
    </label>
  );
};
