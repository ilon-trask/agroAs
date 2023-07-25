import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "src/main";
import MyViewIcon from "src/ui/Icons/MyViewIcon";
import MyHeading from "src/ui/MyHeading";
import MyTableContainer from "src/ui/MyTableContainer";
import { YIELD_CALC_ROUTER } from "src/utils/consts";
import { resBusinessPlan } from "../../../../../../tRPC serv/controllers/BusinessService";

function PlanYieldBusTable({
  myBusiness,
  end,
  start,
}: {
  myBusiness: resBusinessPlan;
  end: number;
  start: number;
}) {
  const { income } = useContext(Context);
  return (
    <>
      <MyHeading>Планування урожайності (Потенційної)</MyHeading>
      <MyTableContainer>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Рік</Th>
              <Th>Культура</Th>
              <Th>Продукти</Th>
              <Th>Технологія</Th>
              <Th>
                Густота <br />
                насаджень
              </Th>
              <Th>
                Урожайність
                <br /> з гектару
              </Th>
              <Th>
                Урожайність
                <br /> з рослини
              </Th>
              <Th>
                Строк <br />
                посадки
              </Th>
              <Th>Налаштування</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {(() => {
              const res = [];
              for (let i = start; i <= end; i++) {
                res.push(
                  myBusiness?.busProds
                    .filter((el) => el.year == i - start)
                    .map((el) => {
                      const myYield = income.yieldPlant.find(
                        (e) => e.productId == el.productId
                      );
                      return (
                        <Tr key={el.id}>
                          <Td></Td>
                          <Td>{i}</Td>
                          <Td>
                            <Link
                              to={
                                YIELD_CALC_ROUTER +
                                "/" +
                                myBusiness.id +
                                "/" +
                                el.id
                              }
                            >
                              <MyViewIcon /> {el.product?.culture?.name}
                            </Link>
                          </Td>
                          <Td>{el.product?.name}</Td>
                          <Td>{el.cultivationTechnology?.name}</Td>
                          <Td>{myYield?.plantingDensity}</Td>
                          <Td>{myYield?.yieldPerHectare}</Td>
                          <Td>{myYield?.yieldPerRoll}</Td>
                        </Tr>
                      );
                    })
                );
                res.push(
                  <Tr key={i} fontWeight="bold">
                    <Td></Td>
                    <Td>{i}</Td>
                    <Td>Разом:</Td>
                  </Tr>
                );
              }
              res.push(
                <Tr key={end + 1} fontWeight={"bold"}>
                  <Td></Td>
                  <Td>ВСЕ РАЗОМ:</Td>
                  <Td></Td>
                </Tr>
              );
              return res;
            })()}
          </Tbody>
        </Table>
      </MyTableContainer>
    </>
  );
}

export default PlanYieldBusTable;
