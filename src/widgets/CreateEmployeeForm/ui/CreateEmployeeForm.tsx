/* eslint-disable camelcase */
import { type FC, useEffect, useState } from "react";

import { useGetLegalEntitiesQuery } from "@entity/LegalEntities/api/LegalEntities.api";
import { LegalEntitiesActions } from "@entity/LegalEntities/model/slice/LegalEntities.slice";
import { useCreatePositionMutation, useGetPositionQuery } from "@entity/Position/api/Position.api";
import { PositionSliceActions } from "@entity/Position/model/slice/User.slice";
import { useCreateUserMutation } from "@entity/User";
import { AddImage } from "@feature/AddImage";
import { InputFrom } from "@feature/InputFrom";
import { TInputFromElement } from "@feature/InputFrom/ui/InputFrom";
import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector/useAppSelector";
import { Button } from "@shared/ui/Button";
import { InputContainer } from "@shared/ui/Input/InputContainer";
import { InputField } from "@shared/ui/Input/InputField";
import { InputLabel } from "@shared/ui/Input/InputLabel";
import { Modal } from "@shared/ui/Modal";
import { Title } from "@shared/ui/Title";
import { useNavigate } from "react-router-dom";

import { EMPLOYEES } from "@app/providers/AppRouter/AppRouter.config";

import styles from "../styles/CreateEmployeeForm.module.scss";

const useGetInputs = (addButtonEvent: () => void) => {
  const positions = useAppSelector(state => state.positions.positions);
  const legalEntities = useAppSelector(state => state.legalEntities.legalEntities);
  const userRole = useAppSelector(state => state.user.data!.role);

  const INPUTS: TInputFromElement[] = [
    {
      type: "select",
      label: "Роль",
      selectOptions: [
        {
          data: "employee",
          text: "Сотрудник",
        },
        {
          data: "hr",
          text: "HR",
        },
        {
          data: "admin",
          text: "Админитсратор",
        },
      ],
      fieldName: "role",
      disabled: userRole !== "admin",
    },
    {
      label: "Почта",
      fieldName: "email",
      isRequired: true,
      placeholder: "Введите корпоративную почту",
    },
    {
      label: "Фамилия",
      fieldName: "lastname",
      isRequired: true,
      placeholder: "Введите фамилию сотрудника",
    },
    {
      label: "Дата найма",
      fieldName: "hired_at",
      type: "date",
      isRequired: true,
      placeholder: "Выберите дату",
    },
    {
      label: "Имя",
      fieldName: "firstname",
      isRequired: true,
      placeholder: "Введите имя сотрудника",
    },
    {
      type: "select",
      label: "Должность",
      selectOptions: positions.map(el => ({ data: el.id.toString(), text: el.name })),
      addButton: { text: "Добавить должность", event: addButtonEvent },
      fieldName: "position",
      isRequired: true,
    },
    {
      label: "Отчество",
      fieldName: "middlename",
      placeholder: "Введите отчество сотрудника",
    },
    {
      type: "select",
      label: "Юридическое лицо",
      selectOptions: legalEntities.map(el => ({ data: el.id.toString(), text: el.name })),
      fieldName: "legal_entity",
      isRequired: true,
    },
    {
      label: "Баланс, UDV-coins",
      fieldName: "coins",
      type: "number",
      placeholder: "Введите число",
    },
    {
      label: "Адаптация пройдена",
      fieldName: "is_adapted",
      className: styles.checkbox,
      type: "checkbox",
    },
  ];

  return INPUTS;
};

export const CreateEmployeeForm: FC = () => {
  const dispatch = useAppDispatch();
  const [isAddPositionOpen, setIsAddPositionOpen] = useState(false);
  const navigate = useNavigate();

  const userForm = useAppSelector(state => state.createEmployeeForm);
  const inputs = useGetInputs(() => setIsAddPositionOpen(true));
  const { data: positionsData } = useGetPositionQuery(null);
  const { data: legalEntityData } = useGetLegalEntitiesQuery(null);
  const [createUser] = useCreateUserMutation();

  useEffect(() => {
    if (positionsData) dispatch(PositionSliceActions.setPositions(positionsData));
  }, [positionsData]);

  useEffect(() => {
    if (legalEntityData) dispatch(LegalEntitiesActions.setLegalEntities(legalEntityData));
  }, [legalEntityData]);

  const handleAddUser = async () => {
    const res = await createUser(userForm);

    if (res.data) {
      navigate(EMPLOYEES + "/" + res.data.id);
    }
  };

  return (
    <>
      <div className={styles.title}>
        <Title type={"page"}>Сотрудники</Title>

        <Title type={"block"}>Добавление cотрудника</Title>
      </div>

      <div className={styles.form_container}>
        <InputFrom inputs={inputs} />

        <AddImage />
      </div>

      <div className={styles.form_buttons}>
        <Button onClick={handleAddUser}>Добавить</Button>

        <Button buttonType={"secondary"}>Отменить</Button>
      </div>

      <ModalCreatePosition
        isOpen={isAddPositionOpen}
        onClose={() => setIsAddPositionOpen(false)}
      />
    </>
  );
};

const ModalCreatePosition: FC<{ isOpen: boolean; onClose: () => void }> = props => {
  const { isOpen, onClose } = props;
  const [positionName, setPositionName] = useState("");
  const [createPosition] = useCreatePositionMutation();

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
        Добавление должности
      </Title>

      <InputContainer>
        <InputLabel>Название*</InputLabel>

        <InputField onChange={e => setPositionName(e.currentTarget.value)} />
      </InputContainer>

      <div className={styles.buttons}>
        <Button onClick={handleAddPosition}>Добавить</Button>

        <Button
          onClick={onClose}
          type={"secondary"}
        >
          Отмена
        </Button>
      </div>
    </Modal>
  );
};
