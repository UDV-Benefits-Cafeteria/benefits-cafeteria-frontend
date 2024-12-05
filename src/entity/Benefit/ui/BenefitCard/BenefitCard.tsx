import { FC } from "react";

import { BENEFIT_PLACEHOLDER } from "@shared/assets/imageConsts";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector/useAppSelector";
import { Button } from "@shared/ui/Button";
import { Image } from "@shared/ui/Image/Image";
import { Text } from "@shared/ui/Text";
import { useNavigate } from "react-router-dom";

import { BENEFITS } from "@app/providers/AppRouter/AppRouter.config";

import { TBenefitData } from "@entity/Benefit/model/types/Benefit.types";

import styles from "../../styles/BenefitCard.module.scss";
import {Tooltip} from "antd";

export const BenefitCard: FC<{ benefit: TBenefitData; addRequest: (id: number) => void }> = ({
  benefit,
  addRequest,
}) => {
  const user = useAppSelector(state => state.user.data!);
  const navigate = useNavigate();
    const isLongText = benefit.name.length > 40;
    const displayedText = isLongText ? benefit.name.slice(0, 40) + "..." : benefit.name;

  return (
    <div className={styles.container}>
      <div
        className={styles.container}
        onClick={() => navigate(BENEFITS + "/" + benefit.id)}
      >
        <Image
          className={styles.image}
          src={benefit.primary_image_url || BENEFIT_PLACEHOLDER}
          onError={e => (e.target.src = BENEFIT_PLACEHOLDER)}
        />

        <div className={styles.price}>
          <Text boldness={"medium"}>{benefit.coins_cost > 0 ? benefit.coins_cost : "Бесплатно"}</Text>

          <div className={styles.coin} />
        </div>

        <Text boldness={"medium"}>C {benefit.min_level_cost} уровня</Text>

        <Text
          boldness={"medium"}
          className={styles.amount}
        >
          {benefit.amount === null
            ? "Неограниченное количество"
            : benefit.amount > 0
              ? `Осталось ${benefit.amount} шт.`
              : "Бенефит закончился!"}
        </Text>

        <Text
          boldness={"medium"}
          className={styles.name}
        >
            <Tooltip title={isLongText ? benefit.name : null}>
                <span>{displayedText}</span>
            </Tooltip>
        </Text>
      </div>

      <Button
        onClick={() => addRequest(benefit.id)}
        className={styles.btn}
        disabled={benefit.amount === 0 || benefit.min_level_cost > user.level || benefit.coins_cost > user.coins}
      >
        Отправить запрос
      </Button>
    </div>
  );
};
