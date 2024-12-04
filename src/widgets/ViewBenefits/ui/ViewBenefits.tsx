import { type FC, useEffect, useState } from "react";

import { TFilterParams, useEditBenefitMutation, useGetAllBenefitQuery } from "@entity/Benefit/api/Benefit.api";
import { useGetCategoryQuery } from "@entity/Category/api/Category.api";
import { DataTable } from "@feature/DataTable";
import { SearchBar } from "@feature/SearchBar";
import { BenefitFilter, SORT_PARAMS, toQuery } from "@pages/BenefitsBar/BenefitsBar";
import { BENEFIT_PLACEHOLDER } from "@shared/assets/imageConsts";
import { classNames } from "@shared/lib/classNames/classNames";
import { Button } from "@shared/ui/Button";
import { Icon } from "@shared/ui/Icons/Icon";
import { Image } from "@shared/ui/Image/Image";
import { Modal } from "@shared/ui/Modal";
import { Selector } from "@shared/ui/Selector";
import { Text } from "@shared/ui/Text";
import { Title } from "@shared/ui/Title";
import { ViewHeader } from "@shared/ui/ViewInfoContainer/ViewHeader";
import { ViewInfoContainer } from "@shared/ui/ViewInfoContainer/ViewInfoContainer";
import { Popover } from "antd";
import { useNavigate } from "react-router-dom";

import { BENEFITS, CREATE_BENEFITS } from "@app/providers/AppRouter/AppRouter.config";

import styles from "../styles/ViewBenefits.module.scss";

const tableHeader = [
  {
    text: "Название бенефита",
    data: "name",
  },
  {
    text: "В наличии, шт.",
    data: "amount",
  },
  {
    text: "Требуемый уровень",
    data: "level",
  },
  {
    text: "Цена, UDV-coins",
    data: "coins",
  },
  {
    text: "Цена, руб.",
    data: "price",
  },
  {
    text: "",
    data: "points",
  },
];

export const ViewBenefits: FC = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sort, setSort] = useState<string>(toQuery(SORT_PARAMS[0].sortBy, SORT_PARAMS[0].sortOrder));
  const categories = useGetCategoryQuery(null);
  const [active, setActive] = useState<boolean | null>(null);
  const [adaptation, setAdaptation] = useState<boolean | null>(null);
  const [categoriesCheckbox, setCategoriesCheckbox] = useState<Record<string, { active: boolean; id: number }>>({});

  useEffect(() => {
    if (categories.data)
      setCategoriesCheckbox(
        Object.fromEntries(
          categories.data.map(el => [
            el.name,
            {
              active: false,
              id: el.id,
            },
          ])
        )
      );
  }, [categories.data]);

  const [minLevel, setMinLevel] = useState<number | null>(null);
  const [maxLevel, setMaxLevel] = useState<number | null>(null);
  const [minCost, setMinCost] = useState<number | null>(null);
  const [maxCost, setMaxCost] = useState<number | null>(null);

  const toInitialState = () => {
    setActive(null);
    setAdaptation(null);
    setCategoriesCheckbox(prev =>
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
    setMinLevel(null);
    setMaxLevel(null);
    setMinCost(null);
    setMaxCost(null);
  };

  const [filters, setFilters] = useState<Partial<TFilterParams>>({});

  const [search, setSearch] = useState<string>("");
  const [id, setId] = useState();

  const { data: benefits } = useGetAllBenefitQuery({ filters: filters, sort: sort, search: search });
  const [open, setOpen] = useState(false);

  const data = benefits
    ? benefits.map(el => ({
        id: el.id,
        name: (
          <span className={styles.fullname}>
            <Image
              className={styles.avatarImage}
              type={"avatar"}
              srs={el.primary_image_url || BENEFIT_PLACEHOLDER}
              onError={e => (e.target.src = BENEFIT_PLACEHOLDER)}
            />
            {el.name}
          </span>
        ),
        amount: el.amount || "неограниченно",
        level: el.min_level_cost,
        coins: el.coins_cost || "бесплатно",
        price: el.real_currency_cost || "бесплатно",
        points: (
          <Popover
            className={styles.points}
            arrow={false}
            trigger={"click"}
            content={
              <div className={styles.actions}>
                <Text
                  className={styles.element}
                  onClick={() => navigate(BENEFITS + "/" + el.id)}
                >
                  Посмотреть бенефит
                </Text>
                <Text
                  className={styles.element}
                  onClick={() => navigate(BENEFITS + "/" + el.id + "/edit")}
                >
                  Редактировать бенефит
                </Text>
                <Text
                  className={classNames(styles.warning, styles.element)}
                  onClick={() => {
                    setId(el.id);
                    setOpen(true);
                  }}
                >
                  Отключить бенефит
                </Text>
              </div>
            }
          >
            ...
          </Popover>
        ),
      }))
    : [];

  return (
    <ViewInfoContainer>
      <ViewHeader
        title={"Бенефиты"}
        searchBar={
          <SearchBar
            setValue={setSearch}
            value={search}
            className={styles.searchBar}
          />
        }
      >
        <div style={{ display: "flex", gap: 16 }}>
          <Button className={styles.AddBtn} onClick={() => navigate(CREATE_BENEFITS)}>Добавить бенефит</Button>

          <Popover
            trigger={"click"}
            className={styles.dots}
            arrow={false}
            content={
              <div className={styles.menu}>
                <div className={styles.menu__top}>
                  <Text className={styles.menu__el}>
                    <Icon
                      icon={"upload"}
                      className={styles.filter_button__icon}
                      size={"s"}
                    />
                    Импорт списка бенефитов Excel
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
                  Экспорт списка бенефитов Excel
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

        <BenefitFilter
          type={"admin"}
          setMinLevel={setMinLevel}
          setActive={setActive}
          setAdaptation={setAdaptation}
          setMaxCost={setMaxCost}
          setMinCost={setMinCost}
          setSidebarOpen={setSidebarOpen}
          setMaxLevel={setMaxLevel}
          sidebarOpen={sidebarOpen}
          toInitialState={toInitialState}
          minCost={minCost}
          setFilters={setFilters}
          adaptation={adaptation}
          active={active}
          minLevel={minLevel}
          maxLevel={maxLevel}
          categoriesCheckbox={categoriesCheckbox}
          maxCost={maxCost}
          setCategoriesCheckbox={setCategoriesCheckbox}
        />

        <Selector
          currentValue={sort}
          setCurrentValue={setSort}
          className={styles.filters}
          values={SORT_PARAMS.map(el => ({
            data: toQuery(el.sortBy, el.sortOrder),
            text: el.text,
          }))}
        />
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
  const [edit] = useEditBenefitMutation();
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
            Вы уверены, что хотите отключить бенефит? Сотрудники не смогут видеть его в баре бенефитов.
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
            Бенефит отключен.
            <br />
            Включить бенефит снова можно
            <br />
            через меню таблицы.
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
