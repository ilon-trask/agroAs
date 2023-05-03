import {
  Box,
  Button,
  Heading,
  Input,
  ModalFooter,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext } from "react";
import Dialog from "../../components/Dialog";
import useDerjPurpose, {
  DerjPurposeType,
} from "../../pages/hook/useDerjPurpose";
import { createDerj, patchDerj } from "../../http/requests";
import { Context } from "../../main";
export type CreateDerjProps = {
  derjId?: number;
  name: string;
  purpose: DerjPurposeType | "";
  cost: number | "";
  date: string;
};
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  res: CreateDerjProps;
  setRes: Dispatch<SetStateAction<CreateDerjProps>>;
};
const obj = {};
function CreateDerjSupport({
  open,
  setOpen,
  setUpdate,
  update,
  res,
  setRes,
}: props) {
  const purpose = useDerjPurpose;
  const { income } = useContext(Context);

  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      update={update}
      setUpdate={setUpdate}
      setRes={setRes}
      setIsErr={() => {}}
      isErr={false}
      props={obj}
      res={obj}
    >
      <Box>
        <Heading textAlign={"center"} fontWeight={"bold"} size={"md"}>
          Впишіть дані для розрахунку державної підтримки
        </Heading>
        <Box display={"flex"} justifyContent={"space-around"} mt={3}>
          <Box maxW={"190px"}>
            <Heading as={"h4"} size="sm" minW={"max-content"}>
              Введіть ім'я
            </Heading>
            <Input
              size={"sm"}
              value={res.name}
              onChange={(e) =>
                setRes((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Введіть данні"
            />
          </Box>
          <Box maxW={"190px"}>
            <Heading as={"h4"} size="sm" minW={"max-content"}>
              Введіть дату отримання
            </Heading>
            <Input
              size={"sm"}
              value={res.date}
              type={"date"}
              onChange={(e) =>
                setRes((prev) => ({ ...prev, date: e.target.value }))
              }
            />
          </Box>
        </Box>
        <Box display={"flex"} justifyContent={"space-around"} mt={3}>
          <Box maxW={"190px"}>
            <Heading as={"h4"} size="sm" minW={"max-content"}>
              Введіть суму
            </Heading>
            <Input
              size={"sm"}
              type={"number"}
              value={res.cost}
              onChange={(e) =>
                setRes((prev) => ({ ...prev, cost: e.target.value as any }))
              }
              placeholder="Введіть дані"
            />
          </Box>
          <Box width={"190px"}>
            <Heading as={"h4"} size="sm" minW={"max-content"}>
              Виберіть напрямок
            </Heading>
            <Select
              size={"sm"}
              value={res.purpose}
              onChange={(e) => {
                setRes((prev) => ({
                  ...prev,
                  purpose: e.target.value as DerjPurposeType,
                }));
              }}
            >
              <option value="" hidden defaultChecked>
                Виберіть опцію
              </option>
              {purpose.map((el) => (
                <option key={el.id} value={el.name}>
                  {el.name}
                </option>
              ))}
            </Select>
          </Box>
        </Box>
      </Box>
      <ModalFooter>
        <Button
          isDisabled={!res.cost && !res.date && !res.name && !res.purpose}
          onClick={() => {
            if (res.cost && res.date && res.name && res.purpose) {
              if (update) {
                //@ts-ignore
                patchDerj(income, res);
              } else {
                res.cost = +res.cost;
                //@ts-ignore
                createDerj(income, res);
              }
              setOpen(false);
              setUpdate(false); //@ts-ignore
              setRes({});
            }
          }}
        >
          Збеергти
        </Button>
      </ModalFooter>
    </Dialog>
  );
}

export default CreateDerjSupport;
