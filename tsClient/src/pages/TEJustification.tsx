import React, { useContext, useEffect, useMemo, useState } from "react";
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
  Stack,
} from "@chakra-ui/react";
import { EditIcon, PlusSquareIcon } from "@chakra-ui/icons";
import CreateResume from "../modules/CreateResume";
import BusinessConceptTable from "../modules/TEJConceptTable";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../main";
import {
  grade,
  IbusinessPlan,
  Igrade,
  ItechnologicalEconomicJustification,
} from "../../../tRPC serv/models/models";
import { observer } from "mobx-react-lite";
import { resBusinessPlan } from "../../../tRPC serv/controllers/BusinessService";
import { names } from "../modules/TEJConceptTable/";
import SelectCart from "../modules/TEJConceptTable/component/SelectCart";
import CartsTableInBusiness from "../modules/CartsTableInBusiness";
import {
  getCarts,
  getGrades,
  getMachine,
  getTractor,
  getYieldPlant,
  patchResume,
  patchTitlePage,
} from "../http/requests";
import CreateTitlePage from "../modules/CreateTitlePage";
import useBusiness from "./hook/useBusiness";
import denistina from "../../font/denistina_en.ttf";
import {
  BUSINESScATALOG_ROUTER,
  BUSINESSpLAN_ROUTER,
  BUSINESS_ROUTER,
  TEJ_JORNAL_ROUTER,
  TEJ_ROUTER,
} from "../utils/consts";
import useTEJ from "./hook/useTEJ";
import UpdateAreaCart from "../modules/UpdateAreaTEJ";
import { cartProps } from "../modules/CreateCart";
import { resTechCartsWithOpers } from "../../../tRPC serv/controllers/TechCartService";
import TEJPublicationPopUp from "../modules/TEJPublicationPopUp";
import { resTechnologicalEconomicJustification } from "../../../tRPC serv/controllers/TEJService";
export type iName = "resume" | "titlePage" | "";
export type iChild =
  | "aboutProject"
  | "investment"
  | "finIndicators"
  | "deduction"
  | "title";
function TEJjustification() {
  const [openResume, setOpenResume] = useState<boolean>(false);
  const [openTitle, setOpenTitle] = useState<boolean>(false);
  const [name, setName] = useState<iName>();
  const [child, setChild] = useState<iChild>();
  const [showSelectCart, setShowSelectCart] = useState<boolean>(false);
  const [infCartId, setInfCartId] = useState<number>(0);
  const { map, user, income, TEJ } = useContext(Context);
  useTEJ(TEJ);
  const { id } = useParams();
  const navigate = useNavigate();

  let myJustification: resTechnologicalEconomicJustification | undefined;
  if (user.role == "") {
    myJustification = TEJ.agreeJustification?.find((el) => el.id! == +id!);
  } else {
    myJustification = TEJ.justification?.find((el) => el.id! == +id!);
  }
  const myCart = map.maps?.find((el) => el.id == myJustification?.techCartId);
  const myIncome = income.yieldPlant?.find(
    (el) => el?.culture?.id == myJustification?.culture?.id
  );
  useEffect(() => {
    if (myJustification?.techCartId) {
      console.log("try2");
      getCarts(map, myJustification?.techCartId!);
      getGrades(map);
      getTractor(map);
      getMachine(map);
    }
  }, [myJustification?.techCartId]);
  useEffect(() => {
    if (user.role == "" && myJustification?.culture?.id)
      getYieldPlant(income, myJustification?.culture?.id!);
  }, [myJustification?.culture?.id]);
  console.log(myIncome);

  const grades = map.grade;
  let costHand = 0;
  let costMech = 0;
  myCart?.tech_operations?.forEach((el) => {
    costHand += (el?.costHandWork || 0) * myJustification?.area!;
    costMech += (el?.costMachineWork || 0) * myJustification?.area!;
  });

  const [updCartOpen, setUpdCartOpen] = useState(false);

  const [updCartRes, setUpdCartRes] =
    useState<ItechnologicalEconomicJustification>();

  let costMechTot = 0;
  let peopleHourTot = 0;
  let medCostHand = 0;
  let medCostHandCounter = 0;
  return (
    <Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        maxW={"1000px"}
        mx={"auto"}
      >
        {user.role != "" && (
          <Button
            onClick={() => {
              navigate(TEJ_JORNAL_ROUTER);
            }}
          >
            Назвад
          </Button>
        )}
        <Box display={"flex"}>
          <Box display={"flex"}>
            <Button>Конструктор</Button>
            <Button>Отримати ПДФ</Button>
          </Box>
          {user.role != "" && (
            <Button
              ml={4}
              onClick={() => {
                navigate(BUSINESScATALOG_ROUTER);
              }}
            >
              Бізенс-план
            </Button>
          )}
        </Box>
      </Box>
      <Heading mt={3} textAlign={"center"} fontSize={"25"}>
        Техніко економічне обгрунтування <br />
        {myJustification?.culture?.name} (
        {myJustification?.cultivationTechnology?.name.toLocaleLowerCase()})
      </Heading>
      <Heading mt={3} textAlign={"center"} fontSize={"25"}>
        {/* {myBusiness?.name} */}
      </Heading>
      <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
        Планування витрат
      </Text>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Культура</Th>
              <Th>Вид витрат</Th>
              <Th>Кількість га</Th>
              <Th>Ціна грн/га</Th>
              <Th>Сума грн</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td
                onClick={() => {
                  setUpdCartOpen(true);
                  setUpdCartRes({
                    ...myJustification!,
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
              <Td>{myCart?.nameCart}</Td>
              <Td></Td>
              <Td>{myJustification?.area}</Td>
              <Td>{myCart?.costHectare}</Td>
              <Td>{myCart?.costHectare! * myJustification?.area!}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
        Планування потреби в ресурсах
      </Text>
      <Text
        textAlign={"center"}
        fontSize={"14px"}
        mt={"15px"}
        fontWeight={"bold"}
      >
        Витрати праці
      </Text>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th>Види робіт</Th>
              <Th>Операція</Th>
              <Th>Кількість</Th>
              <Th>Середня ціна</Th>
              <Th>Сума</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr fontWeight={"bold"}>
              <Td>Механізовані роботи</Td>
              <Td></Td>
              <Td>Люд/год</Td>
              <Td>Грн/год</Td>
              <Td></Td>
            </Tr>
            {map.opers.map((el) => {
              const totalCost = el.costMachineWork! * myJustification?.area!;
              const peopleHour =
                Math.round(
                  (totalCost /
                    ((myCart?.salary! / 176) *
                      map.grade.find(
                        (e) => e?.id! == el?.aggregate?.tractor.gradeId
                      )?.coefficient!)) *
                    100
                ) / 100;
              const costMech = Math.round(
                ((totalCost / peopleHour) * 100) / 100
              );
              if (el.cell == "costMechanical")
                return (
                  <Tr key={el.id}>
                    <Td>{}</Td>
                    <Td>{el.nameOperation}</Td>
                    <Td>{peopleHour}</Td>
                    <Td>{costMech}</Td>
                    <Td>{el.costMachineWork! * myJustification?.area!}</Td>
                  </Tr>
                );
            })}
            <Tr fontWeight={"bold"}>
              <Td>Ручні роботи</Td>
              <Td></Td>
              <Td>Люд/год</Td>
              <Td>Грн/год</Td>
              <Td></Td>
            </Tr>
            {map.opers.map((el) => {
              const totalCost = el.costHandWork! * myJustification?.area!;
              const peopleHour =
                Math.round(
                  (totalCost /
                    ((myCart?.salary! / 176) *
                      map.grade.find(
                        (e) =>
                          e.id! == el.cost_hand_work?.gradeId! ||
                          el.aggregate?.agricultural_machine.gradeId
                      )?.coefficient!)) *
                    100
                ) / 100;
              peopleHourTot += peopleHour;
              const costHand = Math.round(
                ((totalCost / peopleHour) * 100) / 100
              );
              medCostHand += costHand;
              medCostHandCounter += 1;
              if (
                el.cell == "costHandWork" ||
                (el.cell == "costMechanical" && el.costHandWork)
              )
                return (
                  <Tr key={el.id}>
                    <Td>{}</Td>
                    <Td>{el.nameOperation}</Td>
                    <Td>{peopleHour}</Td>
                    <Td>{costHand}</Td>
                    <Td>{totalCost}</Td>
                  </Tr>
                );
            })}
            <Tr fontWeight={"bold"}>
              <Td>Всього по оплаті праці</Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td>{costHand + costMech}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Text
        textAlign={"center"}
        fontSize={"14px"}
        mt={"15px"}
        fontWeight={"bold"}
      >
        Техніка й обладнання
      </Text>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th>Назва</Th>
              <Th>Марка</Th>
              <Th>Одиниця виміру</Th>
              <Th>Кількість</Th>
              <Th>Ціна</Th>
              <Th>Сума</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr fontWeight={"bold"}>
              <Td>Трактори</Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
            </Tr>
            {(() => {
              let acc: number[] = [];
              let mechHours = 0;
              return map.opers.map((el, ind) => {
                if (el.cell == "costMechanical") {
                  let amountOfTractorDepreciationPerHour =
                    el?.aggregate?.amountOfTractorDepreciationPerHour;
                  const id = el.aggregate?.tractorId;
                  const ex = acc.includes(id!);

                  if (ex) return null;
                  mechHours = el?.aggregate?.mechHours!;

                  map.opers.forEach((e, indx) => {
                    if (e.aggregate?.tractorId == id && ind != indx) {
                      mechHours += e?.aggregate?.mechHours!;
                    }
                  });
                  acc.push(id!);
                  costMechTot +=
                    mechHours *
                    amountOfTractorDepreciationPerHour! *
                    myJustification?.area! *
                    1.05;
                  return (
                    <Tr key={el.id}>
                      <Td>{el.aggregate?.tractor.nameTractor}</Td>
                      <Td>{el?.aggregate?.tractor.brand}</Td>
                      <Td>маш/год</Td>
                      <Td>{Math.round(mechHours * 100) / 100}</Td>
                      <Td>
                        {Math.round(amountOfTractorDepreciationPerHour! * 100) /
                          100}
                      </Td>
                      <Td>
                        {Math.round(
                          mechHours *
                            amountOfTractorDepreciationPerHour! *
                            myJustification?.area! *
                            1.05 *
                            100
                        ) / 100}
                      </Td>
                    </Tr>
                  );
                }
              });
            })()}
            <Tr fontWeight={"bold"}>
              <Td>СГ машини</Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
            </Tr>
            {(() => {
              let acc: number[] = [];
              let mechHours = 0;
              return map.opers.map((el, ind) => {
                if (el.cell == "costMechanical") {
                  let amountOfMachineDepreciationPerHour =
                    el?.aggregate?.amountOfMachineDepreciationPerHour;
                  const id = el.aggregate?.agriculturalMachineId;
                  const ex = acc.includes(id!);

                  if (ex) return null;
                  mechHours = el?.aggregate?.mechHours!;

                  map.opers.forEach((e, indx) => {
                    if (
                      e.aggregate?.agriculturalMachineId == id &&
                      ind != indx
                    ) {
                      mechHours += e?.aggregate?.mechHours!;
                    }
                  });
                  acc.push(id!);
                  costMechTot +=
                    mechHours *
                    amountOfMachineDepreciationPerHour! *
                    myJustification?.area! *
                    1.05;
                  return (
                    <Tr key={el.id}>
                      <Td>{el?.aggregate?.agricultural_machine.nameMachine}</Td>
                      <Td>{el?.aggregate?.agricultural_machine.brand}</Td>
                      <Td>маш/год</Td>
                      <Td>{Math.round(mechHours * 100) / 100}</Td>
                      <Td>
                        {Math.round(amountOfMachineDepreciationPerHour! * 100) /
                          100}
                      </Td>
                      <Td>
                        {Math.round(
                          mechHours *
                            amountOfMachineDepreciationPerHour! *
                            myJustification?.area! *
                            1.05 *
                            100
                        ) / 100}
                      </Td>
                    </Tr>
                  );
                }
              });
            })()}
            <Tr fontWeight={"bold"}>
              <Td>Всього по техніці та обладнанню</Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td>{Math.round(costMechTot)}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Text
        textAlign={"center"}
        fontSize={"14px"}
        mt={"15px"}
        fontWeight={"bold"}
      >
        Матеріальні витрати
      </Text>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th>Призначення</Th>
              <Th>Назва</Th>
              <Th>Одиниця виміру</Th>
              <Th>Кількість</Th>
              <Th>Ціна</Th>
              <Th>Сума</Th>
            </Tr>
          </Thead>
          <Tbody>
            {(() => {
              let cost = 0;
              return (
                <>
                  {map.purposeMaterial.map((el) => {
                    const mat = map.costMaterials.filter(
                      (e) => e?.purpose_material?.id == el?.id
                    );
                    if (mat[0])
                      return (
                        <>
                          <Tr key={el.id}>
                            <Td fontWeight={"bold"}>{el.purpose}</Td>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                          </Tr>
                          {mat.map((elem) => {
                            const hco =
                              elem.consumptionPerHectare *
                              myJustification?.area!;
                            const hp = hco * elem.price;
                            cost += hp;
                            return (
                              <Tr key={elem.id}>
                                <Td></Td>
                                <Td>{elem.nameMaterials}</Td>
                                <Td>{elem.unitsOfConsumption}</Td>
                                <Td>{hco}</Td>
                                <Td>{elem.price}</Td>
                                <Td>{hp}</Td>
                              </Tr>
                            );
                          })}
                        </>
                      );
                  })}
                  <Tr>
                    <Td fontWeight={"bold"}>Всього матеріалів</Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td fontWeight={"bold"}>{cost}</Td>
                  </Tr>
                </>
              );
            })()}
          </Tbody>
        </Table>
      </TableContainer>
      <Text
        textAlign={"center"}
        fontSize={"14px"}
        mt={"15px"}
        fontWeight={"bold"}
      >
        Витрати на послуги
      </Text>{" "}
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th>Назва</Th>
              <Th>Одиниця виміру</Th>
              <Th>Кількість</Th>
              <Th>Ціна</Th>
              <Th>Сума</Th>
            </Tr>
          </Thead>
          <Tbody>
            {(() => {
              let cost = 0;
              const serv = map.costServices;
              return (
                <>
                  {serv.map((elem) => {
                    cost += myJustification?.area! * elem.price;
                    return (
                      <Tr key={elem.id}>
                        <Td>{elem.nameService}</Td>
                        <Td>{elem.unitsOfCost}</Td>
                        <Td>{myJustification?.area}</Td>
                        <Td>{elem.price}</Td>
                        <Td>{myJustification?.area! * elem.price}</Td>
                      </Tr>
                    );
                  })}
                  <Tr>
                    <Td fontWeight={"bold"}>Всього за послуги</Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td fontWeight={"bold"}>{cost}</Td>
                  </Tr>
                </>
              );
            })()}
          </Tbody>
        </Table>
      </TableContainer>
      <Text
        textAlign={"center"}
        fontSize={"14px"}
        mt={"15px"}
        fontWeight={"bold"}
      >
        Витрати на транспорт
      </Text>{" "}
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th>Назва</Th>
              <Th>Одиниця виміру</Th>
              <Th>Кількість</Th>
              <Th>Ціна</Th>
              <Th>Сума</Th>
            </Tr>
          </Thead>
          <Tbody>
            {(() => {
              let cost = 0;
              const trans = map.costTransport;
              return (
                <>
                  {trans.map((elem) => {
                    cost += myJustification?.area! * elem.price;
                    return (
                      <Tr key={elem.id}>
                        <Td>{elem.nameTransport}</Td>
                        <Td>{elem.unitsOfCost}</Td>
                        <Td>{myJustification?.area}</Td>
                        <Td>{elem.price}</Td>
                        <Td>{myJustification?.area! * elem.price}</Td>
                      </Tr>
                    );
                  })}
                  <Tr>
                    <Td fontWeight={"bold"}>Всього за транспорт</Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td fontWeight={"bold"}>{cost}</Td>
                  </Tr>
                </>
              );
            })()}
          </Tbody>
        </Table>
      </TableContainer>
      <Text textAlign={"center"} fontSize={"25px"} mt={"80px"}>
        Планування доходів
      </Text>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Продукт або послуга</Th>
              <Th>
                Планова <br />
                урожайність (т/га)
              </Th>
              <Th>
                Планове <br />
                виробництво
              </Th>
              <Th>
                Плонові
                <br /> продажі
              </Th>
              <Th>
                Ціна <br />
                грн/кг
              </Th>
              <Th>Сума грн</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <EditIcon
                  color={"blue.400"}
                  w={"20px"}
                  h={"auto"}
                  cursor={"pointer"}
                />
              </Td>
              <Td>{myJustification?.culture?.product}</Td>
              <Td>
                {Math.round(
                  myJustification?.area! * myIncome?.yieldPerHectare! * 1000
                ) / 1000}
              </Td>
              <Td></Td>
              <Td></Td>
              <Td>{myJustification?.culture?.priceBerry}</Td>
              <Td>
                {Math.round(
                  myJustification?.area! *
                    myIncome?.yieldPerHectare! *
                    myJustification?.culture?.priceBerry! *
                    1000
                )}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Box h={10}></Box>
      {/* <Box
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
          px={"60px"}
          overflowY={"scroll"}
        >
          {data && (
            <>
              <Box display={"flex"} alignItems={"center"}>
                <Button
                  onClick={() => {
                    setIsActiveInput(true);
                  }}
                >
                  <EditIcon />
                </Button>
                <Text fontSize={"20px"} fontWeight={"500"}>
                  {names[child!]}
                </Text>
                {isActiveInput && (
                  <Button
                    ml={"auto"}
                    onClick={() => {
                      setIsActiveInput(false);
                      name == "resume"
                        ? patchResume(business, {
                            businessId: +id!,
                            data: { [child!]: nData },
                          })
                        : name == "titlePage"
                        ? patchTitlePage(business, {
                            businessId: +id!,
                            title: nData!,
                          })
                        : null;
                    }}
                  >
                    Завершити редагування
                  </Button>
                )}
              </Box>
              {isActiveInput ? (
                <Textarea
                  // value={data}
                  onChange={(e) => setNData(e.target.value)}
                >
                  {data}
                </Textarea>
              ) : child == "title" ? (
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
                      Інформація, наведена у проекті, є конфіденційною та
                      надається за умови, що не буде передана третім особам без
                      попереднього погодження з розробником проекту
                    </Text>
                  </Box>
                  <Box mt={20} textAlign={"center"}>
                    <Text>Івано-франківськ</Text>
                    <Text>2023</Text>
                  </Box>
                </>
              ) : child == "aboutProject" ? (
                <>
                  <Table>
                    <Tbody>
                      <Tr>
                        <Td>Опис проект</Td>
                        <Td></Td>
                        <Td>фівафва</Td>
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
                </>
              ) : (
                <Text>{data}</Text>
              )}
              <Box>
                {!!infCartId && child == "investment" && (
                  <Box mt={4}>
                    <CartsTableInBusiness cartId={infCartId} />
                  </Box>
                )}
                {child == "investment" && (
                  <Button
                    onClick={() => {
                      setShowSelectCart(true);
                    }}
                  >
                    Добавити таблицю
                  </Button>
                )}
              </Box>
            </>
          )}
        </Box>
      </Box>{" "} */}
      <SelectCart
        open={showSelectCart}
        setOpen={setShowSelectCart}
        child={child!}
      />
      {!!updCartOpen && (
        <UpdateAreaCart
          open={updCartOpen}
          setOpen={setUpdCartOpen}
          update={true}
          setUpdate={() => {}}
          res={updCartRes!}
          setRes={setUpdCartRes!}
        />
      )}
      <CreateResume open={openResume} setOpen={setOpenResume} />
      <CreateTitlePage open={openTitle} setOpen={setOpenTitle} />
    </Box>
  );
}

export default observer(TEJjustification);
