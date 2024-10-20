import { FC, type ReactNode } from "react";

import image from "@shared/assets/images/pattern.png";
import { classNames } from "@shared/lib/classNames/classNames";
import { Image } from "@shared/ui/Image/Image";

import styles from "./UnregisteredLayout.module.scss";

type TUnregisteredLayoutProps = {
  className?: string;
  withPattern?: boolean;
  children: ReactNode;
};

export const UnregisteredLayout: FC<TUnregisteredLayoutProps> = props => {
  const { className, children, withPattern } = props;

  return (
    <main className={classNames(styles.page, withPattern ? styles.with_pattern : null, className)}>
      {withPattern ? (
        <Image
          srs={image}
          className={styles.pattern}
        />
      ) : null}

      <main>{children}</main>
    </main>
  );
};
