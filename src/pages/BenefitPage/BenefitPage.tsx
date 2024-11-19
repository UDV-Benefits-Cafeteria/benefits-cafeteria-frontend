import { type FC, useState } from "react";

import { useGetBenefitQuery } from "@entity/Benefit/api/Benefit.api";
import { useCreateRequestsMutation } from "@entity/Requests/api/Requests.api";
import { BENEFIT_PLACEHOLDER } from "@shared/assets/imageConsts";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector/useAppSelector";
import { Button } from "@shared/ui/Button";
import { Image } from "@shared/ui/Image/Image";
import { Link } from "@shared/ui/Link";
import { Text } from "@shared/ui/Text";
import { Title } from "@shared/ui/Title";
import { BarHeader } from "@widgets/BarHeader/ui/BarHeader";
import { CreateRequestModal } from "@widgets/BenefitBarView/ui/BenefitBarView";
import { useLocation, useNavigate } from "react-router-dom";

import { BENEFITS_BAR } from "@app/providers/AppRouter/AppRouter.config";

import styles from "./BenefitPage.module.scss";

export const BenefitPage: FC = () => {
  const pathname = useLocation().pathname;
  const user = useAppSelector(state => state.user.data!);
  const benefitId = Number(pathname[pathname.length - 1]);
  const benefit = useGetBenefitQuery(benefitId).data;
  const userRole = useAppSelector(state => state.user.data!.role);
  const [addStep, setAddStep] = useState<"add" | "success">("add");
  const navigate = useNavigate();
  const [isOpenCreateRequestModal, setIsOpenCreateRequestModal] = useState(false);
  const [createRequest] = useCreateRequestsMutation();

  const handleAddRequestResp = async () => {
    const res = await createRequest({
      benefit_id: benefitId,
      user_id: user!.id,
      status: "pending",
    });

    if (res.data) {
      setAddStep("success");
    }
  };

  const handleAddRequest = () => {
    setIsOpenCreateRequestModal(true);
  };

  const handleClose = () => {
    setIsOpenCreateRequestModal(false);
    setAddStep("add");
  };

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
              srs={benefit.images[0]?.image_url || BENEFIT_PLACEHOLDER}
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

              <Text className={styles.count}>
                {benefit.amount > 0 ? <>Осталось {benefit.amount} шт.</> : "Бенефит закончился!"}
              </Text>

              <Button
                className={styles.add_button}
                onClick={handleAddRequest}
                disabled={
                  benefit.amount === 0 || benefit.min_level_cost > user.level || benefit.coins_cost > user.coins
                }
              >
                Отправить запрос
              </Button>
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
              Категория: <span className={styles.count}>{benefit.category?.name || "категория отсутствует"}</span>
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
              Период сброса использований:{" "}
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

      <CreateRequestModal
        isOpen={isOpenCreateRequestModal}
        step={addStep}
        onClose={handleClose}
        handleAddRequest={handleAddRequestResp}
      />
    </>
  );
};
