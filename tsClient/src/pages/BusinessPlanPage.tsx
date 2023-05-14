import React, { useContext, useState } from "react";
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
import CartsTable from "../modules/CartsTable";
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
  if (!myBusiness) throw new Error("плак плак");
  //@ts-ignore
  let data = name && child ? myBusiness[name][child] : "";
  const [nData, setNData] = useState<string>();
  function getData(name: iName, children: iChild, infCartId: number | null) {
    setIsActiveInput(false);
    setInfCartId(infCartId || 0);
    setChild(children);
    setName(name);
  }
  const myEnterprise = enterpriseStore.enterprise.find(
    (el) => el.id == myBusiness?.enterpriseId
  );
  const [isActiveInput, setIsActiveInput] = useState(false);
  const [openQuiz, setOpenQuiz] = useState(false);
  const [updateQuiz, setUpdateQuiz] = useState(false);
  useEnterprise();

  const [quizRes, setQuizRes] = useState({});
  const start = +myBusiness?.dateStart?.split("-")[0]!;
  const end = +start + +myBusiness?.realizationTime!;
  return (
    <Box overflowX={"scroll"} maxW={"1100px"} mx={"auto"}>
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
      <Box display={"flex"} justifyContent={"space-between"}>
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
      </Box>
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
        maxW={"1000px"}
        mx="auto"
        display={["block", "block", "block", "flex"]}
        gap={"30px"}
      >
        <TableContainer maxW="min-content" mt={"20px"} overflowX={"scroll"}>
          <BusinessConceptTable
            setOpenResume={setOpenResume}
            setOpenTitle={setOpenTitle}
            getData={getData}
          />
        </TableContainer>
        <Box
          mt={4}
          w={"720px"}
          h={`${720 * 1.4}px`}
          border={"black 2px solid"}
          p={"30px"}
          px={"30px"}
          overflowY={"scroll"}
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
            <Heading textAlign={"center"} size={"md"} mt={5}>
              Резюме
            </Heading>
            <Table>
              <Tbody>
                <Tr>
                  <Td>Опис проекту</Td>
                  <Td></Td>
                  <Td>Проект створення ягідної плантації площею 12 га</Td>
                </Tr>
                <Tr>
                  <Td>Місце розташування</Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td>Термін реалізації проекту</Td>
                  <Td display={"flex"}>
                    <Box>
                      <Text> Проекний період</Text>
                      <Text> Початок продажів</Text>
                    </Box>
                    <Box></Box>
                  </Td>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td>Бюджет проекту</Td>
                  <Td>
                    <Text>Вартість проекту</Text>
                    <Text>В тому числі:</Text>
                    <Text>Власні кошти</Text>
                    <Text>Кредит</Text>
                    <Text>Інвестиційні кошти</Text>
                    <Text>Державна підтримка</Text>
                    <Text>Коофіцієнт автономії</Text>
                  </Td>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td>Прибутковість проекту</Td>
                  <Td>
                    <Text>Валовий дохід</Text>
                    <Text>Чистий прибуток</Text>
                    <Text>Рентабельність</Text>
                    <Text>Термін окупності</Text>
                  </Td>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td>Інвестиційна привабливість проекту</Td>
                  <Td>
                    <Text>Дисконтний період окупності (DPP), років</Text>
                    <Text>Чиста поточна варість проекту (NPV)</Text>
                    <Text>Внутрішня ставка доходу (IRR)</Text>
                    <Text>Індекс прибутковості вкладень (PI)</Text>
                  </Td>
                  <Td></Td>
                </Tr>
              </Tbody>
            </Table>
            <Heading textAlign={"center"} size={"md"} mt={5}>
              Підприємство
            </Heading>
            <Text textAlign={"center"}>
              Штатний розпис
              <br />
              {myEnterprise?.form}
            </Text>
            {(() => {
              console.log(end);
              const res = [];
              for (let i = start; i < end; i++) {
                res.push(
                  <>
                    <Text fontWeight={"bold"}>{i}</Text>
                    <StaffingTable thisWorkers={[]} />
                  </>
                );
              }
              return res;
            })()}
            <Heading textAlign={"center"} size={"md"} mt={5}>
              Виробництво
            </Heading>
            <Heading textAlign={"center"} size={"sm"} mt={5}>
              Технологічні карти
            </Heading>
            {(() => {
              const res = [];
              for (let i = start; i < end; i++) {
                res.push(<Text fontWeight={"bold"}>{i}</Text>);
                for (let j = 0; j < myBusiness.busCuls.length; j++) {
                  const e = myBusiness.busCuls[j];
                  const maps = map.maps.map((m) => ({ ...m, area: e.area }));
                  res.push(
                    <CartsTable
                      maps={maps.filter(
                        (el) =>
                          el.cultureId == e?.cultureId &&
                          el.cultivationTechnologyId ==
                            e?.cultivationTechnologyId &&
                          el.year == i - start + 1
                      )}
                      deleteOpen={() => {}}
                      setDeleteOpen={() => {}}
                      setOpen={() => {}}
                      setPublicationOpen={() => {}}
                      setRes={() => {}}
                      setShowAlert={() => {}}
                      setUpdate={() => {}}
                      isCul={true}
                    />
                  );
                }
              }
              return res;
            })()}
            <Heading textAlign={"center"} size={"sm"} mt={5}>
              Планування виробництва продукції
            </Heading>
            {(() => {
              const res = [];
              for (let i = start; i < end; i++) {
                res.push(
                  <>
                    <Text fontWeight={"bold"}>{i}</Text>
                    <PlanIncomeProductionTable isPlan={true} />
                  </>
                );
              }
              return res;
            })()}
            <Heading textAlign={"center"} size={"sm"} mt={5}>
              Продаж продукції
            </Heading>
            {(() => {
              const res = [];
              for (let i = start; i < end; i++) {
                res.push(
                  <>
                    <Text fontWeight={"bold"}>{i}</Text>
                    <SaleTable month="" year={i} isPlan={true} />
                  </>
                );
              }
              return res;
            })()}
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
            <Heading textAlign={"center"} size={"md"} mt={5}>
              Показники
            </Heading>
            <Heading textAlign={"center"} size={"sm"} mt={5}>
              Розрахунок собівартості продукції
            </Heading>
            {(() => {
              const res = [];
              for (let i = start; i < end; i++) {
                res.push(
                  <Box mt={"50px"}>
                    <CostProdTable />
                  </Box>
                );
              }
              return res;
            })()}
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
