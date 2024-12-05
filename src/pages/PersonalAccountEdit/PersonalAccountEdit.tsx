import type { FC } from "react";

import { useLogoutMutation } from "@entity/User";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector/useAppSelector";
import { Title } from "@shared/ui/Title";
import { BarHeader } from "@widgets/BarHeader/ui/BarHeader";
import { CreateEmployeeForm } from "@widgets/CreateEmployeeForm/ui/CreateEmployeeForm";
import { useNavigate } from "react-router-dom";

import { PERSONAL_ACCOUNT } from "@app/providers/AppRouter/AppRouter.config";

import styles from "./PersonalAccountEdit.module.scss";

export const PersonalAccountEdit: FC = () => {
  const [logout] = useLogoutMutation();
  const user = useAppSelector(state => state.user.data!);
  const navigate = useNavigate();

  return (
    <>
      <BarHeader />
      <div style={{ maxWidth: 1200, margin: "auto", marginTop: "190px", marginBottom: "100px" }}>
        <Title
          type={"page"}
          className={styles.title}
        >
          Личный кабинет
        </Title>

        <Title
          type={"block"}
          className={styles.link}
        >
          Редактирование профиля
        </Title>

        <CreateEmployeeForm
          onCancel={() => navigate(PERSONAL_ACCOUNT)}
          user={user}
          isPA={true}
        />
      </div>
    </>
  );
};
