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

import styles from "../../styles/RegistrationForm.module.scss";

type TRegistrationFormProps = {
  saveEmail: () => void;
  handleChangeEmail: (email: string) => void;
  error: string;
};

export const RegistrationFormEmail: FC<TRegistrationFormProps> = props => {
  const { saveEmail, handleChangeEmail, error } = props;

  return (
    <FormContainer>
      <Title
        type={"page"}
        boldness={"normal"}
      >
        Регистрация
      </Title>

      <FormInputContainer>
        <Text
          className={styles.description}
          type={"description"}
        >
          Для регистрации необходима почта, на&nbsp;которую поступило приглашение.
        </Text>

        <InputContainer>
          <InputField
            placeholder={"Почта"}
            icon={"mail"}
            isError={!!error}
            onChange={e => handleChangeEmail(e.currentTarget.value)}
          />

          <InputErrorText isError={!!error}>{error}</InputErrorText>
        </InputContainer>
      </FormInputContainer>

      <Button onClick={saveEmail}>Продолжить</Button>

      <FormFooter>
        <Text boldness={"medium"}>Уже есть аккаунт?</Text>

        <Text boldness={"medium"}>
          <Link route={""}>Войти</Link>
        </Text>
      </FormFooter>
    </FormContainer>
  );
};
