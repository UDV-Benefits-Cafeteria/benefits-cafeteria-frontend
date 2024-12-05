import { type FC, useEffect, useState } from "react";

import { TRequestStatus, useGetAllRequestsQuery, useUpdateRequestsMutation } from "@entity/Requests/api/Requests.api";
import { DataTable } from "@feature/DataTable";
import { toQuery } from "@pages/BenefitsBar/BenefitsBar";
import { classNames } from "@shared/lib/classNames/classNames";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector/useAppSelector";
import { Button } from "@shared/ui/Button";
import { Icon } from "@shared/ui/Icons/Icon";
import { InputContainer } from "@shared/ui/Input/InputContainer";
import { InputField } from "@shared/ui/Input/InputField";
import { Modal } from "@shared/ui/Modal";
import { Selector, TSelectValue } from "@shared/ui/Selector";
import { Text } from "@shared/ui/Text";
import { Title } from "@shared/ui/Title";
import { ViewInfoContainer } from "@shared/ui/ViewInfoContainer/ViewInfoContainer";
import { Select } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import { BENEFITS, EMPLOYEES } from "@app/providers/AppRouter/AppRouter.config";

import styles from "../styles/ApplicationsView.module.scss";

const tableHeader = [
  {
    text: "Дата заявки",
    data: "date",
  },
  {
    text: "ФИО сотрудника",
    data: "fullname",
  },
  {
    text: "Почта сотрудника",
    data: "email",
  },
  {
    text: "Название бенефита",
    data: "benefitName",
  },
  {
    text: "Статус заявки",
    data: "status",
  },
];

const newState: TSelectValue[] = [
  {
    data: "pending",
    text: "Новая",
  },
  {
    data: "processing",
    text: "В работе",
  },
];

const inWorkState: TSelectValue[] = [
  {
    data: "pending",
    text: "Вернуть в «Новые»",
  },
  {
    data: "processing",
    text: "В работе",
  },
  {
    data: "approved",
    text: "Подтвердить",
  },
  {
    data: "declined",
    text: "Отклонить",
  },
];

type TStatusSelectorProps = {
  setIsSuccessModalOpen: (value: boolean) => void;
  setIsDeniedModalOpen: (value: boolean) => void;
  setCurrentId: (value: number) => void;
  possibleStatus: TSelectValue[];
  id: number;
  filter: TRequestStatus;
  className?: string;
};

const StatusSelector: FC<TStatusSelectorProps> = props => {
  const { possibleStatus, id, filter, setIsSuccessModalOpen, setIsDeniedModalOpen, setCurrentId, className } = props;
  const [updateRequest] = useUpdateRequestsMutation();
  const [currentState, setCurrentState] = useState<TRequestStatus>(filter);

  useEffect(() => {
    if (filter === "pending" && currentState === "processing") updateRequest({ id: id, status: "processing" });

    if (filter === "processing" && currentState === "pending") updateRequest({ id: id, status: "pending" });

    if (filter === "processing" && currentState === "declined") {
      setIsDeniedModalOpen(true);
      setCurrentId(id);
    }

    if (filter === "processing" && currentState === "approved") {
      setIsSuccessModalOpen(true);
      setCurrentId(id);
    }
  }, [currentState]);

  return (
    <Selector
      currentValue={filter}
      setCurrentValue={setCurrentState}
      values={possibleStatus}
      className={className}
    />
  );
};

type TBenefitSortedBy = "created_at";
type TSortOrder = "asc" | "desc";

type TSortParam = {
  text: string;
  sortBy: TBenefitSortedBy;
  sortOrder: TSortOrder;
};

export const SORT_PARAMS: TSortParam[] = [
  {
    text: "По дате заявки ↑",
    sortBy: "created_at",
    sortOrder: "desc",
  },
  {
    text: "По дате заявки ↓",
    sortBy: "created_at",
    sortOrder: "asc",
  },
];

export const ApplicationsView: FC = () => {
  const [filter, setFilter] = useState<TRequestStatus | null>("pending");
  const navigate = useNavigate();
  const [possibleStatus, setPossibleStatus] = useState<TSelectValue[]>(newState);
  const [currentId, setCurrentId] = useState<number>(-1);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (filter === "processing") setPossibleStatus(inWorkState);

    if (filter === "pending") setPossibleStatus(newState);
  }, [filter]);
  const [sort, setSort] = useState<string>(toQuery(SORT_PARAMS[0].sortBy, SORT_PARAMS[0].sortOrder));

  const user = useAppSelector(state => state.user.data.id);

  const requests = useGetAllRequestsQuery({ filter: filter, sort: sort, id: user });

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [isDeniedModalOpen, setIsDeniedModalOpen] = useState<boolean>(false);
  const [copyEmail, setCopyEmail] = useState("");

  const data = requests?.data
    ? requests.data
        .reduce((acc: any[], el) => {
          acc.push({
            id: el.id,
            date: (
              <div>
                <span>{dayjs(el.created_at).format("DD.MM.YYYY")}</span>
                {(el.status === "processing" || el.status === "pending") &&
                dayjs(el.created_at).add(5, "day").diff(dayjs(), "day") <= 4 ? (
                  <p className={styles.warning}>
                    {`Осталось ${dayjs(el.created_at).add(5, "day").diff(dayjs(), "day")} дн.`}
                  </p>
                ) : (
                  <p className={styles.completed}>{"Завершена"}</p>
                )}
              </div>
            ),
            fullname: (
              <div
                onClick={() => navigate(EMPLOYEES + "/" + el.user.id)}
                className={styles.el}
              >
                {el.user.lastname} {el.user.firstname} {el.user.middlename}
              </div>
            ),
            email: (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigator.clipboard.writeText(el.user.email);
                  setCopyEmail(el.user.email);
                }}
                className={styles.el}
              >
                <span>{el.user.email}</span>
                <Icon
                  icon={"copy"}
                  size={"s"}
                  className={classNames(styles.copy, el.user.email === copyEmail ? styles.active : null)}
                />
              </div>
            ),
            benefitName: (
              <div
                onClick={() => navigate(BENEFITS + "/" + el.user.id)}
                className={styles.el}
              >
                {el.benefit.name}
              </div>
            ),

            status: (
              <span
                style={{
                  color:
                    el.status === "approved"
                      ? "#00BE00"
                      : el.status === "declined"
                        ? "#FF4040"
                        : el.status === "pending"
                          ? "#6A6A6A"
                          : el.status === "processing"
                            ? "#E7AB08"
                            : "black",
                }}
              >
                {el.status === "approved" ? (
                  "Подтверждена"
                ) : el.status === "declined" ? (
                  "Отклонена"
                ) : el.status === "pending" || el.status === "processing" ? (
                  filter === null ? (
                    el.status === "processing" ? (
                      "В работе"
                    ) : (
                      "Новая"
                    )
                  ) : (
                    <StatusSelector
                      setIsSuccessModalOpen={setIsSuccessModalOpen}
                      setIsDeniedModalOpen={setIsDeniedModalOpen}
                      status={el.status}
                      setCurrentId={setCurrentId}
                      possibleStatus={possibleStatus}
                      filter={filter}
                      id={el.id}
                      className={styles.statusSelector}
                    />
                  )
                ) : (
                  el.status
                )}
              </span>
            ),
          });

          return acc;
        }, [])
        .slice(page * 8, page * 8 + 8)
    : [];

  const getPages = () => {
    const res = [];

    for (let i = 0; i < requests?.data?.length; i += 8) {
      res.push(
        <button
          onClick={() => setPage(i / 8)}
          className={classNames(styles.item, i / 8 === page ? styles.active : null)}
        >
          {i / 8 + 1}
        </button>
      );
    }

    return res;
  };

  return (
    <>
      <ViewInfoContainer>
        <Title
          className={styles.applicationsTitle}
          type={"page"}
        >
          Заявки
        </Title>

        <div className={styles.filter}>
          <Text
            className={classNames(styles.text, filter === "pending" ? styles.active : null)}
            onClick={() => setFilter("pending")}
            boldness={"bold"}
          >
            Новая
          </Text>
          <Text
            className={classNames(styles.text, filter === "processing" ? styles.active : null)}
            onClick={() => setFilter("processing")}
            boldness={"bold"}
          >
            В работе
          </Text>
          <Text
            className={classNames(styles.text, filter === "approved" ? styles.active : null)}
            onClick={() => setFilter("approved")}
            boldness={"bold"}
          >
            Подтвержденные
          </Text>
          <Text
            className={classNames(styles.text, filter === "declined" ? styles.active : null)}
            onClick={() => setFilter("declined")}
            boldness={"bold"}
          >
            Отклонённые
          </Text>
          <Text
            className={classNames(styles.text, filter === null ? styles.active : null)}
            onClick={() => setFilter(null)}
            boldness={"bold"}
          >
            Все заявки
          </Text>
        </div>

        <Selector
          currentValue={sort}
          setCurrentValue={setSort}
          className={styles.filters}
          values={SORT_PARAMS.map(el => ({
            data: toQuery(el.sortBy, el.sortOrder),
            text: el.text,
          }))}
        />

        <DataTable
          needRedirect={false}
          headers={tableHeader}
          data={data}
        />
      </ViewInfoContainer>

      <div className={styles.pag}>
        <Icon
          icon={"move"}
          size={"l"}
          onClick={() => {
            setPage(prev => {
              if (prev - 1 >= 0) return prev - 1;

              return prev;
            });
          }}
          className={classNames(styles.move, styles.reverse, page - 1 >= 0 ? null : styles.disabled)}
        />

        {getPages()}

        <Icon
          size={"l"}
          icon={"move"}
          onClick={() => {
            setPage(prev => {
              if (prev + 1 < (requests.data?.length || 0) / 8) return prev + 1;

              return prev;
            });
          }}
          className={classNames(styles.move, page + 1 < (requests.data?.length || 0) / 8 ? null : styles.disabled)}
        />
      </div>

      <ModalSuccessRequest
        id={currentId}
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />

      <ModalDeniedRequest
        id={currentId}
        isOpen={isDeniedModalOpen}
        onClose={() => setIsDeniedModalOpen(false)}
      />
    </>
  );
};

const ModalSuccessRequest: FC<{ isOpen: boolean; onClose: () => void; id: number }> = props => {
  const { isOpen, onClose, id } = props;
  const [updateRequest] = useUpdateRequestsMutation();

  const handleUpdateRequest = async () => {
    const res = await updateRequest({ id: id, status: "approved" });

    if (res.data) onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onClose()}
    >
      <Title
        boldness={"medium"}
        type={"block"}
        className={styles.text}
      >
        Вы уверены, что хотите одобрить
        <br />
        заявку на покупку бенефита?
      </Title>
      <InputContainer className={styles.inputContainerModal}>
        <InputField
          className={styles.inputFieldModal}
          onChange={e => setReason(e.currentTarget.value)}
          placeholder={"Введите комментарий"}
        />
      </InputContainer>
      <div className={styles.buttons}>
        <Button onClick={handleUpdateRequest}>Одобрить</Button>

        <Button
          onClick={onClose}
          buttonType={"secondary"}
          className={styles.btnCancel}
        >
          Назад
        </Button>
      </div>
    </Modal>
  );
};

const ModalDeniedRequest: FC<{ isOpen: boolean; onClose: () => void; id: number }> = props => {
  const { isOpen, onClose, id } = props;
  const [reason, setReason] = useState("");
  const [updateRequest] = useUpdateRequestsMutation();

  const handleUpdateRequest = async () => {
    const res = await updateRequest({ id: id, status: "declined", comment: reason });

    if (res.data) onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onClose()}
    >
      <Title
        boldness={"medium"}
        type={"block"}
        className={styles.text}
      >
        Вы уверены, что хотите отклонить <br /> заявку на покупку бенефита?
      </Title>

      <InputContainer className={styles.inputContainerModal}>
        <InputField
          className={styles.inputFieldModal}
          onChange={e => setReason(e.currentTarget.value)}
          placeholder={"Введите причину отказа"}
        />
      </InputContainer>

      <div className={styles.buttons}>
        <Button
          className={styles.btnDecline}
          onClick={handleUpdateRequest}
        >
          Отклонить
        </Button>

        <Button
          onClick={onClose}
          buttonType={"secondary"}
          className={styles.btnCancel}
        >
          Назад
        </Button>
      </div>
    </Modal>
  );
};
