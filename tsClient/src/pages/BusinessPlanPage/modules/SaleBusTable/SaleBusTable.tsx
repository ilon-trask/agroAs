import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import getYearFromString from "src/shared/funcs/getYearFromString";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import MyDeleteIcon from "src/ui/Icons/MyDeleteIcon";
import MyHeading from "src/ui/MyHeading";
import MyTableContainer from "src/ui/MyTableContainer";
import {
  resBusinessPlan,
  resBusProd,
} from "../../../../../../tRPC serv/controllers/BusinessService";
import { Context } from "src/main";
import PatchBusProdPrice from "./models/PatchBusProdPrice";

function SaleBusTable({
  end,
  myBusiness,
  start,
}: {
  myBusiness: resBusinessPlan;
  end: number;
  start: number;
}) {
  const { income } = useContext(Context);
  const [open, setOpen] = useState(false);
  //@ts-ignore
  const [data, setData] = useState<resBusProd>({});
  return (
    <>
      <MyHeading>Збут</MyHeading>
      <MyTableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Рік</Th>
              <Th>Продукт</Th>
              <Th>Обсяг</Th>
              <Th>Ціна</Th>
              <Th>Сума</Th>
              <Th>Графіки</Th>
            </Tr>
          </Thead>
          <Tbody>
            {(() => {
              const res = [];
              for (let i = start; i <= end; i++) {
                const busProds = myBusiness.busProds.filter(
                  (el) => el.year == i - start
                );

                res.push(
                  busProds.map((el) => {
                    const vegetationYear = el.vegetationYear;
                    const amount =
                      +(
                        (vegetationYear?.potentialYieldPerHectare || 0) *
                        (vegetationYear?.allCoeff || 0) *
                        el.area
                      ).toFixed(2) || 0;
                    return (
                      <Tr key={el.id}>
                        <Td>
                          <MyEditIcon
                            onClick={() => {
                              setOpen(true);
                              setData(el);
                            }}
                          />
                        </Td>
                        <Td>{i}</Td>
                        <Td>{el.product?.name}</Td>
                        <Td>{amount}</Td>
                        <Td>{el.price || 0}</Td>
                        <Td>{(amount * (el.price || 0)).toFixed(2)}</Td>
                        <Td>
                          <Button size="sm">Додати</Button>
                        </Td>
                      </Tr>
                    );
                  })
                );
                res.push(
                  <Tr key={i} fontWeight={"bold"}>
                    <Td></Td>
                    <Td>{i}</Td>
                    <Td>Разом:</Td>
                    <Td></Td>
                    <Td></Td>
                    <Td>
                      {busProds.reduce((p, c) => {
                        const vegetationYear = c.vegetationYear;
                        const amount =
                          +(
                            (vegetationYear?.potentialYieldPerHectare || 0) *
                            (vegetationYear?.allCoeff || 0) *
                            c.area
                          ).toFixed(2) || 0;
                        return +(p + +(amount * (c.price || 0)).toFixed(2));
                      }, 0) || 0}
                    </Td>
                    <Td></Td>
                  </Tr>
                );
              }
              res.push(
                <Tr key={end + 1} fontWeight={"bold"}>
                  <Td></Td>
                  <Td colSpan={2}>ВСЕ РАЗОМ:</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td>
                    {myBusiness.busProds.reduce((p, c) => {
                      const vegetationYear = c.vegetationYear;
                      const amount =
                        +(
                          (vegetationYear?.potentialYieldPerHectare || 0) *
                          (vegetationYear?.allCoeff || 0) *
                          c.area
                        ).toFixed(2) || 0;
                      return +p + +(amount * (c.price || 0)).toFixed(2);
                    }, 0) || 0}
                  </Td>
                </Tr>
              );
              return res;
            })()}
          </Tbody>
        </Table>
      </MyTableContainer>
      {open && (
        <PatchBusProdPrice open={open} setOpen={setOpen} busProd={data} />
      )}
    </>
  );
}

export default SaleBusTable;
