import type { FC } from "react";

import { useGetBenefitQuery } from "@entity/Benefit/api/Benefit.api";
import emptyImage from "@shared/assets/images/Avatar.png";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector/useAppSelector";
import { Button } from "@shared/ui/Button";
import { Image } from "@shared/ui/Image/Image";
import { Link } from "@shared/ui/Link";
import { Text } from "@shared/ui/Text";
import { Title } from "@shared/ui/Title";
import { BarHeader } from "@widgets/BarHeader/ui/BarHeader";
import { useLocation, useNavigate } from "react-router-dom";

import { BENEFITS_BAR } from "@app/providers/AppRouter/AppRouter.config";

import styles from "./BenefitPage.module.scss";

export const BenefitPage: FC = () => {
  const pathname = useLocation().pathname;

  const benefit = useGetBenefitQuery(Number(pathname[pathname.length - 1])).data;
  const userRole = useAppSelector(state => state.user.data!.role);
  const navigate = useNavigate();

  if (!benefit) return;

  return (
    <>
      <BarHeader />
      <div style={{ maxWidth: 1200, margin: "auto", marginTop: "100px" }}>
        <Title type={"page"}>
          <Link route={BENEFITS_BAR}>{"<-"} Вернуться в бар бенефитов</Link>
        </Title>

        <div className={styles.container}>
          <div className={styles.info_container}>
            <Image
              srs={benefit.images[0]?.image_url || emptyImage}
              className={styles.image}
            />

            <div className={styles.data_container}>
              <Title type={"block"}>{benefit.name}</Title>

              <Title
                type={"block"}
                className={styles.price}
              >
                {benefit.coins_cost}
                <div className={styles.coin} />
              </Title>

              <Text>C {benefit.min_level_cost} уровня</Text>

              <Text className={styles.count}>Кол-во: {benefit.amount || "Неограниченное количество"}</Text>
            </div>
          </div>
        </div>

        <div className={styles.data_container}>
          <Title type={"element"}>Описание</Title>

          <Text>{benefit.description}</Text>
        </div>

        <div className={styles.data_container}>
          <Title type={"element"}>Характеристики</Title>

          <div className={styles.characteristic}>
            <Text>
              Категоря <span className={styles.count}>{benefit.category.name || "нет категории"}</span>
            </Text>

            <Text>
              Сколько раз можно использовать:{" "}
              <span className={styles.count}>{benefit.usage_limit || "неограниченное количество"}</span>
            </Text>

            <Text>
              Адаптационный период:{" "}
              <span className={styles.count}>{benefit.adaptation_required ? "пройден" : "не пройден"}</span>
            </Text>

            <Text>
              Адаптационный период:{" "}
              <span className={styles.count}>
                {benefit.is_fixed_period ? "не обновляется" : benefit.usage_period_days || "не обновляется"}
              </span>
            </Text>
          </div>
        </div>

        {userRole !== "employee" ? (
          <Button
            className={styles.edit}
            onClick={() => navigate(pathname + "/edit")}
          >
            Редактировать
          </Button>
        ) : null}
      </div>
    </>
  );
};
