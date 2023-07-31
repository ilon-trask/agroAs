import {
  AccordionItem,
  AccordionPanel,
  Table,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useState } from "react";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import MyTableContainer from "src/ui/MyTableContainer";
import { resBusinessPlan } from "../../../../../../tRPC serv/controllers/BusinessService";
import { setPatchBusinessPlan } from "../../../../modules/BusinessTable";
import { CreateBusinessProp } from "../../../../modules/CreateBusiness";
import CreateBusiness from "../../../../modules/CreateBusiness";
import MyHeading from "src/ui/MyHeading";
import MyAccordionButton from "src/ui/MyAccordionButton";
import BusHeading from "src/ui/BusHeading";

function GeneralBusTable({
  myBusiness,
}: {
  myBusiness: resBusinessPlan | undefined;
}) {
  const [businessOpen, setBusinessOpen] = useState(false);
  //@ts-ignore
  const [businessRes, setBusinessRes] = useState<CreateBusinessProp>({});

  return (
    <AccordionItem>
      <MyAccordionButton>
        <BusHeading>Загальні дані</BusHeading>
      </MyAccordionButton>
      <AccordionPanel>
        <MyTableContainer>
          <Table size={"sm"}>
            <Thead>
              <Tr>
                <Td></Td>
                <Td>Назва бізнес-плану</Td>
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
                      enterpriseId: myBusiness?.enterpriseId!,
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
        {businessOpen ? (
          <CreateBusiness
            open={businessOpen}
            setOpen={setBusinessOpen}
            res={businessRes}
            setRes={setBusinessRes}
            update={true}
            setUpdate={() => {}}
          />
        ) : null}
      </AccordionPanel>
    </AccordionItem>
  );
}

export default React.memo(GeneralBusTable);
