import {
  Box,
  Heading,
  Input,
  Text,
  ModalFooter,
  Button,
  Select,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext } from "react";
import Dialog from "../../components/Dialog";
import {
  createEnterprise,
  patchEnterprise,
  patchEnterpriseForBusiness,
} from "../../http/requests";
import { Context } from "../../main";
import useEnterpriseForm, {
  EnterpriseFormType,
} from "../../shared/hook/useEnterpriseForm";
import { EnterpriseTaxGroupType } from "../../shared/hook/useEnterpriseTaxGroup";
import EnterpriseInputs from "./components/EnterpriseInputs";
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  res: CreateEnterpriseProps;
  setRes: Dispatch<SetStateAction<CreateEnterpriseProps>>;
} & ({ isBusiness: true; busId: number } | { isBusiness?: false });
export type CreateEnterpriseProps = {
  entId?: number;
  name: string;
  form: EnterpriseFormType | "";
  taxGroup: EnterpriseTaxGroupType | "";
};
const obj = {};

function CreateEnterprise(props: props) {
  const { open, res, setOpen, setRes, setUpdate, update } = props;
  const { enterpriseStore, business } = useContext(Context);
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      isErr={false}
      setIsErr={() => {}}
      res={res}
      setRes={setRes}
      update={update}
      setUpdate={setUpdate}
      props={obj}
    >
      <EnterpriseInputs res={res} setRes={setRes} />
      <ModalFooter>
        <Button
          isDisabled={!res.name && !res.form}
          onClick={() => {
            if (res.name && res.form) {
              if (update) {
                if (props.isBusiness) {
                  patchEnterpriseForBusiness(
                    business,
                    enterpriseStore,
                    //@ts-ignore
                    res,
                    props.busId
                  );
                } else {
                  //@ts-ignore
                  patchEnterprise(enterpriseStore, res);
                }
              } else {
                //@ts-ignore
                createEnterprise(enterpriseStore, res);
              }
              setOpen(false);
              setUpdate(false);
              //@ts-ignore
              setRes({});
            }
          }}
        >
          Зберегти
        </Button>
      </ModalFooter>
    </Dialog>
  );
}

export default CreateEnterprise;
