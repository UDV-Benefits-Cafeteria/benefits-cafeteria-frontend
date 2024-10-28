import { type FC, type ReactNode, useEffect, useRef } from "react";

import styles from "./Modal.module.scss";

type TModalProps = {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  children: ReactNode;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Modal: FC<TModalProps> = props => {
  const { children, isOpen, onClose } = props;
  const dialogRef = useRef(null);

  useEffect(() => {}, []);

  const handleOutsideClick = event => {
    if (!dialogRef.current.contains(event.target)) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={handleOutsideClick}
          className={styles.backdrop}
        ></div>
      )}

      <dialog
        ref={dialogRef}
        open={isOpen}
        className={styles.modal}
      >
        {children}
      </dialog>
    </>
  );
};
