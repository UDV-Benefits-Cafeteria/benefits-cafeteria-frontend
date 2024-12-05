import type { FC } from "react";

import { classNames } from "@shared/lib/classNames/classNames";

import styles from "./Checkbox.module.scss";

type TCheckbox = {
    radio?: boolean;
    className?: string;
    label?: string;
    onChange: (checked: boolean) => void;
    value: boolean;
    disabled?: boolean;
    indeterminate?: boolean;
    switcher?: boolean;  // Добавлен новый тип switcher
};

export const Checkbox: FC<TCheckbox> = props => {
    const { className, label, value, onChange, radio, disabled, indeterminate, switcher } = props;

    return (
        <label
            className={classNames(
                className,
                styles.container,
                radio ? styles.radio : styles.checkbox,
                switcher && styles.switcher
            )}
        >
            <input
                type={radio ? "radio" : "checkbox"}
                checked={value}
                onChange={() => onChange(!value)}
                disabled={disabled}
                ref={input => {
                    if (input && indeterminate) {
                        input.indeterminate = true;
                    }
                }}
            />
            <div className={styles.visualWrapper}>
                <svg className={styles.checkIcon} viewBox="-2 -2 35 35" aria-hidden="true">
                    <title>{radio ? "radio-circle" : "checkmark-circle"}</title>
                    <polyline className={switcher ? styles.polyline : null} points="7.57 15.87 12.62 21.07 23.43 9.93" />
                </svg>
            </div>
            {label && <div className={styles.label}>{label}</div>}
        </label>
    );
};
