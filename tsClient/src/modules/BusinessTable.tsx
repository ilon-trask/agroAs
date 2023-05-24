import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { Box, Checkbox, Table, Tbody, Td, Thead, Tr } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { resBusinessPlan } from "../../../tRPC serv/controllers/BusinessService";
import { DeleteProps } from "../components/DeleteAlert";
import { deleteBusinessPlan, setIsPublicBusiness } from "../http/requests";
import { Context } from "../main";
import { BUSINESSpLAN_ROUTER, ENTERPRISE_ROUTER } from "../utils/consts";
import BusinessPublicationPopUp from "./BusinessPublicationPopUp";
import { CreateBusinessProp } from "./CreateBusiness";
type props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setRes: Dispatch<SetStateAction<CreateBusinessProp>>;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  setDeleteOpen: Dispatch<SetStateAction<DeleteProps>>;
};
export function setPatchBusinessPlan(el: resBusinessPlan) {
  const cultureIds: {
    id: number;
    tech: { techId: number; area: number }[];
  }[] = [];
  el?.busCuls?.forEach((el) => {
    const myCulture = cultureIds.find((e) => e.id == el.cultureId);
    if (myCulture) {
      myCulture.tech.push({
        techId: el.cultivationTechnologyId,
        area: el.area,
      });
    } else {
      cultureIds.push({
        id: el.cultureId,
        tech: [{ techId: el.cultivationTechnologyId, area: el.area }],
      });
    }
  });
  return cultureIds;
}
function BusinessTable({ setOpen, setRes, setUpdate, setDeleteOpen }: props) {
  const { map, business, enterpriseStore } = useContext(Context);
  const [publicOpen, setPublicOpen] = useState(false);
  const [publicRes, setPublicRes] = useState<{
    BusinessId: number;
    isPublic: boolean;
    isAgree?: boolean;
  }>({ BusinessId: 0, isPublic: true, isAgree: true });
  return (
    <Table size="sm">
      <Thead>
        <Tr>
          <Td></Td>
          <Td>Назва підприємства</Td>
          <Td>Назва бізнес-плану</Td>
          <Td>Культура</Td>
          <Td>Дата початку</Td>
          <Td>Термін реалізації</Td>
          <Td>Початкова сума</Td>
          <Td></Td>
          <Td></Td>
        </Tr>
      </Thead>
      <Tbody>
        {business.businessPlan.map((el) => {
          const enterprise = enterpriseStore.enterprise.find(
            (e) => e.id == el.enterpriseId
          );
          const cultureSet = new Set(el.busCuls.map((el) => el.culture?.name!));
          return (
            <Tr key={el.id}>
              <Td
                onClick={() => {
                  setOpen(true);
                  setUpdate(true);
                  const cultureIds = setPatchBusinessPlan(el);

                  setRes({
                    cultureIds: cultureIds,
                    dateStart: el.dateStart,
                    enterpriseId: el.enterpriseId!,
                    initialAmount: el.initialAmount,
                    name: el.name,
                    realizationTime: el.realizationTime,
                    planId: el.id,
                  });
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
                <Link to={ENTERPRISE_ROUTER + "/" + el.enterpriseId}>
                  <ViewIcon boxSize={5} color={"blue.400"} /> {enterprise?.name}
                </Link>
              </Td>
              <Td>
                <Link to={BUSINESSpLAN_ROUTER + "/" + el.id}>
                  <ViewIcon boxSize={5} color={"blue.400"} /> {el.name}
                </Link>
              </Td>
              <Td>
                {[...cultureSet].map((el) => (
                  <Box>{el}</Box>
                ))}
              </Td>
              <Td>{el.dateStart}</Td>
              <Td>{el.realizationTime}</Td>
              <Td>{el.initialAmount}</Td>
              <Td
                cursor={"pointer"}
                onClick={() =>
                  setDeleteOpen({
                    isOpen: true,
                    func: () => {
                      deleteBusinessPlan(map, business, el.id!);
                      //@ts-ignore
                      setDeleteOpen({ isOpen: false });
                    },
                    text: "бізнес-план",
                  })
                }
              >
                <DeleteIcon w={"20px"} h={"auto"} color={"red"} />
              </Td>
              <Td>
                <Checkbox
                  isChecked={el.isPublic}
                  onChange={() => {
                    console.log(el.isPublic);

                    if (el.isPublic) {
                      setIsPublicBusiness(map, business, {
                        planId: el.id!,
                        isPublic: !el.isPublic,
                        description: el.description,
                      });
                    } else {
                      setPublicOpen(true);
                      setPublicRes({
                        BusinessId: el.id!,
                        isPublic: !el.isPublic,
                        isAgree: !el.isAgree,
                      });
                    }
                  }}
                >
                  Опублікувати
                </Checkbox>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
      <BusinessPublicationPopUp
        open={publicOpen}
        setOpen={setPublicOpen}
        data={publicRes}
        setData={setPublicRes}
      />
    </Table>
  );
}

export default observer(BusinessTable);
