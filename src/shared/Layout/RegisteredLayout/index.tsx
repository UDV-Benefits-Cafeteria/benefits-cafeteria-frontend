import { type FC, type PropsWithChildren, useEffect } from "react";

import { useLogoutMutation } from "@entity/User";
import { USER_PLACEHOLDER } from "@shared/assets/imageConsts";
import { PATH } from "@shared/consts/localStorage";
import { classNames } from "@shared/lib/classNames/classNames";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector/useAppSelector";
import { Icon } from "@shared/ui/Icons/Icon";
import { Image } from "@shared/ui/Image/Image";
import { Text } from "@shared/ui/Text";
import { Popover } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  APPLICATION,
  BENEFITS,
  BENEFITS_BAR,
  EMPLOYEES,
  LEGAL_ENTITY,
  PERSONAL_ACCOUNT,
} from "@app/providers/AppRouter/AppRouter.config";

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

const NAVBAR_CONTENT_HR: TNavbarContent[] = [
  {
    title: "Бенефиты",
    icon: "benefits",
    link: BENEFITS,
  },
  {
    title: "Сотрудники",
    icon: "employees",
    link: EMPLOYEES,
  },
  {
    title: "Заявки",
    icon: "applications",
    link: APPLICATION,
  },
];

const NAVBAR_CONTENT_ADMIN: TNavbarContent[] = [
  {
    title: "Бенефиты",
    icon: "benefits",
    link: BENEFITS,
  },
  {
    title: "Пользователи",
    icon: "employees",
    link: EMPLOYEES,
  },
  {
    title: "Юридические лица",
    icon: "applications",
    link: LEGAL_ENTITY,
  },
];

const SideBar: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAppSelector(state => state.user.data!);

  useEffect(() => {
    localStorage.setItem(PATH, "admin");
  }, []);

  const navbarContent = user.role === "admin" ? NAVBAR_CONTENT_ADMIN : NAVBAR_CONTENT_HR;
  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    logout(null);
    localStorage.setItem(PATH, "");
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.top_container}>
        <div
          className={styles.logo}
          onClick={() => navigate(BENEFITS_BAR)}
        />

        <Text type={"description"}>
          Юридическое лицо:{" "}
          <span className={styles.company_name}>
            {user.legal_entity?.name ? user.legal_entity?.name : "не выбрано"}
          </span>
        </Text>

        <nav className={styles.navbar}>
          {navbarContent.map(el => {
            const isActive = location.pathname.includes(el.link) ? styles.active : null;

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

      <Popover
        className={styles.popover}
        arrow={false}
        trigger={"click"}
        color={"white"}
        content={
          <div className={styles.menu}>
            <div className={styles.menu__top}>
              <Text
                onClick={() => navigate(PERSONAL_ACCOUNT)}
                className={styles.menu__el}
              >
                Личный кабинет
              </Text>
              <Text
                onClick={() => navigate(BENEFITS_BAR)}
                className={styles.menu__el}
              >
                Режим пользователя
              </Text>
              <Text
                onClick={() => window.location.assign("https://help.internal.vstrechya.space")}
                className={styles.menu__el}
              >
                Помощь
              </Text>
            </div>
            <div>
              <Text
                onClick={handleLogout}
                className={styles.menu__el}
              >
                Выйти
              </Text>
            </div>
          </div>
        }
      >
        <div className={styles.user}>
          <Image
            srs={user.image_url || USER_PLACEHOLDER}
            className={styles.user__image}
            onError={e => (e.target.src = USER_PLACEHOLDER)}
          />
          <div className={styles.user__info}>
            <Text>
              {user.firstname} {user.lastname}
            </Text>

            <Text type={"description"}>{user.position?.name}</Text>
          </div>
        </div>
      </Popover>
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
