import {
  AccordionItem,
  AccordionPanel,
  Table,
  Tbody,
  Td,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import DeleteAlert, { DeleteProps } from "src/components/DeleteAlert";
import {
  BuyingMachineTableBodyRow,
  BuyingMachineTableHead,
} from "src/modules/BuyingMachineTable/BuyingMachineTable";
import CreateBuyingMachine, {
  CreateBuyingMachineProps,
} from "src/modules/CreateBuyingMachine";
import BusHeading from "src/ui/BusHeading";
import MyPlusIcon from "src/ui/Icons/MyPlusIcon";
import MyAccordionButton from "src/ui/MyAccordionButton";
import MyTableContainer from "src/ui/MyTableContainer";
import { resBusinessPlan } from "../../../../../../tRPC serv/controllers/BusinessService";
type BuyingProps = {
  start: number;
  end: number;
  myBusiness: resBusinessPlan;
  setBuyingMachineOpen: Dispatch<SetStateAction<boolean>>;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  setBuyingMachineRes: Dispatch<SetStateAction<CreateBuyingMachineProps>>;
  setDeleteData: Dispatch<SetStateAction<DeleteProps>>;
};
function BuyingMachineTable({
  end,
  start,
  myBusiness,
  setBuyingMachineOpen,
  setBuyingMachineRes,
  setUpdate,
  setDeleteData,
}: BuyingProps) {
  return (
    <MyTableContainer>
      <Table size={"sm"}>
        <Thead>
          <BuyingMachineTableHead />
        </Thead>
        <Tbody>
          {(() => {
            const res = [];
            for (let i = start; i <= end; i++) {
              const machines = myBusiness?.buying_machines?.filter(
                (el) => el.year == i - start
              );
              if (machines) {
                res.push(
                  machines.map((el) => (
                    <BuyingMachineTableBodyRow
                      key={el.id!}
                      el={el}
                      setOpen={setBuyingMachineOpen}
                      setRes={setBuyingMachineRes}
                      setUpdate={setUpdate}
                      setDeleteOpen={setDeleteData}
                      busId={myBusiness?.id!}
                      i={i}
                    />
                  ))
                );
              }
              res.push(
                <Tr key={i} fontWeight={"bold"}>
                  <Td>
                    <MyPlusIcon
                      onClick={() => {
                        setBuyingMachineOpen(true);
                        setBuyingMachineRes({
                          businessPlanId: myBusiness?.id!,
                          enterpriseId: myBusiness?.enterpriseId!,
                          amount: "",
                          brand: "",
                          price: "",
                          date: i + "-01-01",
                          name: "",
                          purpose: "",
                          year: i - start,
                        });
                      }}
                    />
                  </Td>
                  <Td>{i}</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td>{machines?.reduce((p, c) => p + c.amount, 0)}</Td>
                  <Td></Td>
                  <Td>
                    {machines?.reduce((p, c) => p + c.price * c.amount, 0)}
                  </Td>
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
                <Td>
                  {myBusiness?.buying_machines.reduce(
                    (p, c) => p + c.amount,
                    0
                  )}
                </Td>
                <Td></Td>
                <Td>
                  {myBusiness?.buying_machines.reduce(
                    (p, c) => p + c.price * c.amount,
                    0
                  )}
                </Td>
                <Td></Td>
                <Td></Td>
              </Tr>
            );
            return res;
          })()}
        </Tbody>
      </Table>
    </MyTableContainer>
  );
}
const MemoedBuyingMachineTable = React.memo(BuyingMachineTable);
function BuyingMachineBusTable({
  myBusiness,
  end,
  start,
}: {
  myBusiness: resBusinessPlan;
  start: number;
  end: number;
}) {
  const [buyingMachineOpen, setBuyingMachineOpen] = useState(false);
  const [buyingMachineRes, setBuyingMachineRes] =
    useState<CreateBuyingMachineProps>({
      amount: "",
      brand: "",
      price: "",
      date: "",
      name: "",
      purpose: "",
      businessPlanId: myBusiness.id!,
      enterpriseId: myBusiness.enterpriseId!,
      year: 0,
    });
  const [update, setUpdate] = useState(false);
  const [deleteData, setDeleteData] = useState<DeleteProps>({
    func: () => {},
    isOpen: false,
    text: "техніку",
  });
  const businessData = useMemo(
    () => myBusiness,
    [
      myBusiness.id,
      myBusiness.enterpriseId,
      JSON.stringify(myBusiness.buying_machines),
    ]
  );
  return (
    <AccordionItem>
      <MyAccordionButton>
        <BusHeading>Купівля техніки та обладнання</BusHeading>
      </MyAccordionButton>
      <AccordionPanel>
        <MemoedBuyingMachineTable
          start={start}
          end={end}
          myBusiness={businessData}
          setBuyingMachineOpen={setBuyingMachineOpen}
          setBuyingMachineRes={setBuyingMachineRes}
          setDeleteData={setDeleteData}
          setUpdate={setUpdate}
        />
        {buyingMachineOpen ? (
          <CreateBuyingMachine
            open={buyingMachineOpen}
            setOpen={setBuyingMachineOpen}
            data={buyingMachineRes}
            update={update}
            setUpdate={setUpdate}
          />
        ) : null}
        {deleteData.isOpen ? (
          <DeleteAlert
            func={deleteData.func}
            isOpen={deleteData.isOpen}
            setOpen={deleteData}
            text={deleteData.text}
          />
        ) : null}
      </AccordionPanel>
    </AccordionItem>
  );
}

export default React.memo(BuyingMachineBusTable);
