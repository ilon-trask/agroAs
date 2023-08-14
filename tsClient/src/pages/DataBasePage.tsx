import React, { useContext, useEffect, useState } from "react";
import { Container, TableContainer, Text } from "@chakra-ui/react";
import BusinessTable from "src/modules/BusinessTable";
import CartsTable from "src/modules/CartsTable";
import { Context } from "src/main";
import { observer } from "mobx-react-lite";
import { CreateBusinessProp } from "src/modules/CreateBusiness";
import { cartProps } from "src/modules/CreateCart";
import useBusiness from "src/shared/hook/useBusiness";
import { agreeCarts, getPublicBusiness } from "src/http/requests";
import MyTableContainer from "src/ui/MyTableContainer";
import MyHeading from "src/ui/MyHeading";

function DataBasePage() {
  const { business, map } = useContext(Context);
  useBusiness(business, map);
  useEffect(() => {
    getPublicBusiness(map, business);
    agreeCarts(map);
  }, []);
  const [openBusiness, setOpenBusiness] = useState(false);
  const [res, setRes] = useState<CreateBusinessProp>({
    dateStart: "",
    enterpriseId: "",
    initialAmount: "",
    name: "",
    realizationTime: "",
    topic: "",
    city: "",
    goal: "",
    responsiblePerson: "",
  });
  const [update, setUpdate] = useState(false);
  const [mapRes, setMapRes] = useState<cartProps>({
    area: "",
    isBasic: false,
    nameCart: "",
    priceDiesel: "",
    salary: "",
    year: "",
    cultivationTechnologyId: "",
    cultureId: "",
  });
  const [mapOpen, setMapOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [deleteRes, setDeleteRes] = useState({
    isOpen: false,
    data: { id: 0, isPublic: false, agree: false },
  });
  const setPublicationOpen = () => {};
  const bus = [...business.publicBusinessPlan];
  const maps = [...map.agreeCarts];
  return (
    <Container maxW="container.lg">
      <MyHeading mt={"15px"}>Бізнес-плани</MyHeading>
      <MyTableContainer>
        <BusinessTable
          businessData={bus}
          setOpen={setOpenBusiness}
          setRes={setRes}
          setUpdate={setUpdate}
          setDeleteOpen={setDeleteRes as any}
        />
      </MyTableContainer>
      <MyHeading mt={"15px"}>Технологічні карти</MyHeading>
      <MyTableContainer>
        <CartsTable
          maps={maps}
          setRes={setMapRes}
          setOpen={setMapOpen}
          setUpdate={setUpdate}
          setShowAlert={setShowAlert}
          deleteOpen={deleteRes.isOpen}
          setDeleteOpen={setDeleteRes}
          setPublicationOpen={setPublicationOpen as any}
        />
      </MyTableContainer>
      <MyHeading>Відео матеріали</MyHeading>
    </Container>
  );
}

export default observer(DataBasePage);
