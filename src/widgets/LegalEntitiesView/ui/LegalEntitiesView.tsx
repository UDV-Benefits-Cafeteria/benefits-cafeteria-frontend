import { type FC } from "react";

import { useGetLegalEntitiesQuery } from "@entity/LegalEntities/api/LegalEntities.api";
import { DataTable } from "@feature/DataTable";
import { Button } from "@shared/ui/Button";
import { ViewHeader } from "@shared/ui/ViewInfoContainer/ViewHeader";
import { ViewInfoContainer } from "@shared/ui/ViewInfoContainer/ViewInfoContainer";

import { BENEFITS_BAR, CREATE_BENEFITS, EMPLOYEES } from "@app/providers/AppRouter/AppRouter.config";

const tableHeader = [
  {
    text: "Название",
    data: "name",
  },
  {
    text: "Количество HR",
    data: "hrCount",
  },
  {
    text: "Количество сотрудников",
    data: "employeeCount",
  },
  {
    text: "",
    data: "points",
  },
];

export const LegalEntitiesView: FC = () => {
  const { data: legalEntities } = useGetLegalEntitiesQuery(null);

  const data = legalEntities
    ? legalEntities.map(el => ({
        id: el.id,
        name: el.name,
        hrCount: 2,
        employeeCount: 4,
        points: <span>...</span>,
      }))
    : [];

  return (
    <ViewInfoContainer>
      <ViewHeader title={"Юридические лица"}>
        <div style={{ display: "flex", width: 500, gap: 32 }}>
          <Button onClick={() => navigate(CREATE_BENEFITS)}>Добавить юр.лицо</Button>

          <Button
            onClick={() => navigate(BENEFITS_BAR)}
            buttonType="secondary"
          >
            ...
          </Button>
        </div>
      </ViewHeader>

      <DataTable
        redirectTo={id => `${EMPLOYEES}?legal_entity=${id}`}
        headers={tableHeader}
        data={data}
      />
    </ViewInfoContainer>
  );
};
