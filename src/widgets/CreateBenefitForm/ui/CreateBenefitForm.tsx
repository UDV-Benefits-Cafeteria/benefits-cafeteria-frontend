/* eslint-disable camelcase */
import { type FC, useEffect, useState } from "react";

import { useCreateBenefitMutation } from "@entity/Benefit/api/Benefit.api";
import { useCreateCategoryMutation, useGetCategoryQuery } from "@entity/Category/api/Category.api";
import { CategorySliceActions } from "@entity/Category/model/slice/Category.slice";
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
import { CreateBenefitFormActions } from "@widgets/CreateBenefitForm/model/slice/CreateBenefitForm.slice";
import { useNavigate } from "react-router-dom";

import { BENEFITS } from "@app/providers/AppRouter/AppRouter.config";

import { TBenefit } from "@entity/Benefit/model/types/Benefit.types";

import styles from "../styles/CreateBenefitForm.module.scss";

const useGetInputs = (addButtonEvent: () => void) => {
  const isFixedPeriod = useAppSelector(state => state.createBenefitForm.is_fixed_period);
  const categories = useAppSelector(state => state.category.category);

  const INPUTS: TInputFromElement<TBenefit>[] = [
    {
      label: "Название бенефита",
      fieldName: "name",
      placeholder: "Введите название бенефита",
    },
    {
      label: "Требуемый уровень",
      fieldName: "min_level_cost",
      type: "number",
      placeholder: "Введите число",
    },
    {
      label: "Цена в UDV-coins",
      fieldName: "coins_cost",
      type: "number",
      placeholder: "Введите число",
    },
    {
      label: "Количество доступных бенефитов",
      fieldName: "amount",
      type: "number",
      placeholder: "Введите число",
    },
    {
      label: "Описание бенефита",
      className: styles.textArea,
      placeholder: "Введите описание",
      fieldName: "description",
    },
    {
      label: "Сколько раз можно использовать",
      type: "number",
      placeholder: "Введите число",
      fieldName: "usage_limit",
    },
    {
      label: "Реальная стоимость в рублях",
      type: "number",
      placeholder: "Введите число",
      fieldName: "real_currency_cost",
    },
    {
      label: "Адаптационный период пройден",
      type: "checkbox",
      fieldName: "adaptation_required",
    },
    {
      label: "Задать период сброса использований",
      type: "checkbox",
      fieldName: "is_fixed_period",
    },
    {
      type: "select",
      label: "Категория",
      selectOptions: categories.map(el => ({ data: el.id.toString(), text: el.name })),
      addButton: { text: "Добавить категорию", event: addButtonEvent },
      fieldName: "category_id",
      isRequired: true,
    },
    {
      isShow: isFixedPeriod,
      className: styles.optional,
      label: "",
      placeholder: "Введите число",
      fieldName: "usage_period_days",
    },
  ];

  return INPUTS;
};

export const CreateBenefitForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);

  const benefitForm = useAppSelector(state => state.createBenefitForm);
  const inputs = useGetInputs(() => setIsAddCategoryOpen(true));

  const [createBenefit] = useCreateBenefitMutation();

  const { data: categoryData } = useGetCategoryQuery(null);

  useEffect(() => {
    if (categoryData) dispatch(CategorySliceActions.setCategory(categoryData));
  }, [categoryData]);

  const handleAddBenefit = async () => {
    const res = await createBenefit(benefitForm);

    if (res.data) {
      navigate(BENEFITS + "/" + res.data.id);
      dispatch(CreateBenefitFormActions.setInitialState());
    }
  };

  return (
    <>
      <div className={styles.title}>
        <Title type={"page"}>Бенефиты</Title>

        <Title type={"block"}>Добавление бенефита</Title>
      </div>

      <div className={styles.form_container}>
        <InputFrom<TBenefit>
          form={benefitForm}
          inputs={inputs}
          action={CreateBenefitFormActions.setBenefitData}
        />

        <AddImage />
      </div>

      <div className={styles.form_buttons}>
        <Button onClick={handleAddBenefit}>Добавить</Button>

        <Button buttonType={"secondary"}>Отменить</Button>
      </div>

      <ModalCreateCategory
        isOpen={isAddCategoryOpen}
        onClose={() => setIsAddCategoryOpen(false)}
      />
    </>
  );
};

const ModalCreateCategory: FC<{ isOpen: boolean; onClose: () => void }> = props => {
  const { isOpen, onClose } = props;
  const [positionName, setPositionName] = useState("");
  const [createCategory] = useCreateCategoryMutation();

  const handleAddPosition = async () => {
    const res = await createCategory(positionName);

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
        Добавление категории
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
