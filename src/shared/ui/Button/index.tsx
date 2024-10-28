import type { FC, PropsWithChildren } from "react";

import { classNames } from "@shared/lib/classNames/classNames";

import styles from "./Button.module.scss";

type TButtonProps = {
  className?: string;
  disabled?: boolean;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> &
  PropsWithChildren;

export const Button: FC<TButtonProps> = props => {
  const { className, children, disabled } = props;

  return (
    <button
      {...props}
      disabled={disabled}
      className={classNames(styles.button, className)}
    >
      {children}
    </button>
  );
};
