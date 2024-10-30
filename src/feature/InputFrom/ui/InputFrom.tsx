import { UnknownAction } from "@reduxjs/toolkit";
import { classNames } from "@shared/lib/classNames/classNames";
import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Checkbox } from "@shared/ui/Checkbox";
import { InputContainer } from "@shared/ui/Input/InputContainer";
import { InputErrorText } from "@shared/ui/Input/InputErrorText";
import { InputField } from "@shared/ui/Input/InputField";
import { InputLabel } from "@shared/ui/Input/InputLabel";
import { Selector, TSelectValue } from "@shared/ui/Selector";

import type { TBenefit } from "@entity/Benefit/model/types/Benefit.types";
import type { TUserData } from "@entity/User/model/types/User.types";

import styles from "../styles/InputFrom.module.scss";

export type TInputFromElement<T> = {
  label: string;
  errorText?: string;
  fieldName: keyof T;
  className?: string;
  isRequired?: boolean;
  placeholder?: string;
  disabled?: boolean;
  isShow?: boolean;
  selectOptions?: TSelectValue[];
  addButton?: { text: string; event: () => void };
  type?: "date" | "select" | "text" | "number" | "checkbox";
};

type TInputFrom<T> = {
  action: (value: { field: keyof T; value: T[keyof T] }) => UnknownAction;
  inputs: TInputFromElement<T>[];
  className?: string;
  form: T;
};

function Field<T extends TBenefit | TUserData>({
  form,
  field,
  action,
}: {
  form: T;
  field: TInputFromElement<T>;
  action: (value: { field: keyof T; value: T[keyof T] }) => UnknownAction;
}) {
  const dispatch = useAppDispatch();
  const { type = "text", fieldName } = field;
  const currentValue = form[fieldName];

  const handleChangeForm = (value: T[typeof fieldName]) => {
    dispatch(action({ field: fieldName, value }));
  };

  if (type === "select") {
    return (
      <Selector
        className={field.className}
        setCurrentValue={handleChangeForm as unknown as (value: string) => void}
        currentValue={currentValue as string}
        disabled={field.disabled}
        needEmptyValue={true}
        addButton={field.addButton}
        values={field.selectOptions!}
      />
    );
  }

  if (type === "checkbox") {
    return (
      <Checkbox
        value={!!currentValue}
        onChange={handleChangeForm as unknown as (value: boolean) => void}
        label={field.label}
        className={field.className}
      />
    );
  }

  return (
    <InputField
      type={type}
      isForm={true}
      value={currentValue}
      placeholder={field.placeholder}
      className={field.className}
      onChange={e => handleChangeForm(e.currentTarget.value as T[typeof fieldName])}
      isError={!!field.errorText}
    />
  );
}

export function InputFrom<T extends TBenefit | TUserData>(props: TInputFrom<T>) {
  const { inputs, className, action, form } = props;

  return (
    <div className={classNames(styles.container, className)}>
      {inputs.map(el =>
        el.type === "checkbox" ? (
          <Field<T>
            key={el.fieldName as string}
            field={el}
            form={form}
            action={action}
          />
        ) : (
          <>
            {el.isShow !== undefined && !el.isShow ? null : (
              <InputContainer
                className={el.className}
                key={el.fieldName as string}
              >
                <InputLabel>
                  {el.label}&nbsp;{el.isRequired ? "*" : null}
                </InputLabel>

                <Field<T>
                  field={el}
                  form={form}
                  action={action}
                />

                <InputErrorText isError={!!el.errorText}>{el.errorText}</InputErrorText>
              </InputContainer>
            )}
          </>
        )
      )}
    </div>
  );
}
