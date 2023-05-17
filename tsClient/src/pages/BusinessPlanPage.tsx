import React, { useContext, useRef, useState } from "react";
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Box,
  Heading,
  Button,
  TableContainer,
  Text,
  Textarea,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";
import { EditIcon, PlusSquareIcon, ViewIcon } from "@chakra-ui/icons";
import CreateResume from "../modules/CreateResume";
import BusinessConceptTable from "../modules/TEJConceptTable";
import { Link, useParams } from "react-router-dom";
import { Context } from "../main";
import { IbusinessPlan } from "../../../tRPC serv/models/models";
import { observer } from "mobx-react-lite";
import { resBusinessPlan } from "../../../tRPC serv/controllers/BusinessService";
import { names } from "../modules/TEJConceptTable/index";
import SelectCart from "../modules/TEJConceptTable/component/SelectCart";
import CartsTableInBusiness from "../modules/CartsTableInBusiness";
import { patchResume, patchTitlePage } from "../http/requests";
import CreateTitlePage from "../modules/CreateTitlePage";
import useBusiness from "./hook/useBusiness";
import denistina from "../../font/denistina_en.ttf";
import CreateBusiness, { CreateBusinessProp } from "../modules/CreateBusiness";
import { setPatchBusinessPlan } from "../modules/BusinessTable";
import { ENTERPRISE_ROUTER } from "../utils/consts";
import QuizBusinessPopUp from "../modules/QuizBusinessPopUp";
import StaffingTable from "../modules/StaffingTable";
import useEnterprise from "./hook/useEnterprise";
import GeneralDataTable from "../modules/GeneralDataTable";
import CashFlowTable from "../modules/CashFlowTable";
import PlanIncomeProductionTable from "../modules/PlanIncomeProductionTable";
import SaleTable from "../modules/SaleTable";
import CostProdTable from "../modules/CostProdTable";
import CartsTable, { CartsTableHeadRow } from "../modules/CartsTable";
import SectionTitle from "../ui/SectionTitle/SectionTitle";
import Description from "../ui/Description";
import TableName from "../ui/TableName";
import TableNumber from "../ui/TableNumber";
import { CostProdTableHeadRows } from "../modules/CostProdTable/CostProdTable";
import { SaleTableHeadRows } from "../modules/SaleTable/SaleTable";
import { PlanIncomeProductionTableHeadRow } from "../modules/PlanIncomeProductionTable/PlanIncomeProductionTable";
import {
  StaffingTableBodyRows,
  StaffingTableHeadRow,
} from "../modules/StaffingTable/StaffingTable";
import Paragraph from "../ui/Paragraph";
export type iName = "resume" | "titlePage" | "";
export type iChild =
  | "aboutProject"
  | "investment"
  | "finIndicators"
  | "deduction"
  | "title";
function BiznesPlanPage() {
  const [openResume, setOpenResume] = useState<boolean>(false);
  const [openTitle, setOpenTitle] = useState<boolean>(false);
  const [name, setName] = useState<iName>();
  const [child, setChild] = useState<iChild>();
  const [showSelectCart, setShowSelectCart] = useState<boolean>(false);
  const [infCartId, setInfCartId] = useState<number>(0);
  const [businessOpen, setBusinessOpen] = useState(false);
  //@ts-ignore
  const [businessRes, setBusinessRes] = useState<CreateBusinessProp>({});
  const { map, user, enterpriseStore, business, income } = useContext(Context);
  useBusiness(business, map);
  const { id } = useParams();
  const Business: resBusinessPlan[] = JSON.parse(
    JSON.stringify(business.businessPlan)
  );
  const myBusiness = Business.find((el) => el.id == id);
  // if (!myBusiness) return;
  //@ts-ignore
  let data = name && child ? myBusiness[name][child] : "";
  const [nData, setNData] = useState<string>();
  function getData(name: iName, children: iChild, infCartId: number | null) {
    setIsActiveInput(false);
    setInfCartId(infCartId || 0);
    setChild(children);
    setName(name);
  }
  const myEnterprise = enterpriseStore.enterprise?.find(
    (el) => el.id == myBusiness?.enterpriseId
  );
  const [isActiveInput, setIsActiveInput] = useState(false);
  const [openQuiz, setOpenQuiz] = useState(false);
  const [updateQuiz, setUpdateQuiz] = useState(false);
  useEnterprise();

  const [quizRes, setQuizRes] = useState({});
  const start = +myBusiness?.dateStart?.split("-")[0]!;
  const end = +start + +myBusiness?.realizationTime!;
  const indicatorRef = useRef<HTMLTableElement>(null);
  const buttonsRef = useRef<HTMLParagraphElement>(null);
  const cultureSet = new Set(myBusiness?.busCuls.map((el) => el.culture.name));
  return (
    <Box overflowX={"auto"} maxW={"1100px"} mx={"auto"}>
      <Heading mt={3} textAlign={"center"} fontSize={"25"}>
        Бізнес-план {myBusiness?.name}
      </Heading>
      <Text textAlign={"center"} textTransform={"uppercase"} fontSize={"20px"}>
        Загальні дані
      </Text>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <Table>
          <Thead>
            <Tr>
              <Td></Td>
              <Td>Культура</Td>
              <Td>Технологія</Td>
              <Td>Площа</Td>
              <Td>Дата початку</Td>
              <Td>Термін реалізації</Td>
              <Td>Початкова сума</Td>
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
                    cultureIds: cultureIds || [{ id: 0, tech: [] }],
                    dateStart: myBusiness?.dateStart!,
                    enterpriseId: myBusiness?.enterpriseId!,
                    initialAmount: myBusiness?.initialAmount!,
                    name: myBusiness?.name!,
                    realizationTime: myBusiness?.realizationTime!,
                    planId: myBusiness?.id,
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
                {myBusiness?.busCuls?.map((el) => (
                  <Box>{el?.culture?.name}</Box>
                ))}
              </Td>
              <Td>
                {myBusiness?.busCuls?.map((el) => (
                  <Box>{el?.cultivationTechnology?.name}</Box>
                ))}
              </Td>
              <Td>
                {myBusiness?.busCuls?.map((el) => (
                  <Box>{el.area}</Box>
                ))}
              </Td>
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
      <Heading mt={3} textAlign={"center"} fontSize={"25"}>
        Підприємство
      </Heading>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Td></Td>
              <Td>Назва підприємства</Td>
              <Td>Організаційно правова форма</Td>
              <Td>Група оподаткування</Td>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td
                onClick={() => {
                  // setRes({
                  //   entId: el.id,
                  //   form: el.form,
                  //   name: el.name,
                  //   taxGroup: el.taxGroup,
                  // });
                  // setUpdate(true);
                  // setOpen(true);
                }}
              >
                <EditIcon
                  color={"blue.400"}
                  w={"20px"}
                  h={"auto"}
                  cursor={"pointer"}
                />
              </Td>
              <Td>{myEnterprise?.name}</Td>
              <Td>{myEnterprise?.form}</Td>
              <Td>{myEnterprise?.taxGroup}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <QuizBusinessPopUp
        open={openQuiz}
        setOpen={setOpenQuiz}
        update={updateQuiz}
        setUpdate={setUpdateQuiz}
        res={quizRes}
        setRes={setQuizRes}
        cultures={myBusiness?.busCuls?.map((el) => el.culture) || []}
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
            setOpenResume={setOpenResume}
            setOpenTitle={setOpenTitle}
            getData={getData}
            indicatorRef={indicatorRef}
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
          <Text fontSize={"20px"} fontWeight={"500"}>
            {names[child!]}
          </Text>
          <>
            <Box
              mx={"auto"}
              w={"fit-content"}
              mt={20}
              fontSize={"60px"}
              lineHeight={10}
              color={"#20401E"}
            >
              <Text>Ягідна </Text>
              <Text ml={"-20px"}>плантація</Text>
            </Box>
            <Text
              mt={40}
              fontSize={"32px"}
              fontWeight={"bold"}
              textAlign={"center"}
            >
              Бізнес-план
            </Text>
            <Text textAlign={"center"} mt={3}>
              Вирощування та продаж ягід:
            </Text>
            <Box mt={200} maxW={"80%"} mx={"auto"}>
              <Box mt={5}>
                <Text>Мета проекту</Text>
              </Box>
              <Box mt={5}>
                <Text>Розробник</Text>
              </Box>
              <Box mt={5}>
                <Text>Відповідальна особа</Text>
              </Box>
              <Text mt={50} textAlign={"center"} fontSize={"10px"}>
                Інформація, наведена у проекті, є конфіденційною та надається за
                умови, що не буде передана третім особам без попереднього
                погодження з розробником проекту
              </Text>
            </Box>
            <Box mt={20} textAlign={"center"}>
              <Text>Івано-франківськ</Text>
              <Text>2023</Text>
            </Box>
            <SectionTitle mt={5}>Резюме</SectionTitle>
            <Table size={"sm"}>
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th></Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td colSpan={3}>
                    <Paragraph>2.1 Про проект</Paragraph>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Опис проекту</Td>
                  <Td colSpan={2}>
                    Проект створення ягідної плантації площею {myBusiness?.area}{" "}
                    га
                  </Td>
                </Tr>

                <Tr>
                  <Td>Місце розташування</Td>
                  <Td colSpan={2}>
                    Ягідник буде розташовуватися на території Київської області.
                  </Td>
                </Tr>
                <Tr>
                  <Td>Актуальність</Td>
                  <Td colSpan={2}>
                    Сприятливими передумовами відкриття бізнесу в даному
                    напрямку є високі позиції України по виробництву ягід в
                    світі. Країна має відмінні географічні та кліматичні, що
                    відбивається на поступове підвищення валового збору і
                    врожайності продукту.
                  </Td>
                </Tr>
                <Tr>
                  <Td rowSpan={3}>
                    Високий попит і висока товарність ягід в Україні обумовлені:
                  </Td>
                  <Td colSpan={2}>
                    Винятковою їх цінністю як продуктів харчування;
                  </Td>
                </Tr>
                <Tr>
                  <Td colSpan={2}>
                    Заморожуванням продукції, яку можна зберігати і
                    реалізовувати протягом року і більше;
                  </Td>
                </Tr>
                <Tr>
                  <Td colSpan={2}>
                    Розташуванням України близько до ринку Європи
                  </Td>
                </Tr>
                <Tr></Tr>
                <Tr>
                  <Td rowSpan={3}>Термін реалізації проекту</Td>
                  <Td>Проекний період</Td>
                </Tr>
                <Tr>
                  <Td>Початок реалізації</Td>
                  <Td minW={"max-content"}>{myBusiness?.dateStart}</Td>
                </Tr>
                <Tr>
                  <Td>Початок продажів</Td>
                </Tr>
                {(() => {
                  const productSet = new Set(
                    myBusiness?.busCuls?.map((el) => el.culture.product)
                  );
                  console.log(productSet);

                  return [...productSet].map((el, ind) =>
                    ind == 0 ? (
                      <>
                        <Tr>
                          <Td rowSpan={productSet.size}>
                            Основні продукти підприємства
                          </Td>
                          <Td>{el}, охолоджені для реалізації (т)</Td>
                        </Tr>
                      </>
                    ) : (
                      <Tr>
                        <Td>{el}, охолоджені для реалізації (т)</Td>
                      </Tr>
                    )
                  );
                })()}
                <Tr></Tr>
                <Tr>
                  <Td rowSpan={7}>Бюджет проекту</Td>
                  <Td>Вартість проекту</Td>
                </Tr>
                <Tr>
                  <Td>В тому числі:</Td>
                </Tr>
                <Tr>
                  <Td>Власні кошти</Td>
                </Tr>
                <Tr>
                  <Td>Кредит</Td>
                </Tr>
                <Tr>
                  <Td>Інвестиційні кошти</Td>
                </Tr>
                <Tr>
                  <Td>Державна підтримка</Td>
                </Tr>
                <Tr>
                  <Td>Коофіцієнт автономії</Td>
                </Tr>
                <Tr>
                  <Td rowSpan={5}>Показинки проекту</Td>
                  <Td>Площа земельної ділянки</Td>
                </Tr>
                <Tr>
                  <Td>Валова виручка</Td>
                </Tr>
                <Tr>
                  <Td>Чистий прибуток</Td>
                </Tr>
                <Tr>
                  <Td>Рентабельність</Td>
                </Tr>
                <Tr>
                  <Td>Термін окупності</Td>
                </Tr>
                <Tr>
                  <Td colSpan={3}>
                    <Paragraph>2.2 Інвестиції</Paragraph>
                  </Td>
                </Tr>
                {/* <Tr>
                  <Td>Прибутковість проекту</Td>
                  <Td>
                    <Text>Валовий дохід</Text>
                    <Text>Чистий прибуток</Text>
                    <Text>Рентабельність</Text>
                    <Text>Термін окупності</Text>
                  </Td>
                  <Td></Td>
                </Tr> */}
                <Tr>
                  <Td rowSpan={4}>Інвестиційна привабливість проекту</Td>
                  <Td>Дисконтний період окупності (DPP), років</Td>
                </Tr>
                <Tr>
                  <Td>Чиста поточна варість проекту (NPV)</Td>
                </Tr>
                <Tr>
                  <Td>Внутрішня ставка доходу (IRR)</Td>
                </Tr>
                <Tr>
                  <Td>Індекс прибутковості вкладень (PI)</Td>
                </Tr>
                <Tr>
                  <Td rowSpan={4}>Початкові інвестиції</Td>
                  <Td>Створення насаджень культур</Td>
                </Tr>
                <Tr>
                  <Td>Купівля обладнання для крапельного зрошення</Td>
                </Tr>
                <Tr>
                  <Td>Купівля холодильної камери на 2 т</Td>
                </Tr>
                <Tr>
                  <Td>Покриття витрат до виходу в точку беззбитковості.</Td>
                </Tr>
                <Tr>
                  <Td colSpan={3}>
                    <Paragraph>2.3. Цілі, завдання та мета проекту</Paragraph>
                  </Td>
                </Tr>

                <Tr>
                  <Td rowSpan={4}>Цілі проекту</Td>
                  <Td>отримання прибутку від діяльності</Td>
                </Tr>
                <Tr>
                  <Td>
                    часткове задоволення попиту на ягоди на ринку України та
                    Європи
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    створення нових робочих місць під час реалізації проекту;
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    створення нових потоків надходжень до державного та місцевих
                    бюджетів.
                  </Td>
                </Tr>

                <Tr>
                  <Td rowSpan={4}>Завдання проекту</Td>
                  <Td colSpan={2}>
                    Розробка та опис шляхів створення підприємства з організації
                    горіхового саду та подальшого продажу врожаю у вигляді
                    горіхів в шкарлупі;
                  </Td>
                </Tr>
                <Tr>
                  <Td colSpan={2}>
                    Визначення передбачуваного місцеположення організації на
                    ринку (ринкової ніші)
                  </Td>
                </Tr>
                <Tr>
                  <Td colSpan={2}>
                    Опис товару, який організація буде реалізовувати споживачам;
                  </Td>
                </Tr>
                <Tr>
                  <Td colSpan={2}>
                    Аналіз доцільності розширення підприємства з точки зору
                    рентабельності і прибутковості;
                  </Td>
                </Tr>
                <Tr>
                  <Td></Td>
                  <Td>
                    Проведення аналізу ризиків та можливих загроз, що стоять
                    перед проектом, як в даний момент часу, так і в майбутньому.
                  </Td>
                </Tr>
                <Tr>
                  <Td rowSpan={2}>Мета проекту</Td>
                  <Td>Висадка ягідника</Td>
                </Tr>
                <Tr>
                  <Td>
                    Створення основи для можливого подальшого розширення
                    бізнесу.
                  </Td>
                </Tr>
                <Tr>
                  <Td>Географія збуту</Td>
                  <Td>Передбачувана територія збуту продукції – Україна.</Td>
                </Tr>
              </Tbody>
            </Table>
            <Table size={"sm"}>
              <Thead>
                <Tr>
                  <Th colSpan={6}>
                    <SectionTitle>Підприємство</SectionTitle>
                  </Th>
                </Tr>
                <Tr>
                  <Th colSpan={6}>
                    <TableName>
                      {`Штатний розпис ${myEnterprise?.form}`}
                    </TableName>
                  </Th>
                </Tr>
                <Tr>
                  <Th colSpan={6}>
                    <TableNumber></TableNumber>
                  </Th>
                </Tr>
                <StaffingTableHeadRow />
              </Thead>
              <Tbody>
                {(() => {
                  const res = [];
                  for (let i = start; i < end; i++) {
                    res.push(
                      <>
                        <Tr>
                          <Td>{i}</Td>
                        </Tr>
                        <StaffingTableBodyRows thisWorkers={[]} />
                      </>
                    );
                  }
                  return res;
                })()}
              </Tbody>
            </Table>

            <Table size={"sm"}>
              <Thead>
                <Tr>
                  <Th colSpan={4}>
                    <SectionTitle>Виробництво</SectionTitle>
                  </Th>
                </Tr>
                <Tr>
                  <Th colSpan={4}>
                    <TableName>Технологічні карти</TableName>
                  </Th>
                </Tr>
                <Tr>
                  <Th colSpan={4}>
                    <TableNumber></TableNumber>
                  </Th>
                </Tr>
                <CartsTableHeadRow role={"authenticated"} isPlan={true} />
              </Thead>
              <Tbody>
                {(() => {
                  const res = [];
                  for (let i = start; i < end; i++) {
                    res.push(<Tr>{i}</Tr>);
                    for (let j = 0; j < myBusiness?.busCuls.length; j++) {
                      const e = myBusiness?.busCuls[j];
                      let maps = map.maps.map((m) => ({
                        ...m,
                        area: e.area,
                      }));
                      maps = maps.filter(
                        (el) =>
                          el.cultureId == e?.cultureId &&
                          el.cultivationTechnologyId ==
                            e?.cultivationTechnologyId &&
                          el.year == i - start + 1
                      );
                      res.push(
                        <>
                          {maps.map((el) => (
                            <Tr>
                              <Td>{el.nameCart}</Td>
                              <Td>{el.area}</Td>
                              <Td>
                                {Math.round(el.area * el.costHectare! * 100) /
                                  100}
                              </Td>
                              <Td>{el.costHectare}</Td>
                            </Tr>
                          ))}
                        </>
                      );
                    }
                  }
                  return res;
                })()}
              </Tbody>
            </Table>
            <Table size="sm">
              <Tr>
                <Th colSpan={6}>
                  <Description>
                    Виробництво продукції планується з врахуванням урожайності
                    скоригованої по роках експлуатації насаджень.
                  </Description>
                </Th>
              </Tr>
              <Tr>
                <Th colSpan={6}>
                  <TableName>План виробництва продукції</TableName>
                </Th>
              </Tr>
              <Tr>
                <Th colSpan={6}>
                  <TableNumber></TableNumber>
                </Th>
              </Tr>
              <PlanIncomeProductionTableHeadRow isPlan={true} />
            </Table>
            {(() => {
              const res = [];
              for (let i = start; i < end; i++) {
                res.push(
                  <>
                    <Text fontWeight={"bold"}>{i}</Text>
                  </>
                );
              }
              return res;
            })()}
            {/* <Heading textAlign={"center"} size={"sm"} mt={5}>
              Продаж продукції
            </Heading> */}
            <Table>
              <Thead>
                <Tr>
                  <Th colSpan={7}>
                    <Description>
                      Руалізація продукції панується з глибоким зоморожуванням
                      якід (Додаток 2) згідно графіку.
                    </Description>
                  </Th>
                </Tr>
                <Tr>
                  <Th colSpan={7}>
                    <TableName>Графік реалізації продукції</TableName>
                  </Th>
                </Tr>
                <Tr>
                  <Th colSpan={7}>
                    <TableNumber></TableNumber>
                  </Th>
                </Tr>
                <SaleTableHeadRows isPlan={true} />
              </Thead>
              <Tbody>
                {(() => {
                  const res = [];
                  for (let i = start; i < end; i++) {
                    res.push(
                      <>
                        <Tr>
                          <Td>{i}</Td>
                        </Tr>
                      </>
                    );
                  }
                  return res;
                })()}
              </Tbody>
            </Table>

            <Box mt={"50px"}>
              <Table>
                <Thead>
                  <Tr>
                    <Th colSpan={9}>
                      <Description>
                        У структурі собівартості продукції виділено три групи
                        витрат: Прямі – розрахунок на основі технологічної карти
                        Загально-виробничі – розрахунок на основі вимог
                        забезпечення виробництва і збуту продукції Постійні –
                        розрахунок на основі вимог щодо адміністративного
                        управління підприємством
                      </Description>
                    </Th>
                  </Tr>
                  <Tr>
                    <Th colSpan={9}>
                      <TableName>Собіварість продукції</TableName>
                    </Th>
                  </Tr>
                  <Tr>
                    <Th colSpan={9}>
                      <TableNumber></TableNumber>
                    </Th>
                  </Tr>
                  <CostProdTableHeadRows />
                </Thead>
                <Tbody>
                  {(() => {
                    const res = [];
                    for (let i = start; i < end; i++) {
                      res.push(
                        <Tr>
                          <Td>{i}</Td>
                        </Tr>
                      );
                    }
                    return res;
                  })()}
                </Tbody>
              </Table>
              {(() => {
                const res = [];
                for (let i = start; i < end; i++) {
                  res.push(
                    <Table size={"sm"} mt={"10px"} key={i}>
                      <Thead>
                        <Tr>
                          <Th colSpan={3 + cultureSet.size}>
                            <Description>Опис</Description>
                          </Th>
                        </Tr>
                        <Tr>
                          <Th colSpan={3 + cultureSet.size}>
                            <TableName>{`Калькуляція планової собівартості виробленої продукції на ${i} рік`}</TableName>
                          </Th>
                        </Tr>
                        <Tr>
                          <Td rowSpan={2}>Статті витрат</Td>
                          <Td rowSpan={2}>Разом</Td>
                          <Td colSpan={cultureSet.size} textAlign={"center"}>
                            Продукція
                          </Td>
                          <Td rowSpan={2}>%</Td>
                        </Tr>
                        <Tr>
                          {[...cultureSet].map((el) => (
                            <Td>{el}</Td>
                          ))}
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td fontWeight={"bold"}>Постійні витрати</Td>
                        </Tr>
                        <Tr>
                          <Td>Заробітна плата</Td>
                        </Tr>
                        <Tr>
                          <Td>Нарахування (ЄСВ ВЗ)</Td>
                        </Tr>
                        <Tr>
                          <Td>Оренда плата за землю</Td>
                        </Tr>
                        <Tr>
                          <Td>Податок з власників землі</Td>
                        </Tr>
                        <Tr>
                          <Td>Електроенергія</Td>
                        </Tr>
                        <Tr>
                          <Td>Витрати на офіс</Td>
                        </Tr>
                        <Tr>
                          <Td>Податок (4 група)</Td>
                        </Tr>
                        <Tr>
                          <Td>Амортизація ОЗ</Td>
                        </Tr>
                        <Tr>
                          <Td>Амортизація БіоАктив</Td>
                        </Tr>
                        <Tr>
                          <Td>% по кредиту</Td>
                        </Tr>
                        <Tr>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight={"bold"}>Змінні витрати</Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight={"bold"}>Прямі</Td>
                        </Tr>
                        <Tr>
                          <Td>Догляд за насадженнями та збір</Td>
                        </Tr>
                        <Tr>
                          <Td>Нарахування (ЄСВ ВЗ)</Td>
                        </Tr>
                        <Tr>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight={"bold"}>Загально-виробничі</Td>
                        </Tr>
                        <Tr>
                          <Td>Елекроенергія</Td>
                        </Tr>
                        <Tr>
                          <Td>Тара і упаковка</Td>
                        </Tr>
                        <Tr>
                          <Td>Транспортні витрати на збут</Td>
                        </Tr>
                        <Tr>
                          <Td>Поточний ремонт</Td>
                        </Tr>
                        <Tr>
                          <Td>Податки</Td>
                        </Tr>
                        <Tr>
                          <Td></Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  );
                }
                return res;
              })()}
            </Box>

            <Heading textAlign={"center"} size={"md"} mt={5}>
              Фінансування
            </Heading>
            <Heading textAlign={"center"} size={"sm"} mt={5}>
              Грошовий потік
            </Heading>
            {(() => {
              const res = [];
              for (let i = start; i < end; i++) {
                res.push(
                  <Box mt={"50px"}>
                    <CashFlowTable
                      year={i}
                      startSum={myBusiness?.initialAmount}
                    />
                  </Box>
                );
              }
              return res;
            })()}
            <Heading textAlign={"center"} size={"sm"} mt={5}>
              План залучення коштів
            </Heading>
            {(() => {
              const res = [];
              for (let i = start; i < end; i++) {
                res.push(
                  <Table size={"sm"}>
                    <Thead>
                      <Tr>
                        <Th>Назва</Th>
                        <Th>Дата</Th>
                        <Th>Сума</Th>
                        <Th>Призначення</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {(() => {
                        const res = income.credit.map((e) => {
                          if (e.isUseCost && +e.date.split("-")[0] == i)
                            return (
                              <Tr>
                                <Td>{e.name}</Td>
                                <Td>{e.date}</Td>
                                <Td>{e.cost}</Td>
                                <Td>{e.purpose}</Td>
                              </Tr>
                            );
                        });
                        if (res)
                          return (
                            <>
                              <Tr>
                                <Td fontWeight={"bold"}>Кредит</Td>
                                <Td></Td>
                                <Td></Td>
                                <Td></Td>
                              </Tr>
                              {res}
                            </>
                          );
                      })()}
                    </Tbody>
                  </Table>
                );
              }
              return res;
            })()}
            <Table ref={indicatorRef}>
              <Thead>
                <Tr>
                  <Th colSpan={9}>
                    <SectionTitle>Показники планові</SectionTitle>
                  </Th>
                </Tr>
                <Tr>
                  <Th colSpan={9}>
                    <Description>
                      Критичний обсяг виробництва або рівень беззбитковості
                      (точка беззбитковості) відображає величину виручки від
                      реалізації продукції проекту, при якій повністю
                      покриваються всі витрати на виробництво продукції, не
                      отримуючи при цьому прибутку. Його розрахунок проводиться
                      в натуральному і вартісному виразах.
                    </Description>
                  </Th>
                </Tr>
                <Tr>
                  <Th colSpan={9}>
                    <TableName>
                      Визначення точки беззбитковості (тис. грн.)
                    </TableName>
                  </Th>
                </Tr>
                <Tr>
                  <Td colSpan={9} py={1}>
                    <TableNumber></TableNumber>
                  </Td>
                </Tr>
                <Tr>
                  <Th p={0}></Th>
                  <Th p={0}>Постійні</Th>
                  <Th p={0}>Змінні</Th>
                  <Th p={0} fontWeight={"normal"}>
                    Прямі
                  </Th>
                  <Th p={0} fontWeight={"normal"}>
                    Заг&nbsp;вир
                  </Th>
                  <Th p={0}>Витрати</Th>
                  <Th p={0}>Дохід</Th>
                  <Th p={0} fontWeight={"normal"}>
                    Виручка
                  </Th>
                  <Th p={0} fontWeight={"normal"}>
                    Підтримка
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td px={1}>
                    {myBusiness?.dateStart.split("-")[0] +
                      "." +
                      myBusiness?.dateStart.split("-")[1]}
                  </Td>
                  <Td px={1}>0</Td>
                  <Td px={1}>0</Td>
                  <Td px={1}>0</Td>
                  <Td px={1}>0</Td>
                  <Td px={1}>0</Td>
                  <Td px={1}>0</Td>
                  <Td px={1}>0</Td>
                  <Td px={1}>0</Td>
                </Tr>
                {(() => {
                  const res = [];
                  for (let i = start; i < end; i++) {
                    res.push(
                      <Tr>
                        <Td px={1}>{i + ".12"}</Td>
                      </Tr>
                    );
                  }
                  return res;
                })()}
                <Tr fontWeight={"bold"}>
                  <Td px={1}>Разом</Td>
                </Tr>
              </Tbody>
            </Table>
            <Heading textAlign={"center"} size={"sm"} mt={5}>
              Розрахунок собівартості продукції
            </Heading>
            <Heading textAlign={"center"} size={"md"} mt={5}>
              Додатки
            </Heading>
          </>
          <Box>
            {!!infCartId && child == "investment" && (
              <Box mt={4}>
                <CartsTableInBusiness cartId={infCartId} />
              </Box>
            )}
            <Button
              onClick={() => {
                setShowSelectCart(true);
              }}
            >
              Добавити таблицю
            </Button>
          </Box>
        </Box>
      </Box>
      <SelectCart
        open={showSelectCart}
        setOpen={setShowSelectCart}
        child={child!}
      />
      <CreateResume open={openResume} setOpen={setOpenResume} />
      <CreateTitlePage open={openTitle} setOpen={setOpenTitle} />
    </Box>
  );
}

export default observer(BiznesPlanPage);
