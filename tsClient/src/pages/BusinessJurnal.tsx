import { Box, Button, TableContainer, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import CreateBusiness, { CreateBusinessProp } from "../modules/CreateBusiness";
import BusinessTable from "../modules/BusinessTable";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import useBusiness from "../shared/hook/useBusiness";
import { useNavigate } from "react-router-dom";
import { BUSINESScATALOG_ROUTER } from "../utils/consts";
import DeleteAlert, { DeleteProps } from "../components/DeleteAlert";
import useEnterprise from "../shared/hook/useEnterprise";
import CartsTable from "src/modules/CartsTable";
import { resTechCartsWithOpers } from "../../../tRPC serv/controllers/TechCartService";
import CreateCart, { cartProps } from "src/modules/CreateCart";
import NoAuthAlert from "src/components/NoAuthAlert";
import CartPublicationPopUp from "src/modules/CartPublicationPopUp";
import MyTableContainer from "src/ui/MyTableContainer";
import MyHeading from "src/ui/MyHeading";

function BusinessJurnal() {
  const { business, map, user } = useContext(Context);
  const [agreeOpen, setAgreeOpen] = useState(false);
  const [agreeData, setAgreeData] = useState<{
    BusinessId: number;
    isPublic: boolean;
    isAgree?: boolean;
  }>({
    BusinessId: 0,
    isPublic: false,
  });
  const [openBusiness, setOpenBusiness] = useState(false);
  const [update, setUpdate] = useState(false);
  useEnterprise();
  const [res, setRes] = useState<CreateBusinessProp>({
    name: "",
    dateStart: "",
    initialAmount: "",
    realizationTime: "",
    topic: "",
  });
  useBusiness(business, map);
  const navigate = useNavigate();
  const [deleteRes, setDeleteRes] = useState<DeleteProps>({
    func: () => {},
    isOpen: false,
    text: "бізнес-план",
  });
  let maps: resTechCartsWithOpers[] = JSON.parse(JSON.stringify(map.maps));
  maps.sort((a, b) => a.id! - b.id!);
  const [mapRes, setMapRes] = useState<cartProps>({
    nameCart: "",
    area: "",
    salary: "",
    priceDiesel: "",
    year: "",
    isBasic: null,
  });
  const [mapOpen, setMapOpen] = useState(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [publicationOpen, setPublicationOpen] = useState({
    isOpen: false,
    data: { id: 0, isPublic: false, agree: false },
  });
  const [complex, setComplex] = useState(false);
  return (
    <Box maxW="1000px" mx="auto">
      <MyHeading>Бізнес-плани</MyHeading>
      <MyTableContainer>
        <BusinessTable
          businessData={business.businessPlan}
          setOpen={setOpenBusiness}
          setRes={setRes}
          setUpdate={setUpdate}
          setDeleteOpen={setDeleteRes}
        />
      </MyTableContainer>
      <Button onClick={() => setOpenBusiness(true)}>
        Створити бізнес-план
      </Button>
      <Button
        onClick={() => {
          navigate(BUSINESScATALOG_ROUTER);
        }}
      >
        Переглянути
      </Button>
      <CreateBusiness
        open={openBusiness}
        setOpen={setOpenBusiness}
        res={res}
        setRes={setRes}
        update={update}
        setUpdate={setUpdate}
      />
      <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
        Технологічні карти
      </Text>
      <MyTableContainer>
        <CartsTable
          maps={maps}
          setRes={setMapRes}
          setOpen={setMapOpen}
          setUpdate={setUpdate}
          setShowAlert={setShowAlert}
          deleteOpen={deleteRes.isOpen}
          setDeleteOpen={setDeleteRes}
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
                  setMapOpen(true);
                }
          }
        >
          Добавити технологічну карту
        </Button>
      </Box>
      {mapOpen && (
        <CreateCart
          open={mapOpen}
          setOpen={setMapOpen}
          update={update}
          setUpdate={setUpdate}
          res={mapRes}
          setRes={setRes as any}
          complex={complex}
          setComplex={setComplex}
        />
      )}
      <DeleteAlert
        func={deleteRes.func}
        isOpen={deleteRes.isOpen}
        setOpen={setDeleteRes as any}
        text={deleteRes.text}
      />
      {!!showAlert && (
        <NoAuthAlert setShowAlert={setShowAlert} showAlert={showAlert} />
      )}
      <CartPublicationPopUp
        data={publicationOpen}
        setData={setPublicationOpen as any}
      />
    </Box>
  );
}

export default observer(BusinessJurnal);
