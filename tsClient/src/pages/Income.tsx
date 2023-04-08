import React, { useContext, useState } from "react";
import {
  Button,
  Container,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Dialog from "../components/Dialog";
import CreateIncome from "../modules/CreateIncome";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { YIELD_CALC_ROUTER } from "../utils/consts";
import { DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import NoAuthAlert from "../components/NoAuthAlert";
import DeleteAlert from "../components/DeleteAlert";
import { deleteYieldPlant } from "../http/requests";

function Income() {
  const { income, user } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState<any>({
    idOpen: false,
    text: "планування",
    func: () => {},
    operId: null,
    cartId: null,
  });
  console.log(1);

  return (
    <Container maxW="container.lg">
      <Heading textAlign={"center"} fontSize={"25px"} mt={"15px"}>
        Планування урожайності
      </Heading>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th>Культура</Th>
              <Th>Коментар</Th>
              <Th>Густота насаджень</Th>
              <Th>Урожайність з гектару</Th>
              <Th>Урожайність з рослини</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {income.yieldPlant.map((el) => {
              return (
                <Tr key={el.id!}>
                  <Td>
                    <Link to={YIELD_CALC_ROUTER + "/" + el.id}>
                      <ViewIcon boxSize={5} /> {el?.culture?.name}
                    </Link>
                  </Td>
                  <Td>{el.comment}</Td>
                  <Td>{el.plantingDensity}</Td>
                  <Td>{el.yieldPerHectare}</Td>
                  <Td>{el.yieldPerRoll}</Td>
                  <Td
                    textAlign={"center"}
                    cursor={"pointer"}
                    color={"red"}
                    onClick={
                      user.role == ""
                        ? () => setShowAlert(true)
                        : () => {
                            setDeleteOpen(() => ({
                              ...deleteOpen,
                              isOpen: true,
                              cartId: el.id!,
                              text: "карту",
                              func: () => {
                                deleteYieldPlant(income, {
                                  yieldPlantId: el.id!,
                                });
                                setDeleteOpen({ ...deleteOpen, isOpen: false });
                              },
                            }));
                          }
                    }
                  >
                    <DeleteIcon w={"20px"} h={"auto"} />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Button mt={"15px"} onClick={() => setOpen(true)}>
        Добавити культуру
      </Button>
      <CreateIncome open={open} setOpen={setOpen} />
      <NoAuthAlert setShowAlert={setShowAlert} showAlert={showAlert} />
      {!!deleteOpen.isOpen && (
        <DeleteAlert
          open={deleteOpen.isOpen}
          setOpen={setDeleteOpen}
          text={deleteOpen.text}
          func={deleteOpen.func}
        />
      )}
    </Container>
  );
}

export default observer(Income);
