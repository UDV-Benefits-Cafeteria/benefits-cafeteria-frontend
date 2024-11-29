import { type FC, useEffect, useState } from "react";

import { TFilterParams, useGetAllBenefitQuery } from "@entity/Benefit/api/Benefit.api";
import { useGetCategoryQuery } from "@entity/Category/api/Category.api";
import { DataTable } from "@feature/DataTable";
import { SearchBar } from "@feature/SearchBar";
import { BenefitFilter, SORT_PARAMS, toQuery } from "@pages/BenefitsBar/BenefitsBar";
import { BENEFIT_PLACEHOLDER } from "@shared/assets/imageConsts";
import { Button } from "@shared/ui/Button";
import { Icon } from "@shared/ui/Icons/Icon";
import { Image } from "@shared/ui/Image/Image";
import { Selector } from "@shared/ui/Selector";
import { Text } from "@shared/ui/Text";
import { ViewHeader } from "@shared/ui/ViewInfoContainer/ViewHeader";
import { ViewInfoContainer } from "@shared/ui/ViewInfoContainer/ViewInfoContainer";
import { useNavigate } from "react-router-dom";

import { BENEFITS, BENEFITS_BAR, CREATE_BENEFITS } from "@app/providers/AppRouter/AppRouter.config";

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

  const { data: benefits } = useGetAllBenefitQuery({ filters: filters, sort: sort });

  const data = benefits
    ? benefits.map(el => ({
        id: el.id,
        name: (
          <span className={styles.fullname}>
            <Image
              type={"avatar"}
              srs={el.primary_image_url || BENEFIT_PLACEHOLDER}
              onError={(e) => (e.target.src = BENEFIT_PLACEHOLDER)}
            />
            {el.name}
          </span>
        ),
        amount: el.amount,
        level: el.min_level_cost,
        coins: el.coins_cost || "бесплатно",
        price: el.real_currency_cost || "бесплатно",
      }))
    : [];

  return (
    <ViewInfoContainer>
      <ViewHeader
        title={"Бенефиты"}
        searchBar={<SearchBar />}
      >
        <div style={{ display: "flex", width: 500, gap: 32 }}>
          <Button onClick={() => navigate(CREATE_BENEFITS)}>Добавить бенефит</Button>

          <Button
            onClick={() => navigate(BENEFITS_BAR)}
            buttonType="secondary"
          >
            Режим пользователя
          </Button>
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
        redirectTo={id => `${BENEFITS}/${id}/edit`}
        headers={tableHeader}
        data={data}
      />
    </ViewInfoContainer>
  );
};
