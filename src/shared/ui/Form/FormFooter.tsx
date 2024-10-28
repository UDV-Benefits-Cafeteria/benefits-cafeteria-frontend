import type { FC, PropsWithChildren } from "react";

import { classNames } from "@shared/lib/classNames/classNames";

import styles from "./Form.module.scss";

type TFormFooter = {
  className?: string;
} & PropsWithChildren;

export const FormFooter: FC<TFormFooter> = props => {
  const { className, children } = props;

  return <div className={classNames(styles.footer, className)}>{children}</div>;
};
