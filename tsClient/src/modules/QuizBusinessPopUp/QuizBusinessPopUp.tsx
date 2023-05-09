import { PlusSquareIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
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
  useEffect,
  useMemo,
  useState,
} from "react";
import Dialog from "../../components/Dialog";
import { BusinessInputs } from "../CreateBusiness";
import EnterpriseInputs from "../CreateEnterprise/components/EnterpriseInputs";
import ProductInputs from "../CreateProduct/components/ProductInputs";
import SaleInputs from "../CreateSale/component/SaleInputs";

type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  res: any;
  setRes: Dispatch<SetStateAction<any>>;
};
const obj = {};
function Years({
  dateStart = "",
  realizationTime = 0,
}: {
  dateStart: string;
  realizationTime: number;
}) {
  console.log(dateStart);

  const year = +dateStart.split("-")[0] + +realizationTime;
  console.log(year);
  const arr = [];
  for (let i = +dateStart.split("-")[0]; i < year; i++) {
    console.log(i);
    arr.push(i);
  }
  return (
    <Box>
      {arr.map((el) => (
        <Tag size={"lg"}>{el}</Tag>
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
}: props) {
  const [screen, setScreen] = useState(1);
  const [isActive, setIsActive] = useState(true);
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
            realizationTime={res.realizationTime}
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
          <SaleInputs res={res} setRes={setRes} />
          <Footer />
        </Box>
      ) : screen == 5 ? (
        <Box>
          <Text fontWeight="bold" textAlign={"center"} size={"lg"}>
            Внесіть дані про фінансовий план
          </Text>
          <Box display={"flex"} mx={"auto"} maxW={"fit-content"}>
            <Box width="50%">
              <Text textAlign={"center"}>Доходи (залучені кошити)</Text>
              <Table size="sm">
                <Tbody>
                  <Tr>
                    <Td>Кредит</Td>
                    <Td>{0}</Td>
                    <Td>
                      <Button>Додати</Button>
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
            <Button onClick={() => setScreen((prev) => prev - 1)}>Назад</Button>
            <Button onClick={() => setScreen((prev) => prev + 1)}>Далі</Button>
          </ModalFooter>
        </Box>
      ) : screen == 6 ? (
        (() => {
          return (
            <Box>
              <Text fontWeight="bold" textAlign={"center"} size={"lg"}>
                Показники
              </Text>
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
                  Сформувати бізнес-план
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
