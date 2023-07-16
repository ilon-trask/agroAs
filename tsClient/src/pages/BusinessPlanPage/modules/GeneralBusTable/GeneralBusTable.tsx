import { Table, Tbody, Td, Text, Thead, Tr } from "@chakra-ui/react";
import React, { useState } from "react";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import MyTableContainer from "src/ui/MyTableContainer";
import { resBusinessPlan } from "../../../../../../tRPC serv/controllers/BusinessService";
import { setPatchBusinessPlan } from "../../../../modules/BusinessTable";
import { CreateBusinessProp } from "../../../../modules/CreateBusiness";
import CreateBusiness from "../../../../modules/CreateTEJ/CreateTEJ";

function GeneralBusTable({
  myBusiness,
}: {
  myBusiness: resBusinessPlan | undefined;
}) {
  const [businessOpen, setBusinessOpen] = useState(false);
  //@ts-ignore
  const [businessRes, setBusinessRes] = useState<CreateBusinessProp>({});
  return (
    <>
      <Text textAlign={"center"} textTransform={"uppercase"} fontSize={"20px"}>
        Загальні дані
      </Text>
      <MyTableContainer>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Td></Td>
              <Td>Ім'я</Td>
              <Td>Тема</Td>
              <Td>Дата початку</Td>
              <Td>Термін реалізації</Td>
              <Td>Початкові інвестиції</Td>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td
                onClick={() => {
                  setBusinessOpen(true);
                  const cultureIds = myBusiness
                    ? setPatchBusinessPlan(myBusiness)
                    : null;
                  setBusinessRes({
                    dateStart: myBusiness?.dateStart!,
                    initialAmount: myBusiness?.initialAmount!,
                    name: myBusiness?.name!,
                    realizationTime: myBusiness?.realizationTime!,
                    planId: myBusiness?.id,
                    topic: myBusiness?.topic!,
                  });
                }}
              >
                <MyEditIcon />
              </Td>
              <Td>{myBusiness?.name}</Td>
              <Td>{myBusiness?.topic}</Td>
              <Td>{myBusiness?.dateStart}</Td>
              <Td>{myBusiness?.realizationTime}</Td>
              <Td>{myBusiness?.initialAmount}</Td>
            </Tr>
          </Tbody>
        </Table>
      </MyTableContainer>
      <CreateBusiness
        open={businessOpen}
        setOpen={setBusinessOpen}
        res={businessRes}
        setRes={setBusinessRes}
        update={true}
        setUpdate={() => {}}
      />
    </>
  );
}

export default GeneralBusTable;
