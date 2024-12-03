import { type FC, useEffect, useState } from "react";

import { useGetLegalEntitiesQuery } from "@entity/LegalEntities/api/LegalEntities.api";
import { useEditUserMutation, useGetAllUserQuery } from "@entity/User";
import { DataTable } from "@feature/DataTable";
import { SearchBar } from "@feature/SearchBar";
import { getActiveCategory, preparePeriod, toQuery } from "@pages/BenefitsBar/BenefitsBar";
import { USER_PLACEHOLDER } from "@shared/assets/imageConsts";
import { classNames } from "@shared/lib/classNames/classNames";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector/useAppSelector";
import { Button } from "@shared/ui/Button";
import { Checkbox } from "@shared/ui/Checkbox";
import { FiltersSidebar } from "@shared/ui/FiltersSidebar/FiltersSidebar";
import { Icon } from "@shared/ui/Icons/Icon";
import { Image } from "@shared/ui/Image/Image";
import { InputContainer } from "@shared/ui/Input/InputContainer";
import { InputField } from "@shared/ui/Input/InputField";
import { InputLabel } from "@shared/ui/Input/InputLabel";
import { Modal } from "@shared/ui/Modal";
import { Selector } from "@shared/ui/Selector";
import { Text } from "@shared/ui/Text";
import { Title } from "@shared/ui/Title";
import { ViewHeader } from "@shared/ui/ViewInfoContainer/ViewHeader";
import { ViewInfoContainer } from "@shared/ui/ViewInfoContainer/ViewInfoContainer";
import { Popover } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

import { CREATE_EMPLOYEES, EMPLOYEES } from "@app/providers/AppRouter/AppRouter.config";

import { TUserRole } from "@entity/User/model/types/User.types";

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
  {
    text: "",
    data: "points",
  },
];

type TBenefitSortedBy = "fullname" | "hired_at";
type TSortOrder = "asc" | "desc";

type TSortParam = {
  text: string;
  sortBy: TBenefitSortedBy;
  sortOrder: TSortOrder;
};

export const SORT_PARAMS: TSortParam[] = [
  {
    text: "По алфавиту",
    sortBy: "fullname",
    sortOrder: "desc",
  },
  {
    text: "По дате найма ↑",
    sortBy: "hired_at",
    sortOrder: "desc",
  },
  {
    text: "По дате найма ↓",
    sortBy: "hired_at",
    sortOrder: "asc",
  },
];

type TEmployeesFilter = {
  is_active: boolean;
  is_adapted: boolean;
  is_verified: boolean;
  role: string;
  legal_entities: string;
};

export const ViewEmployees: FC = () => {
  const [search, setSearch] = useState("");
  const filter = useLocation().search.split("legal_entity=")?.[1];
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState<Partial<TEmployeesFilter>>({});

  const legalEntity = useGetLegalEntitiesQuery(null);

  const [isActive, setIsActive] = useState<boolean | null>(null);
  const [isAdapted, setIsAdapted] = useState<boolean | null>(null);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [roles, setRoles] = useState<TUserRole[]>([]);
  const [sort, setSort] = useState<string>(toQuery(SORT_PARAMS[0].sortBy, SORT_PARAMS[0].sortOrder));
  const [legalEntityCheckbox, setLegalEntityCheckbox] = useState<Record<string, { active: boolean; id: number }>>({});
  const [minDate, setMinDate] = useState<string | null>(null);
  const [maxDate, setMaxDate] = useState<string | null>(null);

  const toInitialState = () => {
    setIsActive(null);
    setIsVerified(null);
    setIsAdapted(null);
    setLegalEntityCheckbox(prev =>
      Object.fromEntries(
        Object.keys(prev).map(el => [
          el,
          {
            id: prev[el].id,
            active: false,
          },
        ])
      )
    );
    setMinDate(null);
    setMaxDate(null);
  };

  useEffect(() => {
    if (legalEntity.data) {
      setLegalEntityCheckbox(
        Object.fromEntries(
          legalEntity.data.map(el => [
            el.name,
            {
              active: filter !== undefined ? Number(filter) === el.id : false,
              id: el.id,
            },
          ])
        )
      );

      if (filter) setFilters({ legal_entities: `legal_entities=${filter}` });
    }
  }, [legalEntity.data]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();

  const users = useGetAllUserQuery({ search: search, sort: sort, filters: filters });
  const navigate = useNavigate();

  const data = users?.data
    ? users.data.map(el => ({
        id: el.id,
        fullname: (
          <span className={styles.fullname}>
            <Image
              type={"avatar"}
              srs={el.image_url || USER_PLACEHOLDER}
              onError={e => (e.target.src = USER_PLACEHOLDER)}
            />
            {el.lastname} {el.firstname} {el.middlename}
          </span>
        ),
        coins: el.coins,
        level: el.level,
        position: el.position?.name || "-",
        points: (
          <Popover
            className={styles.points}
            arrow={false}
            trigger={"click"}
            content={
              <div className={styles.actions}>
                <Text
                  className={styles.element}
                  onClick={() => navigate(EMPLOYEES + "/" + el.id + "/edit")}
                >
                  Посмотреть профиль
                </Text>
                <Text
                  className={styles.element}
                  onClick={() => navigate(EMPLOYEES + "/" + el.id + "/edit")}
                >
                  Редактировать профиль
                </Text>
                <Text
                  className={classNames(styles.warning, styles.element)}
                  onClick={() => {
                    setId(el.id);
                    setOpen(true);
                  }}
                >
                  Отключить профиль
                </Text>
              </div>
            }
          >
            ...
          </Popover>
        ),
      }))
    : [];

  const handelClickRoleCheckBox = (value: TUserRole) => {
    if (roles.includes(value)) setRoles(roles.filter(role => role !== value));
    else setRoles(prev => [...prev, value]);
  };

  const userRole = useAppSelector(state => state.user.data?.role);

  return (
    <ViewInfoContainer>
      <ViewHeader
        title={"Сотрудники"}
        searchBar={
          <SearchBar
            setValue={setSearch}
            className={styles.searchBar}
            value={search}
          />
        }
      >
        <div style={{ display: "flex", gap: 16 }}>
          <Button className={styles.AddBtn} onClick={() => navigate(CREATE_EMPLOYEES)}>Добавить сотрудника</Button>

          <Popover
            trigger={"click"}
            arrow={false}
            className={styles.dots}
            content={
              <div className={styles.menu}>
                <div className={styles.menu__top}>
                  <Text className={styles.menu__el}>
                    <Icon
                      icon={"upload"}
                      className={styles.filter_button__icon}
                      size={"s"}
                    />
                    Импорт списка пользователей Excel
                  </Text>
                  <Text className={styles.menu__el}>
                    <Icon
                      icon={"download"}
                      className={styles.filter_button__icon}
                      size={"s"}
                    />
                    Скачать шаблон импорта Excel
                  </Text>
                </div>
                <Text className={styles.menu__el}>
                  <Icon
                    icon={"download"}
                    className={styles.filter_button__icon}
                    size={"s"}
                  />
                  Экспорт списка пользователей Excel
                </Text>
                <Text className={styles.menu__el}>
                  <Icon
                    icon={"download"}
                    className={styles.filter_button__icon}
                    size={"s"}
                  />
                  Экспорт списка пользователей Excel
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

      <div className={styles.top__filters}>
        <Button
          buttonType={"secondary-black"}
          onClick={() => setSidebarOpen(prev => !prev)}
          className={styles.filter_button}
        >
          <Icon
            size={"m"}
            icon={"filters"}
            className={styles.filter_button__icon}
          />

          <Text boldness={"medium"}>Все фильтры</Text>
        </Button>

        <Selector
          currentValue={sort}
          setCurrentValue={setSort}
          className={styles.filters}
          values={SORT_PARAMS.map(el => ({
            data: toQuery(el.sortBy, el.sortOrder),
            text: el.text,
          }))}
        />

        <FiltersSidebar
          type={"admin"}
          title={"Все фильтры"}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        >
          <div className={styles.filter_container}>
            {userRole === "admin" ? (
              <>
                <div className={styles.filter_block}>
                  <Title type={"element"}>Роль</Title>

                  <Checkbox
                    className={styles.radio}
                    onChange={() => handelClickRoleCheckBox("employee")}
                    label={"Сотрудник"}
                    value={roles.includes("employee")}
                  />

                  <Checkbox
                    className={styles.radio}
                    onChange={() => handelClickRoleCheckBox("hr")}
                    label={"HR"}
                    value={roles.includes("hr")}
                  />

                  <Checkbox
                    className={styles.radio}
                    onChange={() => handelClickRoleCheckBox("admin")}
                    label={"Админ"}
                    value={roles.includes("admin")}
                  />
                </div>

                <div className={styles.filter_block}>
                  <Title type={"element"}>Юридические лица</Title>

                  {legalEntityCheckbox && (
                    <div className={styles.checkbox_container}>
                      {Object.keys(legalEntityCheckbox).map(el => (
                        <Checkbox
                          key={el}
                          className={styles.element}
                          value={legalEntityCheckbox[el].active}
                          label={el}
                          onChange={() =>
                            setLegalEntityCheckbox(prev => ({
                              ...prev,
                              [el]: { active: !prev![el].active, id: prev![el].id },
                            }))
                          }
                        />
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : null}

            <div className={styles.filter_block}>
              <Title type={"element"}>Статус пользователя</Title>

              <div className={styles.active_container}>
                <Checkbox
                  className={styles.radio}
                  onChange={() => setIsActive(true)}
                  label={"Активные"}
                  value={isActive !== null ? isActive : false}
                />

                <Checkbox
                  className={styles.radio}
                  onChange={() => setIsActive(false)}
                  label={"Неактивные"}
                  value={isActive !== null ? !isActive : false}
                />
              </div>
            </div>

            <div className={styles.filter_block}>
              <Title type={"element"}>Дата найма</Title>

              <div className={styles.numbers}>
                <InputContainer>
                  <InputLabel>
                    <Text type={"description"}>От</Text>
                  </InputLabel>

                  <InputField
                    isForm={true}
                    type={"date"}
                    value={minDate}
                    placeholder={"Введите число"}
                    className={styles.numbers__input}
                    onChange={e => setMinDate(e.currentTarget.value)}
                  />
                </InputContainer>

                <InputContainer>
                  <InputLabel>
                    <Text type={"description"}>До</Text>
                  </InputLabel>

                  <InputField
                    isForm={true}
                    type={"date"}
                    placeholder={"Введите число"}
                    className={styles.numbers__input}
                    value={maxDate}
                    onChange={e => setMaxDate(e.currentTarget.value)}
                  />
                </InputContainer>
              </div>
            </div>

            <div className={styles.filter_block}>
              <Title type={"element"}>Адаптация</Title>

              <div className={styles.active_container}>
                <Checkbox
                  className={styles.radio}
                  onChange={() => setIsAdapted(true)}
                  label={"Пройдена"}
                  value={isAdapted !== null ? isAdapted : false}
                />

                <Checkbox
                  className={styles.radio}
                  onChange={() => setIsAdapted(false)}
                  label={"не пройдена"}
                  value={isAdapted !== null ? !isAdapted : false}
                />
              </div>
            </div>

            <div className={styles.filter_block}>
              <Title type={"element"}>Верификация</Title>

              <div className={styles.active_container}>
                <Checkbox
                  className={styles.radio}
                  onChange={() => setIsVerified(true)}
                  label={"Пройдена"}
                  value={isVerified !== null ? isVerified : false}
                />

                <Checkbox
                  className={styles.radio}
                  onChange={() => setIsVerified(false)}
                  label={"не пройдена"}
                  value={isVerified !== null ? !isVerified : false}
                />
              </div>
            </div>

            <div className={styles.buttons}>
              <Button
                onClick={() => {
                  toInitialState();
                  setFilters({});
                }}
                buttonType={"secondary"}
              >
                Сбросить
              </Button>

              <Button
                onClick={() =>
                  setFilters({
                    ...(getActiveCategory(legalEntityCheckbox).length
                      ? {
                          legal_entities: getActiveCategory(legalEntityCheckbox).reduce((acc, el, index) => {
                            acc +=
                              `legal_entities=${legalEntityCheckbox[el].id}` +
                              `${index === getActiveCategory(legalEntityCheckbox).length - 1 ? "" : "&"}`;

                            return acc;
                          }, ""),
                        }
                      : {}),
                    ...(isAdapted !== null ? { is_adapted: isAdapted } : {}),
                    ...(isActive !== null ? { is_active: isActive } : {}),
                    ...(minDate !== null && maxDate !== null ? { hired_at: preparePeriod(minDate, maxDate) } : {}),
                  })
                }
              >
                Показать
              </Button>
            </div>
          </div>
        </FiltersSidebar>
      </div>

      <DataTable
        headers={tableHeader}
        data={data}
      />

      <DisableModal
        open={open}
        onClose={() => setOpen(false)}
        id={id}
      />
    </ViewInfoContainer>
  );
};

const DisableModal = ({ open, onClose, id }) => {
  const [edit] = useEditUserMutation();
  const [step, setStep] = useState(0);

  return (
    <Modal
      isOpen={open}
      onClose={() => {
        onClose();
        setStep(0);
      }}
    >
      {step === 0 ? (
        <>
          <Title
            type={"element"}
            className={styles.text}
            boldness={"medium"}
          >
            Вы уверены, что хотите<br/>отключить профиль сотрудника?<br/>Сотрудник не сможет пользоваться<br/>данным сервисом.
          </Title>

          <div className={styles.buttons}>
            <Button
              buttonType={"primary-red"}
              onClick={async () => {
                const res = await edit({ id: id, is_active: false });

                setStep(1);
              }}
            >
              Отключить
            </Button>
            <Button
              buttonType={"secondary-grey"}
              onClick={() => {
                onClose();
              }}
            >
              Отменить
            </Button>
          </div>
        </>
      ) : null}
      {step === 1 ? (
        <>
          <Title
            type={"element"}
            className={styles.text}
            boldness={"medium"}
          >
            Профиль отключен.<br/>Включить профиль сотрудника снова можно<br/>через меню таблицы.{" "}
          </Title>

          <div className={styles.buttons}>
            <Button
              buttonType={"primary"}
              onClick={() => {
                onClose();
                setStep(0);
              }}
            >
              ОК
            </Button>
          </div>
        </>
      ) : null}
    </Modal>
  );
};
