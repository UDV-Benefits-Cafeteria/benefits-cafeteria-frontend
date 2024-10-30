import { FC } from "react";

import emptyImage from "@shared/assets/images/Avatar.png";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector/useAppSelector";
import { Button } from "@shared/ui/Button";
import { Image } from "@shared/ui/Image/Image";
import { Text } from "@shared/ui/Text";

import { TBenefitData } from "@entity/Benefit/model/types/Benefit.types";

import styles from "../../styles/BenefitCard.module.scss";

export const BenefitCard: FC<{ benefit: TBenefitData; addRequest: (id: number) => void }> = ({
  benefit,
  addRequest,
}) => {
  const user = useAppSelector(state => state.user.data!);

  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        srs={benefit.primary_image_url || emptyImage}
      />

      <div className={styles.price}>
        <Text>{benefit.coins_cost}</Text>

        <div className={styles.coin} />
      </div>

      <Text>C {benefit.min_level_cost} уровня</Text>

      <Text>Осталось {benefit.amount}</Text>

      <Text> {benefit.name}</Text>

      <Button
        disabled={user.coins < benefit.coins_cost || user.level < benefit.coins_cost || !benefit.amount}
        onClick={() => addRequest(benefit.id)}
      >
        Отправить запрос
      </Button>
    </div>
  );
};
