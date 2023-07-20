import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { Context } from "../main";
import CartsTable from "../modules/CartsTable";
import { observer } from "mobx-react-lite";
import CreateCart, { cartProps } from "../modules/CreateCart";
import { Ispecial_work, Itech_cart } from "../../../tRPC serv/models/models";
import {
  TableContainer,
  Text,
  Button,
  Box,
  Container,
  Input,
  Tooltip,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Checkbox,
  TabList,
  Tab,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Tabs,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import NoAuthAlert from "../components/NoAuthAlert";
import {
  deleteAdministration,
  deleteBuyingMachine,
  deleteCart,
  deleteOutcome,
  getBuyingMachine,
  getCopyCarts,
  setIsUsingOutcome,
  supabase,
} from "../http/requests";
import DeleteAlert, { IdeleteHeading } from "../components/DeleteAlert";
import CopyCartPupUp from "../modules/CopyCartPopUp";
import { resTechCartsWithOpers } from "../../../tRPC serv/controllers/TechCartService";
import CreateWork, { workProps } from "../modules/CreateWork";
import WorkTable from "../modules/WorkTable";
import PublicationPopUp from "../modules/CartPublicationPopUp";
import AgreeCartsTable from "../modules/AgreeCartsTable";
import { Link } from "react-router-dom";
import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { TEHMAP_ROUTER } from "../utils/consts";
import CreateOutcome from "../modules/CreateOutcome/";
import { outcomeProps } from "../modules/CreateOutcome/CreateOutcome";
import TEJJornal from "./TEJJornal";
import CreateBuyingMachine, {
  CreateBuyingMachineProps,
} from "../modules/CreateBuyingMachine";
import CreateAdministration from "../modules/CreateAdministration";
import { CreateAdministrationProp } from "../modules/CreateAdministration/CreateAdministration";
import BuyingMachineTable from "../modules/BuyingMachineTable";
import MyTableContainer from "src/ui/MyTableContainer";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import MyDeleteIcon from "src/ui/Icons/MyDeleteIcon";
export interface Icart extends Itech_cart {
  area: any;
  salary: any;
  priceDiesel: any;
}

const MapJornal = observer(function () {
  const { map, user } = useContext(Context);
  const [open, setOpen] = useState<boolean>(false);
  const [workOpen, setWorkOpen] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [res, setRes] = useState<cartProps>({
    nameCart: "",
    area: "",
    salary: "",
    priceDiesel: "",
    year: "",
    isBasic: null,
  });
  const [workRes, setWorkRes] = useState<workProps>({
    nameWork: "",
    area: "",
    salary: "",
    priceDiesel: "",
  });
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<{
    isOpen: boolean;
    text: IdeleteHeading | null;
    func: any;
    operId?: number | null;
    cartId?: number | null;
  }>({
    isOpen: false,
    text: null,
    func: () => {},
    operId: null,
    cartId: null,
  });
  const [openCopy, setOpenCopy] = useState(false);
  const [publicationOpen, setPublicationOpen] = useState({
    isOpen: false,
    data: { id: 0, isPublic: false, agree: false },
  });
  let maps: resTechCartsWithOpers[] = JSON.parse(JSON.stringify(map.maps));
  maps.sort((a, b) => a.id! - b.id!);
  let works: Ispecial_work[] = JSON.parse(JSON.stringify(map.works));
  works.sort((a, b) => a.id! - b.id!);
  const [complex, setComplex] = useState(false);
  const myComplex: resTechCartsWithOpers[] = JSON.parse(
    JSON.stringify(map.complex)
  );
  //@ts-ignore
  myComplex.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  const [outcomeOpen, setOutcomeOpen] = useState(false);
  const [outcomeRes, setOutcomeRes] = useState<outcomeProps>({
    group: "",
    id: 0,
    type: "",
  });
  const [outcomeUpd, setOutcomeUpd] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [buyingMachineRes, setBuyingMachineRes] =
    useState<CreateBuyingMachineProps>({
      name: "",
      brand: "",
      date: "",
      amount: "",
      cost: "",
      purpose: "",
      businessPlanId: 0,
      enterpriseId: 0,
    });
  const [buyingMachineUpdate, setBuyingMachineUpdate] = useState(false);
  const [buyingMachineOpen, setBuyingMachineOpen] = useState(false);
  const [administrationOpen, setAdministrationOpen] = useState(false);
  const [administrationUpdate, setAdministrationUpdate] = useState(false);
  const [administrationRes, setAdministrationRes] =
    useState<CreateAdministrationProp>({
      name: "",
      price: "",
      periodCalc: "",
      purpose: "",
      dateFrom: "",
      dateTo: "",
    });

  useEffect(() => {
    if (!map.buyingMachine[0]) {
      getBuyingMachine(map);
    }
  }, []);
  return (
    <Container maxW="container.lg">
      {user.role == "service_role" && (
        <Tabs>
          <TabList>
            <Box display={"flex"} h={"fit-content"}>
              <NumberInput
                defaultValue={year}
                onChange={(e) => setYear(+e)}
                width={"200px"}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Select width={"fit-content"}>
                <option value="">Січель</option>
                <option value="">Лютий</option>
                <option value="">Березень</option>
                <option value="">I квартал</option>
                <option value="">Квітень</option>
                <option value="">Травень</option>
                <option value="">Червень</option>
                <option value="">II квартал</option>
                <option value="">Липень</option>
                <option value="">Серпень</option>
                <option value="">Вересень</option>
                <option value="">III квартал</option>
                <option value="">Жовтень</option>
                <option value="">Листопад</option>
                <option value="">Грудень</option>
                <option value="">IV квартал</option>
                <option value="">Рік</option>
              </Select>
            </Box>
            <Tab ml={"15px"}>Всі витрат</Tab>
            {/* <Tab>Прямі</Tab>
          <Tab>Загально виробничі</Tab>
          <Tab>Постійні</Tab>
          <Tab>Будівництво будівель і споруд</Tab>
          <Tab>Купівля техніки та обладнання</Tab> */}
            <Tab>Інвестиційні</Tab>
            <Tab>Операційні</Tab>
          </TabList>
          <TabPanels>
            <TabPanel></TabPanel>
          </TabPanels>
        </Tabs>
      )}
      <Box>
        {user.role == "service_role" && (
          <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
            ПРЯМІ ВИТРАТИ
          </Text>
        )}
        <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
          Технологічні карти
        </Text>
        <MyTableContainer>
          <CartsTable
            maps={maps}
            setRes={setRes}
            setOpen={setOpen}
            setUpdate={setUpdate}
            setShowAlert={setShowAlert}
            deleteOpen={deleteOpen}
            setDeleteOpen={setDeleteOpen}
            setPublicationOpen={setPublicationOpen}
          />
        </MyTableContainer>
        <Box
          mt={"15px"}
          ml={"auto"}
          mb={"25px"}
          display={["block", "flex"]}
          gap={"10px"}
        >
          <Button
            onClick={
              user.role == ""
                ? () => {
                    setShowAlert(true);
                  }
                : () => {
                    setOpen(true);
                  }
            }
          >
            Добавити технологічну карту
          </Button>

          {/* {user.role != "service_role" ? (
            <Tooltip label={"Функція в розробці"}>
              <Button
                onClick={
                  user.role == ""
                    ? () => {
                        setShowAlert(true);
                      }
                    : () => {
                        user.role == "service_role"
                          ? (() => {
                              setOpenCopy(true);
                              getCopyCarts(map);
                            })()
                          : () => {};
                      }
                }
              >
                Скопіювати з журналу
              </Button>
            </Tooltip>
          ) : (
            <Button
              onClick={
                //@ts-ignore
                user.role == ""
                  ? () => {
                      setShowAlert(true);
                    }
                  : () => {
                      user.role == "service_role"
                        ? (() => {
                            setOpenCopy(true);
                            getCopyCarts(map);
                          })()
                        : () => {};
                    }
              }
            >
              Скопіювати з журналу
            </Button>
          )} */}
        </Box>
        {user.role == "service_role" && (
          <>
            <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
              Комплекси робіт
            </Text>
            <TableContainer
              maxW="1000px"
              mx="auto"
              mt={"20px"}
              overflowX={"scroll"}
            >
              <Table size={"sm"}>
                <Thead>
                  <Tr>
                    <Th></Th>
                    <Th>Назва</Th>
                    <Th>Розділ</Th>
                    <Th>Площа</Th>
                    <Th>Собіварість одного га</Th>
                    <Th>Загальна варість</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {myComplex.map((el) => (
                    <Tr key={el.id}>
                      <Td
                        onClick={() => {
                          setOpen(true);
                          setUpdate(true);
                          //@ts-ignore
                          setRes({ ...el });
                          setComplex(true);
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
                        <Link to={TEHMAP_ROUTER + `/${el.id}`}>
                          <ViewIcon boxSize={5} color={"blue.400"} />{" "}
                          {el.nameCart}
                        </Link>
                      </Td>
                      <Td>
                        {map.section.find((e) => e.id == el.sectionId)?.name}
                      </Td>
                      <Td>{el.area}</Td>
                      <Td>{el.costHectare}</Td>
                      <Td>{el.costHectare! * el.area}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <Button
              mt={"15px"}
              onClick={
                //@ts-ignore
                user.role == ""
                  ? () => {
                      setShowAlert(true);
                    }
                  : () => {
                      setOpen(true);
                      setComplex(true);
                    }
              }
            >
              Добавити комплекс робіт
            </Button>
          </>
        )}
        {(user.role == "ADMIN" || user.role == "service_role") && (
          <>
            <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
              Публікування карти
            </Text>
            <TableContainer
              maxW="1000px"
              mx="auto"
              mt={"20px"}
              overflowX={"scroll"}
            >
              <AgreeCartsTable
                setRes={setRes}
                setOpen={setOpen}
                setPublicationOpen={setPublicationOpen}
              />
            </TableContainer>
          </>
        )}
      </Box>
      {user.role == "service_role" && <TEJJornal />}
      {user.role == "service_role" && (
        <Box>
          <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
            ЗАГАЛЬНО ВИРОБНИЧІ ВИТРАТИ
          </Text>
          <TableContainer
            maxW="1000px"
            mx="auto"
            mt={"20px"}
            overflowX={"scroll"}
          >
            <Table size={"sm"}>
              <Thead>
                <Tr>
                  <Th rowSpan={2}>Назва</Th>
                  <Th colSpan={3} textAlign={"center"}>
                    Сума
                  </Th>
                </Tr>
                <Tr>
                  <Th textAlign={"center"}>Місяць</Th>
                  <Th textAlign={"center"}>Квартал</Th>
                  <Th textAlign={"center"}>Рік</Th>
                </Tr>
              </Thead>
            </Table>
          </TableContainer>
          <Button>Добавити витрати</Button>
          <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
            ПОСТІЙНІ ВИТРАТИ
          </Text>
          <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
            Адміністування
          </Text>
          <MyTableContainer>
            <Table size={"sm"}>
              <Thead>
                <Tr>
                  <Th rowSpan={2}></Th>
                  <Th rowSpan={2}>Назва</Th>
                  <Th colSpan={2} textAlign={"center"}>
                    Період
                  </Th>
                  <Th rowSpan={2}>Вартість</Th>
                  <Th rowSpan={2}>Сума</Th>
                  <Th rowSpan={2}>Розрахунок</Th>
                  <Th rowSpan={2}></Th>
                </Tr>
                <Tr>
                  <Th textAlign={"center"}>з</Th>
                  <Th textAlign={"center"}>по</Th>
                </Tr>
              </Thead>
              <Tbody>
                {map?.administration?.map((el) => (
                  <Tr>
                    <Td
                      cursor={"pointer"}
                      onClick={() => {
                        setAdministrationOpen(true);
                        setAdministrationUpdate(true);
                        //@ts-ignore
                        setAdministrationRes({
                          ...el,
                          admId: el.id,
                        });
                      }}
                    >
                      <MyEditIcon />
                    </Td>
                    <Td>{el.name}</Td>
                    <Td>{el.dateFrom}</Td>
                    <Td>{el.dateTo}</Td>
                    <Td>{el.price}</Td>
                    <Td>{el.cost}</Td>
                    <Td>{el.periodCalc}</Td>
                    <Td
                      onClick={() =>
                        setDeleteOpen({
                          isOpen: true,
                          func: () => {
                            deleteAdministration(map, el.id!);
                            //@ts-ignore
                            setDeleteOpen({ isOpen: false });
                          },
                          text: "адміністрування",
                        })
                      }
                    >
                      <MyDeleteIcon />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </MyTableContainer>
          <Button onClick={() => setAdministrationOpen(true)}>
            Добавити витрати
          </Button>
          <CreateAdministration
            open={administrationOpen}
            setOpen={setAdministrationOpen}
            update={administrationUpdate}
            setUpdate={setAdministrationUpdate}
            res={administrationRes}
            setRes={setAdministrationRes}
          />
          <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
            БУДІВНИЦТВО БУДІВЕЛЬ І СПОРУД
          </Text>
          <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
            Спеціалізовані та будівельні роботи
          </Text>
          <MyTableContainer>
            <WorkTable
              works={works}
              setRes={setWorkRes}
              setOpen={setWorkOpen}
              setUpdate={setUpdate}
              setShowAlert={setShowAlert}
              deleteOpen={deleteOpen}
              setDeleteOpen={setDeleteOpen}
            ></WorkTable>
          </MyTableContainer>
          <Box
            mt={"15px"}
            ml={"auto"}
            mb={"25px"}
            display={"flex"}
            gap={"10px"}
          >
            <Button
              onClick={
                //@ts-ignore
                user.role == ""
                  ? () => {
                      setShowAlert(true);
                    }
                  : () => {
                      setWorkOpen(true);
                    }
              }
            >
              Добавити спеціалізовані роботи
            </Button>
          </Box>
        </Box>
      )}
      {user.role == "service_role" && (
        <Box>
          <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
            КУПІВЛЯ ТЕХНІКИ ТА ОБЛАДНАННЯ
          </Text>
          <TableContainer>
            <BuyingMachineTable
              setDeleteOpen={setDeleteOpen}
              setOpen={setBuyingMachineOpen}
              setRes={setBuyingMachineRes}
              setUpdate={setBuyingMachineUpdate}
            />
          </TableContainer>
          <Button onClick={() => setBuyingMachineOpen(true)}>
            Добавити техніку або обладнання
          </Button>
          <CreateBuyingMachine
            open={buyingMachineOpen}
            setOpen={setBuyingMachineOpen}
            res={buyingMachineRes}
            setRes={setBuyingMachineRes}
            update={buyingMachineUpdate}
            setUpdate={setBuyingMachineUpdate}
          />
          <Text textAlign={"center"} fontSize={"25px"} mt={"25px"}>
            Розрахунок грошового потоку (витрати)
          </Text>
          <TableContainer>
            <Table size={"sm"}>
              <Thead>
                <Th></Th>
                <Th>Назва</Th>
                <Th>Тип витрат</Th>
                <Th>Група витрат</Th>
                <Th>Сума</Th>
                <Th></Th>
                <Th></Th>
              </Thead>
              <Tbody>
                {map.outcome?.map((el) => (
                  <Tr key={el.id}>
                    <Td
                      onClick={() => {
                        setOutcomeRes({
                          outId: el.id,
                          group: el.group,
                          id: el.techCartId!,
                          type: el.type,
                        });
                        setOutcomeOpen(true);
                        setOutcomeUpd(true);
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
                      <Link to={TEHMAP_ROUTER + `/${el.techCartId}`}>
                        <ViewIcon boxSize={5} color={"blue.400"} /> {el.name}
                      </Link>
                    </Td>
                    <Td>{el.type}</Td>
                    <Td>{el.group}</Td>
                    <Td>
                      {(() => {
                        if (el.group == "Прямі") {
                          const cart = map.maps.find(
                            (e) => e.id == el.techCartId
                          );
                          return cart?.area! * cart?.costHectare!;
                        } else if (el.group == "Постійні") {
                          const adm = map.administration.find(
                            (e) => e.id == el.administrationId
                          );
                          return adm?.cost;
                        } else if (el.group == "Купівля техніки і обладнання") {
                          const buying = map.buyingMachine.find(
                            (e) => e.id == el.buyingMachineId
                          );
                          return buying?.amount! * buying?.cost!;
                        }
                      })()}
                    </Td>
                    <Td
                      onClick={() => {
                        setDeleteOpen({
                          isOpen: true,
                          text: "Витрату",
                          func: () => {
                            deleteOutcome(map, el.id!);
                            //@ts-ignore
                            setDeleteOpen({ isOpen: false });
                          },
                        });
                      }}
                    >
                      <MyDeleteIcon />
                    </Td>
                    <Td
                      onClick={() => {
                        setIsUsingOutcome(map, {
                          outcomeId: el.id!,
                          value: !el.isUsing!,
                        });
                      }}
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
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Button
            onClick={
              //@ts-ignore
              user.role == ""
                ? () => {
                    setShowAlert(true);
                  }
                : () => setOutcomeOpen(true)
            }
          >
            Добавити витрату в розрахунок
          </Button>
        </Box>
      )}
      {open && (
        <CreateCart
          open={open}
          setOpen={setOpen}
          update={update}
          setUpdate={setUpdate}
          res={res}
          setRes={setRes as any}
          complex={complex}
          setComplex={setComplex}
        />
      )}
      {/* <CreateWork
        open={workOpen}
        setOpen={setWorkOpen}
        update={update}
        setUpdate={setUpdate}
        res={workRes}
        setRes={setWorkRes as any}
      /> */}
      {!!showAlert && (
        <NoAuthAlert setShowAlert={setShowAlert} showAlert={showAlert} />
      )}
      {!!deleteOpen.isOpen && (
        <DeleteAlert
          open={deleteOpen.isOpen}
          setOpen={setDeleteOpen as any}
          text={deleteOpen.text!}
          func={deleteOpen.func}
        />
      )}
      {!!openCopy && <CopyCartPupUp open={openCopy} setOpen={setOpenCopy} />}
      <PublicationPopUp
        data={publicationOpen}
        setData={setPublicationOpen as any}
      />
      <CreateOutcome
        open={outcomeOpen}
        setOpen={setOutcomeOpen}
        res={outcomeRes}
        setRes={setOutcomeRes}
        update={outcomeUpd}
        setUpdate={setOutcomeUpd}
      />
      {/* <Input
        type={"file"}
        accept={"image/jpg, image/png"}
        onChange={async (e: ChangeEvent<HTMLInputElement>) => {
          if (!e.target.files) return;
          const file = e.target?.files[0];

          console.log(file);

          // const { data, error } = await supabase.storage
          //   .from("images")
          //   .upload("unUsed/third", file);
          const { data, error } = await supabase.storage
            .from("images")
            .list("unUsed", {
              limit: 100,
              offset: 0,
              sortBy: { column: "name", order: "asc" },
            });
          console.log(data);
          console.log(error);
        }}
      /> */}
    </Container>
  );
});

export default MapJornal;
