import { Table, Tbody, Td, Thead, Tr } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import MyViewIcon from "src/ui/Icons/MyViewIcon";
import MyHeading from "src/ui/MyHeading";
import MyTableContainer from "src/ui/MyTableContainer";
import { ENTERPRISE_FORM_ROUTER } from "src/utils/consts";
import { resBusinessPlan } from "../../../../../../tRPC serv/controllers/BusinessService";
import CreateEnterprise, {
  CreateEnterpriseProps,
} from "../../../../modules/CreateEnterprise/CreateEnterprise";
import ChoseEnterprise from "./ChoseEnterprise";
function EnterpriseBusTable({
  myBusiness,
}: {
  myBusiness: resBusinessPlan | undefined;
}) {
  const [res, setRes] = useState<CreateEnterpriseProps>();
  const [open, setOpen] = useState(false);
  return (
    <>
      <MyHeading>Підприємство</MyHeading>
      <MyTableContainer>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Td></Td>
              <Td>Назва підприємства</Td>
              <Td>Організаційно правова форма</Td>
              <Td>Група оподаткування</Td>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td
                onClick={() => {
                  setRes({
                    entId: myBusiness?.enterpriseId!,
                    form: myBusiness?.enterprise?.form!,
                    name: myBusiness?.enterprise?.name!,
                    taxGroup: myBusiness?.enterprise?.taxGroup!,
                  });
                  setOpen(true);
                }}
              >
                <MyEditIcon />
              </Td>
              <Td>{myBusiness?.enterprise?.name}</Td>
              <Td>
                <Link
                  to={
                    ENTERPRISE_FORM_ROUTER +
                    "/" +
                    myBusiness?.enterprise?.form +
                    "/" +
                    myBusiness?.id
                  }
                >
                  <MyViewIcon />
                  {myBusiness?.enterprise?.form}
                </Link>
              </Td>
              <Td>{myBusiness?.enterprise?.taxGroup}</Td>
            </Tr>
          </Tbody>
        </Table>
      </MyTableContainer>
      {open && res && (
        <CreateEnterprise
          open={open}
          setOpen={setOpen}
          update={true}
          setUpdate={() => {}}
          res={res}
          setRes={setRes as any}
        />
      )}
      {/* <ChoseEnterprise open={open} setOpen={setOpen} /> */}
    </>
  );
}

export default EnterpriseBusTable;
