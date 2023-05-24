import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Icredit, Igrant, Iinvestment } from "../../../tRPC serv/models/models";
import { IdeleteHeading } from "../components/DeleteAlert";
import {
  deleteCredit,
  deleteDerj,
  deleteGrant,
  deleteInvestment,
  getCredit,
  getGrant,
  getInvestment,
  getWorker,
} from "../http/requests";
import { Context } from "../main";
import CreateCredit, {
  CreditProps,
} from "../modules/CreateCredit/CreateCredit";
import CreateDerjSupport, {
  CreateDerjProps,
} from "../modules/CreateDerjSupport/CreateDerjSupport";
import CreateGrant, {
  CreateGrantProps,
} from "../modules/CreateGrant/CreateGrant";
import CreateInvestment, {
  CreateInvestmentProps,
} from "../modules/CreateInvestment/CreateInvestment";
import CreateWorker from "../modules/CreateWorker";
import { CreateWorkerProp } from "../modules/CreateWorker/CreateWorker";
import StaffingTable from "../modules/StaffingTable";

function Enterprise() {
  const { id } = useParams();
  const { enterpriseStore, income } = useContext(Context);
  useEffect(() => {
    getInvestment(income);
    getCredit(income);
    getGrant(income);
  }, []);
  const myEnterprise = enterpriseStore.enterprise.find((el) => el.id == id);
  const [deleteOpen, setDeleteOpen] = useState<{
    isOpen: boolean;
    text: IdeleteHeading;
    func: any;
    id: number;
  }>({
    isOpen: false,
    text: "планування",
    func: () => {},
    id: 0,
  });
  const [creditOpen, setCreditOpen] = useState<boolean>(false);
  const [creditUpdate, setCreditUpdate] = useState<boolean>(false);
  const [creditRes, setCreditRes] = useState<CreditProps>({
    cost: "",
    date: "",
    name: "",
    purpose: "",
    isUseCost: false,
    enterpriseId: +id!,
  });
  const credits: Icredit[] = JSON.parse(JSON.stringify(income.credit));
  //@ts-ignore
  credits.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  const [investOpen, setInvestOpen] = useState(false);
  const [investRes, setInvestRes] = useState<CreateInvestmentProps>({
    cost: "",
    date: "",
    name: "",
    origin: "",
    enterpriseId: +id!,
  });
  const [investUpdate, setInvestUpdate] = useState(false);
  const investments: Iinvestment[] = JSON.parse(
    JSON.stringify(income.investment)
  );
  //@ts-ignore
  investments.sort((a, b) => new Date(a.createdAt!) - new Date(b.createdAt!));
  const [derjOpen, setDerjOpen] = useState(false);
  const [derjRes, setDerjRes] = useState<CreateDerjProps>({
    cost: "",
    date: "",
    name: "",
    purpose: "",
    enterpriseId: +id!,
  });
  const [derjUpdate, setDerjUpdate] = useState(false);
  //@ts-ignore
  const derj: Iderj_support[] = JSON.parse(JSON.stringify(income.derj));
  //@ts-ignore
  derj.sort((a, b) => new Date(a.createdAt!) - new Date(b.createdAt!));
  const [grantOpen, setGrantOpen] = useState(false);
  const [grantRes, setGrantRes] = useState<CreateGrantProps>({
    cost: "",
    date: "",
    name: "",
    purpose: "",
    enterpriseId: +id!,
  });
  const [grantUpdate, setGrantUpdate] = useState(false);
  const grant: Igrant[] = JSON.parse(JSON.stringify(income.grant));
  //@ts-ignore
  grant.sort((a, b) => new Date(a.createdAt!) - new Date(b.createdAt!));
  return (
    <Container maxW={"container.lg"}>
      <Box mx={"auto"}>
        <Heading size={"md"} textAlign={"center"} mt={5}>
          Загальні данні
          <br /> підприємства: {myEnterprise?.name}
        </Heading>
      </Box>
      <Table mt={3}>
        <Thead>
          <Tr>
            <Th>Статус</Th>
            <Th>Діючий</Th>
            <Th>Планується створення</Th>
          </Tr>
          <Tr>
            <Th>Юридична адреса</Th>
            <Th colSpan={2}></Th>
          </Tr>
        </Thead>
      </Table>
      <Text
        textAlign={"center"}
        fontSize={"25px"}
        mt={"15px"}
        textTransform={"uppercase"}
      >
        Кредит
      </Text>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Назва</Th>
              <Th>Дата</Th>
              <Th>Сума</Th>
              <Th>Призначення</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {credits?.map((el) => {
              if (el.enterpriseId == +id!)
                return (
                  <Tr>
                    <Td
                      onClick={() => {
                        setCreditRes({
                          creditId: el.id!,
                          cost: el.cost,
                          date: el.date,
                          name: el.name,
                          purpose: el.purpose,
                          enterpriseId: +id!,
                          isUseCost: el.isUseCost,
                        });
                        setCreditUpdate(true);
                        setCreditOpen(true);
                      }}
                    >
                      <EditIcon
                        color={"blue.400"}
                        w={"20px"}
                        h={"auto"}
                        cursor={"pointer"}
                      />
                    </Td>
                    <Td>{el.name}</Td>
                    <Td>{el.date}</Td>
                    <Td>{el.cost}</Td>
                    <Td>{el.purpose}</Td>
                    <Td
                      onClick={() => {
                        setDeleteOpen({
                          text: "кредит",
                          isOpen: true,
                          func: () => {
                            deleteCredit(income, el.id!);
                            //@ts-ignore
                            setDeleteOpen({ isOpen: false });
                          },
                          id: el.id!,
                        });
                      }}
                    >
                      <DeleteIcon
                        w={"20px"}
                        h={"auto"}
                        color={"red"}
                        cursor={"pointer"}
                      />
                    </Td>
                  </Tr>
                );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Button onClick={() => setCreditOpen(true)}>Додати кредит</Button>
      <CreateCredit
        open={creditOpen}
        setOpen={setCreditOpen}
        res={creditRes}
        setRes={setCreditRes}
        update={creditUpdate}
        setUpdate={setCreditUpdate}
      />
      <Text
        textAlign={"center"}
        fontSize={"25px"}
        mt={"15px"}
        textTransform={"uppercase"}
      >
        Інвестиції
      </Text>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Назва</Th>
              <Th>Дата</Th>
              <Th>Сума</Th>
              <Th>Призначення</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {investments.map((el) => {
              if (el.enterpriseId == +id!)
                return (
                  <Tr>
                    <Td
                      onClick={() => {
                        setInvestRes({
                          investmentId: el.id!,
                          cost: el.cost,
                          date: el.date,
                          name: el.name,
                          origin: el.origin,
                          enterpriseId: +id!,
                        });
                        setInvestUpdate(true);
                        setInvestOpen(true);
                      }}
                    >
                      <EditIcon
                        color={"blue.400"}
                        w={"20px"}
                        h={"auto"}
                        cursor={"pointer"}
                      />
                    </Td>
                    <Td>{el.name}</Td>
                    <Td>{el.date}</Td>
                    <Td>{el.cost}</Td>
                    <Td>{el.origin}</Td>
                    <Td
                      onClick={() => {
                        setDeleteOpen({
                          func: () => {
                            deleteInvestment(income, el.id!);
                            //@ts-ignore
                            setDeleteOpen({ isOpen: false });
                          },
                          id: el.id!,
                          isOpen: true,
                          text: "інвестицію",
                        });
                      }}
                    >
                      <DeleteIcon
                        w={"20px"}
                        h={"auto"}
                        color={"red"}
                        cursor={"pointer"}
                      />
                    </Td>
                  </Tr>
                );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Button onClick={() => setInvestOpen(true)}>Додати інвестицію</Button>
      <CreateInvestment
        open={investOpen}
        setOpen={setInvestOpen}
        res={investRes}
        setRes={setInvestRes}
        update={investUpdate}
        setUpdate={setInvestUpdate}
      />
      <Text
        textAlign={"center"}
        fontSize={"25px"}
        mt={"15px"}
        textTransform={"uppercase"}
      >
        Державна підтримка субсидія
      </Text>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Назва</Th>
              <Th>Дата</Th>
              <Th>Сума</Th>
              <Th>Призначення</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {derj.map((el) => {
              if (el.enterpriseId == id!)
                return (
                  <Tr key={el.id}>
                    <Td
                      onClick={() => {
                        setDerjRes({
                          derjId: el.id!,
                          cost: el.cost,
                          enterpriseId: +id!,
                          date: el.date,
                          name: el.name,
                          purpose: el.purpose,
                        });
                        setDerjOpen(true);
                        setDerjUpdate(true);
                      }}
                    >
                      <EditIcon
                        color={"blue.400"}
                        w={"20px"}
                        h={"auto"}
                        cursor={"pointer"}
                      />
                    </Td>
                    <Td>{el.name}</Td>
                    <Td>{el.date}</Td>
                    <Td>{el.cost}</Td>
                    <Td>{el.purpose}</Td>
                    <Td
                      onClick={() => {
                        setDeleteOpen({
                          func: () => {
                            deleteDerj(income, el.id!);
                            //@ts-ignore
                            setDeleteOpen({ isOpen: false });
                          },
                          id: el.id!,
                          isOpen: true,
                          text: "державну допомогу",
                        });
                      }}
                    >
                      <DeleteIcon
                        w={"20px"}
                        h={"auto"}
                        color={"red"}
                        cursor={"pointer"}
                      />
                    </Td>
                  </Tr>
                );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Button onClick={() => setDerjOpen(true)}>
        Додати державну підтримку
      </Button>
      <CreateDerjSupport
        open={derjOpen}
        setOpen={setDerjOpen}
        res={derjRes}
        setRes={setDerjRes}
        update={derjUpdate}
        setUpdate={setDerjUpdate}
      />{" "}
      <Text
        textAlign={"center"}
        fontSize={"25px"}
        mt={"15px"}
        textTransform={"uppercase"}
      >
        Грант
      </Text>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Назва</Th>
              <Th>Дата</Th>
              <Th>Сума</Th>
              <Th>Призначення</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {grant.map((el) => {
              if (el.enterpriseId == +id!)
                return (
                  <Tr>
                    <Td
                      onClick={() => {
                        setGrantRes({
                          grantId: el.id!,
                          enterpriseId: +id!,
                          cost: el.cost,
                          date: el.date,
                          name: el.name,
                          purpose: el.purpose,
                        });
                        setGrantUpdate(true);
                        setGrantOpen(true);
                      }}
                    >
                      <EditIcon
                        color={"blue.400"}
                        w={"20px"}
                        h={"auto"}
                        cursor={"pointer"}
                      />
                    </Td>
                    <Td>{el.name}</Td>
                    <Td>{el.date}</Td>
                    <Td>{el.cost}</Td>
                    <Td>{el.purpose}</Td>
                    <Td
                      onClick={() =>
                        setDeleteOpen({
                          func: () => {
                            deleteGrant(income, el.id!);
                            //@ts-ignore
                            setDeleteOpen({ isOpen: false });
                          },
                          id: el.id!,
                          isOpen: true,
                          text: "грант",
                        })
                      }
                    >
                      <DeleteIcon
                        w={"20px"}
                        h={"auto"}
                        color={"red"}
                        cursor={"pointer"}
                      />
                    </Td>
                  </Tr>
                );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Button onClick={() => setGrantOpen(true)}>Додати грант</Button>
      <CreateGrant
        open={grantOpen}
        setOpen={setGrantOpen}
        res={grantRes}
        setRes={setGrantRes}
        update={grantUpdate}
        setUpdate={setGrantUpdate}
      />
    </Container>
  );
}

export default observer(Enterprise);
