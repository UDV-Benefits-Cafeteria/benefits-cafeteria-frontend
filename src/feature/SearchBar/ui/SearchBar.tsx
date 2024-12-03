import type { FC } from "react";

import { InputContainer } from "@shared/ui/Input/InputContainer";
import { InputField } from "@shared/ui/Input/InputField";

import styles from "../styles/SearchBar.module.scss";

export const SearchBar: FC = ({ setValue, value }) => {
  return (
    <InputContainer>
      <InputField
        icon={"loupe"}
        value={value}
        className={styles.searchBar}
        placeholder={"Поиск"}
        onChange={e => setValue(e.currentTarget.value)}
      />
    </InputContainer>
  );
};
