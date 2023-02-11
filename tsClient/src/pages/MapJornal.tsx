import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import CartsTable from "../modules/CartsTable";
import { observer } from "mobx-react-lite";
import Loader from "../components/Loader";
import style from "./map.module.css";
import CreateCart, { cartProps } from "../modules/CreateCart";
import { useNavigate } from "react-router-dom";
import { Itech_cart } from "../../../tRPC serv/models/models";
import { css } from "@emotion/css";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  TableContainer,
  Text,
  Button,
  Box,
  Container,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import NoAuthAlert from "../components/NoAuthAlert";
export interface Icart extends Itech_cart {
  area: any;
  salary: any;
  priceDiesel: any;
}

const MapJornal = observer(function () {
  const { map, user } = useContext(Context);
  const [open, setOpen] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [res, setRes] = useState<cartProps>({
    nameCart: "",
    area: "",
    salary: "",
    priceDiesel: "",
  });
  const [showAlert, setShowAlert] = useState<boolean>(false);
  console.log(showAlert);
  const navigate = useNavigate();
  return (
    <Container maxW="container.lg">
      <Box>
        {map.isLoading ? <Loader /> : <></>}
        <Text textAlign={"center"} fontSize={"25px"}>
          Журнал технологічних карт
        </Text>
        <TableContainer
          maxW="1000px"
          mx="auto"
          mt={"20px"}
          overflowX={"scroll"}
        >
          <CartsTable
            setRes={setRes}
            setOpen={setOpen}
            setUpdate={setUpdate}
            setShowAlert={setShowAlert}
          ></CartsTable>
        </TableContainer>
        <Button
          ml={"auto"}
          mr={"0"}
          mt={"15px"}
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
        <CreateCart
          open={open}
          setOpen={setOpen}
          update={update}
          setUpdate={setUpdate}
          res={res}
          setRes={setRes as any}
        />
      </Box>
      <NoAuthAlert setShowAlert={setShowAlert} showAlert={showAlert} />
    </Container>
  );
});

export default MapJornal;
