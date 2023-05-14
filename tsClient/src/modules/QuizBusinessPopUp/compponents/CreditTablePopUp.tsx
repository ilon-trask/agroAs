import { EditIcon, PlusSquareIcon } from "@chakra-ui/icons";
import {
  Button,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { Icredit } from "../../../../../tRPC serv/models/models";
import Dialog from "../../../components/Dialog";

type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  credits: Icredit[];
};
const obj = {};
function CreditTablePopUp({ open, setOpen, credits }: props) {
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      isErr={false}
      setIsErr={() => {}}
      props={obj}
      res={obj}
      setRes={() => {}}
      setUpdate={() => {}}
      update={false}
    >
      <Heading size={"md"} textAlign={"center"}>
        Планування кредитів
      </Heading>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Назва</Th>
            <Th>Дата</Th>
            <Th>Сума</Th>
            <Th>Призначення</Th>
            <Th>Рік</Th>
          </Tr>
        </Thead>
        <Tbody>
          {credits.map((el) => (
            <Tr key={el.id}>
              <Td>
                <EditIcon color="blue.400" w="20px" h="auto" />
              </Td>
              <Td>{el.name}</Td>
              <Td>{el.date}</Td>
              <Td>{el.cost}</Td>
              <Td>{el.purpose}</Td>
              <Td>{el.date.split("-")[0]}</Td>
            </Tr>
          ))}
          <Button mt={2} ml={2} mb={2}>
            Додати
          </Button>
        </Tbody>
      </Table>
    </Dialog>
  );
}

export default CreditTablePopUp;
