import type { FC } from "react";

import { useAppSelector } from "@shared/lib/hooks/useAppSelector/useAppSelector";
import { Button } from "@shared/ui/Button";
import { Title } from "@shared/ui/Title";
import { BarHeader } from "@widgets/BarHeader/ui/BarHeader";
import { BenefitBarView } from "@widgets/BenefitBarView/ui/BenefitBarView";
import { useNavigate } from "react-router-dom";

import { EMPLOYEES } from "@app/providers/AppRouter/AppRouter.config";

export const BenefitsBar: FC = () => {
  const navigate = useNavigate();
  const userRole = useAppSelector(state => state.user.data!.role);

  return (
    <>
      <BarHeader />

      <div
        style={{
          margin: "40px auto",
          marginTop: "160px",
          display: "flex",
          justifyContent: "space-between",
          maxWidth: 1200,
        }}
      >
        <Title type={"page"}>Бар бенефитов</Title>

        {userRole !== "employee" ? (
          <Button
            style={{ width: 300 }}
            onClick={() => navigate(EMPLOYEES)}
          >
            Режим управления
          </Button>
        ) : null}
      </div>
      <BenefitBarView />
    </>
  );
};
