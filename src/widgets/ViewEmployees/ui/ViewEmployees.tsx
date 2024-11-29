import type { FC } from "react";

import { useGetAllUserQuery } from "@entity/User";
import { DataTable } from "@feature/DataTable";
import { SearchBar } from "@feature/SearchBar";
import {USER_PLACEHOLDER} from "@shared/assets/imageConsts"
import { Button } from "@shared/ui/Button";
import { Image } from "@shared/ui/Image/Image";
import { ViewHeader } from "@shared/ui/ViewInfoContainer/ViewHeader";
import { ViewInfoContainer } from "@shared/ui/ViewInfoContainer/ViewInfoContainer";
import { useNavigate } from "react-router-dom";

import { CREATE_EMPLOYEES, EMPLOYEES, BENEFITS_BAR} from "@app/providers/AppRouter/AppRouter.config";

import styles from "../styles/ViewEmployees.module.scss";

const tableHeader = [
  {
    text: "Сотрудник",
    data: "fullname",
  },
  {
    text: "Должность",
    data: "position",
  },
  {
    text: "Уровень",
    data: "level",
  },
  {
    text: "Баланс, UDV-coins",
    data: "coins",
  },
];

export const ViewEmployees: FC = () => {
  const users = useGetAllUserQuery(null);
  const navigate = useNavigate();

  const data = users?.data
    ? users.data.map(el => ({
        id: el.id,
        fullname: (
          <span className={styles.fullname}>
            <Image
              type={"avatar"}
              srs={el.image_url || USER_PLACEHOLDER}
              onError={(e) => (e.target.src = USER_PLACEHOLDER)}
            />
            {el.firstname} {el.middlename} {el.lastname}
          </span>
        ),
        coins: el.coins,
        level: el.level,
        position: el.position?.name || "-",
      }))
    : [];

  return (
    <ViewInfoContainer>
      <ViewHeader
        title={"Сотрудники"}
        searchBar={<SearchBar />}
      >
        <div style={{ display: "flex", width: 500, gap: 32 }}>
          <Button onClick={() => navigate(CREATE_EMPLOYEES)}>Добавить сотрудника</Button>

          <Button onClick={() => navigate(BENEFITS_BAR)} buttonType="secondary">Режим пользователя</Button>
        </div>
      </ViewHeader>

      <DataTable
        redirectTo={id => `${EMPLOYEES}/${id}/edit`}
        headers={tableHeader}
        data={data}
      />
    </ViewInfoContainer>
  );
};
