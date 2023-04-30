import { Box, Button, TableContainer } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import CreateBusiness from "../modules/CreateBusiness";
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
  useBusiness(business, map);
  const navigate = useNavigate();
  return (
    <Box maxW="1000px" mx="auto">
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <BusinessTable />
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
      <CreateBusiness open={openBusiness} setOpen={setOpenBusiness} />
    </Box>
  );
}

export default observer(BusinessJurnal);
