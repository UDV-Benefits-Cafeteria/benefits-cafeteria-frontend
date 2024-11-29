import { type FC, useEffect } from "react";

import { PATH } from "@shared/consts/localStorage";
import { classNames } from "@shared/lib/classNames/classNames";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector/useAppSelector";
import { Icon } from "@shared/ui/Icons/Icon";
import { InputContainer } from "@shared/ui/Input/InputContainer";
import { InputField } from "@shared/ui/Input/InputField";
import { Link } from "@shared/ui/Link";
import { useNavigate } from "react-router-dom";

import { BENEFITS_BAR, PERSONAL_ACCOUNT, PURCHASE_HISTORY } from "@app/providers/AppRouter/AppRouter.config";

import styles from "../styles/BarHeader.module.scss";

export const BarHeader: FC = () => {
  const user = useAppSelector(state => state.user.data!);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(PATH, "user");
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link
          route={BENEFITS_BAR}
          className={styles.logo}
        />

        <InputContainer className={styles.search}>
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
          className={classNames(styles.item, styles.click)}
          onClick={() => navigate(PURCHASE_HISTORY)}
        >
          <Icon
            className={styles.icon}
            icon={"bag"}
            size={"l"}
          />
          <span className={styles.text}> Покупки</span>
        </div>

        <div
          className={classNames(styles.item, styles.click)}
          onClick={() => navigate(PERSONAL_ACCOUNT)}
        >
          <Icon
            className={styles.icon}
            icon={"account"}
            size={"l"}
          />
          <span className={styles.text}>{user.firstname}</span>
        </div>
      </div>
    </header>
  );
};
