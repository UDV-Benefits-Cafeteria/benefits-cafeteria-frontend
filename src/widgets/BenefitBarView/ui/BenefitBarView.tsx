import type { FC } from "react";

import { useGetAllBenefitQuery } from "@entity/Benefit/api/Benefit.api";
import { BenefitCard } from "@entity/Benefit/ui/BenefitCard/BenefitCard";

import styles from "../styles/BenefitBarView.module.scss";

export const BenefitBarView: FC = () => {
  const benefits = useGetAllBenefitQuery(null);

  return <main className={styles.container}>{benefits.data?.map(el => <BenefitCard benefit={el} />)}</main>;
};
