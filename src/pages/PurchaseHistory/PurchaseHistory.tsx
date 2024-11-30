import type { FC } from "react";

import { Link } from "@shared/ui/Link";
import { Title } from "@shared/ui/Title";
import { BarHeader } from "@widgets/BarHeader/ui/BarHeader";
import { PurchaseHistoryTable } from "@widgets/PurchaseHistoryTable/ui/PurchaseHistoryTable";

import { BENEFITS_BAR } from "@app/providers/AppRouter/AppRouter.config";

import styles from "./PurchaseHistory.module.scss";

export const PurchaseHistory: FC = () => {
  return (
    <>
      <BarHeader />
      <div style={{ maxWidth: 1200, margin: "auto", marginTop: "190px", marginBottom: "100px" }}>
        <Title type={"page"}>
          <Link className={styles.link} route={BENEFITS_BAR}>{"<-"} Вернуться в бар бенефитов</Link>
        </Title>

        <PurchaseHistoryTable />
      </div>
    </>
  );
};
