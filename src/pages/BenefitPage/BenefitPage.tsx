import { type FC, useState } from "react";

import {
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useGetBenefitQuery,
  useGetReviewsQuery,
  useUpdateReviewMutation,
} from "@entity/Benefit/api/Benefit.api";
import { useCreateRequestsMutation } from "@entity/Requests/api/Requests.api";
import { BENEFIT_PLACEHOLDER, USER_PLACEHOLDER } from "@shared/assets/imageConsts";
import { classNames } from "@shared/lib/classNames/classNames";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector/useAppSelector";
import { Button } from "@shared/ui/Button";
import { Image } from "@shared/ui/Image/Image";
import { Link } from "@shared/ui/Link";
import { Text } from "@shared/ui/Text";
import { Title } from "@shared/ui/Title";
import { BarHeader } from "@widgets/BarHeader/ui/BarHeader";
import { CreateRequestModal } from "@widgets/BenefitBarView/ui/BenefitBarView";
import { ConfigProvider, Popover } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useLocation, useNavigate } from "react-router-dom";

import { BENEFITS_BAR, EMPLOYEES, PERSONAL_ACCOUNT } from "@app/providers/AppRouter/AppRouter.config";

import styles from "./BenefitPage.module.scss";

const formatDateTime = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return new Date(dateString).toLocaleString("ru-RU", options);
};

interface ReviewProps {
  text: string;
  avatarUrl: string | null;
  firstname: string;
  lastname: string;
  updatedAt: string;
  reviewId: number;
  canEdit: boolean;
}

const ReviewCard: React.FC<ReviewProps> = ({ text, avatarUrl, firstname, lastname, updatedAt, reviewId, canEdit }) => {
  const [updateReview] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();
  const [editReview, setEditReview] = useState<{ id: number; text: string } | null>(null);

  const handleUpdateReview = async (reviewId: number, text: string) => {
    await updateReview({ reviewId, text });
    setEditReview(null);
  };

  const handleDeleteReview = async (reviewId: number) => {
    await deleteReview({ reviewId });
  };

  return (
    <div className={styles.reviewContainer}>
      <span className={styles.fullname}>
        <Image
          className={styles.avatarImage}
          type={"avatar"}
          srs={avatarUrl || USER_PLACEHOLDER}
          onError={e => (e.target.src = USER_PLACEHOLDER)}
        />
        <div className={styles.reviewContainerData}>
          <p className={styles.reviewNames}>
            {firstname} {lastname}
          </p>
          <p className={styles.reviewDate}>{formatDateTime(updatedAt)}</p>
        </div>
        {canEdit ? (
          <Popover
            className={styles.dots}
            arrow={false}
            trigger={"click"}
            content={
              <div className={styles.actions}>
                <Text
                  className={styles.element}
                  onClick={() => {
                    setEditReview({ id: reviewId, text: text });
                  }}
                >
                  Редактировать отзыв
                </Text>
                <Text
                  className={classNames(styles.warning, styles.element)}
                  onClick={() => {
                    handleDeleteReview(reviewId);
                  }}
                >
                  Удалить свой отзыв
                </Text>
              </div>
            }
          >
            ...
          </Popover>
        ) : (
          ""
        )}
      </span>
      {editReview?.id === reviewId ? (
        <>
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  borderRadius: 12,
                  colorBorder: "#C5C6CC",
                  hoverBorderColor: "#C5C6CC",
                  controlOutline: "none",
                  colorPrimary: "#C5C6CC",
                  fontSize: 16,
                },
              },
            }}
          >
            <TextArea
              value={editReview.text}
              onChange={e => setEditReview({ ...editReview, text: e.target.value })}
            />
          </ConfigProvider>
          <div className={styles.btnEditReview}>
            <Button
              className={styles.btnEdit}
              onClick={() => handleUpdateReview(reviewId, editReview.text)}
            >
              Сохранить
            </Button>
            <Button
              className={styles.btnEdit}
              buttonType={"secondary"}
              onClick={() => setEditReview(null)}
            >
              Отмена
            </Button>
          </div>
        </>
      ) : (
        <>
          <Text className={styles.reviewText}>{text}</Text>
        </>
      )}
    </div>
  );
};

const ReviewList = ({ reviews, userId, benefitId }: { reviews: any[]; userId: number; benefitId: number }) => {
  return (
    <div className={styles.reviewContainerList}>
      {reviews.map(review =>
        review.benefit.id === benefitId ? (
          <ReviewCard
            key={review.id}
            text={review.text}
            avatarUrl={review.user.image_url}
            firstname={review.user.firstname}
            lastname={review.user.lastname}
            updatedAt={review.updated_at}
            reviewId={review.id}
            canEdit={review.user.id === userId}
          />
        ) : null
      )}
    </div>
  );
};

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

  const [createReview] = useCreateReviewMutation();
  const [newReview, setNewReview] = useState("");

  const { data, isLoading, error } = useGetReviewsQuery({ limit: 1000 });

  const handleCreateReview = async () => {
    await createReview({ benefitId, text: newReview });
    setNewReview("");
  };

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
                {benefit.coins_cost > 0 ? benefit.coins_cost : "Бесплатно"}
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
                    : "Бенефит закончился!"}
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

        <div className={styles.reviews_container}>
          <Title type="element">Отзывы</Title>

          <div className={styles.add_review}>
            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    borderRadius: 12,
                    colorBorder: "#C5C6CC",
                    hoverBorderColor: "#C5C6CC",
                    controlOutline: "none",
                    colorPrimary: "#C5C6CC",
                    fontSize: 16,
                  },
                },
              }}
            >
              <TextArea
                value={newReview}
                placeholder="Напишите отзыв о бенефите"
                onChange={e => setNewReview(e.target.value)}
              />
            </ConfigProvider>
            <Button
              onClick={handleCreateReview}
              disabled={!newReview.trim()}
              className={styles.post_button}
            >
              Добавить
            </Button>
          </div>

          {data ? (
            <ReviewList
              reviews={data}
              isLoading={isLoading}
              isError={error}
              userId={user!.id}
              benefitId={benefitId}
            />
          ) : (
            ""
          )}
        </div>
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
