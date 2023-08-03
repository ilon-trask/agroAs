import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import React, { useContext, useMemo, useState } from "react";
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
import getYearFromString from "src/shared/funcs/getYearFromString";
import DeleteAlert, { DeleteProps } from "src/components/DeleteAlert";
import { deleteFinancingForBusiness } from "src/http/requests";
import { Context } from "src/main";
import CreditParameterDialog, {
  CreditParameterProps,
} from "./CreditParameterDialog";
import MyTableContainer from "src/ui/MyTableContainer";
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
  const [deleteData, setDeleteData] = useState<DeleteProps>({
    func: () => {},
    isOpen: false,
    text: "фінансування",
  });
  const [parameterOpen, setParameterOpen] = useState(false);
  const [parameterData, setParameterData] = useState<
    CreditParameterProps | undefined
  >();
  const { business } = useContext(Context);
  // const data = (() => {
  //   const result: any[] = [];
  //   for (let i = start; i <= end; i++) {
  //     const fin = financing?.filter((el) => el.year == i - start) || [];
  //     fin.forEach((el) =>
  //       result.push({
  //         id: el.id,
  //         year: i,
  //         typeName: el.typeName,
  //         type: el.type,
  //         name: el.name,
  //         costBP: el.costBP,
  //         costHectare: el.costHectare,
  //         purpose: el.purpose,
  //         calculationMethod: el.calculationMethod,
  //         calculationType: el.calculationType,
  //         cost: el.cost,
  //         date: el.date,
  //         isUseCost: el.isUseCost,
  //         cultureId: el.cultureId,
  //         month: el.month,
  //       })
  //     );
  //     result.push({
  //       isYear: true,
  //       bold: true,
  //       year: i,
  //       costBP: fin.reduce((p, c) => p + (c.costBP || 0), 0),
  //       costHectare: fin.reduce((p, c) => p + (c.costHectare || 0), 0),
  //     });
  //   }
  //   result.push({
  //     bold: true,
  //     isAll: true,
  //     typeName: "ВСЕ РАЗОМ:",
  //     costBP: financing?.reduce((p, c) => p + (c.costBP || 0), 0),
  //     costHectare: financing?.reduce((p, c) => p + (c.costHectare || 0), 0),
  //   });
  //   return result;
  // })();
  // const columns = useMemo<
  //   ColumnDef<{
  //     id: number;
  //     year: number;
  //     type: FinancingType | "";
  //     typeName: string;
  //     name: string;
  //     costBP: number;
  //     costHectare: number;
  //     cost: number;
  //     purpose:
  //       | CreditPurposeType
  //       | InvestmentOriginType
  //       | DerjPurposeType
  //       | GrantPurposeType
  //       | "";
  //     calculationMethod: CreditCalculationMethodType | "";
  //     calculationType: CreditCalculationTypeType | "";
  //     isYear?: boolean;
  //     date: string;
  //     isUseCost: boolean;
  //     cultureId?: number;
  //     isAll?: boolean;
  //     month: number;
  //   }>[]
  // >(
  //   () => [
  //     {
  //       header: "",
  //       accessorKey: "date",
  //       cell: ({ row: { original } }) => (
  //         <>
  //           {original.isAll || original.name == "Початкові інвестиції" ? (
  //             <></>
  //           ) : original.isYear ? (
  //             <MyAddIcon
  //               onClick={() => {
  //                 setOpen(true);
  //                 setRes({
  //                   calculationMethod: "",
  //                   cost: "",
  //                   date: original.year + "-01-01",
  //                   enterpriseId: undefined,
  //                   isUseCost: false,
  //                   name: "",
  //                   purpose: "",
  //                   type: "",
  //                   cultureId: "",
  //                   month: "",
  //                   year: original.year - start,
  //                 });
  //               }}
  //             />
  //           ) : (
  //             <MyEditIcon
  //               onClick={() => {
  //                 setOpen(true);
  //                 setUpdate(true);
  //                 setRes({
  //                   id: original.id,
  //                   calculationMethod: original.calculationMethod,
  //                   cost: original.cost,
  //                   date: original.date,
  //                   enterpriseId: undefined,
  //                   isUseCost: original.isUseCost,
  //                   name: original.name,
  //                   purpose: original.purpose,
  //                   type: original.type,
  //                   cultureId: original.cultureId,
  //                   month: original.month,
  //                   year: original.year - start,
  //                 });
  //               }}
  //             />
  //           )}
  //         </>
  //       ),
  //     },
  //     { header: "Рік", accessorKey: "year" },
  //     { header: "Тип", accessorKey: "typeName" },
  //     { header: "Назва", accessorKey: "name" },
  //     {
  //       header: "Сума на БП",
  //       accessorFn: (row) => row.costBP || 0,
  //     },
  //     { header: "Призначення", accessorKey: "purpose" },
  //     { header: "Метод розрахунку", accessorKey: "calculationMethod" },
  //     {
  //       header: "Сума на гектар",
  //       accessorFn: (row) => row.costHectare?.toFixed(2) || 0,
  //     },
  //     {
  //       header: "Графік",
  //       accessorKey: "id",
  //       cell: ({ row: { original } }) => (
  //         <>
  //           {original.isAll ? (
  //             <></>
  //           ) : (
  //             !original.isYear && (
  //               <Button
  //                 size={"sm"}
  //                 onClick={() => {
  //                   if (original.type == "credit") {
  //                     setParameterOpen(true);
  //                     setParameterData({
  //                       amount: original.costBP,
  //                       commissionForCredit: 0,
  //                       creditTerm: end - original.year,
  //                       monthlyСommission: 0,
  //                       paymentsFrequency: "",
  //                       procent: 0,
  //                       repaymentMethod: "",
  //                       id: original.id,
  //                       year: original.year,
  //                       month: original.month,
  //                     });
  //                   }
  //                 }}
  //               >
  //                 Додати
  //               </Button>
  //             )
  //           )}
  //         </>
  //       ),
  //     },
  //     {
  //       header: "",
  //       accessorKey: "isYear",
  //       cell: ({ row: { original } }) => (
  //         <>
  //           {original.isAll || original.name == "Початкові інвестиції" ? (
  //             <></>
  //           ) : (
  //             !original.isYear && (
  //               <MyDeleteIcon
  //                 onClick={() => {
  //                   setDeleteData({
  //                     func: () => {
  //                       setDeleteData((prev) => ({ ...prev, isOpen: false }));
  //                       deleteFinancingForBusiness(business, {
  //                         busId,
  //                         id: original.id!,
  //                       });
  //                     },
  //                     isOpen: true,
  //                     text: "фінансування",
  //                   });
  //                 }}
  //               />
  //             )
  //           )}
  //         </>
  //       ),
  //     },
  //   ],
  //   []
  // );

  return (
    <>
      {/* <TableComponent columns={columns} data={data} /> */}
      <MyTableContainer>
        <Table size={"sm"} whiteSpace={"pre-wrap"}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Рік</Th>
              <Th>Тип</Th>
              <Th>Назва</Th>
              <Th>Сума на БП</Th>
              <Th>Призначення</Th>
              <Th>Метод розрахунку</Th>
              <Th>Сума на гектар</Th>
              <Th>Графік</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {(() => {
              const res: any[] = [];
              for (let i = start; i <= end; i++) {
                const fin =
                  financing?.filter((el) => el.year == i - start) || [];
                fin.forEach((el) =>
                  res.push(
                    <Tr key={el.id!}>
                      <Td>
                        {el.name == "Початкові інвестиції" ? (
                          <></>
                        ) : (
                          <MyEditIcon
                            onClick={() => {
                              setOpen(true);
                              setUpdate(true);
                              setRes({
                                id: el.id,
                                calculationMethod: el.calculationMethod,
                                cost: el.cost,
                                date: el.date,
                                enterpriseId: undefined,
                                isUseCost: el.isUseCost,
                                name: el.name,
                                purpose: el.purpose,
                                type: el.type,
                                cultureId: el.cultureId,
                                month: el.month!,
                                year: el.year - start,
                              });
                            }}
                          />
                        )}
                      </Td>
                      <Td>{i}</Td>
                      <Td>{el.typeName}</Td>
                      <Td>{el.name}</Td>
                      <Td>{el.costBP || 0}</Td>
                      <Td>{el.purpose}</Td>
                      <Td>{el.calculationMethod}</Td>
                      <Td>{el.costHectare?.toFixed(2) || 0}</Td>
                      <Td>
                        <Button
                          size={"sm"}
                          onClick={() => {
                            if (el.type == "credit") {
                              setParameterOpen(true);
                              setParameterData({
                                amount: el.costBP!,
                                commissionForCredit:
                                  el.creditParameter?.commissionForCredit || 0,
                                creditTerm: end - i,
                                monthlyСommission:
                                  el.creditParameter?.monthlyСommission || 0,
                                paymentsFrequency:
                                  el.creditParameter?.paymentsFrequency || "",
                                procent: el.creditParameter?.procent || 0,
                                repaymentMethod:
                                  el.creditParameter?.repaymentMethod || "",
                                id: el.id,
                                year: el.year,
                                month: el.month!,
                              });
                            }
                          }}
                        >
                          Додати
                        </Button>
                      </Td>
                      <Td>
                        {el.name == "Початкові інвестиції" ? (
                          <></>
                        ) : (
                          <MyDeleteIcon
                            onClick={() => {
                              setDeleteData({
                                func: () => {
                                  setDeleteData((prev) => ({
                                    ...prev,
                                    isOpen: false,
                                  }));
                                  deleteFinancingForBusiness(business, {
                                    busId,
                                    id: el.id!,
                                  });
                                },
                                isOpen: true,
                                text: "фінансування",
                              });
                            }}
                          />
                        )}
                      </Td>
                    </Tr>
                  )
                );
                res.push(
                  <Tr key={i} fontWeight={"bold"}>
                    <Td>
                      <MyAddIcon
                        onClick={() => {
                          setOpen(true);
                          setRes({
                            calculationMethod: "",
                            cost: "",
                            date: i + "-01-01",
                            enterpriseId: undefined,
                            isUseCost: false,
                            name: "",
                            purpose: "",
                            type: "",
                            cultureId: "",
                            month: "",
                            year: i - start,
                          });
                        }}
                      />
                    </Td>
                    <Td>{i}</Td>
                    <Td></Td>
                    <Td></Td>
                    <Td>{fin.reduce((p, c) => p + (c.costBP || 0), 0)}</Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td>{fin.reduce((p, c) => p + (c.costHectare || 0), 0)}</Td>
                    <Td></Td>
                    <Td></Td>
                  </Tr>
                );
              }
              res.push(
                <Tr key={"all"} fontWeight={"bold"}>
                  <Td></Td>
                  <Td colSpan={2}>ВСЕ РАЗОМ:</Td>

                  <Td></Td>
                  <Td>{financing?.reduce((p, c) => p + (c.costBP || 0), 0)}</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td>
                    {financing?.reduce((p, c) => p + (c.costHectare || 0), 0)}
                  </Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
              );
              return res;
            })()}
          </Tbody>
        </Table>
      </MyTableContainer>
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
      {deleteData.isOpen ? (
        <DeleteAlert
          func={deleteData.func}
          isOpen={deleteData.isOpen}
          setOpen={setDeleteData}
          text={deleteData.text}
        />
      ) : null}
      {parameterOpen && parameterData ? (
        <CreditParameterDialog
          open={parameterOpen}
          setOpen={setParameterOpen}
          data={parameterData}
          busId={busId}
        />
      ) : null}
    </>
  );
}

export default MainFinancingBusinessPlanTable;
