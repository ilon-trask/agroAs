import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Checkbox, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext } from "react";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import { DeleteProps } from "../../components/DeleteAlert";
import { deleteSale, saleSetIsPlan } from "../../http/requests";
import { Context } from "../../main";
import { SaleProp } from "../CreateSale/CreateSale";
type props = {
  setDeleteOpen?: Dispatch<SetStateAction<DeleteProps>>;
  setSaleRes?: Dispatch<SetStateAction<SaleProp>>;
  setUpdate?: Dispatch<SetStateAction<boolean>>;
  setSaleOpen?: Dispatch<SetStateAction<boolean>>;
  isPlan?: boolean;
  year: number;
  month: string;
};
export function SaleTableHeadRows({ isPlan }: { isPlan?: boolean }) {
  return (
    <Tr>
      {!isPlan && <Th></Th>}
      <Th>Культура</Th>
      <Th>Товар</Th>
      {!isPlan ? (
        <>
          <Th>Дата</Th>
          <Th>
            Планове <br />
            виробництво
          </Th>
        </>
      ) : (
        <Th>
          Період <br />
          збору
        </Th>
      )}
      <Th>К-сть т</Th>
      <Th>
        Ціна <br />
        грн/т
      </Th>
      <Th>Сума грн</Th>
      {!isPlan && <Th></Th>}
      <Th></Th>
    </Tr>
  );
}
function SaleTable({
  setDeleteOpen,
  setSaleOpen,
  setSaleRes,
  setUpdate,
  isPlan,
  month,
  year,
}: props) {
  const { income, map } = useContext(Context);
  return (
    <Table size={"sm"}>
      <Thead>
        <SaleTableHeadRows />
      </Thead>
      <Tbody>
        {income.sale.map((el) => {
          let time = el.date.split("-");
          if (+time[0] == year && (time[1] == month || month == "")) {
            const production = income.production.find(
              (e) => e.id == el.productionId
            );
            const product = map.product.find(
              (e) => e.id == production?.productId
            );
            // const myYield = income.yieldPlant.find(
            //   (e) => e.cultureId == product?.cultureId
            // );
            const cart = map.maps.find((e) => e.id == production?.techCartId);
            return (
              <Tr key={el.id}>
                {!isPlan && (
                  <Td
                    onClick={() => {
                      if (setSaleOpen) setSaleOpen(true);
                      if (setUpdate) setUpdate(true);
                      if (setSaleRes)
                        setSaleRes({
                          id: el.id!,
                          amount: el.amount,
                          date: el.date,
                          price: el.price,
                          productionId: el.productionId!,
                        });
                    }}
                  >
                    <MyEditIcon />
                  </Td>
                )}
                <Td>
                  {map.culture.find((e) => e.id == product?.cultureId)?.name}
                </Td>
                <Td>{product?.name}</Td>
                <Td>{el.date}</Td>
                <Td>
                  {/* {Math.round(myYield?.yieldPerHectare! * cart?.area! * 100) /
                    100} */}
                </Td>
                <Td>{el.amount}</Td>
                <Td>{el.price}</Td>
                <Td>{el.price * el.amount}</Td>
                {!isPlan && (
                  <Td
                    onClick={() => {
                      if (setDeleteOpen)
                        setDeleteOpen((prev) => ({
                          ...prev,
                          id: el.id!,
                          func: () => {
                            deleteSale(income, { saleId: el.id! });
                            setDeleteOpen((prev) => ({
                              ...prev,
                              isOpen: false,
                            }));
                          },
                          isOpen: true,
                          text: "продаж",
                        }));
                    }}
                  >
                    <DeleteIcon
                      w={"20px"}
                      h={"auto"}
                      color={"red"}
                      cursor={"pointer"}
                    />
                  </Td>
                )}
                <Td>
                  <Checkbox
                    onChange={() =>
                      saleSetIsPlan(income, {
                        saleId: el.id!,
                        isPlan: !el.isPlan,
                      })
                    }
                  >
                    В бізнес-план
                  </Checkbox>
                </Td>
              </Tr>
            );
          }
        })}
      </Tbody>
    </Table>
  );
}

export default SaleTable;
