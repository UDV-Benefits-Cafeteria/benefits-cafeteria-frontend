import { type FC, useState } from "react";

import { BenefitCard } from "@entity/Benefit/ui/BenefitCard/BenefitCard";
import { useCreateRequestsMutation } from "@entity/Requests/api/Requests.api";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector/useAppSelector";
import { Button } from "@shared/ui/Button";
import { Modal } from "@shared/ui/Modal";
import { Text } from "@shared/ui/Text";

import type { TBenefitData } from "@entity/Benefit/model/types/Benefit.types";

import styles from "../styles/BenefitBarView.module.scss";

export const BenefitBarView: FC<{ benefits: TBenefitData[] }> = ({ benefits }) => {
  const [isOpenCreateRequestModal, setIsOpenCreateRequestModal] = useState(false);
  const user = useAppSelector(state => state.user);
  const [addStep, setAddStep] = useState<"add" | "success">("add");
  const [currentBenefit, setCurrentBenefit] = useState(-1);
  const [createRequest] = useCreateRequestsMutation();

  const handleAddRequestResp = async () => {
    const res = await createRequest({
      benefit_id: currentBenefit,
      user_id: user.data!.id,
      status: "pending",
    });

    if (res.data) {
      setAddStep("success");
    }
  };

  const handleAddRequest = (id: number) => {
    setIsOpenCreateRequestModal(true);
    setCurrentBenefit(id);
  };

  const handleClose = () => {
    setIsOpenCreateRequestModal(false);
    setAddStep("add");
  };

  return (
    <>
      <main className={styles.container}>
        {benefits?.map(el => (
          <BenefitCard
            benefit={el}
            key={el.id}
            addRequest={id => handleAddRequest(id)}
          />
        ))}
      </main>

      <CreateRequestModal
        isOpen={isOpenCreateRequestModal}
        step={addStep}
        onClose={handleClose}
        handleAddRequest={handleAddRequestResp}
      />
    </>
  );
};

type TCreateRequestModalProps = {
  isOpen: boolean;
  onClose: () => void;
  step: "add" | "success";
  handleAddRequest: () => void;
};

export const CreateRequestModal: FC<TCreateRequestModalProps> = props => {
  const { isOpen, onClose, handleAddRequest, step } = props;

  return (
    <>
      {step === "add" ? (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
        >
          <Text
            boldness={"medium"}
            className={styles.confirmText}
          >
            Вы уверены, что хотите отправить запрос на&nbsp;покупку бенефита?
          </Text>

          <div className={styles.buttons}>
            <Button
              onClick={handleAddRequest}
              className={styles.btn}
            >
              Отправить
            </Button>

            <Button
              onClick={onClose}
              buttonType={"secondary"}
              className={styles.btn}
            >
              Отмена
            </Button>
          </div>
        </Modal>
      ) : (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
        >
          <Text
            boldness={"medium"}
            className={styles.confirmText}
          >
            Запрос на покупку отправлен.
            <br />
            Посмотреть статус заявки или отменить запрос можно в личном кабинете.
          </Text>
          <div className={styles.buttons}>
            <Button
              onClick={onClose}
              className={styles.btn}
            >
              ОК
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};
