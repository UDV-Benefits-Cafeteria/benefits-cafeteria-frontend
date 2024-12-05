import type { FC } from "react";

import { useLogoutMutation } from "@entity/User";
import { USER_PLACEHOLDER } from "@shared/assets/imageConsts";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector/useAppSelector";
import { Button } from "@shared/ui/Button";
import { Image } from "@shared/ui/Image/Image";
import { Link } from "@shared/ui/Link";
import { Text } from "@shared/ui/Text";
import { Title } from "@shared/ui/Title";
import { BarHeader } from "@widgets/BarHeader/ui/BarHeader";
import { Tooltip } from "antd";
import { useNavigate } from "react-router-dom";

import { BENEFITS_BAR, EMPLOYEES, LOGIN } from "@app/providers/AppRouter/AppRouter.config";

import styles from "./PersonalAccount.module.scss";

export const PersonalAccount: FC = () => {
  const [logout] = useLogoutMutation();
  const user = useAppSelector(state => state.user.data!);
  const navigate = useNavigate();

  return (
    <>
      <BarHeader />
      <div style={{ maxWidth: 1200, margin: "auto", marginTop: "190px", marginBottom: "100px" }}>
        <Title type={"page"}>
          <Link
            className={styles.link}
            route={BENEFITS_BAR}
          >
            {"<-"} Вернуться в бар бенефитов
          </Link>
        </Title>

        <Title
          type={"page"}
          className={styles.title}
        >
          Личный кабинет
        </Title>

        <div className={styles.container}>
          <div className={styles.info_container}>
            <Image
              className={styles.image}
              srs={user.image_url || USER_PLACEHOLDER}
              onError={e => (e.target.src = USER_PLACEHOLDER)}
            />

            <div className={styles.data_container}>
              <div>
                <Text className={styles.user_name}>
                  {user.lastname} {user.firstname} {user.middlename}
                </Text>

                <Text
                  type={"description"}
                  className={styles.user_entity}
                >
                  {user.position?.name}
                  {user.legal_entity?.name ? ", юридическое лицо" : ""} {user.legal_entity?.name}
                </Text>

                <Text className={styles.user_other_info}>{user.email}</Text>
              </div>
              <Tooltip
                className={styles.tooltip}
                placement="bottom"
                title={
                  "Уровень - это универсальный индикатор вашего опыта работы в нашей компании. Каждые 30 дней он повышается, открывая доступ к более широкому спектру бенефитов. Продолжайте расти вместе с нами!"
                }
              >
                <div>
                  <div className={styles.progressContainer}>
                    <div
                      className={styles.progressBar}
                      style={{
                        width: `${((user.experience % 30) / 30) * 100}%`,
                      }}
                    ></div>
                  </div>

                  <Text className={styles.user_other_info}>{user.level} уровень</Text>
                </div>
              </Tooltip>
            </div>
          </div>

          <div className={styles.coin_container}>
            <Text className={styles.coin_title}>Ваш баланс</Text>

            <span className={styles.coin_info}>
              {user.coins}
              <div className={styles.coin} />
            </span>
          </div>
        </div>

        <div className={styles.buttons}>
          <Button
            className={styles.btn}
            onClick={async () => {
              navigate(EMPLOYEES + "/" + user.id + "/edit");
            }}
          >
            Редактировать профиль
          </Button>

          <Button
            className={styles.btn}
            buttonType={"secondary-red"}
            onClick={async () => {
              navigate(LOGIN);
              await logout(null);
            }}
          >
            Выйти из аккаунта
          </Button>
        </div>
      </div>
    </>
  );
};
