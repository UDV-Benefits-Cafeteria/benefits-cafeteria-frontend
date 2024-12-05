import { FC, useState } from "react";

import {
  TRequestStatus,
  useGetAllRequestsQuery,
  useGetUserRequestsQuery,
  useUpdateRequestsMutation,
} from "@entity/Requests/api/Requests.api";
import { DataTable } from "@feature/DataTable";
import { BENEFIT_PLACEHOLDER } from "@shared/assets/imageConsts";
import { classNames } from "@shared/lib/classNames/classNames";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector/useAppSelector";
import { Button } from "@shared/ui/Button";
import { Icon } from "@shared/ui/Icons/Icon";
import { Image } from "@shared/ui/Image/Image";
import { Text } from "@shared/ui/Text";
import { Title } from "@shared/ui/Title";
import { ConfigProvider, Tooltip } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import { BENEFITS } from "@app/providers/AppRouter/AppRouter.config";

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
  pending: "Оформлена",
  processing: "В обработке",
  approved: "Подтверждена",
  declined: "Отклонена",
};

export const PurchaseHistoryTable: FC = () => {
  const [activeFilter, setActiveFilter] = useState<"all" | TRequestStatus>("all");
  const id = useAppSelector(state => state.user.data.id);
  const requests = useGetAllRequestsQuery({ filter: activeFilter, id: id, isDa: true });
  const navigate = useNavigate();
  const [updateRequest] = useUpdateRequestsMutation();
  const [page, setPage] = useState(0);

  const data = requests?.data
    ? requests.data
        .reduce((acc: any[], el) => {
          if (activeFilter !== "all" && el.status !== activeFilter) return acc;

          acc.push({
            id: el.benefit.id,
            date: dayjs(el.created_at).format("DD.MM.YYYY"),
            name: (
              <span
                className={styles.fullname}
                onClick={() => navigate(BENEFITS + "/" + el.benefit.id)}
              >
                <Image
                  className={styles.img}
                  type={"avatar"}
                  srs={el.benefit.images[0]?.image_url || BENEFIT_PLACEHOLDER}
                  onError={e => (e.target.src = BENEFIT_PLACEHOLDER)}
                />
                {el.benefit.name}
              </span>
            ),
            status: (
              <ConfigProvider
                theme={{
                  components: {
                    Tooltip: {
                      colorTextLightSolid: "#C5C6CC",
                      borderRadius: 16,
                      paddingSM: 20,
                      paddingXS: 20,
                    },
                  },
                }}
              >
                <Tooltip
                  placement="bottom"
                  title={`HR отклонил вашу заявку на покупку бенефита. Причина: "${el.comment ? el.comment && el.comment !== "" && el.comment !== " " : "Без причины"}"`}
                >
                  <span className={styles[el.status]}>{status[el.status]}</span>
                </Tooltip>
              </ConfigProvider>
            ),
            cancel: (
              <>
                {el.status === "pending" ? (
                  <Button
                    onClick={() => updateRequest({ id: el.id, status: "declined" })}
                    buttonType={"secondary-red"}
                    className={styles.cancelBtn}
                  >
                    Отменить заявку
                  </Button>
                ) : null}
              </>
            ),
          });

          return acc;
        }, [])
        .slice(page * 6, page * 6 + 6)
    : [];

  const getPages = () => {
    const res = [];

    for (let i = 0; i < requests?.data?.length; i += 6) {
      res.push(
        <button
          onClick={() => setPage(i / 6)}
          className={classNames(styles.item, i / 6 === page ? styles.active : null)}
        >
          {i / 6 + 1}
        </button>
      );
    }

    return res;
  };

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
              if (prev + 1 < (requests?.data?.length || 0) / 6) return prev + 1;

              return prev;
            });
          }}
          className={classNames(styles.move, page + 1 < (requests?.data?.length || 0) / 6 ? null : styles.disabled)}
        />
      </div>
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
        boldness={"bold"}
      >
        Все заявки
      </Text>
      <Text
        className={classNames(styles.text, filter === "pending" ? styles.active : null)}
        onClick={() => setFilter("pending")}
        boldness={"bold"}
      >
        Оформленные
      </Text>
      <Text
        className={classNames(styles.text, filter === "processing" ? styles.active : null)}
        onClick={() => setFilter("processing")}
        boldness={"bold"}
      >
        В обработке
      </Text>
      <Text
        className={classNames(styles.text, filter === "approved" ? styles.active : null)}
        onClick={() => setFilter("approved")}
        boldness={"bold"}
      >
        Подтверждённые
      </Text>
      <Text
        className={classNames(styles.text, filter === "declined" ? styles.active : null)}
        onClick={() => setFilter("declined")}
        boldness={"bold"}
      >
        Отклонённые
      </Text>
    </div>
  );
};
