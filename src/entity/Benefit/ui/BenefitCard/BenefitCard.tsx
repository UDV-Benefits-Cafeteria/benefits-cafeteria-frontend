import { FC } from "react";

import emptyImage from "@shared/assets/images/Avatar.png";
import { Button } from "@shared/ui/Button";
import { Image } from "@shared/ui/Image/Image";
import { Text } from "@shared/ui/Text";

import { TBenefitData } from "@entity/Benefit/model/types/Benefit.types";

import styles from "../../styles/BenefitCard.module.scss";

export const BenefitCard: FC<{ benefit: TBenefitData }> = ({ benefit }) => {
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

      <Button>Отправить запрос</Button>
    </div>
  );
};
