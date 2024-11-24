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
  value?: string | null | number;
  type?: "date" | "text" | "number" | "file";
  disabled?: boolean;
  isForm?: boolean;
  accept?: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const InputField: FC<TInputProps> = props => {
  const { className, placeholder, icon, isError, canHide, type = "text", isForm, accept, disabled, value } = props;
  const [visible, setVisible] = useState(false);

  return (
    <>
      {type !== "file" ? (
        <span className={classNames(canHide ? styles.can_hide : null)}>
          <input
            {...props}
            type={type}
            value={value ?? ""}
            placeholder={placeholder}
            className={classNames(
              styles.input,
              icon ? icons[icon] : null,
              icon ? styles.with_icon : null,
              isError ? styles.error : null,
              isForm ? styles.form : null,
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
      ) : (
        <>
          <label
            htmlFor={"input-file"}
            className={classNames(styles.file, disabled ? styles.disabled : null, className)}
          >
            {placeholder}
          </label>
          <input
            {...props}
            disabled={disabled}
            accept={accept}
            id={"input-file"}
            type={"file"}
            style={{ opacity: 0, position: "absolute" }}
          />
        </>
      )}
    </>
  );
};
