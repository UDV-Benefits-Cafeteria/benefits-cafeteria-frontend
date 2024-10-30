import type { FC, PropsWithChildren } from "react";

import styles from "./ViewInfoContainer.module.scss";

export const ViewInfoContainer: FC<PropsWithChildren> = props => {
  return (
    <>
      <div className={styles.container}>{props.children}</div>

      <span>1 2 3</span>
    </>
  );
};
