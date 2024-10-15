import { FC, ReactNode } from "react";

import { classNames } from "@shared/lib/classNames/classNames";

import styles from "./Title.module.scss";

type TTitle = "page" | "block" | "element";

type TTitleTags = "h1" | "h2" | "h3";

type TTitleProps = {
  type: TTitle;
  children: ReactNode;
  fontStyle?: "main" | "alternative";
  boldness?: "normal" | "medium" | "bold";
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;

const TITLE_VARIANTS: { [k in TTitle]: TTitleTags } = {
  page: "h1",
  block: "h2",
  element: "h3",
};

export const Title: FC<TTitleProps> = props => {
  const { children, type = "block", fontStyle = "main", boldness = "bold", className } = props;
  const isAlternative = fontStyle !== "main";

  const Tag: TTitleTags = TITLE_VARIANTS[type];

  return (
    <Tag
      {...props}
      className={classNames(styles.title, styles[boldness], isAlternative ? styles.alternative : null, className)}
    >
      {children}
    </Tag>
  );
};
