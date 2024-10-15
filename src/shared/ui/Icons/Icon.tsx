import { FC } from "react";

import { classNames } from "@shared/lib/classNames/classNames";

import icons from "./IconVars.module.scss";
import styles from "./Icons.module.scss";

export type TIconProps = {
  className?: string;
  icon: keyof typeof icons;
  size?: "s" | "m" | "l";
};

export const Icon: FC<TIconProps> = props => {
  const { icon, className, size } = props;

  return <div className={classNames(icons[icon], styles.base_icon, size ? styles[size] : null, className)} />;
};