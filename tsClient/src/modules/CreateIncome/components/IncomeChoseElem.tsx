import {
  Box,
  Heading,
  ModalBody,
  Select,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { createIncome } from "../../../http/requests";
import { Context } from "../../../main";
import { IncomeProp } from "../CreateIncome";
type props = {
  setScreen: Dispatch<SetStateAction<number>>;
  res: IncomeProp;
  setRes: Dispatch<SetStateAction<IncomeProp>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
function IncomeChoseElem({ setScreen, res, setRes, setOpen }: props) {
  const { income, map } = useContext(Context);
  return (
    <ModalBody>
      <Heading as={"h4"} size="md" textAlign={"center"}>
        Виберіть елемент
      </Heading>
      <Select
        value={res.propId}
        onChange={(e) =>
          setRes((prev) => ({ ...prev, propId: e.target.value as any }))
        }
      >
        <option hidden defaultChecked value="">
          Виберіть
        </option>
        {income.sale.map((el) => {
          const product = map.product.find(
            (e) =>
              e.id ==
              income.production.find((e) => e.id == el.productionId)?.productId
          );
          return (
            <option value={el.id} key={el.id}>
              {product?.name}
            </option>
          );
        })}
      </Select>
      <ModalFooter justifyContent={"space-around"}>
        <Button onClick={() => setScreen(1)}>Назад</Button>
        <Button
          onClick={() => {
            createIncome(income, {
              type: res.type,
              group: res.group,
              isUsing: true,
              saleId: +res.propId,
            });
            setOpen(false);
          }}
          isDisabled={!res.propId}
        >
          Зберегти
        </Button>
      </ModalFooter>
    </ModalBody>
  );
}

export default IncomeChoseElem;
