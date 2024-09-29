import { FC, ReactNode } from "react";

import { classNames } from "@shared/lib/classNames/classNames";

import styles from "./Text.module.scss";

type TText = {
  size?: "s" | "m" | "l";
  boldness?: "normal" | "medium" | "bold";
  fontStyle?: "main" | "alternative";
  children: ReactNode;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;

export const Text: FC<TText> = props => {
  const { children, size = "m", fontStyle, className, boldness = "normal" } = props;
  const isAlternative = fontStyle !== "main";

  console.log(styles[boldness]);

  return (
    <p
      {...props}
      className={classNames(
        styles.text,
        styles[size],
        isAlternative ? styles.alternative : null,
        styles[boldness],
        className
      )}
    >
      {children}
    </p>
  );
};
