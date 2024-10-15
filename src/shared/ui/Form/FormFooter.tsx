import type { FC, ReactNode } from "react";

import { classNames } from "@shared/lib/classNames/classNames";

import styles from "./Form.module.scss";

type TFormFooter = {
  className?: string;
  children: ReactNode;
};

export const FormFooter: FC<TFormFooter> = props => {
  const { className, children } = props;

  return <div className={classNames(styles.footer, className)}>{children}</div>;
};
