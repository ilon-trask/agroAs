import React, { useContext, useEffect, useState } from "react";
import { Box, Heading, Button } from "@chakra-ui/react";
import CreateResume from "../../modules/CreateResume";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import { ItechnologicalEconomicJustification } from "../../../../tRPC serv/models/models";
import { observer } from "mobx-react-lite";
import SelectCart from "../../modules/TEJConceptTable/component/SelectCart";
import {
  getCarts,
  getGrades,
  getMachine,
  getTractor,
} from "../../http/requests";
import CreateTitlePage from "../../modules/CreateTitlePage";
import {
  BUSINESScATALOG_ROUTER,
  MAP_ROUTE,
  // TEJ_JORNAL_ROUTER,
} from "../../utils/consts";
import useTEJ from "../../shared/hook/useTEJ";
import UpdateAreaCart from "../../modules/UpdateAreaTEJ";
import { resTechnologicalEconomicJustification } from "../../../../tRPC serv/controllers/TEJService";
import TEJustificationContent from "./TEJustificationContent";
import { iChild, iName } from "../BusinessPlanPage";
import MyHeading from "src/ui/MyHeading";
function TEJjustification() {
  const [openResume, setOpenResume] = useState<boolean>(false);
  const [openTitle, setOpenTitle] = useState<boolean>(false);
  const [name, setName] = useState<iName>();
  const [child, setChild] = useState<iChild>();
  const [showSelectCart, setShowSelectCart] = useState<boolean>(false);
  const { map, user, TEJ } = useContext(Context);
  useTEJ(TEJ);
  const { cartId } = useParams();
  const navigate = useNavigate();

  const myCart = map.allMaps?.find((el) => el.id == cartId);

  let myJustification: resTechnologicalEconomicJustification | undefined;
  if (user.role == "") {
    myJustification = TEJ.agreeJustification?.find(
      (el) => el.techCartId == myCart?.id!
    );
  } else {
    myJustification = TEJ.justification?.find(
      (el) => el.techCartId == myCart?.id!
    );
  }
  if (!myJustification) {
    //@ts-ignore
    myJustification = { area: myCart?.area! };
  }

  useEffect(() => {
    getCarts(map, +cartId!);
    getGrades(map);
    getTractor(map);
    getMachine(map);
  }, [cartId]);
  // useEffect(() => {
  //   if (user.role == "" && myJustification?.culture?.id)
  //     getYieldPlant(income, myJustification?.culture?.id!);
  // }, [myJustification?.culture?.id]);
  const [updCartOpen, setUpdCartOpen] = useState(false);
  const [updCartRes, setUpdCartRes] =
    useState<ItechnologicalEconomicJustification>({
      area: 0,
      comment: "",
    });

  return (
    <Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        maxW={"1000px"}
        mx={"auto"}
      >
        <Button
          onClick={() => {
            navigate(MAP_ROUTE);
          }}
        >
          Назад
        </Button>
        <Box display={"flex"}>
          {/* <Box display={"flex"}>
            <Button>Конструктор</Button>
            <Button>Отримати ПДФ</Button>
          </Box> */}
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
      <MyHeading>Техніко економічні показники</MyHeading>
      <TEJustificationContent
        isPlan={false}
        myCart={myCart!}
        myJustification={myJustification}
        setUpdCartOpen={setUpdCartOpen}
        setUpdCartRes={setUpdCartRes}
      />
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
          setRes={setUpdCartRes! as any}
        />
      )}
      <CreateResume open={openResume} setOpen={setOpenResume} />
      <CreateTitlePage open={openTitle} setOpen={setOpenTitle} />
    </Box>
  );
}

export default observer(TEJjustification);
