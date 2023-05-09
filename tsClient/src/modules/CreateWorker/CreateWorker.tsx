import {
  Box,
  Button,
  Input,
  ModalFooter,
  Select,
  Text,
  Checkbox,
  CheckboxGroup,
  Heading,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { CreateJobType } from "../../../../tRPC serv/routes/jobRouter";
import Dialog from "../../components/Dialog";
import { createWorker, getJob } from "../../http/requests";
import { Context } from "../../main";
import useEnterpriseForm from "../../pages/hook/useEnterpriseForm";
import useWorkerClasses, {
  WorkerClassesType,
} from "../../pages/hook/useWorkersClasses";
import CreateJob, { JobPropType } from "../CreateJob/CreateJob";
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  res: CreateWorkerProp;
  setRes: Dispatch<SetStateAction<CreateWorkerProp>>;
};
const obj = {};
export type CreateWorkerProp = {
  workerId?: number;
  jobId: number | "";
  amount: number | "";
  salary: number | "";
  class: WorkerClassesType | "";
  isConst: boolean | "";
  enterpriseId: number;
};
function CreateWorker({
  open,
  setOpen,
  update,
  setUpdate,
  res,
  setRes,
}: props) {
  const [openJob, setOpenJob] = useState(false);
  const [updateJob, setUpdateJob] = useState(false);
  const [resJob, setResJob] = useState<JobPropType>({
    isFOP: false,
    isFOPWith: false,
    isQO: false,
    name: "",
  });
  const { enterpriseStore } = useContext(Context);
  useEffect(() => {
    getJob(enterpriseStore);
  }, []);
  console.log(res.enterpriseId);

  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      isErr={false}
      props={{ enterpriseId: res.enterpriseId }}
      update={true}
      setUpdate={setUpdate}
      res={obj}
      setRes={setRes}
      setIsErr={() => {}}
    >
      <Box>
        <Heading size={"md"} textAlign="center">
          Дані про персонал
        </Heading>
        <Box display={"flex"} alignItems={"center"} gap={5}>
          <Text minW={"max-content"}>Назва посади</Text>
          <Select
            value={res.jobId}
            onChange={(e) =>
              setRes((prev) => ({ ...prev, jobId: e.target.value as any }))
            }
          >
            <option value="" hidden defaultChecked>
              Виберіть опцію
            </option>
            {enterpriseStore.job.map((el) => (
              <option key={el.id} value={el.id}>
                {el.name}
              </option>
            ))}
          </Select>
          <Button minW={"max-content"} onClick={() => setOpenJob(true)}>
            Створити професію
          </Button>
        </Box>
        <Box>
          <Text>Кількість</Text>
          <Input
            value={res.amount}
            type={"number"}
            inputMode="numeric"
            onChange={(e) =>
              setRes((prev) => ({ ...prev, amount: e.target.value as any }))
            }
          />
        </Box>
        <Box>
          <Text>Місячний оклад</Text>
          <Input
            value={res.salary}
            type={"number"}
            inputMode="numeric"
            onChange={(e) =>
              setRes((prev) => ({ ...prev, salary: e.target.value as any }))
            }
          />
        </Box>
        <Box>
          <Text>Клас персоналу</Text>
          <Select
            value={res.class}
            onChange={(e) =>
              setRes((prev) => ({ ...prev, class: e.target.value as any }))
            }
          >
            <option value="" hidden defaultChecked>
              Виберіть опцію
            </option>
            {useWorkerClasses.map((el) => (
              <option key={el.id} value={el.name}>
                {el.name}
              </option>
            ))}
          </Select>
        </Box>
        <Box>
          <CheckboxGroup>
            <Checkbox
              isChecked={!!res.isConst}
              onChange={() => setRes((prev) => ({ ...prev, isConst: true }))}
            >
              Постійний
            </Checkbox>
            <Checkbox
              isChecked={!res.isConst}
              onChange={() => setRes((prev) => ({ ...prev, isConst: false }))}
            >
              Сезонний
            </Checkbox>
          </CheckboxGroup>
        </Box>
      </Box>
      <ModalFooter>
        <Button
          isDisabled={!res.amount && !res.class && !res.jobId && !res.salary}
          onClick={() => {
            if (res.amount && res.class && res.jobId && res.salary) {
              res.jobId = +res.jobId;
              res.amount = +res.amount;
              res.salary = +res.salary;
              if (update) {
              } else {
                //@ts-ignore
                createWorker(enterpriseStore, res);
              }
              //@ts-ignore
              setRes((prev) => ({ enterpriseId: prev.enterpriseId }));
              setOpen(false);
              setUpdate(false);
            }
          }}
        >
          Збегерти
        </Button>
      </ModalFooter>
      <CreateJob
        open={openJob}
        setOpen={setOpenJob}
        res={resJob}
        setRes={setResJob}
        update={updateJob}
        setUpdate={setUpdateJob}
      />
    </Dialog>
  );
}

export default observer(CreateWorker);
