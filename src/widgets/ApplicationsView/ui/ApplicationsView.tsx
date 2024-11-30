import { type FC, useEffect, useState } from "react";

import { TRequestStatus, useGetAllRequestsQuery, useUpdateRequestsMutation } from "@entity/Requests/api/Requests.api";
import { DataTable } from "@feature/DataTable";
import { classNames } from "@shared/lib/classNames/classNames";
import { Button } from "@shared/ui/Button";
import { InputContainer } from "@shared/ui/Input/InputContainer";
import { InputField } from "@shared/ui/Input/InputField";
import { Modal } from "@shared/ui/Modal";
import { Selector, TSelectValue } from "@shared/ui/Selector";
import { Text } from "@shared/ui/Text";
import { Title } from "@shared/ui/Title";
import { ViewInfoContainer } from "@shared/ui/ViewInfoContainer/ViewInfoContainer";
import dayjs from "dayjs";

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
};

const StatusSelector: FC<TStatusSelectorProps> = props => {
  const { possibleStatus, id, filter, setIsSuccessModalOpen, setIsDeniedModalOpen, setCurrentId } = props;
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
      currentValue={currentState}
      setCurrentValue={setCurrentState}
      values={possibleStatus}
    />
  );
};

export const ApplicationsView: FC = () => {
  const [filter, setFilter] = useState<TRequestStatus | null>("pending");

  const [possibleStatus, setPossibleStatus] = useState<TSelectValue[]>(newState);
  const [currentId, setCurrentId] = useState<number>(-1);

  useEffect(() => {
    if (filter === "processing") setPossibleStatus(inWorkState);

    if (filter === "pending") setPossibleStatus(newState);
  }, [filter]);

  const requests = useGetAllRequestsQuery(filter);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [isDeniedModalOpen, setIsDeniedModalOpen] = useState<boolean>(false);

  const data = requests?.data
    ? requests.data.reduce((acc: any[], el) => {
        acc.push({
          id: el.id,
          date: (
            <div>
              <span>{dayjs(el.created_at).format("DD.MM.YYYY")}</span>
              <p>
                {dayjs().diff(dayjs("2024-06-05"), "day") >= 3
                  ? `Осталось ${dayjs().diff(dayjs(el.created_at), "day")} дн.`
                  : ""}
              </p>
            </div>
          ),
          fullname: (
            <span>
              {el.user.lastname} {el.user.firstname} {el.user.middlename}
            </span>
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
                  }}
              >
                <span>{el.user.email}</span>
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z" fill="#292D32"/>
                  <path d="M17.0998 2H12.8998C9.81668 2 8.37074 3.09409 8.06951 5.73901C8.00649 6.29235 8.46476 6.75 9.02167 6.75H11.0998C15.2998 6.75 17.2498 8.7 17.2498 12.9V14.9781C17.2498 15.535 17.7074 15.9933 18.2608 15.9303C20.9057 15.629 21.9998 14.1831 21.9998 11.1V6.9C21.9998 3.4 20.5998 2 17.0998 2Z" fill="#292D32"/>
                </svg>
              </div>
          ),
          benefitName: el.benefit.name,

          status: (
            <span>
              {filter === null || filter === "approved" || filter === "declined" ? (
                el.status
              ) : (
                <StatusSelector
                  setIsSuccessModalOpen={setIsSuccessModalOpen}
                  setIsDeniedModalOpen={setIsDeniedModalOpen}
                  setCurrentId={setCurrentId}
                  possibleStatus={possibleStatus}
                  filter={filter}
                  id={el.id}
                />
              )}
            </span>
          ),
        });

        return acc;
      }, [])
    : [];

  return (
    <>
      <ViewInfoContainer>
        <Title type={"page"}>Заявки</Title>

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

        <DataTable
          needRedirect={false}
          headers={tableHeader}
          data={data}
        />
      </ViewInfoContainer>

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
      >
        Вы уверены, что хотите одобрить заявку на покупку бенефита?
      </Title>

      <div className={styles.buttons}>
        <Button onClick={handleUpdateRequest}>Одобрить</Button>

        <Button
          onClick={onClose}
          buttonType={"secondary"}
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
      >
        Вы уверены, что хотите отклонить заявку на покупку бенефита?
      </Title>

      <InputContainer>
        <InputField
          onChange={e => setReason(e.currentTarget.value)}
          placeholder={"Введите причину отказа"}
        />
      </InputContainer>

      <div className={styles.buttons}>
        <Button onClick={handleUpdateRequest}>Отклонить</Button>

        <Button
          onClick={onClose}
          buttonType={"secondary"}
        >
          Назад
        </Button>
      </div>
    </Modal>
  );
};
