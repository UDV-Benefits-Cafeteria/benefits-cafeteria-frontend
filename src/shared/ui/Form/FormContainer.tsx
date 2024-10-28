import type { FC, PropsWithChildren } from "react";

import { classNames } from "@shared/lib/classNames/classNames";

import styles from "./Form.module.scss";

type TFormContainerProps = {
  className?: string;
} & PropsWithChildren;

export const FormContainer: FC<TFormContainerProps> = props => {
  const { className, children } = props;

  return <div className={classNames(styles.form_container, className)}>{children}</div>;
};
