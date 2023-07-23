import { Button, Table, Tbody, Td, Thead, Tr } from "@chakra-ui/react";
import React, { useState } from "react";
import { BuyingMachineTableHead } from "src/modules/BuyingMachineTable/BuyingMachineTable";
import CreateBuyingMachine, {
  CreateBuyingMachineProps,
} from "src/modules/CreateBuyingMachine";
import getYearFromString from "src/shared/funcs/getYearFromString";
import MyAddIcon from "src/ui/Icons/MyAddIcon";
import MyDeleteIcon from "src/ui/Icons/MyDeleteIcon";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import MyHeading from "src/ui/MyHeading";
import MyTableContainer from "src/ui/MyTableContainer";
import { resBusinessPlan } from "../../../../../../tRPC serv/controllers/BusinessService";

function MSHPBusTable({
  myBusiness,
  end,
  start,
  id,
}: {
  id: number;
  myBusiness: resBusinessPlan;
  start: number;
  end: number;
}) {
  const [open, setOpen] = useState(false);
  const [res, setRes] = useState<CreateBuyingMachineProps>({
    amount: "",
    brand: "",
    businessPlanId: id,
    cost: "",
    date: "",
    name: "",
    purpose: "МШП",
  });
  const [update, setUpdate] = useState(false);
  return (
    <>
      <MyHeading>Малоцінні та швидкозношувальні прeдмети</MyHeading>
      <MyTableContainer>
        <Table size={"sm"}>
          <Thead>
            <BuyingMachineTableHead />
          </Thead>
          <Tbody>
            {(() => {
              const res = [];
              let sum = 0;
              for (let i = start; i <= end; i++) {
                const MSHP = myBusiness.MSHP.filter(
                  (el) => getYearFromString(el.date) == i
                );
                res.push(
                  MSHP.map((el) => (
                    <Tr key={el.id}>
                      <Td>
                        <MyEditIcon
                          onClick={() => {
                            setOpen(true);
                            setUpdate(true);
                            setRes({
                              amount: el.amount,
                              brand: el.brand,
                              businessPlanId: el.businessPlanId!,
                              cost: el.cost,
                              date: el.date,
                              name: el.name,
                              purpose: el.purpose,
                              buyingId: el.id!,
                              enterpriseId: el.enterpriseId,
                            });
                          }}
                        />
                      </Td>
                      <Td>{getYearFromString(el.date)}</Td>
                      <Td>{el.name}</Td>
                      <Td>{el.brand}</Td>
                      <Td>{el.amount}</Td>
                      <Td>{el.cost / el.amount}</Td>
                      <Td>{el.cost}</Td>
                      <Td>
                        <Button size={"sm"}>Додати</Button>
                      </Td>
                      <Td>
                        <MyDeleteIcon />
                      </Td>
                    </Tr>
                  ))
                );
                const yearAmount = MSHP.reduce((p, c) => p + c.cost, 0);
                sum += yearAmount;
                res.push(
                  <Tr key={i} fontWeight={"bold"}>
                    <Td>
                      <MyAddIcon
                        onClick={() => {
                          setOpen(true);
                          setRes({
                            amount: "",
                            brand: "",
                            businessPlanId: id,
                            cost: "",
                            date: i + "-01-01",
                            name: "",
                            purpose: "МШП",
                          });
                        }}
                      />
                    </Td>
                    <Td>{i}</Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td>{yearAmount}</Td>
                    <Td></Td>
                    <Td></Td>
                  </Tr>
                );
              }
              res.push(
                <Tr key={end + 1} fontWeight={"bold"}>
                  <Td></Td>
                  <Td colSpan={2}>ВСЕ РАЗОМ:</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td>{sum}</Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
              );
              return res;
            })()}
          </Tbody>
        </Table>
      </MyTableContainer>
      <CreateBuyingMachine
        isMSHP={true}
        open={open}
        setOpen={setOpen}
        update={update}
        setUpdate={setUpdate}
        data={res}
      />
    </>
  );
}

export default MSHPBusTable;
