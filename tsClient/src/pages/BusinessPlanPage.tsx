import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Heading,
  Button,
  TableContainer,
  Text,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";
import BusinessConceptTable from "../modules/TEJConceptTable";
import { useParams } from "react-router-dom";
import { Context } from "../main";
import { Ispecial_work } from "../../../tRPC serv/models/models";
import { observer } from "mobx-react-lite";
import {
  getBuyingMachine,
  getGrades,
  getFinancing,
  getJob,
  getManyCartWithOpers,
  getTEJ,
  getVegetationYear,
  getWorker,
  getYieldPlants,
  getPublicBusiness,
} from "../http/requests";
import useBusiness from "../shared/hook/useBusiness";
import CreateBusiness, { CreateBusinessProp } from "../modules/CreateBusiness";
import { setPatchBusinessPlan } from "../modules/BusinessTable";
import QuizBusinessPopUp from "../modules/QuizBusinessPopUp";
import useEnterprise from "../shared/hook/useEnterprise";
import { CreateEnterpriseProps } from "../modules/CreateEnterprise/CreateEnterprise";
import CreateEnterprise from "../modules/CreateEnterprise";
export type iName = "resume" | "titlePage" | "";
export type iChild =
  | "aboutProject"
  | "investment"
  | "finIndicators"
  | "deduction"
  | "title";
import getSectionsOpers from "../store/GetSectionsOpers";
import CreateBuyingMachine, {
  CreateBuyingMachineProps,
} from "../modules/CreateBuyingMachine";
import {
  BuyingMachineTableBodyRow,
  BuyingMachineTableHead,
} from "../modules/BuyingMachineTable/BuyingMachineTable";
import { workProps } from "../modules/CreateWork";
import sort from "../shared/funcs/sort";
import TitleBusinessPlan from "src/modules/TitleBusinessPlan";
import ResumeBusinessPlan from "src/modules/ResumeBusinessPlan";
import EnterpriseBusinessPlan from "src/modules/EnterpriseBusinessPlan";
import ProductionBusinessPlan from "src/modules/ProductionBusinessPlan/ProductionBusinessPlan";
import FinancingBusinessPlan from "src/modules/FinancingBusinessPlan";
import PlanedIndicatorsBusinessPlan from "src/modules/PlanedIndicatorsBusinessPlan";
import AdditionBusinessPlan from "src/modules/AdditionBusinessPlan";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import MainFinancingBusinessPlanTable from "src/modules/MainFinancingBusinessPlanTable";
import AddFinancingToBusinessPlan from "src/modules/AddFinancingToBusinessPlan";
import { ColumnDef } from "@tanstack/react-table";
import TableContent from "src/components/TableComponent/TableContent";
import MyPlusIcon from "src/ui/Icons/MyPlusIcon";
import MyDeleteIcon from "src/ui/Icons/MyDeleteIcon";
import EnterpriseBusTable from "src/modules/EnterpriseBusTable";
function BiznesPlanPage() {
  const [businessOpen, setBusinessOpen] = useState(false);
  //@ts-ignore
  const [businessRes, setBusinessRes] = useState<CreateBusinessProp>({});
  const { map, user, enterpriseStore, business, income, TEJ } =
    useContext(Context);
  useBusiness(business, map);
  useEnterprise();
  useEffect(() => {
    getYieldPlants(income);
    getVegetationYear(income);
    getWorker(enterpriseStore);
    getJob(enterpriseStore);
    getBuyingMachine(map);
    getFinancing(income);
    getGrades(map);
    getTEJ(TEJ);
    getPublicBusiness(map, business);
  }, []);
  const { id } = useParams();
  const myBusiness =
    business.businessPlan.find((el) => el.id == id) ||
    business.publicBusinessPlan.find((el) => el.id == id);

  const [openQuiz, setOpenQuiz] = useState(false);
  const [update, setUpdate] = useState(false);
  const [quizRes, setQuizRes] = useState({});
  const [ready, setReady] = useState(false);
  const [cartReady, setCartReady] = useState(false);
  const [operReady, setOperReady] = useState(false);
  const [buyingMachineOpen, setBuyingMachineOpen] = useState(false);
  const [buyingMachineRes, setBuyingMachineRes] =
    useState<CreateBuyingMachineProps>({
      amount: "",
      brand: "",
      cost: "",
      date: "",
      name: "",
      purpose: "",
      businessPlanId: myBusiness?.id!,
      enterpriseId: myBusiness?.enterpriseId!,
    });

  const start = +myBusiness?.dateStart?.split("-")[0]!;
  const end = +start + +myBusiness?.realizationTime!;
  const titleRef = useRef<HTMLTableElement>(null);
  const resumeRef = useRef<HTMLTableElement>(null);
  const enterpriseRef = useRef<HTMLTableElement>(null);
  const productionRef = useRef<HTMLTableElement>(null);
  const financingRef = useRef<HTMLTableElement>(null);
  const indicatorRef = useRef<HTMLTableElement>(null);
  const additionRef = useRef<HTMLTableElement>(null);

  const buttonsRef = useRef<HTMLParagraphElement>(null);
  const cultureSet = new Set(
    myBusiness?.busCuls?.map((el) => el?.culture?.name!)
  );
  const productSet = new Set(
    myBusiness?.busCuls?.map((el) => el.culture?.product!)
  );
  let thisWorkers = enterpriseStore.worker?.filter(
    (e) =>
      e.enterpriseId == myBusiness?.enterpriseId! &&
      e.form == myBusiness?.enterprise?.form
  );
  const specData =
    myBusiness?.busCuls.map((cul) => ({
      id: cul.id,
      product: "",
      culture: cul.culture?.name,
      technology: cul.cultivationTechnology?.name,
      area: cul.area,
    })) || [];

  const specColumns = useMemo<
    ColumnDef<{
      id: number;
      product: string;
      culture: string;
      technology: string;
      area: string;
    }>[]
  >(
    () => [
      {
        header: "",
        accessorKey: "id",
        cell: ({ row: { original } }) => (
          <Box>
            <MyEditIcon />
          </Box>
        ),
      },
      { header: "Продукт", accessorKey: "product" },
      { header: "Культура", accessorKey: "culture" },
      { header: "Технологія", accessorKey: "technology" },
      { header: "Площа", accessorKey: "area" },
      {
        header: "",
        accessorKey: "id",
        cell: ({ row: { original } }) => (
          <Box>
            <MyDeleteIcon />
          </Box>
        ),
      },
    ],
    []
  );
  let thisMaps = (() => {
    let thisMaps = [];
    for (let j = 0; j < myBusiness?.busCuls?.length!; j++) {
      const e = myBusiness?.busCuls[j];
      let maps = map.businessCarts
        .filter((el) => el.isBasic)
        .map((m) => ({
          ...m,
          area: e?.area!,
        }));
      maps = maps.filter((el) => {
        return (
          el.cultureId == e?.cultureId &&
          el.cultivationTechnologyId == e?.cultivationTechnologyId
        );
      });
      thisMaps.push(...maps);
    }
    return thisMaps;
  })();
  useEffect(() => {
    if (myBusiness) {
      console.log("є");

      setReady(true);
    }
  }, [myBusiness]);
  useEffect(() => {
    if (thisMaps[0]) {
      console.log("є карта");

      setCartReady(true);
    }
  }, [thisMaps[0]]);
  useEffect(() => {
    if (map.opers[0]) {
      console.log("є карта");

      setOperReady(true);
    }
  }, [map.opers[0]?.nameOperation]);
  useEffect(() => {
    if (cartReady) {
      getManyCartWithOpers(
        map,
        thisMaps.map((el) => el.id!)
      );
    }
  }, [cartReady]);
  let sections = useMemo(() => {
    if (operReady) {
      return thisMaps.map((el) => {
        console.log(el.id);

        return { data: getSectionsOpers(map, el.id!), year: el.year };
      });
    }
  }, [map.opers, cartReady, operReady]);

  console.log(sections);
  let works = sort<Ispecial_work>(map.works);
  const [workRes, setWorkRes] = useState<workProps>({
    nameWork: "",
    area: "",
    salary: "",
    priceDiesel: "",
  });
  const [workOpen, setWorkOpen] = useState(false);
  const thisCredit = myBusiness?.financings.filter((el) => el.type == "credit");

  let thisInvestment =
    myBusiness?.financings.filter((el) => el.type == "investment") || [];
  thisInvestment = [
    ...thisInvestment,
    {
      date: myBusiness?.dateStart!,
      calculationMethod: "На бізнес-план",
      calculationType: "Індивідуальний",
      cost: myBusiness?.initialAmount!,
      isUseCost: false,
      name: "Початкові інвестиції",
      purpose: "Власні",
      type: "investment",
      id: 0,
    },
  ];
  const thisDerj = myBusiness?.financings.filter(
    (el) => el.type == "derj_support"
  );
  const thisGrand = myBusiness?.financings.filter((el) => el.type == "grant");
  const [addOpen, setAddOpen] = useState(false);
  const [addData, setAddData] = useState<number[]>([]);

  return !ready && !cartReady ? (
    <Box></Box>
  ) : (
    <Box overflowX={"auto"} maxW={"1100px"} mx={"auto"}>
      <Heading mt={3} textAlign={"center"} fontSize={"25"}>
        Бізнес-план {myBusiness?.name}
      </Heading>
      <Text textAlign={"center"} textTransform={"uppercase"} fontSize={"20px"}>
        Загальні дані
      </Text>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Td></Td>
              <Td>Ім'я</Td>
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
      </TableContainer>
      <CreateBusiness
        open={businessOpen}
        setOpen={setBusinessOpen}
        res={businessRes}
        setRes={setBusinessRes}
        update={true}
        setUpdate={() => {}}
      />
      <EnterpriseBusTable myBusiness={myBusiness} />
      <Heading mt={3} textAlign={"center"} fontSize={"25"}>
        Спеціалізація
      </Heading>
      <Table size={"sm"}>
        <TableContent columns={specColumns} data={specData} />
        {specData.length < 5 && (
          <Tr>
            <Td colSpan={6}>
              <MyPlusIcon />
            </Td>
          </Tr>
        )}
        <Tr>
          <Td colSpan={4}>Корисна площа</Td>
          <Td>{specData.reduce((p, c) => p + c.area, 0)}</Td>
        </Tr>
      </Table>
      <Heading mt={3} textAlign={"center"} fontSize={"25"}>
        Залучення фінансування
      </Heading>
      <MainFinancingBusinessPlanTable
        thisCredit={thisCredit!}
        thisInvestment={thisInvestment!}
        thisDerj={thisDerj!}
        thisGrant={thisGrand!}
        isPlan={true}
      />
      <Button
        onClick={() => {
          setAddOpen(true);
          setAddData(myBusiness?.financings.map((el) => el.id!)!);
        }}
      >
        Додати
      </Button>
      <AddFinancingToBusinessPlan
        open={addOpen}
        setOpen={setAddOpen}
        data={addData}
        businessId={+id!}
      />
      <Heading mt={3} textAlign={"center"} fontSize={"25"}>
        Купівля техніки та обладнання
      </Heading>
      <TableContainer>
        <Table size={"sm"}>
          <Thead>
            <BuyingMachineTableHead isPlan={true} />
          </Thead>
          <Tbody>
            {map.buyingMachine.map((el) => {
              if (
                el.businessPlanId == myBusiness?.id &&
                el.enterpriseId == myBusiness?.enterpriseId
              )
                return (
                  <BuyingMachineTableBodyRow
                    key={el.id!}
                    isPlan={true}
                    el={el}
                    setOpen={setBuyingMachineOpen}
                    setRes={setBuyingMachineRes}
                    setUpdate={setUpdate}
                  />
                );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Button
        onClick={() => {
          setBuyingMachineOpen(true);
          setBuyingMachineRes({
            businessPlanId: myBusiness?.id!,
            enterpriseId: myBusiness?.enterpriseId!,
            amount: "",
            brand: "",
            cost: "",
            date: "",
            name: "",
            purpose: "",
          });
        }}
      >
        Додати нову техніку
      </Button>
      <CreateBuyingMachine
        open={buyingMachineOpen}
        setOpen={setBuyingMachineOpen}
        data={buyingMachineRes}
        update={update}
        setUpdate={setUpdate}
      />
      <Heading mt={3} textAlign={"center"} fontSize={"25"}>
        Будівництво будівель і споруд
      </Heading>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th>Назва</Th>
              <Th>Початкова вартість</Th>
              <Th>Початок екстплатації</Th>
              <Th>Походження</Th>
            </Tr>
          </Thead>
          <Tbody></Tbody>
        </Table>
      </TableContainer>
      <Box mt={"15px"} ml={"auto"} mb={"25px"} display={"flex"} gap={"10px"}>
        <Button onClick={() => setWorkOpen(true)}>
          Добавити спеціалізовані роботи
        </Button>
      </Box>
      <Heading mt={3} textAlign={"center"} fontSize={"25"}>
        Малоцінні та швидкозношувальні прeдмети
      </Heading>
      <Table size={"sm"}>
        <Thead>
          <BuyingMachineTableHead isPlan={true} />
        </Thead>
        <Tbody></Tbody>
      </Table>
      <Button>Додати нове МШП</Button>
      <Heading mt={3} textAlign={"center"} fontSize={"25"}>
        Витрати постійні
      </Heading>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th>Сатті витрат</Th>
            <Th>Сума в місяць</Th>
            <Th>Сума за рік</Th>
            <Th>Вид розрахунку</Th>
          </Tr>
        </Thead>
        <Tbody></Tbody>
      </Table>
      <Button>Додати витрату</Button>
      <Heading mt={3} textAlign={"center"} fontSize={"25"}>
        Витрати загальновиробничі
      </Heading>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th>Сатті витрат</Th>
            <Th>Сума в місяць</Th>
            <Th>Сума за рік</Th>
            <Th>Вид розрахунку</Th>
          </Tr>
        </Thead>
        <Tbody></Tbody>
      </Table>
      <Button>Додати витрату</Button>
      <QuizBusinessPopUp
        open={openQuiz}
        setOpen={setOpenQuiz}
        update={update}
        setUpdate={setUpdate}
        res={quizRes}
        setRes={setQuizRes}
        enterpriseId={myBusiness?.enterpriseId!}
        //@ts-ignore
        cultures={myBusiness?.busCuls?.map((el) => el.culture)}
        myBusiness={myBusiness!}
      />
      <Box
        // display={"grid"}
        display={"flex"}
        justifyContent={"space-between"}
        ref={buttonsRef}
        // gridTemplateColumns={"1fr 1fr"}
      >
        {/* <Box
        gridColumnStart={1} gridColumnEnd={3}
        > */}
        <Button>Отримати PDF</Button>
        <Button
          onClick={() => {
            setOpenQuiz(true);
            setQuizRes({
              cultureIds: myBusiness ? setPatchBusinessPlan(myBusiness) : null,
              dateStart: myBusiness?.dateStart,
              enterpriseId: myBusiness?.enterpriseId!,
              initialAmount: myBusiness?.initialAmount,
              name: myBusiness?.name,
              realizationTime: myBusiness?.realizationTime,
              planId: myBusiness?.id,
            });
          }}
        >
          Конструктор
        </Button>
        {/* </Box> */}
      </Box>
      <Box
        maxW={"1000px"}
        mx="auto"
        display={["block", "block", "block", "flex"]}
        gap={"30px"}
      >
        <TableContainer
          maxW="min-content"
          mt={"20px"}
          overflowX={"auto"}
          gridColumnStart={1}
          gridColumnEnd={2}
        >
          <BusinessConceptTable
            setOpenResume={() => {}}
            setOpenTitle={() => {}}
            getData={() => {}}
            indicatorRef={indicatorRef}
            additionRef={additionRef}
            enterpriseRef={enterpriseRef}
            financingRef={financingRef}
            productionRef={productionRef}
            resumeRef={resumeRef}
            titleRef={titleRef}
            buttonsRef={buttonsRef}
          />
        </TableContainer>
        <Box
          mt={4}
          w={"720px"}
          h={`${720 * 1.4}px`}
          border={"black 2px solid"}
          p={"30px"}
          px={"30px"}
          overflowY={"auto"}
          // gridColumnStart={2}
          // gridColumnEnd={3}
        >
          <TitleBusinessPlan
            topic={myBusiness?.topic!}
            name={myBusiness?.name!}
            aref={titleRef}
          />
          <ResumeBusinessPlan
            area={myBusiness?.busCuls?.reduce((p, c) => p + c.area, 0) || 0}
            dateStart={myBusiness?.dateStart!}
            productSet={productSet}
            aref={resumeRef}
          />
          <EnterpriseBusinessPlan
            cultureSet={cultureSet}
            end={end}
            start={start}
            form={myBusiness?.enterprise?.form!}
            myBusiness={myBusiness!}
            name={myBusiness?.enterprise?.name!}
            taxGroup={myBusiness?.enterprise?.taxGroup!}
            thisWorkers={thisWorkers}
            aref={enterpriseRef}
          />
          <ProductionBusinessPlan
            end={end}
            start={start}
            myBusiness={myBusiness!}
            thisMaps={thisMaps}
            productSet={productSet}
            area={myBusiness?.busCuls?.reduce((p, c) => p + c.area, 0) || 0}
            aref={productionRef}
          />
          <FinancingBusinessPlan
            start={start}
            end={end}
            thisCredit={thisCredit}
            thisDerj={thisDerj}
            thisGrand={thisGrand}
            thisInvestment={thisInvestment}
            aref={financingRef}
          />
          <PlanedIndicatorsBusinessPlan
            aref={indicatorRef}
            start={start}
            end={end}
            myBusiness={myBusiness!}
            thisWorkers={thisWorkers}
            thisMaps={thisMaps}
          />
          <AdditionBusinessPlan
            start={start}
            end={end}
            form={myBusiness?.enterprise?.form!}
            myBusiness={myBusiness!}
            thisMaps={thisMaps}
            thisWorkers={thisWorkers}
            cultureSet={cultureSet}
            sections={sections!}
            operReady={operReady}
            thisCredit={thisCredit}
            thisDerj={thisDerj}
            thisGrand={thisGrand}
            thisInvestment={thisInvestment}
            aref={additionRef}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default observer(BiznesPlanPage);
