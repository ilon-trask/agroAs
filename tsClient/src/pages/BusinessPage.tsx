import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  TableContainer,
  Button,
  Text,
  Table,
  Thead,
  Th,
} from "@chakra-ui/react";

import BusinessTable from "../modules/BusinessTable/BusinessTable";
import BusinessAgreeTable from "../modules/BusinessAgreeTable/";
import CreateBusinessPlan from "../modules/CreateBusiness";
import NoAuthAlert from "../components/NoAuthAlert";
import DeleteAlert from "../components/DeleteAlert";

import {
  deleteBusinessPlan,
  getBusinessCategory,
  getBusinessPlans,
} from "../http/requests";
import { Context } from "../main";
import BusinessPublicationPopUp from "../modules/BusinessPublicationPopUp";
import { BUSINESScATALOG_ROUTER } from "../utils/consts";
import { useNavigate } from "react-router-dom";
import useBusiness from "./hook/useBusiness";

function Business() {
  const { map, business, user } = useContext(Context);
  useBusiness(business, map);
  const navigate = useNavigate();
  const [createOpen, setCreateOpen] = useState(false);
  const [res, setRes] = useState<{
    name: string;
    businessCategoryId: "" | number;
  }>({
    name: "",
    businessCategoryId: "",
  });
  const [isErr, setIsErr] = useState(false);
  const [update, setUpdate] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [agreeOpen, setAgreeOpen] = useState(false);
  const [agreeData, setAgreeData] = useState<{
    BusinessId: number;
    isPublic: boolean;
    isAgree?: boolean;
  }>({
    BusinessId: 0,
    isPublic: false,
  });
  const [func, setFunc] = useState<any>();
  function deleteFunc(BusinessId: number) {
    setDeleteOpen(true);
    setFunc({
      func() {
        deleteBusinessPlan(map, business, BusinessId);
        setDeleteOpen(false);
      },
    });
  }
  function agreeFunc(BusinessId: number, isPublic: boolean, isAgree?: boolean) {
    setAgreeOpen(true);
    setAgreeData({
      BusinessId: BusinessId,
      isPublic: isPublic,
      isAgree: isAgree,
    });
  }
  const [showAlert, setShowAlert] = useState(false);
  return (
    <Box>
      <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
        Планування доходів
      </Text>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <Table size={"sm"}>
          <Thead>
            <Th>Продукт або послуга</Th>
            <Th>Кількість т</Th>
            <Th>Ціна грн/т</Th>
            <Th>Сума грн</Th>
          </Thead>
        </Table>
      </TableContainer>
      <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
        Планування витрат
      </Text>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <Table size={"sm"}>
          <Thead>
            <Th>Вид витрат</Th>
            <Th>Кількість т</Th>
            <Th>Ціна грн/т</Th>
            <Th>Сума грн</Th>
          </Thead>
        </Table>
      </TableContainer>
      <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
        Планування грошового потоку
      </Text>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <Table size={"sm"}>
          <Thead>
            <Th>Залишок на початок періоду</Th>
            <Th>Прихід</Th>
            <Th>Розхід</Th>
            <Th>Залишов на кінець періоду</Th>
          </Thead>
        </Table>
      </TableContainer>
      <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
        Планування графіку доходів та витрат
      </Text>
      <Box h={10}></Box>
      <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
        Приклади типових бізнес-планів
      </Text>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <BusinessTable
          setCreate={setCreateOpen}
          deleteFunc={deleteFunc}
          setShowAlert={setShowAlert}
          setRes={setRes}
          setUpdate={setUpdate}
          agreeFunc={agreeFunc}
          //   maps={maps}
          //   setOpen={setOpen}
          //   deleteOpen={deleteOpen}
          //   setDeleteOpen={setDeleteOpen}
          //   setPublicationOpen={setPublicationOpen}
        />
      </TableContainer>
      {!!(user.role == "service_role" || user.role == "ADMIN") && (
        <Box maxW="1000px" mx="auto">
          <TableContainer
            maxW="1000px"
            mx="auto"
            mt={"20px"}
            overflowX={"scroll"}
          >
            <BusinessAgreeTable
              setCreate={setCreateOpen}
              deleteFunc={deleteFunc}
              setShowAlert={setShowAlert}
              setRes={setRes}
              setUpdate={setUpdate}
              agreeFunc={agreeFunc}

              //   maps={maps}
              //   setOpen={setOpen}
              //   deleteOpen={deleteOpen}
              //   setDeleteOpen={setDeleteOpen}
              //   setPublicationOpen={setPublicationOpen}
            />
          </TableContainer>

          <Button
            onClick={() => {
              navigate(BUSINESScATALOG_ROUTER);
            }}
          >
            Переглянути
          </Button>
        </Box>
      )}
      <CreateBusinessPlan
        open={createOpen}
        setOpen={setCreateOpen}
        isErr={isErr}
        res={res}
        setRes={setRes}
        setIsErr={setIsErr}
        setUpdate={setUpdate}
        update={update}
      />
      <BusinessPublicationPopUp
        open={agreeOpen}
        setOpen={setAgreeOpen}
        data={agreeData}
        setData={setAgreeData}
      />
      {!!deleteOpen && (
        <DeleteAlert
          open={deleteOpen}
          setOpen={setDeleteOpen}
          text={"бізнес-план"}
          func={func.func}
        />
      )}
      {!!showAlert && (
        <NoAuthAlert setShowAlert={setShowAlert} showAlert={showAlert} />
      )}
    </Box>
  );
}

export default Business;
