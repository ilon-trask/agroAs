import { Box, Button, TableContainer, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import CreateBusiness, { CreateBusinessProp } from "../modules/CreateBusiness";
import BusinessTable from "../modules/BusinessTable";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import useBusiness from "./hook/useBusiness";
import { useNavigate } from "react-router-dom";
import { BUSINESScATALOG_ROUTER } from "../utils/consts";

function BusinessJurnal() {
  const { business, map } = useContext(Context);
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
  const [res, setRes] = useState<CreateBusinessProp>({
    name: "",
    dateStart: "",
    enterpriseId: "",
    initialAmount: "",
    realizationTime: "",
    cultureIds: [],
  });
  useBusiness(business, map);
  const navigate = useNavigate();
  return (
    <Box maxW="1000px" mx="auto">
      <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
        Бізнес-плани
      </Text>

      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <BusinessTable
          setOpen={setOpenBusiness}
          setRes={setRes}
          setUpdate={setUpdate}
        />
      </TableContainer>
      <Button onClick={() => setOpenBusiness(true)}>
        Створити бізнес-план
      </Button>
      <Button>Добавити ТЕО</Button>
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
    </Box>
  );
}

export default observer(BusinessJurnal);
