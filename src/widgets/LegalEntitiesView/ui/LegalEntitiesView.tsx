import { ChangeEvent, type FC, useState } from "react";

import {
  useBulkLegalEntitiesCreateMutation,
  useCreateLegalEntitiesMutation,
  useGetLegalEntitiesQuery,
  useImportLegalEntitiesDataMutation,
  useLazyExportLegalEntitiesDataQuery,
} from "@entity/LegalEntities/api/LegalEntities.api";
import { DataTable } from "@feature/DataTable";
import { classNames } from "@shared/lib/classNames/classNames";
import { Button } from "@shared/ui/Button";
import { Icon } from "@shared/ui/Icons/Icon";
import { InputContainer } from "@shared/ui/Input/InputContainer";
import { InputField } from "@shared/ui/Input/InputField";
import { InputLabel } from "@shared/ui/Input/InputLabel";
import { Modal } from "@shared/ui/Modal";
import { Text } from "@shared/ui/Text";
import { Title } from "@shared/ui/Title";
import { ViewHeader } from "@shared/ui/ViewInfoContainer/ViewHeader";
import { ViewInfoContainer } from "@shared/ui/ViewInfoContainer/ViewInfoContainer";
import { Popover } from "antd";
import dayjs from "dayjs";

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

  const [page, setPage] = useState(0);

  const data = legalEntities
    ? legalEntities.slice(page * 8, page * 8 + 8).map(el => ({
        id: el.id,
        name: el.name,
        hrCount: el.employee_count,
        employeeCount: el.staff_count,
        points: <span>...</span>,
      }))
    : [];

  const [trigger] = useLazyExportLegalEntitiesDataQuery();

  const getFile = async () => {
    const res = await trigger(null);

    if (!res?.data) return;

    const url = URL.createObjectURL(new Blob([res.data]));

    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", `benefit-requests${dayjs().format("DD.MM.YYYY_HH:mm")}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const [bulkCreate] = useBulkLegalEntitiesCreateMutation();
  const [importData] = useImportLegalEntitiesDataMutation();

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      const res = await importData(file);

      if (res.data) {
        bulkCreate(res.data.valid_entities);
      }
    }
  };

  const getPages = () => {
    const res = [];

    for (let i = 0; i < data?.length; i += 8) {
      res.push(
        <button
          onClick={() => setPage(i / 8)}
          className={classNames(styles.item, i / 8 === page ? styles.active : null)}
        >
          {i / 8 + 1}
        </button>
      );
    }

    return res;
  };

  return (
    <>
      <ViewInfoContainer>
        <ViewHeader title={"Юридические лица"}>
          <div style={{ display: "flex", gap: 16, marginBottom: 65 }}>
            <Button
              className={styles.AddBtn}
              onClick={() => setModalCreateLegalEntityOpen(true)}
            >
              Добавить юр.лицо
            </Button>

            <Popover
              trigger={"click"}
              arrow={false}
              className={styles.dots}
              content={
                <div className={styles.menu}>
                  <div className={styles.menu__top}>
                    <input
                      id={"qwe"}
                      type={"file"}
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                    <label htmlFor={"qwe"}>
                      <Text className={styles.menu__el}>
                        <Icon
                          icon={"upload"}
                          className={styles.filter_button__icon}
                          size={"s"}
                        />
                        Импорт списка юридических лиц Excel
                      </Text>
                    </label>

                    <a
                      download
                      style={{ color: "black" }}
                      href={"https://digital-portfolio.hb.ru-msk.vkcloud-storage.ru/legalentities.xlsx"}
                    >
                      <Text className={styles.menu__el}>
                        <Icon
                          icon={"download"}
                          className={styles.filter_button__icon}
                          size={"s"}
                        />
                        Скачать шаблон импорта Excel
                      </Text>
                    </a>
                  </div>
                  <Text
                    className={styles.menu__el}
                    onClick={getFile}
                  >
                    <Icon
                      icon={"download"}
                      className={styles.filter_button__icon}
                      size={"s"}
                    />
                    Экспорт списка юридических лиц Excel
                  </Text>
                </div>
              }
            >
              <div className={styles.import}>
                <Icon
                  icon={"import"}
                  size={"m"}
                  className={styles.import_icon}
                />
              </div>
            </Popover>
          </div>
        </ViewHeader>

        <DataTable
          redirectTo={id => `${EMPLOYEES}?legal_entity=${id}`}
          headers={tableHeader}
          data={data}
        />
      </ViewInfoContainer>

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
              if (prev + 1 < (legalEntities?.length || 0) / 8) return prev + 1;

              return prev;
            });
          }}
          className={classNames(styles.move, page + 1 < (legalEntities?.length || 0) / 8 ? null : styles.disabled)}
        />
      </div>

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
        type={"block"}
        className={styles.modalTitle}
      >
        Добавление юридического лица
      </Title>

      <InputContainer className={styles.inputContainerModal}>
        <InputLabel>Название*</InputLabel>

        <InputField
          placeholder={"Введите название юр.лица"}
          className={styles.inputFieldModal}
          onChange={e => setPositionName(e.currentTarget.value)}
        />
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
