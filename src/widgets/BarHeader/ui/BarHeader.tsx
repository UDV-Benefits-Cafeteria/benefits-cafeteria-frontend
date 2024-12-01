import { type FC, useEffect, useState } from "react";

import { useLazyGetAllBenefitQuery } from "@entity/Benefit/api/Benefit.api";
import { useLogoutMutation } from "@entity/User";
import { BENEFIT_PLACEHOLDER } from "@shared/assets/imageConsts";
import { PATH } from "@shared/consts/localStorage";
import { classNames } from "@shared/lib/classNames/classNames";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector/useAppSelector";
import { Icon } from "@shared/ui/Icons/Icon";
import { Image } from "@shared/ui/Image/Image";
import { Link } from "@shared/ui/Link";
import { Text } from "@shared/ui/Text";
import { Popover, Select } from "antd";
import { useNavigate } from "react-router-dom";

import {
  BENEFITS,
  BENEFITS_BAR,
  EMPLOYEES,
  PERSONAL_ACCOUNT,
  PURCHASE_HISTORY,
} from "@app/providers/AppRouter/AppRouter.config";

import { TBenefitData } from "@entity/Benefit/model/types/Benefit.types";

import styles from "../styles/BarHeader.module.scss";

export const BarHeader: FC = () => {
  const user = useAppSelector(state => state.user.data!);
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const [getBenefit] = useLazyGetAllBenefitQuery();
  const [data, setData] = useState<TBenefitData[]>([]);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    localStorage.setItem(PATH, "user");
  }, []);

  const handleLogout = () => {
    logout(null);
    localStorage.setItem(PATH, "");
  };

  const handleSearch = async (newValue: string) => {
    const res = await getBenefit({ search: newValue, limit: 3 });

    setValue(newValue);

    if (res.data) {
      setData(res.data);
    }
  };

  const handleChange = (id: number) => {
    if (id === -1) {
      navigate(BENEFITS_BAR + "?benefit=" + value);
    } else navigate(BENEFITS + "/" + id);
  };

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link
          route={BENEFITS_BAR}
          className={styles.logo}
        />

        <Select
          showSearch
          value={value}
          className={styles.search}
          onSearch={handleSearch}
          onChange={handleChange}
          placeholder={"Поиск"}
          filterOption={false}
          notFoundContent={null}
          defaultActiveFirstOption={false}
          suffixIcon={null}
          prefix={
            <Icon
              className={styles.icon}
              icon={"loupe"}
              size={"l"}
            />
          }
          options={
            value.length
              ? [
                  ...(data || []).map(d => ({
                    value: d.id,
                    label: (
                      <div className={styles.search__el}>
                        <Image
                          srs={d.images?.[0].image_url || BENEFIT_PLACEHOLDER}
                          className={styles.search__icon}
                        />
                        <div className={styles.search__container}>
                          <Text
                            boldness={"medium"}
                            className={styles.search__name}
                          >
                            {d.name}
                          </Text>

                          <Text
                            type={"description"}
                            className={styles.search__description}
                          >
                            Бенефит
                          </Text>
                        </div>
                      </div>
                    ),
                  })),
                  {
                    value: -1,
                    label: (
                      <div className={styles.search__el}>
                        <Icon
                          size={"l"}
                          className={styles.loupe}
                          icon={"loupe"}
                        />

                        <Text className={styles.search__name}>{value}</Text>
                        <Text
                          className={styles.search__name}
                          type={"description"}
                        >
                          - искать
                        </Text>
                      </div>
                    ),
                  },
                ]
              : []
          }
        />

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

        <Popover
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
                {user.role !== "employee" ? (
                  <Text
                    onClick={() => navigate(EMPLOYEES)}
                    className={styles.menu__el}
                  >
                    Режим администратора
                  </Text>
                ) : null}
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
          <div className={classNames(styles.item, styles.click)}>
            <Icon
              className={styles.icon}
              icon={"account"}
              size={"l"}
            />
            <span className={styles.text}>{user.firstname}</span>
          </div>
        </Popover>
      </div>
    </header>
  );
};
