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
import { InvestmentOriginType } from "../../pages/hook/useInvestmentOrigin";
import useInvestmentOrigin from "../../pages/hook/useInvestmentOrigin";
import { createInvestment } from "../../http/requests";
import { Context } from "../../main";
export type CreateInvestmentProps = {
  investmentId?: number;
  name: string;
  origin: InvestmentOriginType | "";
  cost: number | "";
  date: string;
};
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  res: CreateInvestmentProps;
  setRes: Dispatch<SetStateAction<CreateInvestmentProps>>;
};
function CreateInvestment({
  open,
  setOpen,
  setUpdate,
  update,
  res,
  setRes,
}: props) {
  const investments = useInvestmentOrigin;
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
      props={{}}
      res={{}}
    >
      <Box>
        <Heading textAlign={"center"} fontWeight={"bold"} size={"md"}>
          Впишіть дані для розрахунку інвестицій
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
              value={res.origin}
              onChange={(e) => {
                setRes((prev) => ({
                  ...prev,
                  origin: e.target.value as InvestmentOriginType,
                }));
              }}
            >
              {investments.map((el) => (
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
          onClick={() => {
            if (res.cost && res.date && res.name && res.origin) {
              res.cost = +res.cost;
              createInvestment(income, res);
              setOpen(false);
            }
          }}
        >
          Збеергти
        </Button>
      </ModalFooter>
    </Dialog>
  );
}

export default CreateInvestment;
