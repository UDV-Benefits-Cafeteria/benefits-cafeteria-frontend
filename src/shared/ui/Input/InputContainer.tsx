import { FC } from "react";

import { classNames } from "@shared/lib/classNames/classNames";

import styles from "./Input.module.scss";

type TInputContainerProps = { direction?: "column" | "row" } & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const InputContainer: FC<TInputContainerProps> = props => {
  const { className, children, direction = "column" } = props;

  return <div className={classNames(styles.container, styles[direction], className)}>{children}</div>;
};
