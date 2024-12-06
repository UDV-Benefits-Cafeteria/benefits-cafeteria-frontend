/* eslint-disable camelcase */
import { type FC, useEffect, useState } from "react";

import {
  useAddBenefitImageMutation,
  useCreateBenefitMutation,
  useDeleteBenefitImageMutation,
  useEditBenefitMutation,
} from "@entity/Benefit/api/Benefit.api";
import { useCreateCategoryMutation, useGetCategoryQuery } from "@entity/Category/api/Category.api";
import { CategorySliceActions } from "@entity/Category/model/slice/Category.slice";
import { AddImage } from "@feature/AddImage";
import { Form } from "@feature/InputFrom";
import type { TInputFromElement } from "@feature/InputFrom/ui/Form";
import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector/useAppSelector";
import { Button } from "@shared/ui/Button";
import { InputContainer } from "@shared/ui/Input/InputContainer";
import { InputField } from "@shared/ui/Input/InputField";
import { InputLabel } from "@shared/ui/Input/InputLabel";
import { Modal } from "@shared/ui/Modal";
import { Title } from "@shared/ui/Title";
import { CreateBenefitFormActions } from "@widgets/CreateBenefitForm/model/slice/CreateBenefitForm.slice";
import { shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";

import { BENEFITS } from "@app/providers/AppRouter/AppRouter.config";

import type { TBenefit, TBenefitData } from "@entity/Benefit/model/types/Benefit.types";

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
      type: "text",
    },
    {
      label: "Сколько раз можно активировать бенефит",
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
      type: "switcher",
      fieldName: "adaptation_required",
    },
    {
      label: "Задать период сброса использований",
      type: "switcher",
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

export const CreateBenefitForm: FC<{ benefit?: TBenefitData }> = props => {
  const { benefit } = props;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const benefitForm = useAppSelector(state => state.createBenefitForm, shallowEqual);
  const inputs = useGetInputs(() => setIsAddCategoryOpen(true));
  const [createBenefit] = useCreateBenefitMutation();
  const [editBenefit] = useEditBenefitMutation();
  const [addImage] = useAddBenefitImageMutation();
  const [deleteImages] = useDeleteBenefitImageMutation();
  const { data: categoryData } = useGetCategoryQuery(null);
  const [trigger, setTrigger] = useState(false);
  const [image, setImage] = useState<File>();

  useEffect(() => {
    if (benefit) {
      setTrigger(!trigger);
      dispatch(CreateBenefitFormActions.setFormData({ ...benefit, category_id: benefit.category?.id }));
    }
  }, [benefit]);

  useEffect(() => {
    if (categoryData) dispatch(CategorySliceActions.setCategory(categoryData));
  }, [categoryData]);

  useEffect(() => {
    return () => {
      dispatch(CreateBenefitFormActions.setInitialState());
    };
  }, []);

  const handleAddBenefit = async () => {
    let res;
    let imageRes;

    if (benefit) {
      let bn = { ...benefitForm };
      if (benefitForm.amount < 0 || benefitForm.amount === "" || benefitForm.amount === " ") {
        bn.amount = null;
      }
      res = await editBenefit({ id: benefit?.id || 0, ...bn });
    } else {
      let bn = { ...benefitForm, is_active: true };
      if (benefitForm.amount < 0 || benefitForm.amount === "" || benefitForm.amount === " ") {
        bn.amount = null;
      }
      res = await createBenefit(bn);
    }

    if (image) {
      await deleteImages({ id: res?.data?.id || 0, imagesId: res?.data?.images.map(el => el.id || []) });

      imageRes = await addImage({ id: res?.data?.id || 0, image: image });
    }

    if (res.data && ((image && imageRes?.data) || (!image && !imageRes?.data))) {
      navigate(BENEFITS);
      dispatch(CreateBenefitFormActions.setInitialState());
    }
  };

  const handleCancel = async () => {
    navigate(BENEFITS);
    dispatch(CreateBenefitFormActions.setInitialState());
  };

  return (
    <>
      <div className={styles.title}>
        <Title type={"page"}>Бенефиты</Title>

        <Title type={"block"}>{benefit ? "Редактирование" : "Добавление"} бенефита</Title>
      </div>

      <div className={styles.form_container}>
        <Form<TBenefit>
          form={benefitForm}
          inputs={inputs}
          action={CreateBenefitFormActions.setBenefitData}
        />

        <AddImage
          imageUrl={benefit?.images[0]?.image_url}
          setImage={setImage}
        />
      </div>

      <div className={styles.form_buttons}>
        <Button onClick={handleAddBenefit}>{benefit ? "Сохранить" : "Добавить"}</Button>

        <Button
          onClick={handleCancel}
          buttonType={"secondary"}
        >
          Отменить
        </Button>
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
        type={"block"}
        className={styles.modalTitle}
      >
        Добавление категории
      </Title>

      <InputContainer className={styles.inputContainerModal}>
        <InputLabel>Название*</InputLabel>

        <InputField
          placeholder={"Введите название категории"}
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
