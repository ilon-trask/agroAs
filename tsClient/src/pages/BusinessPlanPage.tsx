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
import { EditIcon, PlusSquareIcon } from "@chakra-ui/icons";
import CreateResume from "../modules/CreateResume";
import BusinessConceptTable from "../modules/TEJConceptTable";
import { useParams } from "react-router-dom";
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
  const { map, user, business } = useContext(Context);
  useBusiness(business, map);
  const { id } = useParams();
  const Business: resBusinessPlan[] = JSON.parse(
    JSON.stringify(business.businessPlan)
  );
  const [myBusiness] = Business.filter((el) => el.id == id);
  //@ts-ignore
  let data = name && child ? myBusiness[name][child] : "";
  const [nData, setNData] = useState<string>();
  function getData(name: iName, children: iChild, infCartId: number | null) {
    setIsActiveInput(false);
    setInfCartId(infCartId || 0);
    setChild(children);
    setName(name);
  }

  const [isActiveInput, setIsActiveInput] = useState(false);
  return (
    <Box overflowX={"scroll"}>
      <Heading mt={3} textAlign={"center"} fontSize={"25"}>
        Бізнес-план
      </Heading>
      <Heading mt={3} textAlign={"center"} fontSize={"25"}>
        {myBusiness?.name}
      </Heading>
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
      </Box>{" "}
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
