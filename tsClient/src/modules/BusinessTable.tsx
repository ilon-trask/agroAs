import { EditIcon, ViewIcon } from "@chakra-ui/icons";
import { Box, Table, Tbody, Td, Thead, Tr } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../main";
import { BUSINESSpLAN_ROUTER, ENTERPRISE_ROUTER } from "../utils/consts";
import { CreateBusinessProp } from "./CreateBusiness";
type props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setRes: Dispatch<SetStateAction<CreateBusinessProp>>;
  setUpdate: Dispatch<SetStateAction<boolean>>;
};
function BusinessTable({ setOpen, setRes, setUpdate }: props) {
  const { business, enterpriseStore } = useContext(Context);
  return (
    <Table size="sm">
      <Thead>
        <Tr>
          <Td></Td>
          <Td>Назва підприємства</Td>
          <Td>Назва бізнес-плану</Td>
          <Td>Культура</Td>
          <Td>Дата початку</Td>
          <Td>Термін реалізації</Td>
          <Td>Початкова сума</Td>
          <Td></Td>
          <Td></Td>
        </Tr>
      </Thead>
      <Tbody>
        {business.businessPlan.map((el) => {
          const enterprise = enterpriseStore.enterprise.find(
            (e) => e.id == el.enterpriseId
          );

          return (
            <Tr key={el.id}>
              <Td
                onClick={() => {
                  setOpen(true);
                  setUpdate(true);
                  const cultureIds: any = el.cultures?.map((el) => el.id);
                  setRes({
                    cultureIds: cultureIds,
                    dateStart: el.dateStart,
                    enterpriseId: el.enterpriseId!,
                    initialAmount: el.initialAmount,
                    name: el.name,
                    realizationTime: el.realizationTime,
                    planId: el.id,
                  });
                }}
              >
                <EditIcon
                  color={"blue.400"}
                  w={"20px"}
                  h={"auto"}
                  cursor={"pointer"}
                />
              </Td>
              <Td>
                <Link to={ENTERPRISE_ROUTER + "/" + el.enterpriseId}>
                  <ViewIcon boxSize={5} color={"blue.400"} /> {enterprise?.name}
                </Link>
              </Td>
              <Td>
                <Link to={BUSINESSpLAN_ROUTER + "/" + el.id}>
                  <ViewIcon boxSize={5} color={"blue.400"} /> {el.name}
                </Link>
              </Td>
              <Td>
                {el.cultures?.map((el) => (
                  <Box>{el.name}</Box>
                ))}
              </Td>
              <Td>{el.dateStart}</Td>
              <Td>{el.realizationTime}</Td>
              <Td>{el.initialAmount}</Td>
              <Td></Td>
              <Td></Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}

export default observer(BusinessTable);
