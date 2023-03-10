import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import CartsTable from "../modules/CartsTable";
import { observer } from "mobx-react-lite";
import CreateCart, { cartProps } from "../modules/CreateCart";
import { useNavigate } from "react-router-dom";
import { Itech_cart } from "../../../tRPC serv/models/models";
import { TableContainer, Text, Button, Box, Container } from "@chakra-ui/react";
import NoAuthAlert from "../components/NoAuthAlert";
import { deleteCart, getCopyCarts } from "../http/requests";
import DeleteAlert from "../components/DeleteAlert";
import CopyCartPupUp from "../modules/CopyCartPupUp";
import { resTechCartsWithOpers } from "../../../tRPC serv/controllers/TechCartService";
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
  const [deleteOpen, setDeleteOpen] = useState<any>({
    idOpen: false,
    operId: null,
    cartId: null,
  });
  const [openCopy, setOpenCopy] = useState(false);
  let maps: resTechCartsWithOpers[] = JSON.parse(JSON.stringify(map.maps));
  maps.sort((a, b) => a.id! - b.id!);
  return (
    <Container maxW="container.lg">
      <Box>
        <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
          Журнал технологічних карт
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
          ></CartsTable>
        </TableContainer>
        <Box mt={"15px"} ml={"auto"} mb={"25px"} display={"flex"} gap={"10px"}>
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
          <Button
            onClick={() => {
              setOpenCopy(true);
              getCopyCarts(map);
            }}
          >
            Скопіювати з журналу
          </Button>
        </Box>
        <CreateCart
          open={open}
          setOpen={setOpen}
          update={update}
          setUpdate={setUpdate}
          res={res}
          setRes={setRes as any}
        />
      </Box>
      <Box>
        <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
          Журнал спеціалізованих робіт
        </Text>
        <TableContainer
          maxW="1000px"
          mx="auto"
          mt={"20px"}
          overflowX={"scroll"}
        >
          <CartsTable
            maps={[]}
            setRes={setRes}
            setOpen={setOpen}
            setUpdate={setUpdate}
            setShowAlert={setShowAlert}
            deleteOpen={deleteOpen}
            setDeleteOpen={setDeleteOpen}
          ></CartsTable>
        </TableContainer>
        <Box mt={"15px"} ml={"auto"} mb={"25px"} display={"flex"} gap={"10px"}>
          <Button>Добавити спеціалізовані роботи</Button>
        </Box>
      </Box>
      <NoAuthAlert setShowAlert={setShowAlert} showAlert={showAlert} />
      <DeleteAlert
        open={deleteOpen.isOpen}
        setOpen={setDeleteOpen}
        text={"карту"}
        func={() => {
          deleteCart(map, deleteOpen.cartId);
          setDeleteOpen({ ...deleteOpen, isOpen: false });
        }}
      />
      <CopyCartPupUp open={openCopy} setOpen={setOpenCopy} />
    </Container>
  );
});

export default MapJornal;
