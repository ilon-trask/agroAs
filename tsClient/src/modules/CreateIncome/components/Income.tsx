import {
  Box,
  Button,
  Heading,
  Input,
  ModalBody,
  ModalFooter,
  Select,
} from "@chakra-ui/react";
import React from "react";
import useIncomeTypes from "../../../pages/hook/useIncomeTypes";
const incomeTypes = useIncomeTypes;
type props = { changeString: (screenNum: number) => void };
function Income({ changeString }: props) {
  return (
    <ModalBody>
      <Heading as={"h4"} size="md" textAlign={"center"}>
        Внесіть дані для розрахунку
      </Heading>
      <Box mt={"15px"} display={"flex"} gap={3} justifyContent={"center"}>
        <Box>
          <Heading size="sm" minW={"max-content"}>
            Назва доходу
          </Heading>
          <Input size={"sm"} placeholder={"Введіть назву"} />
        </Box>
        <Box>
          <Heading size="sm" minW={"max-content"}>
            Дата доходу
          </Heading>
          <Input size={"sm"} type={"date"} />
        </Box>
        <Box>
          <Heading size="sm" minW={"max-content"}>
            Тип доходу
          </Heading>
          <Select size={"sm"}>
            {incomeTypes.map((el) => (
              <option value={el.id} key={el.id}>
                {el.name}
              </option>
            ))}
          </Select>
        </Box>
      </Box>
      <ModalFooter>
        <Button onClick={() => changeString(1)}>Далі</Button>
      </ModalFooter>
    </ModalBody>
  );
}

export default Income;
