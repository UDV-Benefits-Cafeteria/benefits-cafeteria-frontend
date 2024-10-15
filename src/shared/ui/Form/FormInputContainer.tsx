import { FC, type ReactNode } from "react";

import { classNames } from "@shared/lib/classNames/classNames";

import styles from "./Form.module.scss";

type TInputContainerProps = {
  className?: string;
  children: ReactNode;
};

export const FormInputContainer: FC<TInputContainerProps> = props => {
  const { className, children } = props;

  return <div className={classNames(styles.input_container, className)}>{children}</div>;
};
