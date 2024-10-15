import { FC, type ReactNode } from "react";

import { classNames } from "@shared/lib/classNames/classNames";

import styles from "./UnregisteredLayout.module.scss";

type TUnregisteredLayoutProps = {
  className?: string;
  children: ReactNode;
};

export const UnregisteredLayout: FC<TUnregisteredLayoutProps> = props => {
  const { className, children } = props;

  return <main className={classNames(styles.page, className)}>{children}</main>;
};
