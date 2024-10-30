import type { FC } from "react";

import { useGetAllRequestsQuery, useUpdateRequestsMutation } from "@entity/Requests/api/Requests.api";
import { DataTable } from "@feature/DataTable";
import { Button } from "@shared/ui/Button";
import { Title } from "@shared/ui/Title";
import { ViewInfoContainer } from "@shared/ui/ViewInfoContainer/ViewInfoContainer";

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
    text: "",
    data: "actions",
  },
];

export const ApplicationsView: FC = () => {
  const requests = useGetAllRequestsQuery(null);
  const [updateRequest] = useUpdateRequestsMutation();

  const data = requests?.data
    ? requests.data.reduce((acc: any[], el) => {
        if (el.status !== "pending") return acc;

        acc.push({
          id: el.id,
          date: el.created_at,
          name: (
            <span>
              {el.user.firstname} {el.user.middlename} {el.user.lastname}
            </span>
          ),
          email: el.user.email,
          benefitName: el.benefit.name,

          actions: (
            <span className={styles.buttons}>
              <Button
                buttonType={"primary"}
                onClick={() => updateRequest({ id: el.id, status: "approved" })}
              >
                Одобрить
              </Button>
              <Button
                buttonType={"secondary-red"}
                onClick={() => updateRequest({ id: el.id, status: "declined" })}
              >
                Отклонить
              </Button>
            </span>
          ),
        });

        return acc;
      }, [])
    : [];

  return (
    <ViewInfoContainer>
      <Title type={"page"}>Заявки</Title>

      <DataTable
        needRedirect={false}
        headers={tableHeader}
        data={data}
      />
    </ViewInfoContainer>
  );
};
