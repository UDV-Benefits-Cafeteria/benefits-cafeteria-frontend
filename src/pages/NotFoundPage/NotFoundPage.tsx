import { FC } from "react";

import { UnregisteredLayout } from "@shared/Layout/UnregisteredLayout";
import { Button } from "@shared/ui/Button";
import { Title } from "@shared/ui/Title";
import { useNavigate } from "react-router-dom";

import styles from "./NotFoundPage.module.scss";

export const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  return (
    <UnregisteredLayout withPattern={true}>
      <div className={styles.container}>
        <Title
          type={"page"}
          boldness={"medium"}
          className={styles.error}
        >
          404
        </Title>

        <Title
          type={"block"}
          boldness="medium"
          className={styles.title}
        >
          Страница не&nbsp;найдена!
        </Title>

        <Button
          className={styles.button}
          onClick={() => navigate("/")}
        >
          НА ГЛАВНУЮ
        </Button>
      </div>
    </UnregisteredLayout>
  );
};
