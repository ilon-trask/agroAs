import {
  AccordionItem,
  AccordionPanel,
  Button,
  Table,
  Tbody,
  Td,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  useMemo,
} from "react";
import DeleteAlert, { DeleteProps } from "src/components/DeleteAlert";
import { deleteBuyingMachineForBusiness } from "src/http/requests";
import { Context } from "src/main";
import { BuyingMachineTableHead } from "src/modules/BuyingMachineTable/BuyingMachineTable";
import CreateBuyingMachine, {
  CreateBuyingMachineProps,
} from "src/modules/CreateBuyingMachine";
import BusHeading from "src/ui/BusHeading";
import MyAddIcon from "src/ui/Icons/MyAddIcon";
import MyDeleteIcon from "src/ui/Icons/MyDeleteIcon";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import MyAccordionButton from "src/ui/MyAccordionButton";
import MyTableContainer from "src/ui/MyTableContainer";
import { resBusinessPlan } from "../../../../../../tRPC serv/controllers/BusinessService";
type MSHPProps = {
  end: number;
  start: number;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setRes: Dispatch<SetStateAction<CreateBuyingMachineProps>>;
  setDeleteData: Dispatch<SetStateAction<DeleteProps>>;
  myBusiness: resBusinessPlan;
};
function MSHPTable({
  end,
  myBusiness,
  setDeleteData,
  setOpen,
  setRes,
  setUpdate,
  start,
}: MSHPProps) {
  const { business } = useContext(Context);
  return (
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
              const MSHP = myBusiness.MSHP.filter((el) => el.year == i - start);
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
                            price: el.price,
                            date: el.date,
                            name: el.name,
                            purpose: el.purpose,
                            buyingId: el.id!,
                            enterpriseId: el.enterpriseId!,
                            year: el.year,
                          });
                        }}
                      />
                    </Td>
                    <Td>{i}</Td>
                    <Td>{el.name}</Td>
                    <Td>{el.brand}</Td>
                    <Td>{el.amount}</Td>
                    <Td>{el.price}</Td>
                    <Td>{el.price * el.amount}</Td>
                    <Td>
                      <Button size={"sm"}>Додати</Button>
                    </Td>
                    <Td>
                      <MyDeleteIcon
                        onClick={() => {
                          setDeleteData({
                            func: () => {
                              setDeleteData((prev) => ({
                                ...prev,
                                isOpen: false,
                              })),
                                deleteBuyingMachineForBusiness(business, {
                                  busId: myBusiness.id!,
                                  id: el.id!,
                                });
                            },
                            isOpen: true,
                            text: "МШП",
                          });
                        }}
                      />
                    </Td>
                  </Tr>
                ))
              );
              const yearAmount = MSHP.reduce(
                (p, c) => p + c.price * c.amount,
                0
              );
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
                          businessPlanId: myBusiness.id!,
                          price: "",
                          date: i + "-01-01",
                          name: "",
                          purpose: "МШП",
                          year: i - start,
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
  );
}
const MemoedMSHPTable = React.memo(MSHPTable);
function MSHPBusTable({
  myBusiness,
  end,
  start,
}: {
  myBusiness: resBusinessPlan;
  start: number;
  end: number;
}) {
  const [open, setOpen] = useState(false);
  const [res, setRes] = useState<CreateBuyingMachineProps>({
    amount: "",
    brand: "",
    businessPlanId: myBusiness.id!,
    price: "",
    date: "",
    name: "",
    purpose: "МШП",
    year: 0,
  });
  const [update, setUpdate] = useState(false);
  const [deleteData, setDeleteData] = useState<DeleteProps>({
    func: () => {},
    isOpen: false,
    text: "МШП",
  });
  const businessData = useMemo(
    () => myBusiness,
    [myBusiness.id, JSON.stringify(myBusiness.MSHP)]
  );
  return (
    <AccordionItem>
      <MyAccordionButton>
        <BusHeading>Малоцінні та швидкозношувальні прeдмети</BusHeading>
      </MyAccordionButton>
      <AccordionPanel>
        <MemoedMSHPTable
          end={end}
          myBusiness={businessData}
          setDeleteData={setDeleteData}
          setOpen={setOpen}
          setRes={setRes}
          setUpdate={setUpdate}
          start={start}
        />
        {open ? (
          <CreateBuyingMachine
            isMSHP={true}
            open={open}
            setOpen={setOpen}
            update={update}
            setUpdate={setUpdate}
            data={res}
          />
        ) : null}
        {deleteData.isOpen ? (
          <DeleteAlert
            isOpen={deleteData.isOpen}
            func={deleteData.func}
            setOpen={setDeleteData}
            text={deleteData.text}
          />
        ) : null}
      </AccordionPanel>
    </AccordionItem>
  );
}

export default React.memo(MSHPBusTable);
