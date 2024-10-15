import type { FC, ReactNode } from "react";

import { classNames } from "@shared/lib/classNames/classNames";
import { Link as RouterLink } from "react-router-dom";

import styles from "./Link.module.scss";

type TLinkProps = {
  route?: string;
  className?: string;
  children: ReactNode;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

export const Link: FC<TLinkProps> = props => {
  const { route, children, className } = props;

  const LinkClassName = classNames(styles.link, className);

  return (
    <>
      {route ? (
        <RouterLink
          className={LinkClassName}
          to={route}
        >
          {children}
        </RouterLink>
      ) : (
        <a
          {...props}
          className={LinkClassName}
        >
          {children}
        </a>
      )}
    </>
  );
};
