import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useContext } from "react";
import getYearFromString from "src/shared/funcs/getYearFromString";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import MyDeleteIcon from "src/ui/Icons/MyDeleteIcon";
import MyHeading from "src/ui/MyHeading";
import MyTableContainer from "src/ui/MyTableContainer";
import { resBusinessPlan } from "../../../../../../tRPC serv/controllers/BusinessService";
import { Context } from "src/main";

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
              <Th></Th>
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
                        e.yieldPlantId == el.yield?.id &&
                        e.year.split("")[0] == i - start
                    );
                    return (
                      <Tr key={el.id}>
                        <Td>
                          <MyEditIcon onClick={() => {}} />
                        </Td>
                        <Td>{el.year}</Td>
                        <Td>{el.product?.name}</Td>
                        <Td>
                          {el.area *
                            el.yield?.yieldPerHectare! *
                            vegetation?.allCoeff!}
                        </Td>
                        <Td></Td>
                        <Td></Td>
                        <Td>
                          <Button size="sm">Додати</Button>
                        </Td>
                        <Td>
                          <MyDeleteIcon />
                        </Td>
                      </Tr>
                    );
                  })
                );
                res.push(
                  <Tr key={i} fontWeight={"bold"}>
                    <Td></Td>
                    <Td>{i}</Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                  </Tr>
                );
              }
              return res;
            })()}
          </Tbody>
        </Table>
      </MyTableContainer>
    </>
  );
}

export default SaleBusTable;
