import React, { useContext, useEffect, useState } from "react";
import { Box, TableContainer, Button } from "@chakra-ui/react";

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

function Business() {
  useEffect(() => {
    if (!business.businessPlan) {
      getBusinessCategory(map, business);
      getBusinessPlans(map, business);
    }
  }, []);

  const { map, business, user } = useContext(Context);
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
