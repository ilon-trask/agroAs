import { PlusSquareIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Heading,
  Input,
  ModalFooter,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Iculture } from "../../../../tRPC serv/models/models";
import Dialog from "../../components/Dialog";
import { Context } from "../../main";
import { BusinessInputs } from "../CreateBusiness";
import EnterpriseInputs from "../CreateEnterprise/components/EnterpriseInputs";
import ProductInputs from "../CreateProduct/components/ProductInputs";
import SaleInputs from "../CreateSale/component/SaleInputs";
import CreditTablePopUp from "./compponents/CreditTablePopUp";

type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  res: any;
  setRes: Dispatch<SetStateAction<any>>;
  cultures: Iculture[];
};
const obj = {};
function Years({
  dateStart = "",
  year,
  period,
  setPeriod,
}: {
  dateStart: string;
  year: number;
  period: number;
  setPeriod: Dispatch<SetStateAction<number>>;
}) {
  const arr = [];
  console.log(period);

  for (let i = +dateStart.split("-")[0]; i < year; i++) {
    console.log(i);
    arr.push(i);
  }
  return (
    <Box>
      {arr.map((el) => (
        <Tag
          size={"lg"}
          key={el}
          onClick={() => setPeriod(el)}
          variant={period == el ? "solid" : "outline"}
        >
          {el}
        </Tag>
      ))}
    </Box>
  );
}
function QuizBusinessPopUp({
  open,
  setOpen,
  update,
  setUpdate,
  res,
  setRes,
  cultures,
}: props) {
  const [screen, setScreen] = useState(1);
  const [isActive, setIsActive] = useState(true);
  const [creditOpen, setCreditOpen] = useState(false);
  const startYear = +res.dateStart?.split("-")[0];
  const year = startYear + +res.realizationTime;
  const [period, setPeriod] = useState(startYear);
  useEffect(() => setPeriod(startYear), [startYear]);
  const { income, map } = useContext(Context);
  const sales = income.sale.filter((el) => el.isPlan);
  function Footer() {
    return (
      <ModalFooter justifyContent={"space-between"}>
        <Button onClick={() => setScreen((prev) => prev - 1)}>Назад</Button>
        <Button onClick={() => setScreen((prev) => prev + 1)}>Далі</Button>
      </ModalFooter>
    );
  }
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      isErr={false}
      props={obj}
      res={obj}
      setIsErr={() => {}}
      setRes={() => {}}
      setUpdate={setUpdate}
      update={update}
      size={"3xl"}
    >
      {screen == 1 ? (
        <Box>
          <BusinessInputs res={res} setRes={setRes} />
          <ModalFooter>
            <Button onClick={() => setScreen((prev) => prev + 1)}>Далі</Button>
          </ModalFooter>
        </Box>
      ) : screen == 2 ? (
        <Box>
          <EnterpriseInputs res={res} setRes={setRes} />
          <Footer />
        </Box>
      ) : screen == 3 ? (
        <Box>
          <Text fontWeight="bold" textAlign={"center"} size={"lg"}>
            Внесіть дані про кадри
          </Text>
          <Years
            dateStart={res.dateStart}
            year={year}
            period={period}
            setPeriod={setPeriod}
          />
          <Table size={"sm"}>
            <Tbody>
              <Tr>
                <Td>Кількість постійних працівників</Td>
                <Td></Td>
                <Td>
                  <Button>Докладніше</Button>
                </Td>
                <Td>
                  <Button>
                    <PlusSquareIcon />
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td>Кількість сезонних працівників</Td>
                <Td></Td>
                <Td>
                  <Button>Докладніше</Button>
                </Td>
                <Td>
                  <Button>
                    <PlusSquareIcon />
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <Footer />
        </Box>
      ) : screen == 4 ? (
        <Box>
          <Heading textAlign={"center"} fontWeight={"bold"} size={"md"}>
            Дані для розрахунку валової виручки
          </Heading>
          <Years
            dateStart={res.dateStart}
            year={year}
            period={period}
            setPeriod={setPeriod}
          />
          <Box>
            {sales.map((el) => {
              const production = income.production.find(
                (e) => e.id == el.productionId
              );
              const product = map.product.find(
                (e) => e.id == production?.productId
              );
              const cart = map.maps.find((e) => e.id == production?.techCartId);
              const myYield = income.yieldPlant.find(
                (e) => e.cultureId == product?.cultureId
              );
              return (
                <Box display={"flex"} gap={5}>
                  <Input value={product?.name} isDisabled={true} />
                  <Input
                    value={
                      Math.round(
                        myYield?.yieldPerHectare! * cart?.area! * 100
                      ) / 100
                    }
                    isDisabled={true}
                  />
                  <Input value={el?.price} autoFocus={true} />
                  <Input value={el?.date} isDisabled={true} />
                </Box>
              );
            })}
          </Box>
          <Footer />
        </Box>
      ) : screen == 5 ? (
        (() => {
          const allCredits = income.credit.filter((el) => el.isUseCost);
          const credits = allCredits.filter(
            (el) => +el.date?.split("-")[0] == period
          );
          let creditSum: number = credits?.reduce((a, b) => a + b.cost!, 0);

          return (
            <Box>
              <Text fontWeight="bold" textAlign={"center"} size={"lg"}>
                Внесіть дані про фінансовий план
              </Text>
              <Years
                dateStart={res.dateStart}
                year={year}
                period={period}
                setPeriod={setPeriod}
              />
              <Box display={"flex"} mx={"auto"} maxW={"fit-content"}>
                <Box width="50%">
                  <Text textAlign={"center"}>Доходи (залучені кошити)</Text>
                  <Table size="sm">
                    <Tbody>
                      <Tr>
                        <Td>Кредит</Td>
                        <Td>{creditSum}</Td>
                        <Td>
                          <Button onClick={() => setCreditOpen(true)}>
                            Додати
                          </Button>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Інвестицію</Td>
                        <Td>{0}</Td>
                        <Td>
                          <Button>Додати</Button>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Грант</Td>
                        <Td>{0}</Td>
                        <Td>
                          <Button>Додати</Button>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </Box>
                <Box width="50%">
                  <Text textAlign={"center"}>Витрати (об'єкт інвестицій)</Text>
                  <Table size="sm">
                    <Tbody>
                      <Tr>
                        <Td>Купівля техніки й обладнання</Td>
                        <Td>{0}</Td>
                        <Td>
                          <Button>Додати</Button>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Будівництво будівель і споруд</Td>
                        <Td>{0}</Td>
                        <Td>
                          <Button>Додати</Button>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </Box>
              </Box>
              <ModalFooter justifyContent={"space-between"}>
                <Button onClick={() => setScreen((prev) => prev - 1)}>
                  Назад
                </Button>
                <Button onClick={() => setScreen((prev) => prev + 1)}>
                  Далі
                </Button>
              </ModalFooter>
              <CreditTablePopUp
                open={creditOpen}
                setOpen={setCreditOpen}
                credits={allCredits}
              />
            </Box>
          );
        })()
      ) : screen == 6 ? (
        (() => {
          return (
            <Box>
              <Text fontWeight="bold" textAlign={"center"} size={"lg"}>
                Показники
              </Text>
              <Years
                dateStart={res.dateStart}
                year={year}
                period={period}
                setPeriod={setPeriod}
              />
              <Table size={"sm"}>
                <Tbody>
                  <Tr>
                    <Td>Рентабельність</Td>
                    <Td></Td>
                    <Td>
                      <Button>Докладніше</Button>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Термін окупності</Td>
                    <Td></Td>
                    <Td>
                      <Button>Докладніше</Button>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Показник автономності інвестицій</Td>
                    <Td></Td>
                    <Td>
                      <Button>Докладніше</Button>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>

              <ModalFooter justifyContent={"space-between"}>
                <Button onClick={() => setScreen((prev) => prev - 1)}>
                  Назад
                </Button>
                <Checkbox
                  onChange={() => {
                    setIsActive((prev) => !prev);
                  }}
                >
                  Показники задовільні
                </Checkbox>
                <Button
                  onClick={() => setScreen((prev) => prev + 1)}
                  isDisabled={isActive}
                >
                  Отримати PDF
                </Button>
              </ModalFooter>
            </Box>
          );
        })()
      ) : null}
    </Dialog>
  );
}

export default QuizBusinessPopUp;
