/* eslint-disable camelcase */
import { type FC, useEffect, useState } from "react";

import { useCreateLegalEntitiesMutation, useGetLegalEntitiesQuery } from "@entity/LegalEntities/api/LegalEntities.api";
import { LegalEntitiesActions } from "@entity/LegalEntities/model/slice/LegalEntities.slice";
import { useCreatePositionMutation, useGetPositionQuery } from "@entity/Position/api/Position.api";
import { PositionSliceActions } from "@entity/Position/model/slice/User.slice";
import { useAddImageMutation, useCreateUserMutation, useEditUserMutation, useGetCurrentUserQuery } from "@entity/User";
import { AddImage } from "@feature/AddImage";
import { Form } from "@feature/InputFrom";
import { TInputFromElement } from "@feature/InputFrom/ui/Form";
import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector/useAppSelector";
import { Button } from "@shared/ui/Button";
import { InputContainer } from "@shared/ui/Input/InputContainer";
import { InputField } from "@shared/ui/Input/InputField";
import { InputLabel } from "@shared/ui/Input/InputLabel";
import { Modal } from "@shared/ui/Modal";
import { Title } from "@shared/ui/Title";
import { useLocation, useNavigate } from "react-router-dom";

import { EMPLOYEES } from "@app/providers/AppRouter/AppRouter.config";

import { TUserData } from "@entity/User/model/types/User.types";

import styles from "../styles/CreateEmployeeForm.module.scss";

import { CreateEmployeeFormActions } from "../model/slice/CreateEmployeeForm.slice";

const useGetInputs = (addButtonEvent: () => void, addButtonEvent1: () => void) => {
  const positions = useAppSelector(state => state.positions.positions);
  const legalEntities = useAppSelector(state => state.legalEntities.legalEntities);
  const userRole = useAppSelector(state => state.user.data!.role);

  const INPUTS: TInputFromElement<TUserData>[] = [
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
          text: "Администратор",
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
      fieldName: "position_id",
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
      addButton: { text: "Добавить юр.лицо", event: addButtonEvent1 },
      fieldName: "legal_entity_id",
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

export const CreateEmployeeForm: FC<{ isEdit?: boolean }> = props => {
  const { isEdit } = props;

  const pathname = useLocation().pathname;

  const user = useGetCurrentUserQuery(Number(pathname.split("/")[3])).data;

  const dispatch = useAppDispatch();
  const [isAddPositionOpen, setIsAddPositionOpen] = useState(false);
  const [isAddPositionOpen1, setIsAddPositionOpen1] = useState(false);
  const [image, setImage] = useState<File>();

  const navigate = useNavigate();

  const userForm = useAppSelector(state => state.createEmployeeForm);
  const inputs = useGetInputs(
    () => setIsAddPositionOpen(true),
    () => setIsAddPositionOpen1(true)
  );
  const { data: positionsData } = useGetPositionQuery(null);
  const { data: legalEntityData } = useGetLegalEntitiesQuery(null);
  const [addImage] = useAddImageMutation();
  const [createUser] = useCreateUserMutation();
  const [editUser] = useEditUserMutation();

  useEffect(() => {
    if (user && isEdit)
      dispatch(
        CreateEmployeeFormActions.setFormData({
          ...user,
          position_id: user.position?.id,
          legal_entity_id: user.legal_entity?.id,
        })
      );
  }, [user, isEdit]);

  useEffect(() => {
    if (positionsData) dispatch(PositionSliceActions.setPositions(positionsData));
  }, [positionsData]);

  useEffect(() => {
    if (legalEntityData) dispatch(LegalEntitiesActions.setLegalEntities(legalEntityData));
  }, [legalEntityData]);

  useEffect(() => {
    return () => {
      dispatch(CreateEmployeeFormActions.setInitialState());
    };
  }, []);

  const handleAddUser = async () => {
    let res;
    let imageRes;

    if (image) imageRes = await addImage({ id: user?.id || 0, image: image });

    if (isEdit) {
      res = await editUser({ ...userForm, id: user?.id || 0 });
    } else {
      res = await createUser(userForm);
    }

    if (res.data && ((image && imageRes?.data) || (!image && !imageRes?.data))) {
      navigate(EMPLOYEES);
      dispatch(CreateEmployeeFormActions.setInitialState());
    }
  };

  const handleCancel = async () => {
    navigate(EMPLOYEES);
    dispatch(CreateEmployeeFormActions.setInitialState());
  };

  return (
    <>
      <div className={styles.title}>
        <Title type={"page"}>Сотрудники</Title>

        <Title type={"block"}>{isEdit ? "Редактирование" : "Добавление"} cотрудника</Title>
      </div>

      <div className={styles.form_container}>
        <Form<TUserData>
          form={userForm}
          inputs={inputs}
          action={CreateEmployeeFormActions.setUserData}
        />

        {isEdit && (
          <AddImage
            imageUrl={user?.image_url}
            setImage={setImage}
          />
        )}
      </div>

      <div className={styles.form_buttons}>
        <Button onClick={handleAddUser}>{isEdit ? "Сохранить" : "Добавить"}</Button>

        <Button
          onClick={handleCancel}
          buttonType={"secondary"}
        >
          Отменить
        </Button>
      </div>

      <ModalCreatePosition
        isOpen={isAddPositionOpen}
        onClose={() => setIsAddPositionOpen(false)}
      />
      <ModalCreatePosition1
        isOpen={isAddPositionOpen1}
        onClose={() => setIsAddPositionOpen1(false)}
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
          buttonType={"secondary"}
        >
          Отмена
        </Button>
      </div>
    </Modal>
  );
};

const ModalCreatePosition1: FC<{ isOpen: boolean; onClose: () => void }> = props => {
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
