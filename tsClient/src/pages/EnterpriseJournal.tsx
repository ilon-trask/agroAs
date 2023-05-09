import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEnterprise } from "../http/requests";
import { Context } from "../main";
import CreateEnterprise from "../modules/CreateEnterprise";
import { CreateEnterpriseProps } from "../modules/CreateEnterprise/CreateEnterprise";
import { ENTERPRISE_ROUTER } from "../utils/consts";

function Enterprise() {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [res, setRes] = useState<CreateEnterpriseProps>({
    name: "",
    form: "",
    taxGroup: "",
  });
  const { enterpriseStore } = useContext(Context);
  useEffect(() => {
    if (!enterpriseStore.enterprise[0]) getEnterprise(enterpriseStore);
  }, []);
  return (
    <Container maxW="container.lg">
      <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
        Підприємство
      </Text>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
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
                  <EditIcon
                    color={"blue.400"}
                    w={"20px"}
                    h={"auto"}
                    cursor={"pointer"}
                  />
                </Td>
                <Td>
                  <Link to={ENTERPRISE_ROUTER + "/" + el.id}>
                    <ViewIcon boxSize={5} color={"blue.400"} /> {el.name}
                  </Link>
                </Td>
                <Td>{el.form}</Td>
                <Td>{el.taxGroup}</Td>
                <Td>
                  <DeleteIcon w={"20px"} h={"auto"} color={"red"} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Button onClick={() => setOpen(true)}>Створити підприємство</Button>
      <CreateEnterprise
        open={open}
        setOpen={setOpen}
        update={update}
        setUpdate={setUpdate}
        res={res}
        setRes={setRes}
      />
    </Container>
  );
}

export default observer(Enterprise);
