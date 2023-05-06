import {
  Box,
  Button,
  Checkbox,
  Heading,
  Input,
  Radio,
  Select,
  Text,
} from "@chakra-ui/react";
import { refStructEnhancer } from "mobx/dist/internal";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import Dialog from "../../components/Dialog";
import { createBusinessPlan, patchBusinessPlan } from "../../http/requests";
import { Context } from "../../main";
export type CreateBusinessProp = {
  planId?: number;
  name: string;
  initialAmount: number | "";
  cultureIds: number[];
  enterpriseId: number | "";
  dateStart: string;
  realizationTime: number | "";
};
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  res: CreateBusinessProp;
  setRes: Dispatch<SetStateAction<CreateBusinessProp>>;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
};
const obj = {};
function CreateBusiness({
  open,
  setOpen,
  res,
  setRes,
  update,
  setUpdate,
}: props) {
  const { map, business, enterpriseStore } = useContext(Context);
  function setCulture(id: number) {
    if (res.cultureIds.includes(id)) {
      let akk = res.cultureIds.filter((el) => el != id);
      setRes((prev) => ({ ...prev, cultureIds: [...akk] }));
    } else {
      setRes((prev) => ({ ...prev, cultureIds: [...prev.cultureIds, id] }));
    }
  }

  function isCheckedCulture(id: number) {
    if (res.cultureIds?.includes(id)) {
      return true;
    } else {
      return false;
    }
  }
  console.log(res);

  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      setRes={setRes}
      isErr={false}
      props={obj}
      res={obj}
      setIsErr={() => {}}
      setUpdate={setUpdate}
      update={update}
    >
      <Heading as={"h4"} size="md" textAlign={"center"}>
        Внесіть загальні дані
      </Heading>
      <Box>
        <Text>Виберіть підприємство</Text>
        <Select
          value={res.enterpriseId}
          onChange={(e) =>
            setRes((prev) => ({ ...prev, enterpriseId: +e.target.value }))
          }
        >
          <option value="" hidden defaultChecked>
            Виберіть опцію
          </option>
          {enterpriseStore.enterprise?.map((el) => (
            <option key={el.id} value={el.id}>
              {el.name}
            </option>
          ))}
        </Select>
      </Box>
      <Box>
        <Text>Вкажіть назву бізнес-плану</Text>
        <Input
          value={res.name}
          onChange={(e) =>
            setRes((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Впишіть назву"
        />
      </Box>
      <Box>
        <Text>Виберіть культуру</Text>
        <Box>
          {map.culture.map((el) => (
            <Box key={el.id} as="span" ml={2} display={"inline-flex"} gap={1}>
              <Checkbox
                onChange={() => setCulture(el.id!)}
                isChecked={isCheckedCulture(el.id!)}
              />
              <Box
                as="span"
                cursor="pointer"
                onClick={() => setCulture(el.id!)}
              >
                {el.name}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box>
        <Text>Виберіть технологію</Text>
        <Select>
          {map.cultivationTechnologies.map((el) => (
            <option key={el.id}>{el.name}</option>
          ))}
        </Select>
      </Box>
      <Box>
        <Text>Вкажіть дату початку</Text>
        <Input
          value={res.dateStart}
          onChange={(e) =>
            setRes((prev) => ({ ...prev, dateStart: e.target.value }))
          }
          placeholder="Впишіть дату"
          type={"date"}
        />
      </Box>
      <Box>
        <Text>Вкажіть термін реалізації</Text>
        <Input
          value={res.realizationTime}
          onChange={(e) =>
            setRes((prev) => ({
              ...prev,
              realizationTime: e.target.value as any,
            }))
          }
          placeholder="Впишіть термін"
          type={"number"}
          inputMode={"numeric"}
        />
      </Box>
      <Box>
        <Text>Вкажіть початкову суму</Text>
        <Input
          value={res.initialAmount}
          onChange={(e) =>
            setRes((prev) => ({
              ...prev,
              initialAmount: e.target.value as any,
            }))
          }
          placeholder="Впишіть термін"
          type={"number"}
          inputMode={"numeric"}
        />
      </Box>
      <Button
        onClick={() => {
          if (res) {
            res.initialAmount = +res.initialAmount;
            res.realizationTime = +res.realizationTime;
            if (update) {
              //@ts-ignore
              patchBusinessPlan(map, business, res);
            } else {
              //@ts-ignore
              createBusinessPlan(map, business, res);
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
    </Dialog>
  );
}

export default CreateBusiness;
