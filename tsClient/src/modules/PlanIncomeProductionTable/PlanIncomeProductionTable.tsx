import { EditIcon } from "@chakra-ui/icons";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../../main";

function PlanIncomeProductionTable() {
  const { income, map } = useContext(Context);
  return (
    <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Продукт або послуга</Th>
            <Th>
              Планова <br />
              урожайність (т/га)
            </Th>
            <Th>Площа (га)</Th>
            <Th>
              Планове <br />
              виробництво (т)
            </Th>
            <Th>
              Собівартість <br />
              грн/т
            </Th>
            <Th>Сума грн</Th>
          </Tr>
        </Thead>
        <Tbody>
          {income.production.map((el) => {
            if (el.isPrimary) {
              const myProduct = map.product.find((e) => e.id! == el.productId!);
              const myYield = income.yieldPlant.find(
                (e) => e.cultureId! == myProduct?.cultureId!
              );
              const myCart = map.maps.find((e) => {
                console.log(e.id);
                console.log(el.techCartId);
                console.log(e.id == el.techCartId);

                return e.id! == el.techCartId!;
              });
              const planYield =
                Math.round(myYield?.yieldPerHectare! * myCart?.area! * 100) /
                100;
              return (
                <Tr key={el.id}>
                  <Td>
                    <EditIcon
                      color={"blue.400"}
                      w={"20px"}
                      h={"auto"}
                      cursor={"pointer"}
                    />
                  </Td>
                  <Td>{myProduct?.name}</Td>
                  <Td>{myYield?.yieldPerHectare}</Td>
                  <Td>{myCart?.area}</Td>
                  <Td>{planYield}</Td>
                  <Td>
                    {Math.round(
                      ((myCart?.costHectare! * myCart?.area!) / planYield) * 100
                    ) / 100}
                  </Td>
                  <Td>{myCart?.costHectare! * myCart?.area!}</Td>
                </Tr>
              );
            }
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default observer(PlanIncomeProductionTable);
