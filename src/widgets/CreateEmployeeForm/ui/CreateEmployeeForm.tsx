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

import { useNotification } from "@app/providers/NotificationProvider/NotificationProvider";

const useGetInputs = (addButtonEvent: () => void) => {
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
  const [image, setImage] = useState<File>();

  const navigate = useNavigate();

  const userForm = useAppSelector(state => state.createEmployeeForm);
  const inputs = useGetInputs(() => setIsAddPositionOpen(true));
  const { data: positionsData } = useGetPositionQuery(null);
  const { data: legalEntityData } = useGetLegalEntitiesQuery(null);
  const [addImage] = useAddImageMutation();
  const [createUser] = useCreateUserMutation();
  const [editUser] = useEditUserMutation();

  const { showMessage, destroyMessage } = useNotification();
  const key = "employeeProcess";
  interface ErrorDetail {
    type: string;
    loc: string[];
    msg: string;
    input: string;
    ctx?: {
      reason?: string;
      error?: object;
    };
  }

  interface ErrorResponse {
    error: {
      data: {
        detail: ErrorDetail[];
      };
    };
  }

  const fieldTranslations: Record<string, string> = {
    email: "Почта",
    firstname: "Имя",
    lastname: "Фамилия",
    middlename: "Отчество",
    hired_at: "Дата найма"
  };

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
    showMessage("Добавление пользователя...", "loading", key);

    let res;
    let imageRes;

    if (image) imageRes = await addImage({ id: user?.id || 0, image: image });

    if (isEdit) {
      res = await editUser({ ...userForm, id: user?.id || 0 });
    } else {
      res = await createUser(userForm);
    }

    if (!res.error && !isEdit) {
      showMessage("Пользователь успешно добавлен!", "success", key);
    } else if (!res.error && isEdit) {
      showMessage("Пользователь успешно обновлен!", "success", key);
    }

    if (res.error) {
      const errors = res.error.data.detail;
      destroyMessage(key);
      errors.forEach(error => {
        const field = error.loc[1];
        const message = error.msg;

        const fieldName = fieldTranslations[field] || field;

        if (field === "email") {
          if (message.includes("not a valid email address")) {
            showMessage(`Ошибка. Неверный формат поля "${fieldName}".`, "error");
          }
        } else if (field === "firstname" || field === "lastname" || field === "middlename") {
          if (message.includes("contains characters that do not pass validation")) {
            showMessage(`Ошибка. Поле "${fieldName}" содержит недопустимые символы.`, "error");
          }
        } else if (field === "hired_at") {
          if (message.includes("Input should be a valid date or datetime")) {
            showMessage(`Ошибка. Неверный формат поля "${fieldName}". Пожалуйста, введите корректную дату.`, "error");
          }
        } else {
          showMessage("Что-то пошло не так :(", "error");
        }
      });
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
