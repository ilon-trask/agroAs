import { Button } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import TableComponent from "src/components/TableComponent";
import CreateFinancing from "src/modules/CreateFinancing";
import MyAddIcon from "src/ui/Icons/MyAddIcon";
import MyDeleteIcon from "src/ui/Icons/MyDeleteIcon";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import { resFinancing } from "../../../../../../tRPC serv/controllers/BusinessService";
import { FinancingProps } from "src/modules/CreateFinancing/CreateFinancing";
import { CreditCalculationMethodType } from "src/shared/hook/useCreditCalculationMethod";
import { CreditCalculationTypeType } from "src/shared/hook/useCreditCalculationType";
import { GrantPurposeType } from "src/shared/hook/useGrantPurpose";
import { DerjPurposeType } from "src/shared/hook/useDerjPurpose";
import { InvestmentOriginType } from "src/shared/hook/useInvestmentOrigin";
import { CreditPurposeType } from "src/shared/hook/useCreditPurpose";
import { FinancingType } from "src/shared/hook/useFinancingType";
type props = {
  financing: resFinancing[] | undefined;
  start: number;
  end: number;
  busId: number;
};
function MainFinancingBusinessPlanTable({
  financing,
  end,
  start,
  busId,
}: props) {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [res, setRes] = useState<FinancingProps>();
  const data = (() => {
    const result: any[] = [];
    for (let i = start; i <= end; i++) {
      const fin = financing?.filter((el) => +el.date.split("-")[0] == i) || [];
      fin.forEach((el) =>
        result.push({
          id: el.id,
          year: i,
          typeName:
            el.type == "credit"
              ? "Кредит"
              : el.type == "derj_support"
              ? "Державна підтримка"
              : el.type == "grant"
              ? "Грант"
              : el.type == "investment"
              ? "Інвестиції"
              : null,
          type: el.type,
          name: el.name,
          costBP: el.costBP,
          costHectare: el.costHectare,
          purpose: el.purpose,
          calculationMethod: el.calculationMethod,
          calculationType: el.calculationType,
          cost: el.cost,
          date: el.date,
          isUseCost: el.isUseCost,
          cultureId: el.cultureId,
        })
      );
      result.push({
        isYear: true,
        bold: true,
        year: i,
        costBP: fin.reduce((p, c) => p + (c.costBP || 0), 0),
        costHectare: fin.reduce((p, c) => p + (c.costHectare || 0), 0),
      });
    }
    result.push({
      isAll: true,
      typeName: "ВСЕ РАЗОМ:",
      costBP: financing?.reduce((p, c) => p + (c.costBP || 0), 0),
      costHectare: financing?.reduce((p, c) => p + (c.costHectare || 0), 0),
    });
    return result;
  })();
  const columns = useMemo<
    ColumnDef<{
      id: number;
      year: number;
      type: FinancingType | "";
      typeName: string;
      name: string;
      costBP: number;
      costHectare: number;
      cost: number;
      purpose:
        | CreditPurposeType
        | InvestmentOriginType
        | DerjPurposeType
        | GrantPurposeType
        | "";
      calculationMethod: CreditCalculationMethodType | "";
      calculationType: CreditCalculationTypeType | "";
      isYear?: boolean;
      date: string;
      isUseCost: boolean;
      cultureId?: number;
      isAll?: boolean;
    }>[]
  >(
    () => [
      {
        header: "",
        accessorKey: "date",
        cell: ({ row: { original } }) => (
          <>
            {original.isAll ? (
              <></>
            ) : original.isYear ? (
              <MyAddIcon
                onClick={() => {
                  setOpen(true);
                  setRes({
                    calculationMethod: "",
                    cost: 0,
                    date: original.year + "-01-01",
                    enterpriseId: undefined,
                    isUseCost: false,
                    name: "",
                    purpose: "",
                    type: "",
                    cultureId: "",
                  });
                }}
              />
            ) : (
              <MyEditIcon
                onClick={() => {
                  setOpen(true);
                  setUpdate(true);
                  setRes({
                    id: original.id,
                    calculationMethod: original.calculationMethod,
                    cost: original.cost,
                    date: original.date,
                    enterpriseId: undefined,
                    isUseCost: original.isUseCost,
                    name: original.name,
                    purpose: original.purpose,
                    type: original.type,
                    cultureId: original.cultureId,
                  });
                }}
              />
            )}
          </>
        ),
      },
      { header: "Рік", accessorKey: "year" },
      { header: "Тип", accessorKey: "typeName" },
      { header: "Назва", accessorKey: "name" },
      {
        header: "Сума на БП",
        accessorFn: (row) => row.costBP || 0,
      },
      { header: "Призначення", accessorKey: "purpose" },
      { header: "Метод розрахунку", accessorKey: "calculationMethod" },
      {
        header: "Сума на гектар",
        accessorFn: (row) => row.costHectare?.toFixed(2) || 0,
      },
      {
        header: "Графік",
        accessorKey: "id",
        cell: ({ row: { original } }) => (
          <>
            {original.isAll ? (
              <></>
            ) : (
              !original.isYear && <Button size={"sm"}>Додати</Button>
            )}
          </>
        ),
      },
      {
        header: "",
        accessorKey: "isYear",
        cell: ({ row: { original } }) => (
          <>{original.isAll ? <></> : !original.isYear && <MyDeleteIcon />}</>
        ),
      },
    ],
    []
  );

  return (
    <>
      <TableComponent columns={columns} data={data} />
      {open && res && (
        <CreateFinancing
          busId={busId}
          open={open}
          setOpen={setOpen}
          data={res}
          setUpdate={setUpdate}
          update={update}
        />
      )}
    </>
  );
}

export default MainFinancingBusinessPlanTable;