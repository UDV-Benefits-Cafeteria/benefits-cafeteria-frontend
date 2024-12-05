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
  const benefitId = Number(pathname.split("/")?.[pathname.split("/").length - 1]);
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
      <div style={{ maxWidth: 1200, margin: "auto", marginTop: "190px", marginBottom: "100px" }}>
        <Title type={"page"}>
          <Link
            className={styles.link}
            route={BENEFITS_BAR}
          >
            {"<-"} Вернуться в бар бенефитов
          </Link>
        </Title>

        <div className={styles.container}>
          <div className={styles.info_container}>
            <Image
              srs={benefit.images[0]?.image_url || BENEFIT_PLACEHOLDER}
              className={styles.image}
              onError={e => (e.target.src = BENEFIT_PLACEHOLDER)}
            />

            <div className={styles.data_container}>
              <Title
                boldness={"medium"}
                className={styles.title}
                type={"block"}
              >
                {benefit.name}
              </Title>

              <Title
                type={"block"}
                className={styles.price}
                boldness={"medium"}
              >
                {benefit.coins_cost ? benefit.coins_cost > 0 : "Бесплатно"}
                <div className={styles.coin} />
              </Title>

              <Text
                type={"block"}
                boldness={"medium"}
                className={styles.level}
              >
                C {benefit.min_level_cost} уровня
              </Text>

              <Text
                type={"block"}
                boldness={"medium"}
                className={styles.count}
              >
                {benefit.amount === null
                  ? "Неограниченное количество"
                  : benefit.amount > 0
                    ? `Осталось ${benefit.amount} шт.`
                    : "Бенефит закончился"}
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

        <div className={styles.desc_container}>
          <Title
            className={styles.title}
            type={"element"}
          >
            Описание
          </Title>

          <Text className={styles.desc}>{benefit.description}</Text>
        </div>

        <div className={styles.char_container}>
          <Title
            className={styles.title}
            type={"element"}
          >
            Характеристики
          </Title>

          <div className={styles.characteristic}>
            <Text className={styles.text}>
              Категория: <span className={styles.count}>{benefit.category?.name || "категория отсутствует"}</span>
            </Text>

            <Text className={styles.text}>
              Адаптационный период:{" "}
              <span className={styles.count}>
                {benefit.adaptation_required ? "должен быть пройден" : "не обязателен"}
              </span>
            </Text>

            <Text className={styles.text}>
              Сколько раз можно активировать бенефит:{" "}
              <span className={styles.count}>{benefit.usage_limit || "неограниченное количество"}</span>
            </Text>

            <Text className={styles.text}>
              Период обновления:{" "}
              <span className={styles.count}>
                {benefit.is_fixed_period ? "отсутствует" : benefit.usage_period_days || "отсутствует"}
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
