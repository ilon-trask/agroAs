import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import CartsTable from "../modules/CartsTable";
import { observer } from "mobx-react-lite";
import CreateCart, { cartProps } from "../modules/CreateCart";
import { Ispecial_work, Itech_cart } from "../../../tRPC serv/models/models";
import { TableContainer, Text, Button, Box, Container } from "@chakra-ui/react";
import NoAuthAlert from "../components/NoAuthAlert";
import { deleteCart, getCopyCarts } from "../http/requests";
import DeleteAlert from "../components/DeleteAlert";
import CopyCartPupUp from "../modules/CopyCartPopUp";
import { resTechCartsWithOpers } from "../../../tRPC serv/controllers/TechCartService";
import CreateWork, { workProps } from "../modules/CreateWork";
import WorkTable from "../modules/WorkTable";
// import Button from "@mui/material/Button";
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
  let maps: resTechCartsWithOpers[] = JSON.parse(JSON.stringify(map.maps));
  maps.sort((a, b) => a.id! - b.id!);
  let works: Ispecial_work[] = JSON.parse(JSON.stringify(map.works));
  works.sort((a, b) => a.id! - b.id!);
  return (
    <Container maxW="container.lg">
      <Box>
        <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
          ???????????? ?????????????????????????? ????????
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
            ???????????????? ???????????????????????? ??????????
          </Button>
          <Button
            onClick={() => {
              setOpenCopy(true);
              getCopyCarts(map);
            }}
          >
            ???????????????????? ?? ??????????????
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
          ???????????? ?????????????????????????????? ??????????
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
        <Box mt={"15px"} ml={"auto"} mb={"25px"} display={"flex"} gap={"10px"}>
          <Button
            onClick={
              user.role == ""
                ? () => {
                    setShowAlert(true);
                  }
                : () => {
                    setWorkOpen(true);
                  }
            }
          >
            ???????????????? ???????????????????????????? ????????????
          </Button>
        </Box>
      </Box>
      <CreateWork
        open={workOpen}
        setOpen={setWorkOpen}
        update={update}
        setUpdate={setUpdate}
        res={workRes}
        setRes={setWorkRes as any}
      />
      <NoAuthAlert setShowAlert={setShowAlert} showAlert={showAlert} />
      <DeleteAlert
        open={deleteOpen.isOpen}
        setOpen={setDeleteOpen}
        text={deleteOpen.text}
        func={deleteOpen.func}
      />
      <CopyCartPupUp open={openCopy} setOpen={setOpenCopy} />
    </Container>
  );
});

export default MapJornal;
