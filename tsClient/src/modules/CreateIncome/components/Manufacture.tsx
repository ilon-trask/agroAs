import {
  Box,
  Button,
  Heading,
  ModalBody,
  ModalFooter,
  Select,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../../../main";

function Manufacture() {
  const { map } = useContext(Context);

  return (
    <ModalBody>
      <Heading size="md" textAlign={"center"}>
        Внесіть дані для розрахунку
      </Heading>
      <Box>
        <Box>
          <Heading size={"sm"}>Виберіть підтип</Heading>
          <Select></Select>
        </Box>
        <Box>
          <Heading size={"sm"}>Виберіть продукт</Heading>
          <Select>
            <option value="" selected hidden>
              Виберіть продукт
            </option>
            {map.culture.map((el) => (
              <option key={el.id}>{el.product}</option>
            ))}
            <option>Додати новий</option>
          </Select>
        </Box>
      </Box>
      <ModalFooter>
        <Button>Зберегти</Button>
      </ModalFooter>
    </ModalBody>
  );
}

export default observer(Manufacture);
