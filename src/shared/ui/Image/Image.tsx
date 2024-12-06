import { type FC } from "react";

import { classNames } from "@shared/lib/classNames/classNames";

import styles from "./Image.module.scss";

type TImage = {
  srs: string;
  alt?: string;
  type?: "avatar";
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLImageElement>, HTMLImageElement>;

export const Image: FC<TImage> = props => {
  const { srs, alt = "", type } = props;

  return (
    <img
      className={classNames(type ? styles.avatar : null)}
      loading={"lazy"}
      style={{ objectFit: "cover" }}
      alt={alt}
      src={srs}
      {...props}
    />
  );
};
