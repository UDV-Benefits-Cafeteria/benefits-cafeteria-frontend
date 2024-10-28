import type { FC, PropsWithChildren } from "react";

import { classNames } from "@shared/lib/classNames/classNames";

import styles from "./Text.module.scss";

type TText = {
  boldness?: "normal" | "medium" | "bold";
  fontStyle?: "main" | "alternative";
  type?: "description";
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> &
  PropsWithChildren;

export const Text: FC<TText> = props => {
  const { children, fontStyle = "main", className, boldness = "normal", type } = props;
  const isAlternative = fontStyle !== "main";

  return (
    <p
      {...props}
      className={classNames(
        styles.text,
        styles[boldness],
        type ? styles[type] : null,
        isAlternative ? styles.alternative : null,
        className
      )}
    >
      {children}
    </p>
  );
};
