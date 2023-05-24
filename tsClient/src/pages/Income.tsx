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
import DeleteAlert, { IdeleteHeading } from "../components/DeleteAlert";
import {
  deleteCredit,
  deleteDerj,
  deleteGrant,
  deleteIncome,
  deleteInvestment,
  deleteSale,
  deleteYieldPlant,
  getCredit,
  getDerj,
  getGrant,
  getIncome,
  getInvestment,
  getSale,
  patchSale,
  setIsUsingIncome,
} from "../http/requests";
import { incProp } from "../modules/CreateYield/CreateYield";
import { resYieldPlant } from "../../../tRPC serv/controllers/incomeService";
import CreateIncome, { IncomeProp } from "../modules/CreateIncome/CreateIncome";
import CreateSale, { SaleProp } from "../modules/CreateSale/CreateSale";
import MapStore from "../store/MapStore";
import IncomeStore from "../store/IncomeStore";

import SaleTable from "../modules/SaleTable";

function Sale({
  map,
  income,
  year,
  month,
  setDeleteOpen,
}: {
  map: MapStore;
  income: IncomeStore;
  year: number;
  month: string;
  setDeleteOpen: Dispatch<
    SetStateAction<{
      isOpen: boolean;
      text: IdeleteHeading;
      func: any;
      id: number;
    }>
  >;
}) {
  const [saleOpen, setSaleOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [saleRes, setSaleRes] = useState<SaleProp>({
    amount: "",
    date: "",
    price: "",
    productionId: "",
  });
  return (
    <>
      <Text
        textAlign={"center"}
        fontSize={"25px"}
        mt={"15px"}
        textTransform={"uppercase"}
      >
        Виручка
      </Text>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <SaleTable
          setDeleteOpen={setDeleteOpen as any}
          setSaleOpen={setSaleOpen}
          setSaleRes={setSaleRes}
          setUpdate={setUpdate}
          month={month}
          year={year}
        ></SaleTable>
      </TableContainer>
      {saleOpen && (
        <CreateSale
          open={saleOpen}
          setOpen={setSaleOpen}
          res={saleRes}
          setRes={setSaleRes}
          update={update}
          setUpdate={setUpdate}
        />
      )}
      <Button onClick={() => setSaleOpen(true)}>Додати розрахунок</Button>
    </>
  );
}

type deletePropsType = {
  isOpen: boolean;
  text: IdeleteHeading;
  func: any;
  id: number;
};
function Income() {
  const { income, user, map } = useContext(Context);
  const [showAlert, setShowAlert] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState<deletePropsType>({
    isOpen: false,
    text: "планування",
    func: () => {},
    id: 0,
  });
  useEffect(() => {
    getSale(income);
    getIncome(income);
  }, []);

  const [incomeOpen, setIncomeOpen] = useState(false);
  const [incomeUpdate, setIncomeUpdate] = useState(false);
  const [incomeRes, setIncomeRes] = useState<IncomeProp>({
    //@ts-ignore
    group: "",
    //@ts-ignore
    type: "",
    //@ts-ignore
    propId: "",
  });
  useEffect(() => {
    if (!income.credit[0]) getCredit(income);
  }, []);
  const [time, setTime] = useState({
    year: new Date().getFullYear(),
    month: "",
  });

  return (
    <Container maxW="container.lg">
      <Tabs>
        <TabList>
          <NumberInput
            defaultValue={time.year}
            onChange={(e) => setTime((prev) => ({ ...prev, year: +e }))}
            width={"100px"}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Select
            width={"fit-content"}
            value={time.month}
            onChange={(e) =>
              setTime((prev) => ({ ...prev, month: e.target.value }))
            }
          >
            <option value="01">Січель</option>
            <option value="02">Лютий</option>
            <option value="03">Березень</option>
            <option value="a">I квартал</option>
            <option value="04">Квітень</option>
            <option value="05">Травень</option>
            <option value="06">Червень</option>
            <option value="b">II квартал</option>
            <option value="07">Липень</option>
            <option value="08">Серпень</option>
            <option value="09">Вересень</option>
            <option value="c">III квартал</option>
            <option value="10">Жовтень</option>
            <option value="11">Листопад</option>
            <option value="12">Грудень</option>
            <option value="d  ">IV квартал</option>
            <option value="">Рік</option>
          </Select>
          <Tab ml={"15px"}>Всі доходу</Tab>
          <Tab>Виручка</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Sale
              map={map}
              income={income}
              year={time.year}
              month={time.month}
              setDeleteOpen={setDeleteOpen}
            />
          </TabPanel>
          <TabPanel>
            <Sale
              map={map}
              income={income}
              year={time.year}
              month={time.month}
              setDeleteOpen={setDeleteOpen}
            />
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
              const credit = income.credit.find((e) => e.id == el.creditId);
              const product = map.product.find(
                (e) =>
                  e.id ==
                  income.production.find((e) => e.id == sale?.productionId)
                    ?.productId
              );
              const derj = income.derj.find((e) => e.id == el.derjSupportId);
              const investment = income.investment.find(
                (e) => e.id == el.investmentId
              );
              const grant = income.grant.find((e) => e.id == el.grantId);
              return (
                <Tr key={el.id}>
                  <Td
                    onClick={() => {
                      setIncomeUpdate(true);
                      setIncomeRes({
                        group: el.group,
                        propId:
                          el.saleId! ||
                          el.creditId! ||
                          el.derjSupportId! ||
                          el.investmentId! ||
                          el.grantId!,
                        type: el.type,
                        id: el.id,
                      });
                      setIncomeOpen(true);
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
                    {product?.name ||
                      credit?.name ||
                      derj?.name ||
                      investment?.name ||
                      grant?.name}
                  </Td>
                  <Td>{el.type}</Td>
                  <Td>{el.group}</Td>
                  <Td>
                    {sale?.amount! * sale?.price! ||
                      credit?.cost ||
                      derj?.cost ||
                      investment?.cost ||
                      grant?.cost}
                  </Td>
                  <Td
                    onClick={() => {
                      setDeleteOpen({
                        isOpen: true,
                        func: () => {
                          deleteIncome(income, { incomeId: el.id! });
                          setDeleteOpen((prev) => ({ ...prev, isOpen: false }));
                        },
                        text: "прибуток",
                        id: el.id!,
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
        update={incomeUpdate}
        setUpdate={setIncomeUpdate}
      />
      <NoAuthAlert setShowAlert={setShowAlert} showAlert={showAlert} />
      {!!deleteOpen.isOpen && (
        <DeleteAlert
          open={deleteOpen.isOpen}
          setOpen={setDeleteOpen as any}
          text={deleteOpen.text}
          func={deleteOpen.func}
        />
      )}
    </Container>
  );
}

export default observer(Income);
