import { FC, useState } from "react";

import { classNames } from "@shared/lib/classNames/classNames";
import { Icon } from "@shared/ui/Icons/Icon";

import styles from "./Input.module.scss";
import icons from "./InputIcons.module.scss";

type TInputProps = {
  placeholder?: string;
  canHide?: boolean;
  icon?: keyof typeof icons;
  isError?: boolean;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const InputField: FC<TInputProps> = props => {
  const { className, placeholder, icon, isError, canHide } = props;
  const [visible, setVisible] = useState(false);

  return (
    <span className={classNames(canHide ? styles.can_hide : null)}>
      <input
        {...props}
        placeholder={placeholder}
        className={classNames(
          styles.input,
          icon ? icons[icon] : null,
          icon ? styles.with_icon : null,
          isError ? styles.error : null,
          className
        )}
        {...(canHide ? { type: visible ? "text" : "password" } : null)}
      />

      {canHide ? (
        <Icon
          size={"l"}
          className={styles.hide_button}
          icon={visible ? "visible" : "non-visible"}
          onClick={() => setVisible(!visible)}
        />
      ) : null}
    </span>
  );
};
