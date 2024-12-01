import { type FC, useState } from "react";

import { useCreateLegalEntitiesMutation, useGetLegalEntitiesQuery } from "@entity/LegalEntities/api/LegalEntities.api";
import { DataTable } from "@feature/DataTable";
import { Button } from "@shared/ui/Button";
import { InputContainer } from "@shared/ui/Input/InputContainer";
import { InputField } from "@shared/ui/Input/InputField";
import { InputLabel } from "@shared/ui/Input/InputLabel";
import { Modal } from "@shared/ui/Modal";
import { Title } from "@shared/ui/Title";
import { ViewHeader } from "@shared/ui/ViewInfoContainer/ViewHeader";
import { ViewInfoContainer } from "@shared/ui/ViewInfoContainer/ViewInfoContainer";

import { EMPLOYEES } from "@app/providers/AppRouter/AppRouter.config";

import styles from "@widgets/CreateEmployeeForm/styles/CreateEmployeeForm.module.scss";

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
  const [modalCreateLegalEntityOpen, setModalCreateLegalEntityOpen] = useState(false);

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
    <>
      <ViewInfoContainer>
        <ViewHeader title={"Юридические лица"}>
          <div style={{ display: "flex", width: 200, gap: 32 }}>
            <Button onClick={() => setModalCreateLegalEntityOpen(true)}>Добавить юр.лицо</Button>
          </div>
        </ViewHeader>

        <DataTable
          redirectTo={id => `${EMPLOYEES}?legal_entity=${id}`}
          headers={tableHeader}
          data={data}
        />
      </ViewInfoContainer>
      <ModalCreateLegalEntity
        isOpen={modalCreateLegalEntityOpen}
        onClose={() => setModalCreateLegalEntityOpen(false)}
      />
    </>
  );
};

const ModalCreateLegalEntity: FC<{ isOpen: boolean; onClose: () => void }> = props => {
  const { isOpen, onClose } = props;
  const [positionName, setPositionName] = useState("");
  const [createPosition] = useCreateLegalEntitiesMutation();

  const handleAddPosition = async () => {
    const res = await createPosition(positionName);

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
        Добавление юр.лица
      </Title>

      <InputContainer>
        <InputLabel>Название*</InputLabel>

        <InputField onChange={e => setPositionName(e.currentTarget.value)} />
      </InputContainer>

      <div className={styles.buttons}>
        <Button onClick={handleAddPosition}>Добавить</Button>

        <Button
          onClick={onClose}
          buttonType={"secondary"}
        >
          Отмена
        </Button>
      </div>
    </Modal>
  );
};
