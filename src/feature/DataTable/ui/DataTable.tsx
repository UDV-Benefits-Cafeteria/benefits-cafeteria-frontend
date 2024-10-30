import type { FC, ReactNode } from "react";

import { classNames } from "@shared/lib/classNames/classNames";
import { Link, useNavigate } from "react-router-dom";

import { EMPLOYEES } from "@app/providers/AppRouter/AppRouter.config";

import styles from "../styles/DataTable.module.scss";

export type DataTableProps = {
  headers: { data: string; text: string }[];
  needRedirect?: boolean;
  data: {
    id: number;
    [key: string]: ReactNode;
  }[];
};

export const DataTable: FC<DataTableProps> = props => {
  const { headers, data, needRedirect = true } = props;
  const navigate = useNavigate();

  return (
    <table className={styles.table}>
      <thead className={classNames(styles.title)}>
        <tr>
          {headers.map(header => (
            <th key={header.data}>{header.text}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr
            onClick={() => needRedirect && navigate(`${EMPLOYEES}/${row.id}`)}
            className={styles.row}
            key={++index}
          >
            {headers.map(header => (
              <td key={header.data}>{row[header.data]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
