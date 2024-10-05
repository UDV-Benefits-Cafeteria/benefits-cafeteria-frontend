import { FC } from "react";

import { classNames } from "@shared/lib/classNames/classNames";
import { Text } from "@shared/ui/Text";

import styles from "./Input.module.scss";

type TInputErrorTextProps = {
  isError: boolean;
  className?: string;
  children: React.ReactNode;
};

export const InputErrorText: FC<TInputErrorTextProps> = props => {
  const { isError, className, children } = props;

  return isError && <Text className={classNames(styles.error, className)}>{children}</Text>;
};
