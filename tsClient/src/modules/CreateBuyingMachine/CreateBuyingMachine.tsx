import {
  Box,
  Heading,
  Input,
  Select,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext } from "react";
import Dialog from "../../components/Dialog";
import { createBuyingMachine, patchBuyingMachine } from "../../http/requests";
import { Context } from "../../main";
import useBuyingMachinePurpose, {
  BuyingMachinePurposeType,
} from "../../pages/hook/useBuyingMachinePurpose";
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  res: CreateBuyingMachineProps;
  setRes: Dispatch<SetStateAction<CreateBuyingMachineProps>>;
};
export type CreateBuyingMachineProps = {
  buyingId?: number;
  name: string;
  brand: string;
  date: string;
  purpose: BuyingMachinePurposeType | "";
  amount: number | "";
  cost: number | "";
};
const obj = {};
function CreateBuyingMachine({
  open,
  setOpen,
  update,
  setUpdate,
  res,
  setRes,
}: props) {
  const purpose = useBuyingMachinePurpose;
  const { map } = useContext(Context);
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      isErr={false}
      res={obj}
      props={obj}
      setIsErr={() => {}}
      setRes={setRes}
      setUpdate={setUpdate}
      update={update}
    >
      <Box>
        <Heading as={"h4"} size="md" textAlign={"center"}>
          Внесіть дані для розрахунку
        </Heading>
        <Box
          mt={"15px"}
          display={"flex"}
          justifyContent={"space-around"}
          alignItems={"center"}
          maxW={"490px"}
          mx={"auto"}
        >
          <Box>
            <Heading as={"h4"} size="sm">
              Назва машини <br />
              або обладнання
            </Heading>
            <Input
              size={"sm"}
              placeholder="Вкажіть назву"
              type="text"
              value={res?.name}
              onChange={(e) => {
                setRes({ ...res, name: e.target.value });
              }}
            />
          </Box>
          <Box>
            <Heading as={"h4"} size="sm">
              Марка машини <br />
              або обладнання
            </Heading>
            <Input
              size={"sm"}
              placeholder="Вкажіть назву"
              type="text"
              value={res?.brand}
              onChange={(e) => {
                setRes({ ...res, brand: e.target.value });
              }}
            />
          </Box>
        </Box>
        <Box
          mt={"15px"}
          display={"flex"}
          justifyContent={"space-around"}
          alignItems={"center"}
          maxW={"490px"}
          mx={"auto"}
        >
          <Box>
            <Heading as={"h4"} size="sm">
              Ціна машини <br />
              або обладнання
            </Heading>
            <Input
              size={"sm"}
              placeholder="Вкажіть ціну"
              inputMode="numeric"
              type="number"
              value={res?.cost}
              onChange={(e) => {
                setRes({ ...res, cost: e.target.value as any });
              }}
            />
          </Box>
          <Box>
            <Heading as={"h4"} size="sm">
              Кількість машин <br />
              або обладнання
            </Heading>
            <Input
              size={"sm"}
              placeholder="Вкажіть назву"
              inputMode="numeric"
              type="number"
              value={res?.amount}
              onChange={(e) => {
                setRes({ ...res, amount: e.target.value as any });
              }}
            />
          </Box>
        </Box>
        <Box
          mt={"15px"}
          display={"flex"}
          justifyContent={"space-around"}
          alignItems={"center"}
          maxW={"490px"}
          mx={"auto"}
        >
          <Box>
            <Heading as={"h4"} size="sm">
              Дата покупки машини <br />
              або обладнання
            </Heading>
            <Input
              size={"sm"}
              placeholder="Вкажіть ціку"
              type="date"
              value={res?.date}
              onChange={(e) => {
                setRes({ ...res, date: e.target.value });
              }}
            />
          </Box>
          <Box>
            <Heading as={"h4"} size="sm">
              Напрямок машин <br />
              або обладнання
            </Heading>
            <Select
              size={"sm"}
              value={res?.purpose}
              onChange={(e) => {
                setRes({ ...res, purpose: e.target.value as any });
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
          isDisabled={
            !res.name &&
            !res.brand &&
            !res.amount &&
            !res.cost &&
            !res.date &&
            !res.purpose
          }
          onClick={() => {
            if (
              res.name &&
              res.brand &&
              res.amount &&
              res.cost &&
              res.date &&
              res.purpose
            ) {
              res.cost = +res.cost;
              res.amount = +res.amount;
              if (update) {
                //@ts-ignore
                patchBuyingMachine(map, res);
              } else {
                //@ts-ignore
                createBuyingMachine(map, res);
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

export default CreateBuyingMachine;
