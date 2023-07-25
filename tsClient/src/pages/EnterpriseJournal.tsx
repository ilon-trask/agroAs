import {
  Button,
  Container,
  Table,
  Tbody,
  Td,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MyDeleteIcon from "src/ui/Icons/MyDeleteIcon";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import MyViewIcon from "src/ui/Icons/MyViewIcon";
import MyHeading from "src/ui/MyHeading";
import MyTableContainer from "src/ui/MyTableContainer";
import { getEnterprise } from "../http/requests";
import { Context } from "../main";
import CartsTable from "../modules/CartsTable";
import CreateCart, { cartProps } from "../modules/CreateCart";
import CreateEnterprise from "../modules/CreateEnterprise";
import { CreateEnterpriseProps } from "../modules/CreateEnterprise/CreateEnterprise";
import { ENTERPRISE_ROUTER, ENTERPRISE_TAX_GROUP } from "../utils/consts";

function Enterprise() {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartUpdate, setCartUpdate] = useState(false);
  const [cartRes, setCartRes] = useState<cartProps>({
    area: "",
    nameCart: "",
    priceDiesel: "",
    salary: "",
    year: "",
    cultivationTechnologyId: "",
    cultureId: "",
    isBasic: null,
  });
  const [res, setRes] = useState<CreateEnterpriseProps>({
    name: "",
    form: "",
    taxGroup: "",
  });
  const { enterpriseStore, map, user } = useContext(Context);
  useEffect(() => {
    if (!enterpriseStore.enterprise[0]) getEnterprise(enterpriseStore);
  }, []);
  return (
    <Container maxW="container.lg">
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
                    setRes({
                      entId: el.id,
                      form: el.form,
                      name: el.name,
                      taxGroup: el.taxGroup,
                    });
                    setUpdate(true);
                    setOpen(true);
                  }}
                >
                  <MyEditIcon />
                </Td>
                <Td>
                  <Link to={ENTERPRISE_ROUTER + "/" + el.id}>
                    <MyViewIcon /> {el.name}
                  </Link>
                </Td>
                <Td>{el.form}</Td>
                <Td>
                  <Link
                    to={ENTERPRISE_TAX_GROUP + "/" + el.taxGroup + "/" + el.id}
                  >
                    <MyViewIcon /> {el.taxGroup}
                  </Link>
                </Td>
                <Td>
                  <MyDeleteIcon />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </MyTableContainer>
      <Button onClick={() => setOpen(true)}>Створити підприємство</Button>
      <CreateEnterprise
        open={open}
        setOpen={setOpen}
        update={update}
        setUpdate={setUpdate}
        res={res}
        setRes={setRes}
      />
      <MyHeading>Культури та технології</MyHeading>
      <CartsTable
        setUpdate={setCartUpdate}
        setDeleteOpen={() => {}}
        setOpen={setCartOpen}
        setPublicationOpen={() => {}}
        deleteOpen={false}
        maps={map.businessCarts}
        setRes={setCartRes}
        setShowAlert={() => {}}
        isCul={true}
      />
      <Button
        onClick={() => {
          setCartOpen(true);
          setCartRes({
            area: "",
            isBasic: true,
            nameCart: "",
            priceDiesel: "",
            salary: "",
            year: "",
          });
        }}
      >
        Створити нову
      </Button>
      <CreateCart
        open={cartOpen}
        res={cartRes}
        setOpen={setCartOpen}
        setRes={setCartRes}
        setUpdate={setCartUpdate}
        update={cartUpdate}
        isCul={true}
      />
    </Container>
  );
}

export default observer(Enterprise);
