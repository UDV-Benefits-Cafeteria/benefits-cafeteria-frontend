import { FC } from "react";

import { classNames } from "@shared/lib/classNames/classNames";

import styles from "./Input.module.scss";

type TInputProps = { placeholder?: string; icon?: "mail" } & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const InputField: FC<TInputProps> = props => {
  const { className, placeholder, icon } = props;
  //  {icon && <div className={Icons[icon]} />}

  return (
    <input
      {...props}
      placeholder={placeholder}
      className={classNames(styles.input, icon ? styles[icon] : null, icon ? styles.with_icon : null, className)}
    />
  );
};
