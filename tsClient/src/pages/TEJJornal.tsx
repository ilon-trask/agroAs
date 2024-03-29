import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  TableContainer,
  Button,
  Text,
  Table,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
} from "@chakra-ui/react";

import TEJTable from "../modules/TEJTable";
import TEJAgreeTable from "../modules/TEJAgreeTable";
import CreateTEJ from "../modules/CreateTEJ";
import NoAuthAlert from "../components/NoAuthAlert";
import DeleteAlert from "../components/DeleteAlert";

import {
  deleteBusinessPlan,
  deleteTEJ,
  // getBusinessCategory,
  getBusinessPlans,
  setIsAgreeTEJ,
  setIsPublicTEJ,
} from "../http/requests";
import { Context } from "../main";
import BusinessPublicationPopUp from "../modules/BusinessPublicationPopUp";
import { BUSINESScATALOG_ROUTER, BUSINESSpLAN_ROUTER } from "../utils/consts";
import { Link, useNavigate } from "react-router-dom";
import useBusiness from "../shared/hook/useBusiness";
import useTEJ from "../shared/hook/useTEJ";
import { TEJProps } from "../modules/CreateTEJ/CreateTEJ";
import TEJPublicationPopUp from "../modules/TEJPublicationPopUp";
import CreateBusiness from "../modules/CreateBusiness";
import { observer } from "mobx-react-lite";
import BusinessTable from "../modules/BusinessTable";

function TEJJornal() {
  const { map, user, TEJ, business } = useContext(Context);
  const navigate = useNavigate();
  const [createOpen, setCreateOpen] = useState(false);
  const [res, setRes] = useState<TEJProps>({
    cartId: "",
    comment: "",
    area: 0,
    cultivationTechnologyId: "",
    cultureId: "",
  });
  const [isErr, setIsErr] = useState(false);
  const [update, setUpdate] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [func, setFunc] = useState<any>();
  useTEJ(TEJ);

  function deleteFunc(TEJId: number) {
    setDeleteOpen(true);
    setFunc({
      func() {
        deleteTEJ({ TEJId }, TEJ);
        setDeleteOpen(false);
      },
    });
  }
  const [TEJPubOpen, setTEJPubOpen] = useState(false);
  const [TEJData, setTEJData] = useState({
    TEJId: 0,
    isPublic: false,
    isAgree: false,
    authorName: "",
    publicComment: "",
  });

  function TEJPubOpenFunc(
    TEJId: number,
    isPublic: boolean,
    isAgree: boolean,
    authorName: string,
    publicComment: string,
    agreeThere?: boolean
  ) {
    if (!agreeThere) {
      if (isPublic) {
        setTEJPubOpen(true);
        setTEJData({ TEJId, isPublic, isAgree, authorName, publicComment });
      } else {
        setIsPublicTEJ(TEJ, { publicComment, TEJId, isPublic, authorName });
      }
    } else {
      if (isAgree) {
        setTEJPubOpen(true);
        setTEJData({ TEJId, isPublic, isAgree, authorName, publicComment });
      } else {
        setIsAgreeTEJ(TEJ, {
          publicComment,
          TEJId,
          isPublic,
          authorName,
          isAgree,
        });
      }
    }
  }
  const [showAlert, setShowAlert] = useState(false);
  return (
    <Box>
      <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
        Техніко-економічні показники
      </Text>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <TEJTable
          setCreate={setCreateOpen}
          deleteFunc={deleteFunc}
          setShowAlert={setShowAlert}
          setRes={setRes}
          setUpdate={setUpdate}
          TEJPubOpenFunc={TEJPubOpenFunc}
        />
      </TableContainer>
      {!!(user.role == "service_role" || user.role == "ADMIN") && (
        <Box maxW="1000px" mx="auto">
          <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
            Публікування ТЕП
          </Text>
          <TableContainer
            maxW="1000px"
            mx="auto"
            mt={"20px"}
            overflowX={"scroll"}
          >
            <TEJAgreeTable
              setCreate={setCreateOpen}
              TEJPubOpenFunc={TEJPubOpenFunc}
            />
          </TableContainer>
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

      {!!deleteOpen && (
        <DeleteAlert
          isOpen={deleteOpen}
          setOpen={setDeleteOpen as any}
          text={"бізнес-план"}
          func={func.func}
        />
      )}
      {!!showAlert && (
        <NoAuthAlert setShowAlert={setShowAlert} showAlert={showAlert} />
      )}
      {!!TEJPubOpen && (
        <TEJPublicationPopUp
          TEJData={TEJData}
          open={TEJPubOpen}
          setOpen={setTEJPubOpen}
        />
      )}
    </Box>
  );
}

export default observer(TEJJornal);
