import type { FC, PropsWithChildren } from "react";

import { classNames } from "@shared/lib/classNames/classNames";
import { Icon } from "@shared/ui/Icons/Icon";
import { Title } from "@shared/ui/Title";

import styles from "./FiltersSidebar.module.scss";

type filtersSidebarProps = {
  className?: string;
  title: string;
  isOpen: boolean;
  type?: "admin" | "user";
  onClose(): void;
} & PropsWithChildren;

export const FiltersSidebar: FC<filtersSidebarProps> = props => {
  const { className, title, children, onClose, isOpen, type = "user" } = props;

  return (
    <div className={classNames(styles.sidebar, isOpen ? styles.open : styles.close, styles[type], className)}>
      <div className={styles.top}>
        <Title type={"block"}>{title}</Title>

        <Icon
          size={"l"}
          icon={"close"}
          onClick={onClose}
          className={styles.close_icon}
        />
      </div>

      <div>{children}</div>
    </div>
  );
};
