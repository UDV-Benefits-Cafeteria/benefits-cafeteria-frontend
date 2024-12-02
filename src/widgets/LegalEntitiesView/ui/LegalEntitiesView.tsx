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
import {useNotification} from "@app/providers/NotificationProvider/NotificationProvider";

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

  const { showMessage } = useNotification();
  const key = "legalEntityProcess";

  const handleAddPosition = async () => {
    const res = await createPosition(positionName);
    showMessage("Добавление юр. лица...", "loading", key);

    if (res.data) {
      showMessage("Юр. лицо успешно добавлено!", "success", key);
      onClose();
    }

    if (res.error) {
      if (res.error.data.detail === "Failed to create legal entity") showMessage("Ошибка. Юр. лицо с таким названием уже существует.", "error", key);
      else if (res.error.data.detail[0].type === "string_too_long") showMessage("Ошибка. Название слишком длинное.", "error", key);
      else if (res.error.data.detail[0].type === "string_too_short") showMessage("Ошибка. Название слишком короткое.", "error", key);
      else showMessage("Что-то пошло не так :(", "error", key);
    }
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
