import React, { useContext, useEffect, useState } from "react";
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
import { EditIcon, PlusSquareIcon } from "@chakra-ui/icons";
import CreateResume from "../modules/CreateResume";
import BusinessConceptTable from "../modules/TEJConceptTable";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../main";
import { IbusinessPlan } from "../../../tRPC serv/models/models";
import { observer } from "mobx-react-lite";
import { resBusinessPlan } from "../../../tRPC serv/controllers/BusinessService";
import { names } from "../modules/TEJConceptTable/";
import SelectCart from "../modules/TEJConceptTable/component/SelectCart";
import CartsTableInBusiness from "../modules/CartsTableInBusiness";
import { getCarts, patchResume, patchTitlePage } from "../http/requests";
import CreateTitlePage from "../modules/CreateTitlePage";
import useBusiness from "./hook/useBusiness";
import denistina from "../../font/denistina_en.ttf";
import { BUSINESSpLAN_ROUTER } from "../utils/consts";
import useTEJ from "./hook/useTEJ";
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
  const { map, user, income, TEJ } = useContext(Context);
  useTEJ(TEJ);
  const { id } = useParams();
  const navigate = useNavigate();
  // const Business: resBusinessPlan[] = JSON.parse(
  //   JSON.stringify(business.businessPlan)
  // );
  // const [myBusiness] = Business.filter((el) => el.id == id);
  //@ts-ignore
  // let data = name && child ? myBusiness[name][child] : "";
  // const [nData, setNData] = useState<string>();
  // function getData(name: iName, children: iChild, infCartId: number | null) {
  //   setIsActiveInput(false);
  //   setInfCartId(infCartId || 0);
  //   setChild(children);
  //   setName(name);
  // }
  const myJustification = TEJ.justification.find((el) => el.id! == +id!);
  const myCart = map.maps.find((el) => el.id == myJustification?.techCartId);
  const myIncome = income.yieldPlant.find(
    (el) => el.culture.id == myCart?.culture?.id
  );
  useEffect(() => {
    if (!myCart?.tech_operations && myJustification?.techCartId) {
      console.log("las");
      console.log(myJustification?.techCartId);
      getCarts(map, myJustification?.techCartId!);
    }
  }, [myJustification?.techCartId]);
  let costHand = 0;
  myCart?.tech_operations?.forEach((el) => {
    costHand += (el?.costHandWork || 0) * myCart.area;
  });

  const [isActiveInput, setIsActiveInput] = useState(false);
  return (
    <Box>
      <Box display={"flex"} flexDirection={"row-reverse"}>
        <Button
          mr={8}
          onClick={() => {
            navigate(BUSINESSpLAN_ROUTER + "/" + id);
          }}
        >
          Бізенс-план
        </Button>
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
            <Th>Культура</Th>
            <Th>Вид витрат</Th>
            <Th>Кількість га</Th>
            <Th>Ціна грн/га</Th>
            <Th>Сума грн</Th>
          </Thead>
          <Tbody>
            <Td>{myCart?.nameCart}</Td>
            <Td></Td>
            <Td>{myCart?.area}</Td>
            <Td>{myCart?.costHectare}</Td>
            <Td>{myCart?.costHectare! * myCart?.area!}</Td>
          </Tbody>
        </Table>
      </TableContainer>
      <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
        Відомість ресурсів
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
            <Th>Види робіт</Th>
            <Th>Одиниця виміру</Th>
            <Th>Кількість</Th>
            <Th>Середня ціна</Th>
            <Th>Сума</Th>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Механізовані роботи</Td>
              <Td>Люд/год</Td>
            </Tr>
            <Tr>
              <Td>Ручні роботи</Td>
              <Td>Люд/год</Td>
              <Td></Td>
              <Td></Td>
              <Td>{costHand}</Td>
            </Tr>
            <Tr>
              <Td fontWeight={"bold"}>Всього по праці</Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td>{0}</Td>
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
            <Th>Назва</Th>
            <Th>Марка</Th>
            <Th>Одиниця виміру</Th>
            <Th>Кількість</Th>
            <Th>Середня ціна</Th>
            <Th>Сума</Th>
          </Thead>
          <Tbody>
            {map.tractor.map((el) => (
              <Tr>
                <Td>{el.nameTractor}</Td>
                <Td>{el.brand}</Td>
                <Td>Маш/год</Td>
                <Td>{}</Td>
                <Td>{}</Td>
              </Tr>
            ))}
            <Tr>
              <Td fontWeight={"bold"}>Всього по техніці та обладнанню</Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td>{0}</Td>
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
            <Th>Призначення</Th>
            <Th>Назва</Th>
            <Th>Одиниця виміру</Th>
            <Th>Кількість</Th>
            <Th>Ціна</Th>
            <Th>Сума</Th>
          </Thead>
          <Tbody>
            {(() => {
              let cost = 0;
              return (
                <>
                  {map.purposeMaterial.map((el) => {
                    const mat = map.costMaterials.filter(
                      (e) => e.purpose_material.id == el.id
                    );
                    if (mat[0])
                      return (
                        <>
                          <Tr>
                            <Td fontWeight={"bold"}>{el.purpose}</Td>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                          </Tr>
                          {mat.map((elem) => {
                            const hco =
                              elem.consumptionPerHectare * myCart?.area!;
                            const hp = hco * elem.price;
                            cost += hp;
                            return (
                              <Tr>
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
            <Th>Назва</Th>
            <Th>Одиниця виміру</Th>
            <Th>Кількість</Th>
            <Th>Ціна</Th>
            <Th>Сума</Th>
          </Thead>
          <Tbody>
            {(() => {
              let cost = 0;
              const serv = map.costServices;
              return (
                <>
                  {serv.map((elem) => {
                    cost += myCart?.area! * elem.price;
                    return (
                      <Tr>
                        <Td>{elem.nameService}</Td>
                        <Td>{elem.unitsOfCost}</Td>
                        <Td>{myCart?.area}</Td>
                        <Td>{elem.price}</Td>
                        <Td>{myCart?.area! * elem.price}</Td>
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
            <Th>Назва</Th>
            <Th>Одиниця виміру</Th>
            <Th>Кількість</Th>
            <Th>Ціна</Th>
            <Th>Сума</Th>
          </Thead>
          <Tbody>
            {(() => {
              let cost = 0;
              const trans = map.costTransport;
              return (
                <>
                  {trans.map((elem) => {
                    cost += myCart?.area! * elem.price;
                    return (
                      <Tr>
                        <Td>{elem.nameTransport}</Td>
                        <Td>{elem.unitsOfCost}</Td>
                        <Td>{myCart?.area}</Td>
                        <Td>{elem.price}</Td>
                        <Td>{myCart?.area! * elem.price}</Td>
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
      <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
        Планування доходів
      </Text>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <Table size={"sm"}>
          <Thead>
            <Th>Продукт або послуга</Th>
            <Th>Кількість</Th>
            <Th>Ціна грн/га</Th>
            <Th>Сума грн</Th>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{myCart?.culture?.product}</Td>
              <Td>{myCart?.area! * myIncome?.yieldPerHectare!}</Td>
              <Td>{myCart?.culture?.priceBerry}</Td>
              <Td>
                {Math.round(
                  myCart?.area! *
                    myIncome?.yieldPerHectare! *
                    myCart?.culture?.priceBerry! *
                    1000
                )}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
        Планування грошового потоку
      </Text>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <Table size={"sm"}>
          <Thead>
            <Th>Залишок на початок періоду</Th>
            <Th>Прихід</Th>
            <Th>Розхід</Th>
            <Th>Залишов на кінець періоду</Th>
          </Thead>
        </Table>
      </TableContainer>
      <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
        Планування графіку доходів та витрат
      </Text>
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
      <CreateResume open={openResume} setOpen={setOpenResume} />
      <CreateTitlePage open={openTitle} setOpen={setOpenTitle} />
    </Box>
  );
}

export default observer(BiznesPlanPage);
