import type { FC } from "react";

import { useAppSelector } from "@shared/lib/hooks/useAppSelector/useAppSelector";
import { Icon } from "@shared/ui/Icons/Icon";
import { InputContainer } from "@shared/ui/Input/InputContainer";
import { InputField } from "@shared/ui/Input/InputField";
import { useNavigate } from "react-router-dom";

import { PURCHASE_HISTORY } from "@app/providers/AppRouter/AppRouter.config";

import styles from "../styles/BarHeader.module.scss";

export const BarHeader: FC = () => {
  const user = useAppSelector(state => state.user.data!);
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.logo} />

        <InputContainer>
          <InputField icon={"loupe"} />
        </InputContainer>

        <div className={styles.item}>
          <span className={styles.top_text}>{user.coins}</span>
          <span className={styles.text}>UDV-coins</span>
        </div>

        <div className={styles.item}>
          <span className={styles.top_text}>{user.level}</span>
          <span className={styles.text}>Уровень</span>
        </div>

        <div
          className={styles.item}
          onClick={() => navigate(PURCHASE_HISTORY)}
        >
          <Icon
            className={styles.icon}
            icon={"employees"}
            size={"l"}
          />
          <span className={styles.text}> Покупки</span>
        </div>

        <div className={styles.item}>
          <Icon
            className={styles.icon}
            icon={"questions"}
            size={"l"}
          />
          <span className={styles.text}>{user.firstname}</span>
        </div>
      </div>
    </header>
  );
};
