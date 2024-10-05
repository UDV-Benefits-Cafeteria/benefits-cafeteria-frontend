import { FC, ReactNode } from "react";

import { classNames } from "@shared/lib/classNames/classNames";

import styles from "./Text.module.scss";

type TText = {
  boldness?: "normal" | "medium" | "bold";
  fontStyle?: "main" | "alternative";
  children: ReactNode;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;

export const Text: FC<TText> = props => {
  const { children, fontStyle = "main", className, boldness = "normal" } = props;
  const isAlternative = fontStyle !== "main";

  return (
    <p
      {...props}
      className={classNames(styles.text, isAlternative ? styles.alternative : null, styles[boldness], className)}
    >
      {children}
    </p>
  );
};
