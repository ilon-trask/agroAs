import {
  Box,
  Heading,
  Input,
  Select,
  Text,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { createSale, patchSale } from "../../../http/requests";
import { Context } from "../../../main";
import { SaleProp } from "../CreateSale";
type prop = {
  res: SaleProp;
  setRes: Dispatch<SetStateAction<SaleProp>>;
  isAmount?: boolean;
};
function SaleInputs({ res, setRes, isAmount }: prop) {
  const { income, map } = useContext(Context);
  return (
    <Box>
      <Heading textAlign={"center"} fontWeight={"bold"} size={"md"}>
        Дані для розрахунку
      </Heading>
      <Box display={"flex"} justifyContent={"space-around"} mt={5}>
        <Box>
          <Text>Виберіть товар</Text>
          <Select
            value={res.productionId}
            onChange={(e) => {
              setRes((prev) => ({ ...prev, productionId: +e.target.value }));
            }}
          >
            <option value="" hidden defaultChecked>
              Виберіть
            </option>
            {income.production.map((el) => (
              <option key={el.id} value={el.id}>
                {map.product.find((e) => e.id == el.productId)?.name}
              </option>
            ))}
          </Select>
        </Box>
        <Box>
          <Text>Впишіть дату</Text>
          <Input
            type={"date"}
            value={res.date}
            onChange={(e) => {
              setRes((prev) => ({
                ...prev,
                date: e.target.value,
              }));
            }}
          />
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={"space-around"}>
        <Box>
          <Text>Впишіть ціну</Text>
          <Input
            type={"number"}
            value={res.price}
            onChange={(e) => {
              setRes((prev) => ({
                ...prev,
                price: Math.round(+e.target.value * 100) / 100 || "",
              }));
            }}
          />
        </Box>
        {isAmount && (
          <Box>
            <Text>Впишіть кількість</Text>
            <Input
              type={"number"}
              value={res.amount}
              onChange={(e) => {
                setRes((prev) => ({
                  ...prev,
                  amount: Math.round(+e.target.value * 100) / 100 || "",
                }));
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default SaleInputs;
