import type { FC, PropsWithChildren } from "react";

import image from "@shared/assets/images/temp_avatar.png";
import { classNames } from "@shared/lib/classNames/classNames";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector/useAppSelector";
import { Icon } from "@shared/ui/Icons/Icon";
import { Image } from "@shared/ui/Image/Image";
import { Text } from "@shared/ui/Text";
import { Link, useLocation } from "react-router-dom";

import styles from "./RegisteredLayout.module.scss";

type TRegisteredLayout = {
  className?: string;
} & PropsWithChildren;

type TNavBarIcons = "employees" | "benefits" | "applications" | "questions";

type TNavbarContent = {
  title: string;
  link: string;
  icon: TNavBarIcons;
};

const NAVBAR_CONTENT: TNavbarContent[] = [
  {
    title: "Бенефиты",
    icon: "benefits",
    link: "/main",
  },
  {
    title: "Сотрудники",
    icon: "employees",
    link: "/",
  },
  {
    title: "Заявки",
    icon: "applications",
    link: "/",
  },
  {
    title: "Вопросы",
    icon: "questions",
    link: "/",
  },
];

const SideBar: FC = () => {
  const location = useLocation();
  const user = useAppSelector(state => state.user.data!);

  return (
    <div className={styles.sidebar}>
      <div className={styles.top_container}>
        <div className={styles.logo} />

        <Text type={"description"}>
          Юридическое лицо: <span className={styles.company_name}>{user.legal_entity?.name}</span>
        </Text>

        <nav className={styles.navbar}>
          {NAVBAR_CONTENT.map(el => {
            const isActive = location.pathname === el.link ? styles.active : null;

            return (
              <Link
                to={el.link}
                key={el.title}
                className={classNames(styles.element, isActive)}
              >
                <Icon
                  icon={el.icon}
                  size={"l"}
                  className={classNames(styles.element__icon, isActive)}
                />

                <Text className={classNames(styles.element__text, isActive)}>{el.title}</Text>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className={styles.user}>
        <Image
          srs={image}
          className={styles.user__image}
        />

        <div className={styles.user__info}>
          <Text>
            {user.firstname} {user.lastname}
          </Text>

          <Text type={"description"}>{user.position?.name}</Text>
        </div>
      </div>
    </div>
  );
};

export const RegisteredLayout: FC<TRegisteredLayout> = props => {
  const { children, className } = props;

  return (
    <main className={styles.page}>
      <SideBar />

      <section className={styles.content}>{children}</section>
    </main>
  );
};
