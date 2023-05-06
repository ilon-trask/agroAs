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
import { createEnterprise, patchEnterprise } from "../../http/requests";
import { Context } from "../../main";
import useEnterpriseForm, {
  EnterpriseFormType,
} from "../../pages/hook/useEnterpriseForm";
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  res: CreateEnterpriseProps;
  setRes: Dispatch<SetStateAction<CreateEnterpriseProps>>;
};
export type CreateEnterpriseProps = {
  entId?: number;
  name: string;
  form: EnterpriseFormType | "";
};
const obj = {};
const forms = useEnterpriseForm;
function CreateEnterprise({
  open,
  setOpen,
  update,
  setUpdate,
  res,
  setRes,
}: props) {
  const { enterpriseStore } = useContext(Context);
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
      <Heading size="md" textAlign={"center"}>
        Вкажіть данні для підприємства
      </Heading>
      <Box>
        <Box>
          <Text>Введіть назву </Text>
          <Input
            value={res.name}
            placeholder="Введіть назву"
            onChange={(e) =>
              setRes((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </Box>
        <Box>
          <Text>Введіть організаційно правову форму</Text>
          <Select
            value={res.form}
            onChange={(e) =>
              setRes((prev) => ({
                ...prev,
                form: e.target.value as EnterpriseFormType,
              }))
            }
          >
            <option value="" hidden defaultChecked>
              Виберіть опцію
            </option>
            {forms.map((el) => (
              <option key={el.id} value={el.name}>
                {el.name}
              </option>
            ))}
          </Select>
        </Box>
      </Box>
      <ModalFooter>
        <Button
          isDisabled={!res.name && !res.form}
          onClick={() => {
            if (res.name && res.form) {
              if (update) {
                //@ts-ignore
                patchEnterprise(enterpriseStore, res);
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
