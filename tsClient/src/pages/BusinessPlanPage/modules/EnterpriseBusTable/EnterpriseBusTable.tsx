import {
  AccordionItem,
  AccordionPanel,
  Table,
  Tbody,
  Td,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BusHeading from "src/ui/BusHeading";
import MyAddIcon from "src/ui/Icons/MyAddIcon";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import MyViewIcon from "src/ui/Icons/MyViewIcon";
import MyAccordionButton from "src/ui/MyAccordionButton";
import MyTableContainer from "src/ui/MyTableContainer";
import { ENTERPRISE_FORM_ROUTER } from "src/utils/consts";
import { resBusinessPlan } from "../../../../../../tRPC serv/controllers/BusinessService";
import CreateEnterprise, {
  CreateEnterpriseProps,
} from "../../../../modules/CreateEnterprise/CreateEnterprise";
type EnterpriseType = {
  setRes: Dispatch<SetStateAction<any>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  enterpriseId: number | undefined | null;
  form: any | undefined;
  name: string | undefined;
  taxGroup: string | undefined;
  id: number | undefined;
};
function EnterpriseTable({
  setRes,
  setOpen,
  enterpriseId,
  form,
  name,
  taxGroup,
  id,
}: EnterpriseType) {
  return (
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
          {enterpriseId ? (
            <Tr>
              <Td
                onClick={() => {
                  setRes({
                    entId: enterpriseId!,
                    form: form!,
                    name: name!,
                    taxGroup: taxGroup!,
                  });
                  setOpen(true);
                }}
              >
                <MyEditIcon />
              </Td>
              <Td>{name}</Td>
              <Td>
                <Link to={ENTERPRISE_FORM_ROUTER + "/" + form + "/" + id}>
                  <MyViewIcon />
                  {form}
                </Link>
              </Td>
              <Td>{taxGroup}</Td>
            </Tr>
          ) : (
            <Tr>
              <Td>
                <MyAddIcon />
              </Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </MyTableContainer>
  );
}
const MemoedEnterpriseTable = React.memo(EnterpriseTable);
function EnterpriseBusTable({ myBusiness }: { myBusiness: resBusinessPlan }) {
  const [res, setRes] = useState<CreateEnterpriseProps>();
  const [open, setOpen] = useState(false);
  const BusinessData = useMemo(
    () => myBusiness,
    [
      myBusiness.enterpriseId,
      myBusiness.enterprise?.form,
      myBusiness.enterprise?.name,
      myBusiness.enterprise?.taxGroup,
      myBusiness.id,
    ]
  );
  return (
    <AccordionItem>
      <MyAccordionButton>
        <BusHeading>Підприємство</BusHeading>
      </MyAccordionButton>
      <AccordionPanel>
        <MemoedEnterpriseTable
          form={BusinessData.enterprise?.form}
          name={BusinessData.enterprise?.name}
          taxGroup={BusinessData.enterprise?.taxGroup}
          id={BusinessData.id}
          enterpriseId={BusinessData.enterpriseId}
          setOpen={setOpen}
          setRes={setRes}
        />
        {open && res && (
          <CreateEnterprise
            open={open}
            setOpen={setOpen}
            update={true}
            setUpdate={() => {}}
            res={res}
            setRes={setRes as any}
            isBusiness={true}
            busId={myBusiness.id!}
          />
        )}
        {/* <ChoseEnterprise open={open} setOpen={setOpen} /> */}
      </AccordionPanel>
    </AccordionItem>
  );
}

export default React.memo(EnterpriseBusTable);
