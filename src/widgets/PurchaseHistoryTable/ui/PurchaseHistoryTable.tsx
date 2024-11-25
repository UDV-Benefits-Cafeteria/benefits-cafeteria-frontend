import { FC, useState } from "react";

import { TRequestStatus, useGetUserRequestsQuery, useUpdateRequestsMutation } from "@entity/Requests/api/Requests.api";
import { DataTable } from "@feature/DataTable";
import { BENEFIT_PLACEHOLDER } from "@shared/assets/imageConsts";
import { classNames } from "@shared/lib/classNames/classNames";
import { Button } from "@shared/ui/Button";
import { Image } from "@shared/ui/Image/Image";
import { Text } from "@shared/ui/Text";
import { Title } from "@shared/ui/Title";

import styles from "../styles/PurchaseHistoryTable.module.scss";

const tableHeader = [
  {
    text: "Дата заявки",
    data: "date",
  },
  {
    text: "Название бенефита",
    data: "name",
  },
  {
    text: "Статус заявки",
    data: "status",
  },
  {
    text: "",
    data: "cancel",
  },
];

const status = {
  processing: "В работе",
  pending: "На рассмотрении",
  approved: "Подтверждён",
  declined: "Отменён",
};

export const PurchaseHistoryTable: FC = () => {
  const [activeFilter, setActiveFilter] = useState<"all" | TRequestStatus>("all");
  const requests = useGetUserRequestsQuery(null);
  const [updateRequest] = useUpdateRequestsMutation();
  // TODO сделать обьект для этого

  const data = requests?.data
    ? requests.data.reduce((acc: any[], el) => {
        if (activeFilter !== "all" && el.status !== activeFilter) return acc;

        acc.push({
          id: el.benefit.id,
          date: el.created_at,
          name: (
            <span className={styles.fullname}>
              <Image
                type={"avatar"}
                srs={el.benefit.images[0]?.image_url || BENEFIT_PLACEHOLDER}
              />
              {el.benefit.name}
            </span>
          ),
          status: <span className={styles[el.status]}>{status[el.status]}</span>,
          cancel: (
            <>
              {el.status === "pending" ? (
                <Button
                  onClick={() => updateRequest({ id: el.id, status: "declined" })}
                  buttonType={"secondary-red"}
                >
                  Отменить покупку
                </Button>
              ) : null}
            </>
          ),
        });

        return acc;
      }, [])
    : [];

  return (
    <div className={styles.container}>
      <Title type={"page"}>История покупок</Title>

      <RequestTabulator
        filter={activeFilter}
        setFilter={setActiveFilter}
      />

      <DataTable
        needRedirect={false}
        headers={tableHeader}
        data={data}
      />
    </div>
  );
};

export const RequestTabulator: FC<{
  filter: "all" | TRequestStatus;
  setFilter: (value: "all" | TRequestStatus) => void;
}> = props => {
  const { filter, setFilter } = props;

  return (
    <div className={styles.filter}>
      <Text
        className={classNames(styles.text, filter === "all" ? styles.active : null)}
        onClick={() => setFilter("all")}
      >
        Все заявки
      </Text>
      <Text
        className={classNames(styles.text, filter === "pending" ? styles.active : null)}
        onClick={() => setFilter("pending")}
      >
        Оформлена
      </Text>
      <Text
        className={classNames(styles.text, filter === "processing" ? styles.active : null)}
        onClick={() => setFilter("processing")}
      >
        В работе
      </Text>
      <Text
        className={classNames(styles.text, filter === "approved" ? styles.active : null)}
        onClick={() => setFilter("approved")}
      >
        Подтвержденные
      </Text>
      <Text
        className={classNames(styles.text, filter === "declined" ? styles.active : null)}
        onClick={() => setFilter("declined")}
      >
        Отменённые
      </Text>
    </div>
  );
};
