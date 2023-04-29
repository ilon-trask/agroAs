import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Dialog from "../components/Dialog";
import CreateYield from "../modules/CreateYield";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { YIELD_CALC_ROUTER } from "../utils/consts";
import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import NoAuthAlert from "../components/NoAuthAlert";
import DeleteAlert from "../components/DeleteAlert";
import {
  deleteYieldPlant,
  getIncome,
  getSale,
  setIsUsingIncome,
} from "../http/requests";
import { incProp } from "../modules/CreateYield/CreateYield";
import { resYieldPlant } from "../../../tRPC serv/controllers/incomeService";
import CreateIncome, { IncomeProp } from "../modules/CreateIncome/CreateIncome";
import PlanIncomeProductionTable from "../modules/PlanIncomeProductionTable/PlanIncomeProductionTable";
import CreateProductService from "../modules/CreateProductService";
import { productionProp } from "../modules/CreateProductService/CreateProduction";
import CreateSale, { SaleProp } from "../modules/CreateSale/CreateSale";
import MapStore from "../store/MapStore";
import IncomeStore from "../store/IncomeStore";

function Sale({
  map,
  income,
  year,
  saleOpen,
  setSaleOpen,
  saleRes,
  setSaleRes,
}: {
  map: MapStore;
  income: IncomeStore;
  year: number;
  saleOpen: boolean;
  setSaleOpen: Dispatch<SetStateAction<boolean>>;
  saleRes: SaleProp;
  setSaleRes: Dispatch<SetStateAction<SaleProp>>;
}) {
  return (
    <>
      <Heading textAlign={"center"} fontSize={"25px"} mt={"15px"}>
        Планування збуту основного виробництва
      </Heading>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th>Назва культури</Th>
              <Th>Продукт</Th>
              <Th>Дата</Th>
              <Th>Кількість т</Th>
              <Th>Ціна грн/т</Th>
              <Th>Сума грн</Th>
            </Tr>
          </Thead>
          <Tbody>
            {income.sale.map((el) => {
              if (+el.date.split("-")[0] == year) {
                const production = income.production.find(
                  (e) => e.id == el.productionId
                );
                const product = map.product.find(
                  (e) => e.id == production?.productId
                );

                return (
                  <Tr>
                    <Td>
                      {
                        map.culture.find((e) => e.id == product?.cultureId)
                          ?.name
                      }
                    </Td>
                    <Td>{product?.name}</Td>
                    <Td>{el.date}</Td>
                    <Td>{el.amount}</Td>
                    <Td>{el.price}</Td>
                    <Td>{el.price * el.amount}</Td>
                  </Tr>
                );
              }
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <CreateSale
        open={saleOpen}
        setOpen={setSaleOpen}
        res={saleRes}
        setRes={setSaleRes}
      />
      <Button onClick={() => setSaleOpen(true)}>Додати розрахунок</Button>
    </>
  );
}

function Credit() {
  return (
    <>
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
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody></Tbody>
        </Table>
      </TableContainer>
      <Button>Додати кредит</Button>
    </>
  );
}
function Invest() {
  return (
    <>
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
              <Th>Походження</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody></Tbody>
        </Table>
      </TableContainer>
      <Button>Додати інвестицію</Button>
    </>
  );
}
function DerjSup() {
  return (
    <>
      <Text
        textAlign={"center"}
        fontSize={"25px"}
        mt={"15px"}
        textTransform={"uppercase"}
      >
        Державна підтримка субсидія
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
          <Tbody></Tbody>
        </Table>
      </TableContainer>
      <Button>Додати державну підтримку</Button>
    </>
  );
}

function Grant() {
  return (
    <>
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
          <Tbody></Tbody>
        </Table>
      </TableContainer>
      <Button>Додати грант</Button>
    </>
  );
}

function Income() {
  const { income, user, map } = useContext(Context);
  const yieldPlants: resYieldPlant[] = JSON.parse(
    JSON.stringify(income.yieldPlant)
  );
  yieldPlants.sort((a, b) => a.id! - b.id!);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [res, setRes] = useState<incProp>({ cultureId: "", comment: "" });
  const [showAlert, setShowAlert] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState<any>({
    idOpen: false,
    text: "планування",
    func: () => {},
    operId: null,
    cartId: null,
  });
  useEffect(() => {
    getSale(income);
    getIncome(income);
  }, []);
  const [plantId, setPlantId] = useState(0);
  const [incomeOpen, setIncomeOpen] = useState(false);
  const [incomeRes, setIncomeRes] = useState<IncomeProp>({
    //@ts-ignore
    group: "",
    //@ts-ignore
    type: "",
    //@ts-ignore
    propId: "",
  });
  const [prodOpen, setProdOpen] = useState(false);
  const [prodRes, setProdRes] = useState<productionProp>({
    productId: "",
    techCartId: "",
  });
  const [saleOpen, setSaleOpen] = useState(false);
  const [saleRes, setSaleRes] = useState<SaleProp>({
    amount: "",
    date: "",
    price: "",
    productionId: "",
  });
  const [year, setYear] = useState(new Date().getFullYear());
  return (
    <Container maxW="container.lg">
      <Tabs>
        <TabList>
          <NumberInput
            defaultValue={year}
            onChange={(e) => setYear(+e)}
            width={"100px"}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Select width={"fit-content"}>
            <option value="">Січель</option>
            <option value="">Лютий</option>
            <option value="">Березень</option>
            <option value="">I квартал</option>
            <option value="">Квітень</option>
            <option value="">Травень</option>
            <option value="">Червень</option>
            <option value="">II квартал</option>
            <option value="">Липень</option>
            <option value="">Серпень</option>
            <option value="">Вересень</option>
            <option value="">III квартал</option>
            <option value="">Жовтень</option>
            <option value="">Листопад</option>
            <option value="">Грудень</option>
            <option value="">IV квартал</option>
            <option value="">Рік</option>
          </Select>
          <Tab ml={"15px"}>Всі доходу</Tab>
          <Tab>Виручка</Tab>
          <Tab>Кредит</Tab>
          <Tab>Інвестиції</Tab>
          <Tab>Державна підтримка</Tab>
          <Tab>Грант</Tab>
        </TabList>
        <Text
          textAlign={"center"}
          fontSize={"25px"}
          mt={"15px"}
          textTransform={"uppercase"}
        >
          Виручка від основного виробництва
        </Text>
        <Heading textAlign={"center"} fontSize={"25px"} mt={"15px"}>
          Планування урожайності
        </Heading>
        <TableContainer
          maxW="1000px"
          mx="auto"
          mt={"20px"}
          overflowX={"scroll"}
        >
          <Table size={"sm"}>
            <Thead>
              <Tr>
                <Th></Th>
                <Th>Культура</Th>
                <Th>Коментар</Th>
                <Th>Густота насаджень</Th>
                <Th>Урожайність з гектару</Th>
                <Th>Урожайність з рослини</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {yieldPlants.map((el) => {
                return (
                  <Tr key={el.id!}>
                    <Td
                      textAlign={"center"}
                      onClick={() => {
                        setPlantId(el.id!);
                        setUpdate(true);
                        setOpen(true);
                        setRes({
                          comment: el.comment,
                          cultureId: el.cultureId!,
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
                      <Link to={YIELD_CALC_ROUTER + "/" + el.id}>
                        <ViewIcon boxSize={5} /> {el?.culture?.name}
                      </Link>
                    </Td>
                    <Td>{el.comment}</Td>
                    <Td>{el.plantingDensity}</Td>
                    <Td>{el.yieldPerHectare}</Td>
                    <Td>{el.yieldPerRoll}</Td>
                    <Td
                      textAlign={"center"}
                      cursor={"pointer"}
                      color={"red"}
                      onClick={
                        user.role == ""
                          ? () => setShowAlert(true)
                          : () => {
                              setDeleteOpen(() => ({
                                ...deleteOpen,
                                isOpen: true,
                                cartId: el.id!,
                                text: "карту",
                                func: () => {
                                  deleteYieldPlant(income, {
                                    yieldPlantId: el.id!,
                                  });
                                  setDeleteOpen({
                                    ...deleteOpen,
                                    isOpen: false,
                                  });
                                },
                              }));
                            }
                      }
                    >
                      <DeleteIcon w={"20px"} h={"auto"} />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        <Button mt={"15px"} onClick={() => setOpen(true)}>
          Добавити культуру
        </Button>
        <CreateYield
          open={open}
          setOpen={setOpen}
          res={res}
          setRes={setRes}
          update={update}
          plantId={plantId}
        />
        <NoAuthAlert setShowAlert={setShowAlert} showAlert={showAlert} />
        {!!deleteOpen.isOpen && (
          <DeleteAlert
            open={deleteOpen.isOpen}
            setOpen={setDeleteOpen}
            text={deleteOpen.text}
            func={deleteOpen.func}
          />
        )}
        <Heading textAlign={"center"} fontSize={"25px"} mt={"15px"}>
          Планування основного виробництва
        </Heading>
        {/* <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <Table size={"sm"}>
          <Thead>
            <Th>Назва культури</Th>
            <Th>Площа га</Th>
            <Th>Урожайність т/га</Th>
            <Th>Валовий збір</Th>
          </Thead>
          </Table>
        </TableContainer> */}
        <PlanIncomeProductionTable />
        <Button onClick={() => setProdOpen(true)}>
          Додати продукт або послугу
        </Button>
        <CreateProductService
          open={prodOpen}
          setOpen={setProdOpen}
          res={prodRes}
          setRes={setProdRes}
        />
        <TabPanels>
          <TabPanel>
            <Sale
              map={map}
              income={income}
              year={year}
              saleOpen={saleOpen}
              saleRes={saleRes}
              setSaleOpen={setSaleOpen}
              setSaleRes={setSaleRes}
            />
            <Credit />
            <Invest />
            <DerjSup />
            <Grant />
          </TabPanel>
          <TabPanel>
            <Sale
              map={map}
              income={income}
              year={year}
              saleOpen={saleOpen}
              saleRes={saleRes}
              setSaleOpen={setSaleOpen}
              setSaleRes={setSaleRes}
            />
          </TabPanel>
          <TabPanel>
            <Credit />
          </TabPanel>
          <TabPanel>
            <Invest />
          </TabPanel>
          <TabPanel>
            <DerjSup />
          </TabPanel>
          <TabPanel>
            <Grant />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Text textAlign={"center"} fontSize={"25px"} mt={"25px"}>
        Розрахунок грошового потоку (доходи)
      </Text>
      <TableContainer>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Назва</Th>
              <Th>Тип витрат</Th>
              <Th>Група витрат</Th>
              <Th>Сума</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {income.income.map((el) => {
              const sale = income.sale.find((e) => e.id == el.saleId);
              const product = map.product.find(
                (e) =>
                  e.id ==
                  income.production.find((e) => e.id == sale?.productionId)
                    ?.productId
              );
              return (
                <Tr key={el.id}>
                  <Td></Td>
                  <Td>{product?.name}</Td>
                  <Td>{el.type}</Td>
                  <Td>{el.group}</Td>
                  <Td>{sale?.amount! * sale?.price!}</Td>
                  <Td></Td>
                  <Td
                    onClick={() =>
                      setIsUsingIncome(income, {
                        incomeId: el.id!,
                        value: !el.isUsing,
                      })
                    }
                  >
                    <Checkbox
                      size="md"
                      colorScheme="green"
                      isChecked={el.isUsing}
                    >
                      Додати в розрахунок
                    </Checkbox>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Button onClick={() => setIncomeOpen(true)}>Додати дохід</Button>
      <CreateIncome
        open={incomeOpen}
        setOpen={setIncomeOpen}
        res={incomeRes}
        setRes={setIncomeRes}
      />
    </Container>
  );
}

export default observer(Income);
