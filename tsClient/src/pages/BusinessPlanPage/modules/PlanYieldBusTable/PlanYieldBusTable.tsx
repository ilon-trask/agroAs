import {
  AccordionItem,
  AccordionPanel,
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "src/main";
import BusHeading from "src/ui/BusHeading";
import MyViewIcon from "src/ui/Icons/MyViewIcon";
import MyAccordionButton from "src/ui/MyAccordionButton";
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
    <AccordionItem>
      <MyAccordionButton>
        <BusHeading>Планування урожайності</BusHeading>
      </MyAccordionButton>
      <AccordionPanel>
        <MyTableContainer>
          <Table size={"sm"}>
            <Thead>
              <Tr>
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
                  <br /> з рослини
                </Th>
                <Th>
                  Потенційна <br />
                  урожайність 1(га)
                </Th>
                <Th>
                  Узагальнюючий
                  <br /> коефіцієнт
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
                        const vegetationYear = el.vegetationYear;
                        console.log("vegetationYear");
                        console.log(vegetationYear);

                        return (
                          <Tr key={el.id}>
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
                            <Td>{vegetationYear?.numberPlantsPerHectare}</Td>
                            <Td>{vegetationYear?.numberPerRoll}</Td>
                            <Td>{vegetationYear?.potentialYieldPerHectare}</Td>
                            <Td>{vegetationYear?.allCoeff}</Td>
                            <Td>
                              <Button size="sm">Додати</Button>
                            </Td>
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
      </AccordionPanel>
    </AccordionItem>
  );
}

export default React.memo(PlanYieldBusTable);
