import type { FC, PropsWithChildren, ReactNode } from "react";

import { Title } from "@shared/ui/Title";

import styles from "./ViewInfoContainer.module.scss";

type ViewHeaderProps = { title: string; searchBar?: ReactNode } & PropsWithChildren;

export const ViewHeader: FC<ViewHeaderProps> = props => {
  const { title, children, searchBar } = props;

  return (
    <div className={styles.header}>
      <div className={styles.top}>
        <Title type={"page"}>{title}</Title>

        {children}
      </div>

      {searchBar}
    </div>
  );
};
