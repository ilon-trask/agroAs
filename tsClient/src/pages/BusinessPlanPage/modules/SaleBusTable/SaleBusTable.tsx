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
                    const vegetation = income.vegetationYear?.find(
                      (e) =>
                        e.busProdId == el.id && e.techCartId == el.techCartId
                    );
                    const myYield = income.yieldPlant.find(
                      (e) => e.productId == el.productId
                    );
                    const amount =
                      +(
                        el.area *
                        myYield?.yieldPerHectare! *
                        (vegetation?.allCoeff || 1)
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
                        <Td>{el.year}</Td>
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
                        const vegetation = income.vegetationYear?.find(
                          (e) =>
                            e.busProdId == c.id && e.techCartId == c.techCartId
                        );
                        const myYield = income.yieldPlant.find(
                          (e) => e.productId == c.productId
                        );
                        return +(
                          p +
                            +(
                              +(
                                c.area *
                                  myYield?.yieldPerHectare! *
                                  (vegetation?.allCoeff || 1) || 0
                              ).toFixed(2) * (c.price || 0)
                            ) || 0
                        ).toFixed(2);
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
                      const vegetation = income.vegetationYear?.find(
                        (e) =>
                          e.busProdId == c.id && e.techCartId == c.techCartId
                      );
                      const myYield = income.yieldPlant.find(
                        (e) => e.productId == c.productId
                      );
                      return +(
                        p +
                          +(
                            +(
                              c.area *
                                myYield?.yieldPerHectare! *
                                (vegetation?.allCoeff || 1) || 0
                            ).toFixed(2) * (c.price || 0)
                          ) || 0
                      ).toFixed(2);
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
