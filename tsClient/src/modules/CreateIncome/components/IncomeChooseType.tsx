import {
  Box,
  Button,
  Heading,
  Input,
  ModalBody,
  ModalFooter,
  Select,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import useIncomeTypes from "../../../pages/hook/useIncomeTypes";
import { IncomeProp } from "../CreateIncome";
const incomeTypes = useIncomeTypes;
type props = {
  setScreen: Dispatch<SetStateAction<number>>;
  res: IncomeProp;
  setRes: Dispatch<SetStateAction<IncomeProp>>;
};
function IncomeType({ setScreen, res, setRes }: props) {
  const types = useIncomeTypes;

  return (
    <ModalBody>
      <Heading as={"h4"} size="md" textAlign={"center"}>
        Виберіть тип Доходу
      </Heading>
      <Select
        value={res.type}
        onChange={(e) =>
          setRes((prev) => ({ ...prev, type: e.target.value as any }))
        }
      >
        <option hidden defaultChecked value="">
          Виберіть
        </option>
        {types.map((el) => (
          <option value={el.name} key={el.id}>
            {el.name}
          </option>
        ))}
      </Select>
      <ModalFooter>
        <Button onClick={() => setScreen(1)} isDisabled={!res.type}>
          Далі
        </Button>
      </ModalFooter>
    </ModalBody>
  );
}

export default IncomeType;
