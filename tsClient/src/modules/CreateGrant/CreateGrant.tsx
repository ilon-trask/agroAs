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
import { createGrant, patchGrant } from "../../http/requests";
import { Context } from "../../main";
import useGrantPurpose, {
  GrantPurposeType,
} from "../../shared/hook/useGrantPurpose";
export type CreateGrantProps = {
  grantId?: number;
  name: string;
  purpose: GrantPurposeType | "";
  cost: number | "";
  date: string;
  enterpriseId: number;
};
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  res: CreateGrantProps;
  setRes: Dispatch<SetStateAction<CreateGrantProps>>;
};
const obj = {};
function CreateGrant({ open, setOpen, setUpdate, update, res, setRes }: props) {
  const purpose = useGrantPurpose;
  const { income } = useContext(Context);
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      update={update}
      setUpdate={setUpdate}
      setRes={() => {}}
      setIsErr={() => {}}
      isErr={false}
      props={obj}
      res={obj}
      onClose={() =>
        setRes((prev) => ({
          enterpriseId: prev.enterpriseId,
          cost: "",
          date: "",
          name: "",
          purpose: "",
        }))
      }
    >
      <Box>
        <Heading textAlign={"center"} fontWeight={"bold"} size={"md"}>
          Впишіть дані для розрахунку гранту
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
                  purpose: e.target.value as GrantPurposeType,
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
            console.log(res.cost);
            console.log(res.date);
            console.log(res.name);
            console.log(res.purpose);

            if (res.cost && res.date && res.name && res.purpose) {
              res.cost = +res.cost;
              if (update) {
                //@ts-ignore
                patchGrant(income, res);
              } else {
                //@ts-ignore
                createGrant(income, res);
              }
              setOpen(false);
              setUpdate(false);
              setRes((prev) => ({
                cost: "",
                date: "",
                name: "",
                purpose: "",
                enterpriseId: prev.enterpriseId,
              }));
            }
          }}
        >
          Збеергти
        </Button>
      </ModalFooter>
    </Dialog>
  );
}

export default CreateGrant;
