import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Icredit, Igrant, Iinvestment } from "../../../tRPC serv/models/models";
import DeleteAlert, { IdeleteHeading } from "../components/DeleteAlert";
import {
  deleteCredit,
  deleteDerj,
  deleteGrant,
  deleteInvestment,
  getBuilding,
  getCredit,
  getGrant,
  getInvestment,
  getLand,
  getWorker,
} from "../http/requests";
import { Context } from "../main";
import BuyingMachineTable from "../modules/BuyingMachineTable";
import CreateCredit, {
  CreditProps,
} from "../modules/CreateCredit/CreateCredit";
import CreateDerjSupport, {
  CreateDerjProps,
} from "../modules/CreateDerjSupport/CreateDerjSupport";
import CreateGrant, {
  CreateGrantProps,
} from "../modules/CreateGrant/CreateGrant";
import CreateInvestment, {
  CreateInvestmentProps,
} from "../modules/CreateInvestment/CreateInvestment";
import CreateWorker from "../modules/CreateWorker";
import { CreateWorkerProp } from "../modules/CreateWorker/CreateWorker";
import LandPlatTable from "../modules/LandPlotTable";
import StaffingTable from "../modules/StaffingTable";
import CreateBuyingMachine from "../modules/CreateBuyingMachine";
import WorkTable from "../modules/WorkTable";
import sort from "src/shared/funcs/sort";
import CreateLand from "src/modules/CreateLand";
import { CreateLandProps } from "src/modules/CreateLand/CreateLand";
import { DeleteProps } from "../components/DeleteAlert";
import BuildingTable from "src/modules/BuildingTable";
import CreateBuilding, {
  CreateBuildingProps,
} from "src/modules/CreateBuilding/CreateBuilding";
function Enterprise() {
  const { id } = useParams();
  const { enterpriseStore, income } = useContext(Context);
  useEffect(() => {
    getInvestment(income);
    getCredit(income);
    getGrant(income);
    getLand(enterpriseStore);
    getBuilding(enterpriseStore);
  }, []);
  const myEnterprise = enterpriseStore.enterprise.find((el) => el.id == id);
  const [deleteOpen, setDeleteOpen] = useState<DeleteProps>({
    isOpen: false,
    text: "планування",
    func: () => {},
  });
  const [creditOpen, setCreditOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [creditRes, setCreditRes] = useState<CreditProps>({
    cost: "",
    date: "",
    name: "",
    purpose: "",
    isUseCost: false,
    enterpriseId: +id!,
    calculationMethod: "",
    calculationType: "",
  });
  const credits = sort(income.credit);
  const [investOpen, setInvestOpen] = useState(false);
  const [investRes, setInvestRes] = useState<CreateInvestmentProps>({
    cost: "",
    date: "",
    name: "",
    origin: "",
    enterpriseId: +id!,
  });
  const investments = sort(income.investment);
  const [derjOpen, setDerjOpen] = useState(false);
  const [derjRes, setDerjRes] = useState<CreateDerjProps>({
    cost: "",
    date: "",
    name: "",
    purpose: "",
    enterpriseId: +id!,
  });
  const derj = sort(income.derj);
  const [grantOpen, setGrantOpen] = useState(false);
  const [grantRes, setGrantRes] = useState<CreateGrantProps>({
    cost: "",
    date: "",
    name: "",
    purpose: "",
    enterpriseId: +id!,
  });
  const grant = sort(income.grant);
  const [machineOpen, setMachineOpen] = useState(false);
  const [machineData, setMachineData] = useState({});
  const [landOpen, setLandOpen] = useState(false);
  const [landData, setLandData] = useState<CreateLandProps>({
    enterpriseId: +id!,
    area: "",
    cadastreNumber: "",
    name: "",
  });
  const lands = sort(enterpriseStore.land);
  const [buildingOpen, setBuildingOpen] = useState(false);
  const [buildingData, setBuildingData] = useState<CreateBuildingProps>({
    depreciationPeriod: "",
    enterpriseId: +id!,
    name: "",
    startPrice: "",
  });
  const buildings = sort(enterpriseStore.building);
  return (
    <Container maxW={"container.lg"}>
      <Box mx={"auto"}>
        <Heading size={"md"} textAlign={"center"} mt={5}>
          Загальні данні
          <br /> підприємства: {myEnterprise?.name}
        </Heading>
      </Box>
      <Table mt={3}>
        <Thead>
          <Tr>
            <Th>Статус</Th>
            <Th>Діючий</Th>
            <Th>Планується створення</Th>
          </Tr>
          <Tr>
            <Th>Юридична адреса</Th>
            <Th colSpan={2}></Th>
          </Tr>
        </Thead>
      </Table>
      <Text
        textAlign={"center"}
        fontSize={"25px"}
        mt={"15px"}
        textTransform={"uppercase"}
      >
        Земельні ділянки
      </Text>
      <LandPlatTable
        arr={lands}
        setData={setLandData}
        setOpen={setLandOpen}
        setUpdate={setUpdate}
        setDeleteOpen={setDeleteOpen}
      ></LandPlatTable>
      <Button onClick={() => setLandOpen(true)}>Додати ділянку</Button>
      <CreateLand
        open={landOpen}
        setOpen={setLandOpen}
        update={update}
        setUpdate={setUpdate}
        data={landData}
      />
      <Text
        textAlign={"center"}
        fontSize={"25px"}
        mt={"15px"}
        textTransform={"uppercase"}
      >
        Техніка та обладнання
      </Text>
      <BuyingMachineTable
        setOpen={setMachineOpen}
        setDeleteOpen={setDeleteOpen}
        setRes={setMachineData}
        setUpdate={setUpdate}
      />
      <CreateBuyingMachine
        open={machineOpen}
        setOpen={setMachineOpen}
        update={update}
        setUpdate={setUpdate}
        data={machineData as any}
      />
      <Button onClick={() => setMachineOpen(true)}>
        Додати техніку та обладнання
      </Button>
      <Text
        textAlign={"center"}
        fontSize={"25px"}
        mt={"15px"}
        textTransform={"uppercase"}
      >
        Будівлі і споруди
      </Text>
      <BuildingTable
        arr={buildings}
        setData={setBuildingData}
        setOpen={setBuildingOpen}
        setDeleteOpen={setDeleteOpen}
        setUpdate={setUpdate}
      />
      <Button onClick={() => setBuildingOpen(true)}>
        Додати будівлю або споруду
      </Button>
      <CreateBuilding
        data={buildingData}
        open={buildingOpen}
        setOpen={setBuildingOpen}
        update={update}
        setUpdate={setUpdate}
      />
      <Text
        textAlign={"center"}
        fontSize={"25px"}
        mt={"15px"}
        textTransform={"uppercase"}
      >
        Інвестиції
      </Text>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Назва</Th>
              <Th>Дата</Th>
              <Th>Сума</Th>
              <Th>Призначення</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {investments.map((el) => {
              if (el.enterpriseId == +id!)
                return (
                  <Tr>
                    <Td
                      onClick={() => {
                        setInvestRes({
                          investmentId: el.id!,
                          cost: el.cost,
                          date: el.date,
                          name: el.name,
                          origin: el.origin,
                          enterpriseId: +id!,
                        });
                        setUpdate(true);
                        setInvestOpen(true);
                      }}
                    >
                      <EditIcon
                        color={"blue.400"}
                        w={"20px"}
                        h={"auto"}
                        cursor={"pointer"}
                      />
                    </Td>
                    <Td>{el.name}</Td>
                    <Td>{el.date}</Td>
                    <Td>{el.cost}</Td>
                    <Td>{el.origin}</Td>
                    <Td
                      onClick={() => {
                        setDeleteOpen({
                          func: () => {
                            deleteInvestment(income, el.id!);
                            //@ts-ignore
                            setDeleteOpen({ isOpen: false });
                          },
                          isOpen: true,
                          text: "інвестицію",
                        });
                      }}
                    >
                      <DeleteIcon
                        w={"20px"}
                        h={"auto"}
                        color={"red"}
                        cursor={"pointer"}
                      />
                    </Td>
                  </Tr>
                );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Button onClick={() => setInvestOpen(true)}>Додати інвестицію</Button>
      <CreateInvestment
        open={investOpen}
        setOpen={setInvestOpen}
        res={investRes}
        setRes={setInvestRes}
        update={update}
        setUpdate={setUpdate}
      />
      <Text
        textAlign={"center"}
        fontSize={"25px"}
        mt={"15px"}
        textTransform={"uppercase"}
      >
        Кредит
      </Text>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Назва</Th>
              <Th>Дата</Th>
              <Th>Сума</Th>
              <Th>Призначення</Th>
              <Th>Вид розрахунку</Th>
              <Th>Тип розрахунку</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {credits?.map((el) => {
              if (el.enterpriseId == +id!)
                return (
                  <Tr>
                    <Td
                      onClick={() => {
                        setCreditRes({
                          creditId: el.id!,
                          cost: el.cost,
                          date: el.date,
                          name: el.name,
                          purpose: el.purpose,
                          enterpriseId: +id!,
                          isUseCost: el.isUseCost,
                          calculationMethod: el.calculationMethod,
                          calculationType: el.calculationType,
                        });
                        setUpdate(true);
                        setCreditOpen(true);
                      }}
                    >
                      <EditIcon
                        color={"blue.400"}
                        w={"20px"}
                        h={"auto"}
                        cursor={"pointer"}
                      />
                    </Td>
                    <Td>{el.name}</Td>
                    <Td>{el.date}</Td>
                    <Td>{el.cost}</Td>
                    <Td>{el.purpose}</Td>
                    <Td>{el.calculationType}</Td>
                    <Td>{el.calculationMethod}</Td>
                    <Td
                      onClick={() => {
                        setDeleteOpen({
                          text: "кредит",
                          isOpen: true,
                          func: () => {
                            deleteCredit(income, el.id!);
                            //@ts-ignore
                            setDeleteOpen({ isOpen: false });
                          },
                        });
                      }}
                    >
                      <DeleteIcon
                        w={"20px"}
                        h={"auto"}
                        color={"red"}
                        cursor={"pointer"}
                      />
                    </Td>
                  </Tr>
                );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Button onClick={() => setCreditOpen(true)}>Додати кредит</Button>
      <CreateCredit
        open={creditOpen}
        setOpen={setCreditOpen}
        res={creditRes}
        setRes={setCreditRes}
        update={update}
        setUpdate={setUpdate}
      />

      <Text
        textAlign={"center"}
        fontSize={"25px"}
        mt={"15px"}
        textTransform={"uppercase"}
      >
        Державна підтримка
      </Text>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Назва</Th>
              <Th>Дата</Th>
              <Th>Сума</Th>
              <Th>Призначення</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {derj.map((el) => {
              if (el.enterpriseId! == +id!)
                return (
                  <Tr key={el.id}>
                    <Td
                      onClick={() => {
                        setDerjRes({
                          derjId: el.id!,
                          cost: el.cost,
                          enterpriseId: +id!,
                          date: el.date,
                          name: el.name,
                          purpose: el.purpose,
                        });
                        setDerjOpen(true);
                        setUpdate(true);
                      }}
                    >
                      <EditIcon
                        color={"blue.400"}
                        w={"20px"}
                        h={"auto"}
                        cursor={"pointer"}
                      />
                    </Td>
                    <Td>{el.name}</Td>
                    <Td>{el.date}</Td>
                    <Td>{el.cost}</Td>
                    <Td>{el.purpose}</Td>
                    <Td
                      onClick={() => {
                        setDeleteOpen({
                          func: () => {
                            deleteDerj(income, el.id!);
                            //@ts-ignore
                            setDeleteOpen({ isOpen: false });
                          },
                          isOpen: true,
                          text: "державну допомогу",
                        });
                      }}
                    >
                      <DeleteIcon
                        w={"20px"}
                        h={"auto"}
                        color={"red"}
                        cursor={"pointer"}
                      />
                    </Td>
                  </Tr>
                );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Button onClick={() => setDerjOpen(true)}>
        Додати державну підтримку
      </Button>
      <CreateDerjSupport
        open={derjOpen}
        setOpen={setDerjOpen}
        res={derjRes}
        setRes={setDerjRes}
        update={update}
        setUpdate={setUpdate}
      />
      <Text
        textAlign={"center"}
        fontSize={"25px"}
        mt={"15px"}
        textTransform={"uppercase"}
      >
        Грант
      </Text>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Назва</Th>
              <Th>Дата</Th>
              <Th>Сума</Th>
              <Th>Призначення</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {grant.map((el) => {
              if (el.enterpriseId == +id!)
                return (
                  <Tr>
                    <Td
                      onClick={() => {
                        setGrantRes({
                          grantId: el.id!,
                          enterpriseId: +id!,
                          cost: el.cost,
                          date: el.date,
                          name: el.name,
                          purpose: el.purpose,
                        });
                        setUpdate(true);
                        setGrantOpen(true);
                      }}
                    >
                      <EditIcon
                        color={"blue.400"}
                        w={"20px"}
                        h={"auto"}
                        cursor={"pointer"}
                      />
                    </Td>
                    <Td>{el.name}</Td>
                    <Td>{el.date}</Td>
                    <Td>{el.cost}</Td>
                    <Td>{el.purpose}</Td>
                    <Td
                      onClick={() =>
                        setDeleteOpen({
                          func: () => {
                            deleteGrant(income, el.id!);
                            //@ts-ignore
                            setDeleteOpen({ isOpen: false });
                          },
                          isOpen: true,
                          text: "грант",
                        })
                      }
                    >
                      <DeleteIcon
                        w={"20px"}
                        h={"auto"}
                        color={"red"}
                        cursor={"pointer"}
                      />
                    </Td>
                  </Tr>
                );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Button onClick={() => setGrantOpen(true)}>Додати грант</Button>
      <CreateGrant
        open={grantOpen}
        setOpen={setGrantOpen}
        res={grantRes}
        setRes={setGrantRes}
        update={update}
        setUpdate={setUpdate}
      />

      <DeleteAlert
        open={deleteOpen.isOpen}
        func={deleteOpen.func}
        text={deleteOpen.text}
        setOpen={setDeleteOpen}
      />
    </Container>
  );
}

export default observer(Enterprise);
