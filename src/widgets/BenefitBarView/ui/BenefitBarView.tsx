import { type FC, useState } from "react";

import { useGetAllBenefitQuery } from "@entity/Benefit/api/Benefit.api";
import { BenefitCard } from "@entity/Benefit/ui/BenefitCard/BenefitCard";
import { useCreateRequestsMutation } from "@entity/Requests/api/Requests.api";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector/useAppSelector";
import { Button } from "@shared/ui/Button";
import { Modal } from "@shared/ui/Modal";
import { Text } from "@shared/ui/Text";

import styles from "../styles/BenefitBarView.module.scss";

export const BenefitBarView: FC = () => {
  const benefits = useGetAllBenefitQuery(null);
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

  return (
    <>
      <main className={styles.container}>
        {benefits.data?.map(el => (
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
        onClose={() => setIsOpenCreateRequestModal(false)}
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

const CreateRequestModal: FC<TCreateRequestModalProps> = props => {
  const { isOpen, onClose, handleAddRequest, step } = props;

  return (
    <>
      {step === "add" ? (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
        >
          <Text>Вы уверены, что хотите отправить запрос на&nbsp;покупку бенефита?</Text>

          <div className={styles.buttons}>
            <Button onClick={handleAddRequest}>Отправить</Button>

            <Button
              onClick={onClose}
              buttonType={"secondary"}
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
          <Text boldness={"medium"}>
            Запрос на покупку отправлен. Посмотреть статус заявки или отменить запрос можно в личном кабинете.
          </Text>

          <Button
            onClick={onClose}
            buttonType={"secondary"}
          >
            ОК
          </Button>
        </Modal>
      )}
    </>
  );
};
