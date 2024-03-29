import {
  Box,
  Heading,
  ModalBody,
  Select,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext } from "react";
// import { createIncome, patchIncome } from "../../../http/requests";
import { Context } from "../../../main";
import { IncomeProp } from "../CreateIncome";
type props = {
  setScreen: Dispatch<SetStateAction<number>>;
  res: IncomeProp;
  setRes: Dispatch<SetStateAction<IncomeProp>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
};
function IncomeChoseElem({
  setScreen,
  res,
  setRes,
  setOpen,
  setUpdate,
  update,
}: props) {
  const { income, map } = useContext(Context);
  const prop =
    res.type == "Основне виробництво"
      ? income.sale
      : res.type == "Кредит"
      ? income.credit
      : res.type == "Інвестиції"
      ? income.investment
      : res.type == "Державна підтримка"
      ? income.derj
      : res.type == "Грант"
      ? income.grant
      : [];
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
        {res.type == "Основне виробництво"
          ? income.sale.map((el) => {
              const product = map.product.find(
                (e) =>
                  e.id ==
                  income.production.find((e) => e.id == el.productionId)
                    ?.productId
              );
              return (
                <option value={el.id} key={el.id}>
                  {product?.name}
                </option>
              );
            })
          : prop.map((el) => (
              <option key={el.id} value={el.id}>
                {
                  //@ts-ignore
                  el.name
                }
              </option>
            ))}
      </Select>
      <ModalFooter justifyContent={"space-around"}>
        <Button onClick={() => setScreen(1)}>Назад</Button>
        <Button
          onClick={() => {
            // if (update) {
            //   patchIncome(income, {
            //     group: res.group,
            //     incomeId: res.id!,
            //     isUsing: false,
            //     propId: +res.propId,
            //     type: res.type,
            //   });
            // } else {
            //   createIncome(income, {
            //     type: res.type,
            //     group: res.group,
            //     isUsing: true,
            //     propId: +res.propId,
            //   });
            // }
            setOpen(false);
            setUpdate(false);
            setScreen(0); //@ts-ignore
            setRes({});
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
