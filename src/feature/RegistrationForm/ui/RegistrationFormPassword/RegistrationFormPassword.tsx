import { type FC } from "react";

import { Button } from "@shared/ui/Button";
import { FormContainer } from "@shared/ui/Form/FormContainer";
import { FormFooter } from "@shared/ui/Form/FormFooter";
import { FormInputContainer } from "@shared/ui/Form/FormInputContainer";
import { InputContainer } from "@shared/ui/Input/InputContainer";
import { InputErrorText } from "@shared/ui/Input/InputErrorText";
import { InputField } from "@shared/ui/Input/InputField";
import { Link } from "@shared/ui/Link";
import { Text } from "@shared/ui/Text";
import { Title } from "@shared/ui/Title";

type TRegistrationFormProps = {
  saveEmail: () => void;
  handleChangeEmail: (email: string) => void;
  isError: boolean;
};

export const RegistrationFormPassword: FC<TRegistrationFormProps> = props => {
  const { saveEmail, handleChangeEmail, isError } = props;

  return (
    <FormContainer>
      <Title
        type={"page"}
        boldness={"normal"}
      >
        Регистрация
      </Title>

      <FormInputContainer>
        <InputContainer>
          <InputField
            placeholder={"Пароль"}
            icon={"mail"}
            onChange={e => handleChangeEmail(e.currentTarget.value)}
          />

          <InputErrorText isError={isError}>В пароле должно быть...</InputErrorText>
        </InputContainer>

        <InputContainer>
          <InputField
            placeholder={"Повторите пароль"}
            icon={"mail"}
            onChange={e => handleChangeEmail(e.currentTarget.value)}
          />

          <InputErrorText isError={isError}>Пароли не совпадают</InputErrorText>
        </InputContainer>
      </FormInputContainer>

      <Button onClick={saveEmail}>Зарегистрироваться</Button>

      <FormFooter>
        <Text boldness={"medium"}>Уже есть аккаунт?</Text>

        <Text boldness={"medium"}>
          <Link route={""}>Войти</Link>
        </Text>
      </FormFooter>
    </FormContainer>
  );
};
