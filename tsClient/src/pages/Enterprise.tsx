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
import DeleteAlert from "../components/DeleteAlert";
import {
  deleteFinancing,
  getBuilding,
  getFinancing,
  getLand,
} from "../http/requests";
import { Context } from "../main";
// import BuyingMachineTable from "../modules/BuyingMachineTable";
import CreateFinancing, {
  FinancingProps,
} from "../modules/CreateFinancing/CreateFinancing";
import LandPlatTable from "../modules/LandPlotTable";
import CreateBuyingMachine from "../modules/CreateBuyingMachine";
import sort from "src/shared/funcs/sort";
import CreateLand from "src/modules/CreateLand";
import { CreateLandProps } from "src/modules/CreateLand/CreateLand";
import { DeleteProps } from "../components/DeleteAlert";
import BuildingTable from "src/modules/BuildingTable";
import CreateBuilding, {
  CreateBuildingProps,
} from "src/modules/CreateBuilding/CreateBuilding";
import MyDeleteIcon from "src/ui/Icons/MyDeleteIcon";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import MyTableContainer from "src/ui/MyTableContainer";
function Enterprise() {
  const { id } = useParams();
  const { enterpriseStore, income, map } = useContext(Context);
  useEffect(() => {
    getFinancing(income);
    getLand(enterpriseStore);
    getBuilding(enterpriseStore);
  }, []);
  const myEnterprise = enterpriseStore.enterprise.find((el) => el.id == id);
  const [deleteOpen, setDeleteOpen] = useState<DeleteProps>({
    isOpen: false,
    text: "планування",
    func: () => {},
  });
  const [financingOpen, setFinancingOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [financingData, setFinancingData] = useState<FinancingProps>({
    cost: "",
    date: "",
    name: "",
    month: 0,
    year: 0,
    purpose: "",
    type: "",
    isUseCost: false,
    enterpriseId: +id!,
    calculationMethod: "",
  });
  const credits = sort(income.credit);
  const investments = sort(income.investment);
  const derj = sort(income.derj);
  const grant = sort(income.grant);
  const [machineOpen, setMachineOpen] = useState(false);
  const [machineData, setMachineData] = useState({});
  const [landOpen, setLandOpen] = useState(false);
  const [landData, setLandData] = useState<CreateLandProps>({
    enterpriseId: +id!,
    area: "",
    cadastreNumber: "",
    name: "",
    date: "",
    year: 0,
    ownership: "",
    rate: "",
    rightOfUse: "",
    businessPlanId: 0,
  });
  const lands = sort(enterpriseStore.land);
  const [buildingOpen, setBuildingOpen] = useState(false);
  const [buildingData, setBuildingData] = useState<CreateBuildingProps>({
    description: "",
    businessPlanId: 0,
    date: "",
    year: 0,
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
      />
      <Button onClick={() => setLandOpen(true)}>Додати ділянку</Button>
      <CreateLand open={landOpen} setOpen={setLandOpen} data={landData} />
      <Text
        textAlign={"center"}
        fontSize={"25px"}
        mt={"15px"}
        textTransform={"uppercase"}
      >
        Техніка та обладнання
      </Text>
      {/* <BuyingMachineTable
        setOpen={setMachineOpen}
        setDeleteOpen={setDeleteOpen}
        setRes={setMachineData}
        setUpdate={setUpdate}
      /> */}
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
              // if (el.enterpriseId == +id!)
              return (
                <Tr>
                  <Td
                    onClick={() => {
                      setFinancingData({
                        type: "investment",
                        id: el.id!,
                        cost: el.cost,
                        date: el.date,
                        month: el.month!,
                        year: el.year,
                        name: el.name,
                        purpose: el.purpose,
                        enterpriseId: +id!,
                        calculationMethod: el.calculationMethod,
                        isUseCost: el.isUseCost,
                      });
                      setUpdate(true);
                      setFinancingOpen(true);
                    }}
                  >
                    <MyEditIcon />
                  </Td>
                  <Td>{el.name}</Td>
                  <Td>{el.date}</Td>
                  <Td>{el.cost}</Td>
                  <Td>{el.purpose}</Td>
                  <Td
                    onClick={() => {
                      setDeleteOpen({
                        func: () => {
                          deleteFinancing(income, el.id!);
                          //@ts-ignore
                          setDeleteOpen({ isOpen: false });
                        },
                        isOpen: true,
                        text: "інвестицію",
                      });
                    }}
                  >
                    <MyDeleteIcon />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Button
        onClick={() => {
          setFinancingOpen(true);
          setFinancingData((prev) => ({
            ...prev,
            calculationMethod: "",
            calculationType: "",
            cost: "",
            date: "",
            name: "",
            purpose: "",
            isUseCost: false,
            type: "investment",
          }));
        }}
      >
        Додати інвестицію
      </Button>
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
              // if (el.enterpriseId == +id!)
              return (
                <Tr>
                  <Td
                    onClick={() => {
                      setFinancingData({
                        id: el.id!,
                        cost: el.cost,
                        date: el.date,
                        name: el.name,
                        month: el.month!,
                        year: el.year,
                        purpose: el.purpose,
                        enterpriseId: +id!,
                        isUseCost: el.isUseCost,
                        calculationMethod: el.calculationMethod,
                        type: "credit",
                      });
                      setUpdate(true);
                      setFinancingOpen(true);
                    }}
                  >
                    <MyEditIcon />
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
                          deleteFinancing(income, el.id!);
                          //@ts-ignore
                          setDeleteOpen({ isOpen: false });
                        },
                      });
                    }}
                  >
                    <MyDeleteIcon />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Button
        onClick={() => {
          setFinancingOpen(true);
          setFinancingData((prev) => ({
            ...prev,
            calculationMethod: "",
            calculationType: "",
            cost: "",
            date: "",
            name: "",
            purpose: "",
            isUseCost: false,
            type: "credit",
          }));
        }}
      >
        Додати кредит
      </Button>
      {/* <CreateFinancing
        open={financingOpen}
        setOpen={setFinancingOpen}
        data={financingData}
        update={update}
        setUpdate={setUpdate}
      /> */}

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
              // if (el.enterpriseId! == +id!)
              return (
                <Tr key={el.id}>
                  <Td
                    onClick={() => {
                      setFinancingData({
                        id: el.id!,
                        cost: el.cost,
                        enterpriseId: +id!,
                        month: el.month!,
                        year: el.year,
                        date: el.date,
                        name: el.name,
                        purpose: el.purpose,
                        calculationMethod: el.calculationMethod,
                        isUseCost: el.isUseCost,
                        type: "derj_support",
                      });
                      setFinancingOpen(true);
                      setUpdate(true);
                    }}
                  >
                    <MyEditIcon />
                  </Td>
                  <Td>{el.name}</Td>
                  <Td>{el.date}</Td>
                  <Td>{el.cost}</Td>
                  <Td>{el.purpose}</Td>
                  <Td
                    onClick={() => {
                      setDeleteOpen({
                        func: () => {
                          deleteFinancing(income, el.id!);
                          //@ts-ignore
                          setDeleteOpen({ isOpen: false });
                        },
                        isOpen: true,
                        text: "державну допомогу",
                      });
                    }}
                  >
                    <MyDeleteIcon />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Button
        onClick={() => {
          setFinancingOpen(true);
          setFinancingData((prev) => ({
            ...prev,
            calculationMethod: "",
            calculationType: "",
            cost: "",
            date: "",
            name: "",
            purpose: "",
            isUseCost: false,
            type: "derj_support",
          }));
        }}
      >
        Додати державну підтримку
      </Button>
      <Text
        textAlign={"center"}
        fontSize={"25px"}
        mt={"15px"}
        textTransform={"uppercase"}
      >
        Грант
      </Text>
      <MyTableContainer>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Назва</Th>
              <Th>Культура</Th>
              <Th>Дата</Th>
              <Th>Сума</Th>
              <Th>Призначення</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {grant.map((el) => {
              // if (el.enterpriseId == +id!)
              return (
                <Tr>
                  <Td
                    onClick={() => {
                      setFinancingData({
                        id: el.id!,
                        enterpriseId: +id!,
                        cost: el.cost,
                        date: el.date,
                        name: el.name,
                        month: el.month!,
                        year: el.year,
                        purpose: el.purpose,
                        calculationMethod: el.calculationMethod,
                        isUseCost: el.isUseCost,
                        type: "grant",
                        cultureId: el.cultureId,
                      });
                      setUpdate(true);
                      setFinancingOpen(true);
                    }}
                  >
                    <MyEditIcon />
                  </Td>
                  <Td>{el.name}</Td>
                  <Td>{map.culture.find((e) => e.id == el.cultureId)?.name}</Td>
                  <Td>{el.date}</Td>
                  <Td>{el.cost}</Td>
                  <Td>{el.purpose}</Td>
                  <Td
                    onClick={() =>
                      setDeleteOpen({
                        func: () => {
                          deleteFinancing(income, el.id!);
                          //@ts-ignore
                          setDeleteOpen({ isOpen: false });
                        },
                        isOpen: true,
                        text: "грант",
                      })
                    }
                  >
                    <MyDeleteIcon />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </MyTableContainer>
      <Button
        onClick={() => {
          setFinancingOpen(true);
          setFinancingData((prev) => ({
            ...prev,
            calculationMethod: "",
            calculationType: "",
            cost: "",
            date: "",
            name: "",
            purpose: "",
            isUseCost: false,
            type: "grant",
          }));
        }}
      >
        Додати грант
      </Button>
      <DeleteAlert
        isOpen={deleteOpen.isOpen}
        func={deleteOpen.func}
        text={deleteOpen.text}
        setOpen={setDeleteOpen}
      />
    </Container>
  );
}

export default observer(Enterprise);
