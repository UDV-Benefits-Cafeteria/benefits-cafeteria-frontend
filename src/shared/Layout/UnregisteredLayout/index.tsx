import { FC, PropsWithChildren } from "react";

import { PATTERN } from "@shared/assets/imageConsts";
import { classNames } from "@shared/lib/classNames/classNames";
import { Image } from "@shared/ui/Image/Image";
import { useNavigate } from "react-router-dom";

import { BENEFITS_BAR } from "@app/providers/AppRouter/AppRouter.config";

import styles from "./UnregisteredLayout.module.scss";

type TUnregisteredLayoutProps = {
  className?: string;
  withPattern?: boolean;
} & PropsWithChildren;

export const UnregisteredLayout: FC<TUnregisteredLayoutProps> = props => {
  const { className, withPattern, children } = props;
  const navigate = useNavigate();

  return (
    <main className={classNames(styles.page, withPattern ? styles.with_pattern : null, className)}>
      {withPattern ? (
        <Image
          srs={PATTERN}
          className={styles.pattern}
        />
      ) : null}

      {children}
    </main>
  );
};
