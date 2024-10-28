import { FC } from "react";

import { classNames } from "@shared/lib/classNames/classNames";
import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector/useAppSelector";
import { Checkbox } from "@shared/ui/Checkbox";
import { InputContainer } from "@shared/ui/Input/InputContainer";
import { InputErrorText } from "@shared/ui/Input/InputErrorText";
import { InputField } from "@shared/ui/Input/InputField";
import { InputLabel } from "@shared/ui/Input/InputLabel";
import { Selector, TSelectValue } from "@shared/ui/Selector";
import { CreateEmployeeFormActions } from "@widgets/CreateEmployeeForm/model/slice/CreateEmployeeForm.slice";

import type { TUserData } from "@entity/User/model/types/User.types";

import styles from "../styles/InputFrom.module.scss";

export type TInputFromElement = {
  label: string;
  errorText?: string;
  fieldName: keyof TUserData;
  className?: string;
  isRequired?: boolean;
  placeholder?: string;
  disabled?: boolean;
  selectOptions?: TSelectValue[];
  addButton?: { text: string; event: () => void };
  type?: "date" | "select" | "text" | "number" | "checkbox";
};

type TInputFrom = {
  inputs: TInputFromElement[];
  className?: string;
};

const Field: FC<TInputFromElement> = field => {
  const { type = "text", fieldName } = field;
  const form = useAppSelector(state => state.createEmployeeForm);
  const currentValue = form[fieldName];
  const dispatch = useAppDispatch();

  const handleChangeForm = (value: TUserData[typeof fieldName]) => {
    dispatch(CreateEmployeeFormActions.setUserData({ field: fieldName, value }));
  };

  if (type === "select") {
    return (
      <Selector
        className={field.className}
        setCurrentValue={handleChangeForm}
        currentValue={currentValue}
        disabled={field.disabled}
        needEmptyValue={true}
        addButton={field.addButton}
        placeholder={field.placeholder}
        values={field.selectOptions!}
      />
    );
  }

  if (type === "checkbox") {
    return (
      <Checkbox
        value={!!currentValue}
        onChange={handleChangeForm}
        label={field.label}
        className={field.className}
      />
    );
  }

  return (
    <InputField
      type={type}
      isForm={true}
      placeholder={field.placeholder}
      className={field.className}
      onChange={e => handleChangeForm(e.currentTarget.value)}
      isError={!!field.errorText}
    />
  );
};

export const InputFrom: FC<TInputFrom> = props => {
  const { inputs, className } = props;

  return (
    <div className={classNames(styles.container, className)}>
      {inputs.map(el =>
        el.type === "checkbox" ? (
          <Field {...el} />
        ) : (
          <InputContainer key={el.fieldName}>
            <InputLabel>
              {el.label}&nbsp;{el.isRequired ? "*" : null}
            </InputLabel>

            <Field {...el} />

            <InputErrorText isError={!!el.errorText}>{el.errorText}</InputErrorText>
          </InputContainer>
        )
      )}
    </div>
  );
};
