import {
  Box,
  Checkbox,
  Input,
  Text,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext } from "react";
import Dialog from "../../components/Dialog";
import { createJob, patchJob } from "../../http/requests";
import { Context } from "../../main";
import useEnterpriseForm from "../../pages/hook/useEnterpriseForm";
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  res: JobPropType;
  setRes: Dispatch<SetStateAction<JobPropType>>;
};
export type JobPropType = {
  jobId?: number;
  name: string;
  isFOP: boolean | "";
  isFOPWith: boolean | "";
  isQO: boolean | "";
};
const obj = {};
function CreateJob({ open, setOpen, update, setUpdate, res, setRes }: props) {
  const { enterpriseStore } = useContext(Context);
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      update={true}
      setUpdate={setUpdate}
      res={obj}
      props={obj}
      isErr={false}
      setIsErr={() => {}}
      setRes={setRes}
    >
      <Box>
        <Text>Введіть назву професії</Text>
        <Input
          onChange={(e) =>
            setRes((prev) => ({ ...prev, name: e.target.value }))
          }
        ></Input>
      </Box>
      <Box display={"flex"} gap={3}>
        <Text>Враховувати для:</Text>
        {useEnterpriseForm.map((el) => {
          return (
            el.id != 4 && (
              <Checkbox
                //@ts-ignore
                isChecked={res[el.prop]}
                onChange={(e) => {
                  setRes((prev) => ({ ...prev, [el.prop]: !prev[el.prop] }));
                }}
              >
                {el.name}
              </Checkbox>
            )
          );
        })}
      </Box>
      <ModalFooter>
        <Button
          isDisabled={!res.name || (!res.isFOP && !res.isFOPWith && !res.isQO)}
          onClick={() => {
            if (res.name || (res.isFOP && res.isFOPWith && res.isQO)) {
              if (update) {
                //@ts-ignore
                patchJob(enterpriseStore, res);
              } else {
                //@ts-ignore
                createJob(enterpriseStore, res);
              }
              setOpen(false);
              setUpdate(false);
            }
          }}
        >
          Збегерти
        </Button>
      </ModalFooter>
    </Dialog>
  );
}

export default CreateJob;
