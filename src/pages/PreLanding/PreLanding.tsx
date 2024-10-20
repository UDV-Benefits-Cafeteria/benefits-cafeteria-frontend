import { FC } from "react";

import { UnregisteredLayout } from "@shared/Layout/UnregisteredLayout";
import { Button } from "@shared/ui/Button";
import { Title } from "@shared/ui/Title";
import { useNavigate } from "react-router-dom";

import styles from "./PreLanding.module.scss";

export const PreLanding: FC = () => {
  const navigate = useNavigate();

  return (
    <UnregisteredLayout withPattern={true}>
      <div className={styles.container}>
        <div className={styles.logo} />

        <Title
          type={"page"}
          className={styles.title}
        >
          Кафетерий льгот для&nbsp;сотрудников UDV
        </Title>

        <Button
          className={styles.button}
          onClick={() => navigate("/login")}
        >
          Войти в аккаунт
        </Button>
      </div>
    </UnregisteredLayout>
  );
};
