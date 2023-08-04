import {
  AccordionItem,
  AccordionPanel,
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import DeleteAlert, { DeleteProps } from "src/components/DeleteAlert";
import { deleteBuildingForBusiness } from "src/http/requests";
import { Context } from "src/main";
import CreateBuilding from "src/modules/CreateBuilding";
import { CreateBuildingProps } from "src/modules/CreateBuilding/CreateBuilding";
import BusHeading from "src/ui/BusHeading";
import MyAddIcon from "src/ui/Icons/MyAddIcon";
import MyDeleteIcon from "src/ui/Icons/MyDeleteIcon";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import MyAccordionButton from "src/ui/MyAccordionButton";
import MyTableContainer from "src/ui/MyTableContainer";
import { resBusinessPlan } from "../../../../../../tRPC serv/controllers/BusinessService";
import BuildingParametersDialog, {
  BuildingParameterProps,
} from "./BuildingParametersDialog";
type BuildingProps = {
  end: number;
  start: number;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setRes: Dispatch<SetStateAction<CreateBuildingProps>>;
  setDeleteData: Dispatch<SetStateAction<DeleteProps>>;
  setParameterOpen: Dispatch<SetStateAction<boolean>>;
  myBusiness: resBusinessPlan;
};
function BuildingTable({
  end,
  start,
  setOpen,
  setRes,
  setUpdate,
  myBusiness,
  setDeleteData,
  setParameterOpen,
}: BuildingProps) {
  const { business } = useContext(Context);
  return (
    <MyTableContainer>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Рік</Th>
            <Th>Назва</Th>
            <Th>Вартість</Th>
            <Th>Опис</Th>
            <Th>Налаштування</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {(() => {
            const res = [];
            let sum = 0;
            for (let i = start; i <= end; i++) {
              const building = myBusiness.buildings.filter(
                (el) => el.year == i - start
              );
              res.push(
                building.map((el) => (
                  <Tr key={el.id}>
                    <Td>
                      <MyEditIcon
                        onClick={() => {
                          setOpen(true);
                          setUpdate(true);
                          setRes({
                            id: el.id!,
                            businessPlanId: el.businessPlanId,
                            date: el.date,
                            description: el.description,
                            name: el.name,
                            startPrice: el.startPrice,
                            year: el.year,
                            depreciationPeriod: el.depreciationPeriod,
                            introductionDate: el.introductionDate,
                          });
                        }}
                      />
                    </Td>
                    <Td>{i}</Td>
                    <Td>{el.name}</Td>
                    <Td>{el.startPrice}</Td>
                    <Td>{el.description}</Td>
                    <Td>
                      <Button
                        size={"sm"}
                        onClick={() => {
                          setParameterOpen(true);
                          setRes({
                            id: el.id!,
                            businessPlanId: el.businessPlanId,
                            date: el.date,
                            description: el.description,
                            name: el.name,
                            startPrice: el.startPrice,
                            year: el.year,
                            depreciationPeriod: el.depreciationPeriod ?? 25,
                            introductionDate: el.introductionDate!,
                          });
                        }}
                      >
                        Додати
                      </Button>
                    </Td>
                    <Td>
                      <MyDeleteIcon
                        onClick={() => {
                          setDeleteData({
                            func: () => {
                              setDeleteData((prev) => ({
                                ...prev,
                                isOpen: false,
                              }));
                              deleteBuildingForBusiness(business, {
                                busId: myBusiness.id!,
                                id: el.id!,
                              });
                            },
                            isOpen: true,
                            text: "будівлю",
                          });
                        }}
                      />
                    </Td>
                  </Tr>
                ))
              );
              const yearCost = building?.reduce((p, c) => p + +c.startPrice, 0);
              sum += yearCost;
              res.push(
                <Tr key={i} fontWeight={"bold"}>
                  <Td>
                    <MyAddIcon
                      onClick={() => {
                        setOpen(true);
                        setRes({
                          description: "",
                          date: i + "-01-01",
                          name: "",
                          startPrice: "",
                          businessPlanId: myBusiness.id!,
                          year: i - start,
                        });
                      }}
                    />
                  </Td>
                  <Td>{i}</Td>
                  <Td>Разом:</Td>
                  <Td>{yearCost}</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
              );
            }
            res.push(
              <Tr key={end + 1} fontWeight={"bold"}>
                <Td></Td>
                <Td colSpan={2}>ВСЕ РАЗОМ:</Td>

                <Td>{sum}</Td>
                <Td></Td>
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
const MemoedBuildingTable = React.memo(BuildingTable);
function BuildingBusTable({
  end,
  start,
  myBusiness,
}: {
  myBusiness: resBusinessPlan;
  start: number;
  end: number;
}) {
  const [res, setRes] = useState<CreateBuildingProps>({
    description: "",
    date: "",
    name: "",
    startPrice: "",
    businessPlanId: myBusiness.id!,
    year: 0,
  });
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [deleteData, setDeleteData] = useState<DeleteProps>({
    func: () => {},
    isOpen: false,
    text: "будівлю",
  });
  const [parameterOpen, setParameterOpen] = useState(false);
  const businessData = useMemo(
    () => myBusiness,
    [myBusiness.id, JSON.stringify(myBusiness.buildings)]
  );
  return (
    <AccordionItem>
      <MyAccordionButton>
        <BusHeading>Будівництво будівель і споруд</BusHeading>
      </MyAccordionButton>
      <AccordionPanel>
        <MemoedBuildingTable
          end={end}
          myBusiness={businessData}
          setDeleteData={setDeleteData}
          setOpen={setOpen}
          setRes={setRes}
          setUpdate={setUpdate}
          setParameterOpen={setParameterOpen}
          start={start}
        />
        {open ? (
          <CreateBuilding
            data={res}
            open={open}
            setOpen={setOpen}
            setUpdate={setUpdate}
            update={update}
          />
        ) : null}
        {deleteData.isOpen ? (
          <DeleteAlert
            func={deleteData.func}
            isOpen={deleteData.isOpen}
            setOpen={setDeleteData}
            text={deleteData.text}
          />
        ) : null}
        {parameterOpen ? (
          <BuildingParametersDialog
            open={parameterOpen}
            setOpen={setParameterOpen}
            data={res}
          />
        ) : null}
      </AccordionPanel>
    </AccordionItem>
  );
}

export default React.memo(BuildingBusTable);
