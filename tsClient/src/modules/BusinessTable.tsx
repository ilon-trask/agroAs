import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { Box, Checkbox, Table, Tbody, Td, Thead, Tr } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react-lite";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { Link } from "react-router-dom";
import TableComponent from "src/components/TableComponent";
import MyDeleteIcon from "src/ui/Icons/MyDeleteIcon";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import MyViewIcon from "src/ui/Icons/MyViewIcon";
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
  businessData: resBusinessPlan[];
};
export function setPatchBusinessPlan(el: resBusinessPlan) {
  const cultureIds: {
    id: number;
    tech: { techId: number; area: number }[];
  }[] = [];
  el?.busProds?.forEach((el) => {
    const myCulture = cultureIds.find((e) => e.id == el.product?.cultureId);
    if (myCulture) {
      myCulture.tech.push({
        techId: el.cultivationTechnologyId,
        area: el.area,
      });
    } else {
      cultureIds.push({
        id: el.product?.cultureId || 0,
        tech: [{ techId: el.cultivationTechnologyId, area: el.area }],
      });
    }
  });
  return cultureIds;
}
function BusinessTable({
  setOpen,
  setRes,
  setUpdate,
  setDeleteOpen,
  businessData,
}: props) {
  const { map, business, user } = useContext(Context);
  const [publicOpen, setPublicOpen] = useState(false);
  const [publicRes, setPublicRes] = useState<{
    BusinessId: number;
    isPublic: boolean;
    isAgree?: boolean;
  }>({ BusinessId: 0, isPublic: true, isAgree: true });
  const onEditClick = (original: resBusinessPlan) => {
    setOpen(true);
    setUpdate(true);
    const cultureIds = setPatchBusinessPlan(original);
    setRes({
      dateStart: original.dateStart,
      initialAmount: original.initialAmount,
      name: original.name,
      realizationTime: original.realizationTime,
      planId: original.id,
      topic: original.topic,
      enterpriseId: original.enterpriseId!,
    });
  };
  const columns = useMemo<ColumnDef<resBusinessPlan>[]>(() => {
    const res: ColumnDef<resBusinessPlan>[] = [
      {
        header: "",
        accessorKey: "id",
        cell: ({ row: { original } }) => (
          <Box onClick={() => onEditClick(original)}>
            <MyEditIcon />
          </Box>
        ),
      },
      {
        header: "Назва бізнес-плану",
        accessorKey: "name",
        cell: ({ row: { original } }) => (
          <Box minW={"max-content"}>
            <Link to={BUSINESSpLAN_ROUTER + "/" + original.id}>
              <MyViewIcon /> {original.name}
            </Link>
          </Box>
        ),
      },
      {
        header: "Підприємство",
        accessorKey: "enterprise.name",
        cell: ({ row: { original } }) => <Box>{original.enterprise?.name}</Box>,
      },
      {
        header: "Культура",
        accessorKey: "cultures",
        cell: ({ row: { original } }) => {
          const cultureSet = new Set(
            original.busProds.map((el) => el.product?.culture?.name!)
          );
          return [...cultureSet].map((el) => (
            <Box key={el} minW={"max-content"}>
              {el}
            </Box>
          ));
        },
      },
      { header: "Дата початку", accessorKey: "dateStart" },
      { header: "Термін", accessorKey: "realizationTime" },
      { header: "Cума", accessorKey: "initialAmount" },
      {
        header: "",
        accessorKey: "createdAt",
        cell: ({ row: { original } }) => (
          <Box
            onClick={() =>
              setDeleteOpen({
                isOpen: true,
                func: () => {
                  deleteBusinessPlan(map, business, original.id!);
                  //@ts-ignore
                  setDeleteOpen({ isOpen: false });
                },
                text: "бізнес-план",
              })
            }
          >
            <MyDeleteIcon />
          </Box>
        ),
      },
    ];
    if (user.role == "service_role")
      res.push({
        header: "",
        accessorKey: "updatedAt",
        cell: ({ row: { original } }) => (
          <Checkbox
            isChecked={original.isPublic}
            onChange={() => {
              if (original.isPublic) {
                setIsPublicBusiness(map, business, {
                  planId: original.id!,
                  isPublic: !original.isPublic,
                  description: original.description,
                });
              } else {
                setPublicOpen(true);
                setPublicRes({
                  BusinessId: original.id!,
                  isPublic: !original.isPublic,
                  isAgree: !original.isAgree,
                });
              }
            }}
          >
            Опублікувати
          </Checkbox>
        ),
      });
    return res;
  }, []);
  const data = businessData;

  return (
    <>
      <TableComponent data={data} columns={columns} />
      <BusinessPublicationPopUp
        open={publicOpen}
        setOpen={setPublicOpen}
        data={publicRes}
        setData={setPublicRes}
      />
    </>
  );
}

export default observer(BusinessTable);
