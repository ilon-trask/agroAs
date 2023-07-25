import {
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import CreateBusiness, { CreateBusinessProp } from "../modules/CreateBusiness";
import BusinessTable from "../modules/BusinessTable";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import useBusiness from "../shared/hook/useBusiness";
import { useNavigate } from "react-router-dom";
import DeleteAlert, { DeleteProps } from "../components/DeleteAlert";
import useEnterprise from "../shared/hook/useEnterprise";
import CartsTable from "src/modules/CartsTable";
import { resTechCartsWithOpers } from "../../../tRPC serv/controllers/TechCartService";
import CreateCart, { cartProps } from "src/modules/CreateCart";
import NoAuthAlert from "src/components/NoAuthAlert";
import CartPublicationPopUp from "src/modules/CartPublicationPopUp";
import MyTableContainer from "src/ui/MyTableContainer";
import MyHeading from "src/ui/MyHeading";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import MyDeleteIcon from "src/ui/Icons/MyDeleteIcon";
import CreateEnterprise, {
  CreateEnterpriseProps,
} from "src/modules/CreateEnterprise/CreateEnterprise";
import { deleteEnterprise } from "src/http/requests";

function BusinessJurnal() {
  const { business, map, user, enterpriseStore } = useContext(Context);
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
  let maps = map.maps;
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
  const [enterpriseOpen, setEnterpriseOpen] = useState(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [publicationOpen, setPublicationOpen] = useState({
    isOpen: false,
    data: { id: 0, isPublic: false, agree: false },
  });
  const [complex, setComplex] = useState(false);
  const [enterpriseRes, setEnterpriseRes] = useState<CreateEnterpriseProps>({
    name: "",
    form: "",
    taxGroup: "",
  });
  return (
    <Box maxW="1000px" mx="auto">
      <MyHeading>Підприємство</MyHeading>
      <MyTableContainer>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Td></Td>
              <Td>Назва підприємства</Td>
              <Td>Організаційно правова форма</Td>
              <Td>Група оподаткування</Td>
              <Td></Td>
            </Tr>
          </Thead>
          <Tbody>
            {enterpriseStore?.enterprise?.map((el) => (
              <Tr key={el.id}>
                <Td
                  onClick={() => {
                    setEnterpriseRes({
                      entId: el.id,
                      form: el.form,
                      name: el.name,
                      taxGroup: el.taxGroup,
                    });
                    setUpdate(true);
                    setEnterpriseOpen(true);
                  }}
                >
                  <MyEditIcon />
                </Td>
                <Td>{el.name}</Td>
                <Td>{el.form}</Td>
                <Td>{el.taxGroup}</Td>
                <Td>
                  <MyDeleteIcon
                    onClick={() => {
                      setDeleteRes({
                        func: () => {
                          setDeleteRes((prev) => ({ ...prev, isOpen: false }));
                          deleteEnterprise(enterpriseStore, el.id!);
                        },
                        isOpen: true,
                        text: "підприємство",
                      });
                    }}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </MyTableContainer>
      <Button onClick={() => setEnterpriseOpen(true)}>
        Створити підприємство
      </Button>
      <CreateEnterprise
        open={enterpriseOpen}
        setOpen={setEnterpriseOpen}
        update={update}
        setUpdate={setUpdate}
        res={enterpriseRes}
        setRes={setEnterpriseRes}
      />
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

      <CreateBusiness
        open={openBusiness}
        setOpen={setOpenBusiness}
        res={res}
        setRes={setRes}
        update={update}
        setUpdate={setUpdate}
      />
      <MyHeading>Технологічні карти</MyHeading>
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
          setRes={setMapRes}
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
