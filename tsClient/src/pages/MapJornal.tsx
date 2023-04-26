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
} from "@chakra-ui/react";
import NoAuthAlert from "../components/NoAuthAlert";
import { deleteCart, getCopyCarts, supabase } from "../http/requests";
import DeleteAlert from "../components/DeleteAlert";
import CopyCartPupUp from "../modules/CopyCartPopUp";
import { resTechCartsWithOpers } from "../../../tRPC serv/controllers/TechCartService";
import CreateWork, { workProps } from "../modules/CreateWork";
import WorkTable from "../modules/WorkTable";
import PublicationPopUp from "../modules/CartPublicationPopUp";
import AgreeCartsTable from "../modules/AgreeCartsTable";
import { Link } from "react-router-dom";
import { EditIcon, ViewIcon } from "@chakra-ui/icons";
import { TEHMAP_ROUTER } from "../utils/consts";
import CreateOutcome from "../modules/CreateOutcome/";
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
  });
  const [workRes, setWorkRes] = useState<workProps>({
    nameWork: "",
    area: "",
    salary: "",
    priceDiesel: "",
  });
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<any>({
    idOpen: false,
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

  return (
    <Container maxW="container.lg">
      <Box>
        {user.role == "service_role" && (
          <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
            ПРЯМІ ВИТРАТИ
          </Text>
        )}
        <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
          Технологічні карти
        </Text>
        <TableContainer
          maxW="1000px"
          mx="auto"
          mt={"20px"}
          overflowX={"scroll"}
        >
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
        </TableContainer>
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
                    <Tr>
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
        )}
      </Box>
      {user.role == "service_role" && (
        <Box>
          <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
            ЗАГАЛЬНО ВИРОБНИЧІ ВИТРАТИ
          </Text>
          <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
            ПОСТІЙНІ ВИТРАТИ
          </Text>
          <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
            Адміністування
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
          <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
            БУДІВНИЦТВО БУДІВЕЛЬ І СПОРУД
          </Text>
          <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
            Спеціалізовані та будівельні роботи
          </Text>
          <TableContainer
            maxW="1000px"
            mx="auto"
            mt={"20px"}
            overflowX={"scroll"}
          >
            <WorkTable
              works={works}
              setRes={setWorkRes}
              setOpen={setWorkOpen}
              setUpdate={setUpdate}
              setShowAlert={setShowAlert}
              deleteOpen={deleteOpen}
              setDeleteOpen={setDeleteOpen}
            ></WorkTable>
          </TableContainer>
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
            <Table>
              <Thead>
                <Th>Назва</Th>
                <Th>Марка</Th>
                <Th>Кількість</Th>
                <Th>Ціна</Th>
                <Th>Сума</Th>
              </Thead>
            </Table>
          </TableContainer>
          <Button>Добавити техніку або обладнання</Button>

          <Text textAlign={"center"} fontSize={"25px"} mt={"25px"}>
            Розрахунок грошового потоку (витрати)
          </Text>
          <TableContainer>
            <Table size={"sm"}>
              <Thead>
                <Th>Назва</Th>
                <Th>Тип витрат</Th>
                <Th>Група витрат</Th>
                <Th>Сума</Th>
              </Thead>
              <Tbody>
                {map.outcome?.map((el) => (
                  <Tr>
                    <Td>{el.name}</Td>
                    <Td>{el.type}</Td>
                    <Td>{el.group}</Td>
                    <Td>
                      {(() => {
                        const cart = map.maps.find(
                          (e) => e.id == el.techCartId
                        );
                        return cart?.area! * cart?.costHectare!;
                      })()}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Button onClick={() => setOutcomeOpen(true)}>
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
          setOpen={setDeleteOpen}
          text={deleteOpen.text}
          func={deleteOpen.func}
        />
      )}
      {!!openCopy && <CopyCartPupUp open={openCopy} setOpen={setOpenCopy} />}
      <PublicationPopUp
        data={publicationOpen}
        setData={setPublicationOpen as any}
      />
      <CreateOutcome open={outcomeOpen} setOpen={setOutcomeOpen} />
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
