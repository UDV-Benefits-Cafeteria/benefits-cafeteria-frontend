import type { FC } from "react";

import { useLogoutMutation } from "@entity/User";
import emptyImage from "@shared/assets/images/Avatar.png";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector/useAppSelector";
import { Button } from "@shared/ui/Button";
import { Image } from "@shared/ui/Image/Image";
import { Link } from "@shared/ui/Link";
import { Text } from "@shared/ui/Text";
import { Title } from "@shared/ui/Title";
import { BarHeader } from "@widgets/BarHeader/ui/BarHeader";
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
      <div style={{ maxWidth: 1200, margin: "auto", marginTop: "100px" }}>
        <Title type={"page"}>
          <Link route={BENEFITS_BAR}>{"<-"} Вернуться в бар бенефитов</Link>
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
              srs={user.image_url || emptyImage}
            />

            <div className={styles.data_container}>
              <Text>
                {user.firstname} {user.middlename} {user.lastname}
              </Text>

              <Text type={"description"}>
                {user.position?.name}, юридическое лицо {user.legal_entity?.name}
              </Text>

              <Text>{user.email}</Text>

              <Text>{user.experience}</Text>

              <Text>{user.level} уровень</Text>
            </div>
          </div>

          <div className={styles.coin_container}>
            <Text>Ваш баланс</Text>

            <span className={styles.coin_info}>
              {user.coins}
              <div className={styles.coin} />
            </span>
          </div>
        </div>

        <div className={styles.buttons}>
          <Button
            onClick={async () => {
              navigate(EMPLOYEES + "/" + user.id + "/edit");
            }}
          >
            Редактировать профиль
          </Button>

          <Button
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