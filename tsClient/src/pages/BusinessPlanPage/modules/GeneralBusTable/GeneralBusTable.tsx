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
import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import MyTableContainer from "src/ui/MyTableContainer";
import { resBusinessPlan } from "../../../../../../tRPC serv/controllers/BusinessService";
import { setPatchBusinessPlan } from "../../../../modules/BusinessTable";
import { CreateBusinessProp } from "../../../../modules/CreateBusiness";
import CreateBusiness from "../../../../modules/CreateBusiness";
import MyHeading from "src/ui/MyHeading";
import MyAccordionButton from "src/ui/MyAccordionButton";
import BusHeading from "src/ui/BusHeading";
type generalProps = {
  setBusinessOpen: Dispatch<SetStateAction<boolean>>;
  setBusinessRes: Dispatch<SetStateAction<any>>;
  dateStart: string;
  initialAmount: number;
  name: string;
  realizationTime: number;
  id: number;
  topic: string;
  enterpriseId: number;
};
function GeneralTable({
  setBusinessOpen,
  setBusinessRes,
  dateStart,
  enterpriseId,
  id,
  initialAmount,
  name,
  realizationTime,
  topic,
}: generalProps) {
  return (
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
                setBusinessRes({
                  dateStart: dateStart,
                  initialAmount: initialAmount,
                  name: name,
                  realizationTime: realizationTime,
                  planId: id,
                  topic: topic,
                  enterpriseId: enterpriseId,
                });
              }}
            >
              <MyEditIcon />
            </Td>
            <Td>{name}</Td>
            <Td>{topic}</Td>
            <Td>{dateStart}</Td>
            <Td>{realizationTime}</Td>
            <Td>{initialAmount}</Td>
          </Tr>
        </Tbody>
      </Table>
    </MyTableContainer>
  );
}
const MemoedGeneralTable = React.memo(GeneralTable);
function GeneralBusTable({ myBusiness }: { myBusiness: resBusinessPlan }) {
  const [businessOpen, setBusinessOpen] = useState(false);
  //@ts-ignore
  const [businessRes, setBusinessRes] = useState<CreateBusinessProp>({});
  const BusinessData = useMemo(
    () => myBusiness,
    [
      myBusiness.dateStart,
      myBusiness.initialAmount,
      myBusiness.name,
      myBusiness.realizationTime,
      myBusiness.id,
      myBusiness.topic,
      myBusiness.enterpriseId,
    ]
  );
  return (
    <AccordionItem>
      <MyAccordionButton>
        <BusHeading>Загальні дані</BusHeading>
      </MyAccordionButton>
      <AccordionPanel>
        <MemoedGeneralTable
          {...myBusiness}
          id={myBusiness.id!}
          enterpriseId={myBusiness.enterpriseId!}
          setBusinessOpen={setBusinessOpen}
          setBusinessRes={setBusinessRes}
        />
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
