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

import TEJTable from "../modules/TEJTable";
import TEJAgreeTable from "../modules/TEJAgreeTable";
import CreateTEJ from "../modules/CreateTEJ";
import NoAuthAlert from "../components/NoAuthAlert";
import DeleteAlert from "../components/DeleteAlert";

import {
  deleteBusinessPlan,
  // getBusinessCategory,
  getBusinessPlans,
} from "../http/requests";
import { Context } from "../main";
import BusinessPublicationPopUp from "../modules/BusinessPublicationPopUp";
import { BUSINESScATALOG_ROUTER } from "../utils/consts";
import { useNavigate } from "react-router-dom";
import useBusiness from "./hook/useBusiness";
import useTEJ from "./hook/useTEJ";
import { TEJProps } from "../modules/CreateTEJ/CreateTEJ";

function TEJJornal() {
  const { map, user, TEJ } = useContext(Context);
  // useBusiness(business, map);
  const navigate = useNavigate();
  const [createOpen, setCreateOpen] = useState(false);
  const [res, setRes] = useState<TEJProps>({ cartId: "", comment: "" });
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
  useTEJ(TEJ);
  // function deleteFunc(BusinessId: number) {
  //   setDeleteOpen(true);
  //   setFunc({
  //     func() {
  //       deleteBusinessPlan(map, business, BusinessId);
  //       setDeleteOpen(false);
  //     },
  //   });
  // }

  // function agreeFunc(BusinessId: number, isPublic: boolean, isAgree?: boolean) {
  //   setAgreeOpen(true);
  //   setAgreeData({
  //     BusinessId: BusinessId,
  //     isPublic: isPublic,
  //     isAgree: isAgree,
  //   });
  // }
  const [showAlert, setShowAlert] = useState(false);
  return (
    <Box>
      <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
        Приклади типових техніко-економічних обгрунтувань
      </Text>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <TEJTable
          setCreate={setCreateOpen}
          deleteFunc={() => {}}
          setShowAlert={setShowAlert}
          setRes={setRes}
          setUpdate={setUpdate}
          agreeFunc={() => {}}
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
            <TEJAgreeTable
              setCreate={setCreateOpen}
              deleteFunc={() => {}}
              setShowAlert={setShowAlert}
              setRes={setRes}
              setUpdate={setUpdate}
              agreeFunc={() => {}}

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
      <CreateTEJ
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

export default TEJJornal;
