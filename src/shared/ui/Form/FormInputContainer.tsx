import type { FC, PropsWithChildren } from "react";

import { classNames } from "@shared/lib/classNames/classNames";

import styles from "./Form.module.scss";

type TInputContainerProps = {
  className?: string;
} & PropsWithChildren;

export const FormInputContainer: FC<TInputContainerProps> = props => {
  const { className, children } = props;

  return <div className={classNames(styles.input_container, className)}>{children}</div>;
};
